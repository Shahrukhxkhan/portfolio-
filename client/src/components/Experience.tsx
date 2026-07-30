import ReactGA from 'react-ga4';
import { useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import ScrollReveal from './ScrollReveal';

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

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal direction="up">
          <h2 id="experience-heading" className="section-heading">
            Professional Experience
          </h2>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line with Grow Animation */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-[#2E75B6] to-[#00D4FF] origin-top"
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ScrollReveal
                key={exp.id}
                direction={index % 2 === 0 ? "right" : "left"}
                delay={0.1}
              >
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#00D4FF] border-4 border-background shadow-lg shadow-cyan-500/50 z-10 hidden md:flex items-center justify-center">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-[#00D4FF]"
                      whileHover={{ scale: 1.3 }}
                      animate={{ boxShadow: ["0 0 20px rgba(0, 212, 255, 0.5)", "0 0 40px rgba(0, 212, 255, 0.8)", "0 0 20px rgba(0, 212, 255, 0.5)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Content */}
                  <motion.article
                    className={`p-6 rounded-lg bg-card border border-border hover:border-[#00D4FF] transition-all duration-300 space-y-4 ${
                      index % 2 === 0
                        ? "md:col-start-1 md:col-span-1"
                        : "md:col-start-2 md:col-span-1"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">
                            {exp.role}
                          </h3>
                          <p className="text-[#00D4FF] font-medium">{exp.company}</p>
                        </div>
                        {exp.badge && (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                              exp.badgeType === "green"
                                ? "bg-[#22C55E] text-slate-950 font-bold"
                                : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                            }`}
                          >
                            {exp.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">{exp.duration}</p>
                    </div>

                    <ul className="space-y-2">
                      {exp.description.map((bullet, i) => (
                        <li
                          key={i}
                          className="text-muted-foreground text-sm flex gap-3"
                        >
                          <span className="text-[#00D4FF] flex-shrink-0">▸</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
