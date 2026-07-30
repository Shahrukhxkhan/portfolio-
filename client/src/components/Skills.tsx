import { motion } from "framer-motion";
import { skillCategories, topSkills } from "@/data/skills";
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

        {/* Skill Proficiency Section */}
        <ScrollReveal direction="up" delay={0.2} className="mt-16 pt-16 border-t border-border">
          <h3 className="text-xl font-semibold text-foreground mb-8">
            Proficiency Levels
          </h3>

          <div className="space-y-6">
            {topSkills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-medium">{skill.name}</span>
                  <span className="text-[#00D4FF] text-sm">{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-card rounded-full overflow-hidden border border-border">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#2E75B6] to-[#00D4FF]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
