import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Cpu, Layers, Sparkles, CheckCircle2, TrendingUp } from "lucide-react";
import { Project } from "@/data/projects";
import ReactGA from "react-ga4";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl z-10 text-foreground custom-scrollbar"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close project modal"
              className="absolute top-4 right-4 p-2 rounded-full bg-muted/60 hover:bg-muted text-foreground transition-colors z-20 focus:outline-none"
            >
              <X size={20} />
            </button>

            {/* Header Image / Hero Graphic */}
            {project.image ? (
              <div className="relative w-full h-56 sm:h-72 overflow-hidden rounded-t-2xl border-b border-border bg-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                {project.highlight && (
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-[#00D4FF]/40 rounded-full px-4 py-1">
                    <span className="text-[#00D4FF] text-xs font-mono font-semibold flex items-center gap-1.5">
                      <Sparkles size={14} />
                      {project.highlight}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-32 bg-gradient-to-r from-[#2E75B6]/20 to-[#00D4FF]/20 border-b border-border rounded-t-2xl p-6 flex items-end">
                {project.highlight && (
                  <span className="bg-background/90 backdrop-blur-sm border border-[#00D4FF]/40 rounded-full px-4 py-1 text-[#00D4FF] text-xs font-mono font-semibold flex items-center gap-1.5">
                    <Sparkles size={14} />
                    {project.highlight}
                  </span>
                )}
              </div>
            )}

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Title & Badges */}
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-background border border-border text-[#00D4FF]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <h2
                  id="modal-project-title"
                  className="text-2xl sm:text-3xl font-bold font-heading text-foreground"
                >
                  {project.title}
                </h2>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Impact & Key Metrics */}
              {project.impact && project.impact.length > 0 && (
                <div className="space-y-3 bg-gradient-to-r from-[#2E75B6]/10 to-[#00D4FF]/10 p-4 sm:p-5 rounded-xl border border-[#00D4FF]/20">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#00D4FF] flex items-center gap-2">
                    <TrendingUp size={16} />
                    Key Impact & Highlights
                  </h3>
                  <ul className="space-y-2">
                    {project.impact.map((item, idx) => (
                      <li key={idx} className="text-sm text-foreground flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-[#00D4FF] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-heading text-foreground flex items-center gap-2">
                    <Sparkles size={18} className="text-[#00D4FF]" />
                    Core Capabilities & Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-lg bg-background border border-border text-sm font-medium text-foreground flex items-start gap-2.5"
                      >
                        <span className="text-[#00D4FF] font-bold">▸</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Architecture Breakdown */}
              {project.architecture && project.architecture.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-heading text-foreground flex items-center gap-2">
                    <Layers size={18} className="text-[#00D4FF]" />
                    Technical Architecture & Stack
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {project.architecture.map((layer, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-background border border-border space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#00D4FF]">
                          {layer.category}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {layer.items.map((item) => (
                            <span
                              key={item}
                              className="px-2 py-1 rounded text-xs font-mono bg-card border border-border text-foreground"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Tech Tags */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Cpu size={14} />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      ReactGA.event({
                        category: "Projects",
                        action: "Modal GitHub Click",
                        label: project.title,
                      })
                    }
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2E75B6] to-[#00D4FF] text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105"
                  >
                    <Github size={18} />
                    View Source Code on GitHub
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <div />
                )}

                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-background border border-border text-foreground font-semibold hover:bg-muted transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
