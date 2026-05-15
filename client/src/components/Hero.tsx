import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { Github, Linkedin, ArrowDown } from "lucide-react";
import { HeroGeometry } from "./three/HeroGeometry";
import { Suspense } from "react";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            className="z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tag */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-[#111827] border border-[#1E3A5F] text-[#00D4FF] text-sm font-mono">
                &lt; AI & Full-Stack Developer /&gt;
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Muhammad Shahrukh Khan
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-[#8892A4] mb-8 leading-relaxed max-w-xl"
            >
              Building intelligent systems that solve real-world problems. Specializing in AI/ML and full-stack development.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <ScrollLink
                to="projects"
                smooth={true}
                duration={500}
                className="px-8 py-3 bg-gradient-to-r from-[#2E75B6] to-[#00D4FF] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 cursor-pointer text-center transform hover:scale-105"
              >
                View My Work
              </ScrollLink>
              <a
                href="/resume.pdf"
                download
                className="px-8 py-3 border-2 border-[#2E75B6] text-[#2E75B6] rounded-lg font-semibold hover:bg-[#2E75B6]/10 transition-all duration-300 text-center transform hover:scale-105"
              >
                Download Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex gap-6"
            >
              <a
                href="https://github.com/shahrukh032003"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8892A4] hover:text-[#00D4FF] transition-colors duration-300 hover:scale-110 transform"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8892A4] hover:text-[#00D4FF] transition-colors duration-300 hover:scale-110 transform"
              >
                <Linkedin size={24} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Geometry */}
          <motion.div
            className="h-96 lg:h-full min-h-96 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Suspense fallback={<div className="w-full h-full bg-[#111827] rounded-lg" />}>
              <HeroGeometry />
            </Suspense>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[#8892A4] text-sm">Scroll to explore</span>
            <ArrowDown size={20} className="text-[#00D4FF]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
