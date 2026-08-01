import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

export function Skills() {
  const badgeVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)",
    },
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal direction="up">
          <h2 id="skills-heading" className="section-heading">
            Technical Skills
          </h2>
        </ScrollReveal>

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
