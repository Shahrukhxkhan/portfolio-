import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { certifications } from "@/data/certifications";
import { Award } from "lucide-react";

export function Certifications() {
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

  return (
    <section
      id="certifications"
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
            Certifications & Recognition
          </motion.h2>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                className="group p-6 rounded-lg bg-[#111827] border border-[#1E3A5F] hover:border-[#00D4FF] transition-all duration-300 space-y-4 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700" />

                {/* Icon */}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2E75B6] to-[#00D4FF] flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                    <Award size={24} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-[#00D4FF] text-sm font-medium mb-1">
                    {cert.issuer}
                  </p>
                  <p className="text-[#8892A4] text-sm">{cert.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
