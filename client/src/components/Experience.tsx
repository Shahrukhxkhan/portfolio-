import ReactGA from 'react-ga4';
import { useEffect, useRef } from 'react';
import Timeline, { TimelineItem } from './ui/Timeline';

export function Experience() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          ReactGA.event({
            category: 'Engagement',
            action: 'Section View',
            label: 'Experience Timeline'
          });
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const items: TimelineItem[] = [
    {
      id: "codealpha",
      order: 1,
      row: "top",
      label: "June 2025",
      content:
        "Python Programming Intern at CodeAlpha — earned a Letter of Recommendation for analytical skills and fast learning.",
    },
    {
      id: "developershub",
      order: 2,
      row: "bottom",
      label: "Jun – Jul 2025",
      content:
        "AI & ML Engineering Intern at DevelopersHub Corporation — six-week programme with exceptional performance.",
      badge: "🏆 Best Performance Award",
      badgeColor: "#F59E0B",
    },
    {
      id: "cosmicode",
      order: 3,
      row: "top",
      label: "Jul – Oct 2025",
      content:
        "Python Programming Intern at Cosmicode Technologies — four months of hands-on Python development.",
    },
    // TODO: confirm dates
    {
      id: "pmnh",
      order: 4,
      row: "bottom",
      label: "Client Project",
      content:
        "Commissioned QR-based museum guide app with a live admin dashboard for the Pakistan Museum of Natural History.",
    },
    // TODO: confirm dates
    {
      id: "skillloom",
      order: 5,
      row: "top",
      label: "Final Year Project",
      content:
        "SkillLoom — AI hiring platform for Pakistan's textile workforce, with face verification and demand forecasting.",
    },
    {
      id: "pof",
      order: 6,
      row: "bottom",
      label: "July 2026",
      content:
        "AI/ML & DevOps Intern at Pakistan Ordnance Factories — applying AI and DevOps practices in an enterprise environment.",
    },
    // TODO: confirm dates
    {
      id: "varolline",
      order: 7,
      row: "top",
      label: "Present",
      content:
        "Co-founder & Technical Projects Manager at Varolline — an AI/tech agency building real-world intelligent systems.",
    },
  ];

  return (
    <section id="experience" ref={sectionRef} className="relative w-full">
      {/* 1) ~60vh lead-in */}
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-16">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00D4FF] mb-3">
          Career Timeline
        </span>
        <h2 className="font-heading font-extrabold text-[clamp(2rem,5vw,4rem)] text-foreground tracking-tight leading-[1.1] max-w-4xl">
          Professional Experience
        </h2>
        <p className="mt-4 text-sm sm:text-base font-body text-muted-foreground max-w-lg leading-relaxed">
          Keep scrolling — each milestone pins and reveals its journey across the timeline.
        </p>
        <span className="mt-6 animate-bounce text-[#00D4FF] text-xl font-mono">
          &darr;
        </span>
      </div>

      {/* 2) Pinned Horizontal Timeline Component */}
      <Timeline
        items={items}
        title="My Journey"
        periodLabel="2025 — Present"
      />

      {/* 3) Lead-out Quote */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-4 pb-6 text-center">
        <p className="text-sm sm:text-base font-body text-muted-foreground max-w-xl italic leading-relaxed">
          "From first internship to defense-sector AI — building systems that matter."
        </p>
      </div>
    </section>
  );
}

export default Experience;
