import { motion } from "framer-motion";
import { certifications } from "@/data/certifications";
import { Award } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative pt-10 md:pt-12 pb-10 md:pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal direction="up">
          <h2 id="certifications-heading" className="section-heading">
            Certifications & Recognition
          </h2>
        </ScrollReveal>

        {/* Certifications Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.12} delayChildren={0.2}>
          {certifications.map((cert) => (
            <StaggerItem key={cert.id} direction="scale">
              <motion.article
                className="group p-6 rounded-lg bg-card border border-border hover:border-[#00D4FF] transition-all duration-300 space-y-4 relative overflow-hidden h-full"
                whileHover={{ scale: 1.05 }}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700" />

                {/* Icon & Badge */}
                <div className="relative z-10 flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2E75B6] to-[#00D4FF] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                    <Award size={24} className="text-white" />
                  </div>
                  {cert.badge && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        cert.badgeType === "green"
                          ? "bg-[#22C55E] text-slate-950 font-bold"
                          : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                      }`}
                    >
                      {cert.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-[#00D4FF] text-sm font-medium mb-1">
                    {cert.issuer}
                  </p>
                  <p className="text-muted-foreground text-sm">{cert.year}</p>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
