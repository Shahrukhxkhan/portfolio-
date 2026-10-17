import { FC, CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  SiFlutter,
  SiDart,
  SiPython,
  SiFastapi,
  SiSupabase,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiReact,
  SiJavascript,
  SiCplusplus,
  SiGit,
  SiScikitlearn,
} from "react-icons/si";
import type { IconType } from "react-icons";

interface TechItem {
  name: string;
  Icon: IconType;
}

const TECH_STACK: TechItem[] = [
  { name: "Flutter", Icon: SiFlutter },
  { name: "Dart", Icon: SiDart },
  { name: "Python", Icon: SiPython },
  { name: "FastAPI", Icon: SiFastapi },
  { name: "Supabase", Icon: SiSupabase },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Docker", Icon: SiDocker },
  { name: "React", Icon: SiReact },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "C++", Icon: SiCplusplus },
  { name: "Git", Icon: SiGit },
  { name: "scikit-learn", Icon: SiScikitlearn },
];

export interface TechStackBarProps {
  variant?: "dark" | "light";
}

export const TechStackBar: FC<TechStackBarProps> = ({ variant = "dark" }) => {
  const shouldReduceMotion = useReducedMotion();
  const isLight = variant === "light";

  const themeStyles: CSSProperties & Record<string, string> = isLight
    ? {
        "--strip-bg": "#F9F8F6",
        "--strip-border": "rgba(0, 0, 0, 0.08)",
        "--tick-color": "rgba(0, 0, 0, 0.08)",
        "--icon-color": "#6B6A66",
        "--icon-hover": "#111111",
        "--icon-drop-shadow": "0 0 8px rgba(0, 0, 0, 0.25)",
        "--label-color": "#111111",
      }
    : {
        "--strip-bg": "rgba(10, 15, 30, 0.6)",
        "--strip-border": "rgba(46, 117, 182, 0.25)",
        "--tick-color": "rgba(136, 146, 164, 0.18)",
        "--icon-color": "#8892A4",
        "--icon-hover": "#00D4FF",
        "--icon-drop-shadow": "0 0 8px rgba(0, 212, 255, 0.55)",
        "--label-color": "#F0F4FF",
      };

  const containerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: "easeOut" as const,
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      aria-label="Technologies I work with"
      className="tech-strip-root relative w-full h-[80px] flex items-center z-10"
      style={themeStyles}
    >
      <style>{`
        .tech-strip-root {
          background-color: var(--strip-bg);
          border-top: 1px solid var(--strip-border);
          border-bottom: 1px solid var(--strip-border);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .tech-strip-ticks::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: repeating-linear-gradient(
            to right,
            var(--tick-color) 0px,
            var(--tick-color) 1px,
            transparent 1px,
            transparent 48px
          );
          pointer-events: none;
        }

        .tech-strip-ticks::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: repeating-linear-gradient(
            to right,
            var(--tick-color) 0px,
            var(--tick-color) 1px,
            transparent 1px,
            transparent 48px
          );
          pointer-events: none;
        }

        .tech-stack-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          outline: none;
        }

        .tech-stack-item::after {
          content: attr(data-label);
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%) translateY(-2px);
          font-family: 'Open Sans', system-ui, -apple-system, sans-serif;
          font-size: 11px;
          line-height: 1;
          font-weight: 500;
          color: var(--label-color);
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 180ms ease-out, transform 180ms ease-out;
          z-index: 30;
        }

        .tech-stack-item:hover::after,
        .tech-stack-item:focus-visible::after,
        .tech-stack-item:focus::after {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .tech-stack-icon {
          color: var(--icon-color);
          transition: transform 180ms ease-out, color 180ms ease-out, filter 180ms ease-out;
          flex-shrink: 0;
        }

        .tech-stack-item:hover .tech-stack-icon,
        .tech-stack-item:focus-visible .tech-stack-icon,
        .tech-stack-item:focus .tech-stack-icon {
          color: var(--icon-hover);
          transform: scale(1.15);
          filter: drop-shadow(var(--icon-drop-shadow));
        }

        @keyframes tech-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .tech-marquee-wrapper {
          overflow: hidden;
          width: 100%;
        }

        .tech-marquee-track {
          display: flex;
          width: max-content;
          align-items: center;
          animation: tech-marquee 28s linear infinite;
          will-change: transform;
        }

        .tech-marquee-wrapper:hover .tech-marquee-track,
        .tech-marquee-wrapper:active .tech-marquee-track,
        .tech-marquee-track:hover,
        .tech-marquee-track:active {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .tech-marquee-track {
            animation: none !important;
          }
          .tech-marquee-wrapper {
            overflow-x: auto !important;
            scrollbar-width: thin;
          }
        }
      `}</style>

      {/* Decorative blueprint ticks along top and bottom hairlines */}
      <div className="tech-strip-ticks absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Desktop view (>= 768px): Staggered entrance, evenly spaced 1100px row */}
      <motion.div
        className="hidden md:flex max-w-[1100px] mx-auto w-full px-4 sm:px-6 lg:px-8 justify-between items-center h-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <ul role="list" className="w-full flex justify-between items-center m-0 p-0 list-none">
          {TECH_STACK.map(({ name, Icon }) => (
            <motion.li
              key={name}
              data-label={name}
              tabIndex={0}
              variants={itemVariants}
              className="tech-stack-item"
            >
              <Icon className="tech-stack-icon" style={{ width: 28, height: 28 }} aria-hidden="true" />
              <span className="sr-only">{name}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Mobile view (< 768px): Seamless 28s continuous infinite marquee */}
      <div className="tech-marquee-wrapper md:hidden h-full flex items-center relative z-10">
        <div className="tech-marquee-track">
          <ul role="list" className="flex items-center gap-10 pr-10 m-0 p-0 list-none">
            {TECH_STACK.map(({ name, Icon }) => (
              <li
                key={`mobile-1-${name}`}
                data-label={name}
                tabIndex={0}
                className="tech-stack-item"
              >
                <Icon className="tech-stack-icon" style={{ width: 24, height: 24 }} aria-hidden="true" />
                <span className="sr-only">{name}</span>
              </li>
            ))}
          </ul>
          {/* Duplicate list for continuous seamless loop */}
          <ul aria-hidden="true" className="flex items-center gap-10 pr-10 m-0 p-0 list-none">
            {TECH_STACK.map(({ name, Icon }) => (
              <li
                key={`mobile-2-${name}`}
                data-label={name}
                tabIndex={-1}
                className="tech-stack-item"
              >
                <Icon className="tech-stack-icon" style={{ width: 24, height: 24 }} aria-hidden="true" />
                <span className="sr-only">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TechStackBar;
