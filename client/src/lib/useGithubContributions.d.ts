export interface ContributionDay {
  date: string;
  count: number;
}

export interface UseGithubContributionsResult {
  data: ContributionDay[] | null;
  status: "cached" | "snapshot" | "live" | "unavailable";
}

export declare function useGithubContributions(): UseGithubContributionsResult;
export default useGithubContributions;
