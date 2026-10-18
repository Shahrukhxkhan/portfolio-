import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Calendar, Flame, GitCommit, RefreshCw } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionData {
  username: string;
  totalContributions: number;
  weeks: ContributionWeek[];
  year: number;
  updatedAt: string;
}

const COLOR_SCALE = [
  "#141B2D", // Level 0: Empty cell
  "#0c4a60", // Level 1: Low
  "#0284c7", // Level 2: Medium
  "#00b4d8", // Level 3: High
  "#00D4FF", // Level 4: Intense neon cyan
];

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const DAY_LABELS = [
  { dayIndex: 1, label: "Mon" },
  { dayIndex: 3, label: "Wed" },
  { dayIndex: 5, label: "Fri" },
];

export function GitHubContributions() {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  const fetchContributions = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/github-contributions?username=Shahrukhxkhan");
      if (!res.ok) throw new Error("Failed to load contributions");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err?.message || "Failed to load telemetry");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!data || !data.weeks.length) {
      return { total: 0, currentStreak: 0, longestStreak: 0, maxDay: 0 };
    }

    let allDays: ContributionDay[] = [];
    data.weeks.forEach((w) => {
      allDays.push(...w.contributionDays);
    });

    // Total in the last 365 days
    const total = allDays.reduce((sum, d) => sum + d.count, 0);
    const maxDay = Math.max(...allDays.map((d) => d.count), 0);

    // Streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Sort chronologically
    const sorted = [...allDays].sort((a, b) => a.date.localeCompare(b.date));

    for (const d of sorted) {
      if (d.count > 0) {
        tempStreak++;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
    }

    // Current streak working backwards from the end
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (sorted[i].count > 0) {
        currentStreak++;
      } else if (i === sorted.length - 1) {
        // Today might not have commits yet, check yesterday
        continue;
      } else {
        break;
      }
    }

    return { total, currentStreak, longestStreak, maxDay };
  }, [data]);

  // Compute month label positions
  const monthLabels = useMemo(() => {
    if (!data || !data.weeks.length) return [];
    const labels: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    data.weeks.forEach((week, weekIndex) => {
      const firstDay = week.contributionDays[0];
      if (firstDay && firstDay.date) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== lastMonth && weekIndex < data.weeks.length - 2) {
          labels.push({ label: MONTH_NAMES[month], weekIndex });
          lastMonth = month;
        }
      }
    });

    return labels;
  }, [data]);

  const CELL_SIZE = 12;
  const CELL_GAP = 3.5;
  const LEFT_PADDING = 32;
  const TOP_PADDING = 24;

  return (
    <div className="mt-16 pt-10 border-t border-border/80">
      <ScrollReveal direction="up">
        <div className="relative rounded-2xl bg-card/60 backdrop-blur-md border border-border/80 p-6 sm:p-8 overflow-hidden shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-[#00D4FF]">
                  <Github className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  GitHub Contribution Activity
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Verified commit and open-source telemetry for{" "}
                <span className="text-[#00D4FF] font-mono">@Shahrukhxkhan</span>
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-background/80 border border-border">
                <GitCommit className="w-4 h-4 text-[#00D4FF]" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground font-mono">Total Commits</div>
                  <div className="text-sm font-bold text-foreground">
                    {loading ? "..." : `${stats.total}+`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-background/80 border border-border">
                <Flame className="w-4 h-4 text-amber-400" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground font-mono">Longest Streak</div>
                  <div className="text-sm font-bold text-foreground">
                    {loading ? "..." : `${stats.longestStreak} days`}
                  </div>
                </div>
              </div>

              <a
                id="github-profile-link"
                href="https://github.com/Shahrukhxkhan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2E75B6] to-[#00D4FF] text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <span>View GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Heatmap Grid Container */}
          <div className="relative z-10">
            {loading ? (
              <div className="h-44 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                <RefreshCw className="w-6 h-6 animate-spin text-[#00D4FF]" />
                <span className="text-sm font-mono">Fetching GitHub contribution graph...</span>
              </div>
            ) : error ? (
              <div className="h-44 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                <p className="text-sm text-red-400">{error}</p>
                <button
                  onClick={fetchContributions}
                  className="px-4 py-1.5 rounded-lg bg-card border border-border text-xs text-[#00D4FF] hover:border-[#00D4FF]"
                >
                  Retry Connection
                </button>
              </div>
            ) : data && data.weeks.length > 0 ? (
              <div className="overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                <div className="relative inline-block min-w-full">
                  <svg
                    width={LEFT_PADDING + data.weeks.length * (CELL_SIZE + CELL_GAP) + 16}
                    height={TOP_PADDING + 7 * (CELL_SIZE + CELL_GAP) + 10}
                    className="overflow-visible select-none"
                  >
                    {/* Month Labels */}
                    {monthLabels.map((m, idx) => {
                      const x = LEFT_PADDING + m.weekIndex * (CELL_SIZE + CELL_GAP);
                      return (
                        <text
                          key={idx}
                          x={x}
                          y={TOP_PADDING - 8}
                          fontSize="10"
                          fill="#8892b0"
                          fontFamily="monospace"
                        >
                          {m.label}
                        </text>
                      );
                    })}

                    {/* Day Labels */}
                    {DAY_LABELS.map((d) => (
                      <text
                        key={d.dayIndex}
                        x={0}
                        y={TOP_PADDING + d.dayIndex * (CELL_SIZE + CELL_GAP) + CELL_SIZE - 2}
                        fontSize="9"
                        fill="#8892b0"
                        fontFamily="monospace"
                      >
                        {d.label}
                      </text>
                    ))}

                    {/* Contribution Rectangles */}
                    {data.weeks.map((week, weekIdx) => {
                      const x = LEFT_PADDING + weekIdx * (CELL_SIZE + CELL_GAP);
                      return week.contributionDays.map((day, dayIdx) => {
                        const y = TOP_PADDING + dayIdx * (CELL_SIZE + CELL_GAP);
                        const isHovered = hoveredCell?.date === day.date;
                        const fillColor = COLOR_SCALE[day.level] || COLOR_SCALE[0];

                        return (
                          <rect
                            key={day.date || `${weekIdx}-${dayIdx}`}
                            x={x}
                            y={y}
                            width={CELL_SIZE}
                            height={CELL_SIZE}
                            rx={2.5}
                            ry={2.5}
                            fill={fillColor}
                            stroke={isHovered ? "#00D4FF" : day.level > 0 ? "rgba(0, 212, 255, 0.2)" : "rgba(255, 255, 255, 0.04)"}
                            strokeWidth={isHovered ? 1.5 : 1}
                            style={{
                              transition: "all 0.15s ease",
                              cursor: "pointer",
                              filter: isHovered
                                ? "drop-shadow(0 0 8px rgba(0, 212, 255, 0.8))"
                                : day.level === 4
                                ? "drop-shadow(0 0 3px rgba(0, 212, 255, 0.4))"
                                : "none",
                            }}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setHoveredCell({
                                date: day.date,
                                count: day.count,
                                x: rect.left + rect.width / 2,
                                y: rect.top - 8,
                              });
                            }}
                            onMouseLeave={() => setHoveredCell(null)}
                          />
                        );
                      });
                    })}
                  </svg>
                </div>
              </div>
            ) : null}
          </div>

          {/* Floating Tooltip */}
          <AnimatePresence>
            {hoveredCell && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                style={{
                  position: "fixed",
                  left: hoveredCell.x,
                  top: hoveredCell.y,
                  transform: "translate(-50%, -100%)",
                  pointerEvents: "none",
                  zIndex: 9999,
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-900/95 border border-cyan-500/40 text-xs shadow-xl backdrop-blur-md"
              >
                <div className="font-bold text-[#00D4FF]">
                  {hoveredCell.count === 0
                    ? "No contributions"
                    : `${hoveredCell.count} contribution${hoveredCell.count > 1 ? "s" : ""}`}
                </div>
                <div className="text-[11px] text-muted-foreground font-mono">
                  {new Date(hoveredCell.date).toLocaleDateString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer with Legend */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-border/50 text-xs text-muted-foreground relative z-10">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>
                Activity displayed over the past 52 weeks
              </span>
            </div>

            {/* Scale Legend */}
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="mr-1">Less</span>
              {COLOR_SCALE.map((color, idx) => (
                <div
                  key={idx}
                  className="w-3 h-3 rounded-xs border border-white/5"
                  style={{
                    backgroundColor: color,
                    boxShadow: idx === 4 ? "0 0 6px rgba(0, 212, 255, 0.5)" : "none",
                  }}
                  title={`Level ${idx}`}
                />
              ))}
              <span className="ml-1">More</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
