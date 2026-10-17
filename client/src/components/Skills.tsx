import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { skillCategories } from "@/data/skills";
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

export function Skills() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [counts, setCounts] = useState({
    internships: 0,
    projects: 0,
    clients: 0,
    specializations: 0,
  });

  useEffect(() => {
    if (!inView) return;

    const targets = {
      internships: 4,
      projects: 10,
      clients: 3,
      specializations: 2,
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounts({
        internships: Math.floor(targets.internships * progress),
        projects: Math.floor(targets.projects * progress),
        clients: Math.floor(targets.clients * progress),
        specializations: Math.floor(targets.specializations * progress),
      });

      if (currentStep >= steps) clearInterval(interval);
    }, stepDuration);

    return () => clearInterval(interval);
  }, [inView]);

  const badgeVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)",
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      aria-labelledby="skills-heading"
      className="relative pt-10 md:pt-12 pb-10 md:pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal direction="up">
          <h2 id="skills-heading" className="section-heading mb-8">
            Technical Skills
          </h2>
        </ScrollReveal>

        {/* Stats Grid - Moved from About section */}
        <StaggerContainer
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          staggerDelay={0.12}
          delayChildren={0.1}
        >
          {[
            { value: counts.internships, label: "Internships Completed" },
            { value: `${counts.projects}+`, label: "Projects Built" },
            { value: counts.clients, label: "Real-World Systems" },
            { value: counts.specializations, label: "AI/ML Specializations" },
          ].map((stat, i) => (
            <StaggerItem key={i} direction="scale">
              <motion.div
                className="p-6 rounded-lg bg-card border border-border hover:border-[#00D4FF] transition-all duration-300 h-full text-center"
                whileHover={{ scale: 1.05, borderColor: "#00D4FF" }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#00D4FF] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Skills by Category */}
        <div className="space-y-10">
          {skillCategories.map((category) => (
            <div key={category.category} className="space-y-4">
              <ScrollReveal direction="left" delay={0.1}>
                <h3 className="text-lg font-semibold text-[#00D4FF] mb-4">
                  {category.category}
                </h3>
              </ScrollReveal>

              <StaggerContainer className="flex flex-wrap gap-3" staggerDelay={0.08} delayChildren={0.1}>
                {category.skills.map((skill) => (
                  <StaggerItem key={skill} direction="up">
                    <motion.div
                      whileHover="hover"
                      variants={badgeVariants}
                      className="px-4 py-2 rounded-full bg-card border border-border text-foreground text-sm font-medium hover:border-[#00D4FF] transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
