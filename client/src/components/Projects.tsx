import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projects } from "@/data/projects";
import { Github, ExternalLink } from "lucide-react";
import Tilt from "react-parallax-tilt";

export function Projects() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
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
            Key Projects
          </motion.h2>

          {/* Featured Projects */}
          <div className="space-y-16 mb-20">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-cols-2 lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Project Content */}
                <div className="space-y-6">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-card border border-border text-[#00D4FF]"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {project.description}
                  </p>

                  {project.highlight && (
                    <div className="p-4 rounded-lg bg-card border border-border">
                      <p className="text-[#00D4FF] font-semibold">
                        ✨ {project.highlight}
                      </p>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="tech-tag"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-card border border-border text-[#00D4FF] hover:border-[#00D4FF] hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                      >
                        <Github size={18} />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Visual */}
                {project.id === "pmnh-museum" ? (
                  <div
                    className="relative group overflow-hidden rounded-xl border border-border"
                    style={{ width: "100%", aspectRatio: "16/9" }}
                  >
                    {/* Actual dashboard screenshot */}
                    <img
                      src="/images/pmnh-dashboard.png"
                      alt="PMNH Admin Dashboard"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient overlay — bottom fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

                    {/* Floating label — top left */}
                    <div className="absolute top-3 left-3 bg-background/85 backdrop-blur-sm border border-[#2E75B6]/50 rounded-lg px-3 py-1">
                      <span className="text-[#00D4FF] text-xs font-mono">
                        ⚡ Live Admin Dashboard
                      </span>
                    </div>

                    {/* Stats overlay — bottom */}
                    <div className="absolute bottom-3 left-3 right-3 flex gap-3">
                      <div className="bg-background/85 backdrop-blur-sm border border-border rounded-lg px-3 py-1 text-center">
                        <div className="text-[#00D4FF] text-sm font-bold">2,145</div>
                        <div className="text-muted-foreground text-xs">QR Scans</div>
                      </div>
                      <div className="bg-background/85 backdrop-blur-sm border border-border rounded-lg px-3 py-1 text-center">
                        <div className="text-[#00D4FF] text-sm font-bold">142</div>
                        <div className="text-muted-foreground text-xs">Active Visitors</div>
                      </div>
                      <div className="bg-background/85 backdrop-blur-sm border border-border rounded-lg px-3 py-1 text-center">
                        <div className="text-[#00D4FF] text-sm font-bold">1h 25m</div>
                        <div className="text-muted-foreground text-xs">Avg Duration</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-80 rounded-lg bg-gradient-to-br from-card to-background border border-border flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl opacity-20">
                        {project.id === "skillloom" && "🎯"}
                        {project.id === "code-graveyard" && "🪦"}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Other Projects Grid */}
          <motion.div
            variants={itemVariants}
            className="pt-16 border-t border-border"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8">Other Projects</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <Tilt
                  key={project.id}
                  className="h-full"
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  scale={1.05}
                >
                  <motion.div
                    variants={itemVariants}
                    className="h-full p-6 rounded-lg bg-card border border-border hover:border-[#00D4FF] transition-all duration-300 space-y-4 cursor-pointer"
                  >
                    <div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.badges.map((badge) => (
                          <span
                            key={badge}
                            className="px-2 py-1 rounded text-xs font-medium bg-background border border-border text-[#00D4FF]"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                      <h4 className="text-lg font-bold text-foreground mb-2">
                        {project.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded text-xs font-mono bg-background border border-border text-[#00D4FF]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#00D4FF] hover:text-foreground transition-colors"
                      >
                        <Github size={16} />
                        <span className="text-sm">View on GitHub</span>
                      </a>
                    )}
                  </motion.div>
                </Tilt>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
