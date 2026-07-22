import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export function About() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="about"
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
            About Me
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Text Content */}
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <p className="text-muted-foreground text-lg leading-relaxed">
                I'm a Computer Science student at COMSATS University Islamabad, Wah Campus, graduating in 2027. I specialize in building AI-powered full-stack applications that bridge the gap between intelligent systems and real-world usability.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                My flagship project, SkillLoom, is an AI-driven hiring platform for Pakistan's informal textile workforce — combining biometric verification, smart job matching, and demand heatmaps to connect 15M+ workers with opportunities.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                I've completed 4 internships across AI/ML Engineering, Python development, and DevOps — including a current role at Pakistan Ordnance Factories (POF), earning a Best Performance Award at DevelopersHub Corporation. I'm passionate about technology that creates genuine social impact.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { value: counts.internships, label: "Internships Completed" },
                { value: `${counts.projects}+`, label: "Projects Built" },
                { value: counts.clients, label: "Real-World Systems" },
                { value: counts.specializations, label: "AI/ML Specializations" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="p-6 rounded-lg bg-card border border-border hover:border-[#00D4FF] transition-all duration-300"
                  whileHover={{ scale: 1.05, borderColor: "#00D4FF" }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#00D4FF] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
