import { useState, useEffect } from "react";
import ReactGA from "react-ga4";
import ContributionSkyline from "./ui/ContributionSkyline";
import useGithubContributions from "../lib/useGithubContributions";
import ScrollReveal from "./ScrollReveal";

const P = ["#0B3A5E", "#1B6BA8", "#27A2E0", "#00D4FF"];

const SCOPED_THEME = {
  "--color-background": "#111827",
  "--color-foreground": "#F0F4FF",
  "--color-border": "#1E3A5F",
  "--color-muted-foreground": "#8892A4",
};

export function GithubActivity() {
  const { data } = useGithubContributions();
  const [fontsReady, setFontsReady] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => setFontsReady(true))
        .catch(() => setFontsReady(true));
    } else {
      setFontsReady(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(pointer: coarse)");
      setIsCoarse(mq.matches);
      const listener = (e) => setIsCoarse(e.matches);
      mq.addEventListener("change", listener);
      return () => mq.removeEventListener("change", listener);
    }
  }, []);

  // Hard constraint: treat data as unavailable if empty or sum of counts is 0
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }

  const totalSum = data.reduce((acc, curr) => acc + (Number(curr?.count) || 0), 0);
  if (totalSum === 0) {
    return null;
  }

  const footerText = isCoarse ? "Tap a day for details · drag to orbit" : undefined;

  const handleViewChange = (v) => {
    try {
      ReactGA.event({
        category: "GitHub Chart",
        action: "View Change",
        label: v,
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="relative pt-10 md:pt-12 pb-10 md:pb-12 overflow-hidden"
      style={SCOPED_THEME}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reuse existing scroll-reveal pattern for heading only */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider mb-2">
                Open source activity
              </div>
              <h2 id="github-heading" className="section-heading mb-2">
                GitHub Activity
              </h2>
              <p className="text-sm text-muted-foreground max-w-2xl">
                A year of commits, pull requests and issues from{" "}
                <span className="font-mono text-foreground">github.com/Shahrukhxkhan</span>
              </p>
            </div>
            <div>
              <a
                href="https://github.com/Shahrukhxkhan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1E3A5F] text-sm font-medium text-[#F0F4FF] hover:border-[#00D4FF] hover:text-[#00D4FF] transition-colors"
              >
                <span>View profile</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Chart inside w-full container, mounted only when data is available and document.fonts.ready has resolved */}
        <div className="w-full">
          {fontsReady && (
            <ContributionSkyline
              data={data}
              defaultView="3d"
              unit="contribution"
              palette={{ light: P, dark: P }}
              footer={footerText}
              onViewChange={handleViewChange}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default GithubActivity;
