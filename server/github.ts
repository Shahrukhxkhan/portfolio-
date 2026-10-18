interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionData {
  username: string;
  totalContributions: number;
  weeks: ContributionWeek[];
  year: number;
  updatedAt: string;
}

// In-memory cache for 1 hour
let cache: { data: ContributionData; timestamp: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000;

export async function fetchGitHubContributions(username: string = "Shahrukhxkhan"): Promise<ContributionData> {
  const now = Date.now();
  if (cache && now - cache.timestamp < CACHE_TTL_MS && cache.data.username.toLowerCase() === username.toLowerCase()) {
    return cache.data;
  }

  const token = process.env.GITHUB_TOKEN;

  // 1. If GITHUB_TOKEN is available, query GitHub GraphQL API
  if (token) {
    try {
      const query = `
        query($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    contributionLevel
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "User-Agent": "portfolio-app",
        },
        body: JSON.stringify({ query, variables: { login: username } }),
      });

      if (response.ok) {
        const json = await response.json();
        const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
        if (calendar) {
          const levelMap: Record<string, number> = {
            NONE: 0,
            FIRST_QUARTILE: 1,
            SECOND_QUARTILE: 2,
            THIRD_QUARTILE: 3,
            FOURTH_QUARTILE: 4,
          };

          const weeks: ContributionWeek[] = calendar.weeks.map((w: any) => ({
            contributionDays: w.contributionDays.map((d: any) => ({
              date: d.date,
              count: d.contributionCount,
              level: levelMap[d.contributionLevel] ?? (d.contributionCount > 0 ? 1 : 0),
            })),
          }));

          const data: ContributionData = {
            username,
            totalContributions: calendar.totalContributions,
            weeks,
            year: new Date().getFullYear(),
            updatedAt: new Date().toISOString(),
          };

          cache = { data, timestamp: now };
          return data;
        }
      }
    } catch (err) {
      console.warn("GraphQL contributions fetch failed, falling back to public calendar:", err);
    }
  }

  // 2. Fallback to public contributions service
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
    if (!res.ok) {
      throw new Error(`Failed to fetch public calendar: ${res.statusText}`);
    }

    const json = await res.json();
    const contributions: Array<{ date: string; count: number; level: number }> = json.contributions || [];

    // Group into 7-day weeks starting on Sunday
    const weeks: ContributionWeek[] = [];
    let currentWeek: ContributionDay[] = [];

    for (const item of contributions) {
      currentWeek.push({
        date: item.date,
        count: item.count,
        level: Math.min(Math.max(item.level || 0, 0), 4),
      });

      if (currentWeek.length === 7) {
        weeks.push({ contributionDays: currentWeek });
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      weeks.push({ contributionDays: currentWeek });
    }

    const currentYear = new Date().getFullYear();
    const totalCurrentYear = json.total?.[currentYear] ?? contributions.reduce((acc, c) => acc + c.count, 0);

    const data: ContributionData = {
      username,
      totalContributions: totalCurrentYear,
      weeks,
      year: currentYear,
      updatedAt: new Date().toISOString(),
    };

    cache = { data, timestamp: now };
    return data;
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    throw error;
  }
}
