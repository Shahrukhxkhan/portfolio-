import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experiences } from "@/data/experience";

export function Experience() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="experience"
      ref={ref}
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
            variants={itemVariants}
            className="section-heading"
          >
            Professional Experience
          </motion.h2>

          {/* Timeline */}
          <div className="relative">
            {/* Center Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#2E75B6] to-[#00D4FF]" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:flex justify-center">
                    <motion.div
                      className="w-6 h-6 rounded-full bg-[#00D4FF] border-4 border-[#0A0F1E] shadow-lg shadow-cyan-500/50"
                      whileHover={{ scale: 1.3 }}
                      animate={{ boxShadow: ["0 0 20px rgba(0, 212, 255, 0.5)", "0 0 40px rgba(0, 212, 255, 0.8)", "0 0 20px rgba(0, 212, 255, 0.5)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Content */}
                  <motion.div
                    className="p-6 rounded-lg bg-[#111827] border border-[#1E3A5F] hover:border-[#00D4FF] transition-all duration-300 space-y-4"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {exp.role}
                          </h3>
                          <p className="text-[#00D4FF] font-medium">{exp.company}</p>
                        </div>
                        {exp.badge && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-white whitespace-nowrap ml-2">
                            {exp.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[#8892A4] text-sm">{exp.duration}</p>
                    </div>

                    <ul className="space-y-2">
                      {exp.description.map((bullet, i) => (
                        <li
                          key={i}
                          className="text-[#8892A4] text-sm flex gap-3"
                        >
                          <span className="text-[#00D4FF] flex-shrink-0">▸</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
