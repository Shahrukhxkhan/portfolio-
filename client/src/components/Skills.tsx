import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skillCategories, topSkills } from "@/data/skills";

export function Skills() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
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
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Heading */}
          <motion.h2
            id="skills-heading"
            variants={itemVariants}
            className="section-heading"
          >
            Technical Skills
          </motion.h2>

          {/* Skills by Category */}
          <div className="space-y-10">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                variants={itemVariants}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-[#00D4FF] mb-4">
                  {category.category}
                </h3>

                <motion.div
                  className="flex flex-wrap gap-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      variants={badgeVariants}
                      whileHover="hover"
                      className="px-4 py-2 rounded-full bg-card border border-border text-foreground text-sm font-medium hover:border-[#00D4FF] transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Skill Proficiency Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-16 border-t border-border"
          >
            <h3 className="text-xl font-semibold text-foreground mb-8">
              Proficiency Levels
            </h3>

            <div className="space-y-6">
              {topSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-medium">{skill.name}</span>
                    <span className="text-[#00D4FF] text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-card rounded-full overflow-hidden border border-border">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#2E75B6] to-[#00D4FF]"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
