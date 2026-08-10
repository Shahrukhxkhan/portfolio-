import { useState } from "react";
import ReactGA from 'react-ga4';
import { motion } from "framer-motion";
import { projects, Project } from "@/data/projects";
import { Github, Info, Layers } from "lucide-react";
import Tilt from "react-parallax-tilt";
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';
import { ProjectModal } from "./ProjectModal";

const getFeaturedLabel = (id: string, title: string) => {
  if (id === 'skillloom') return 'SkillLoom';
  if (id === 'pmnh-museum') return 'PMNH Museum App';
  if (id.includes('bone') || title.toLowerCase().includes('bone')) return 'Bone Fracture Detection';
  return title;
};

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "AI / ML", "Full-Stack", "Mobile & Utilities"];

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    ReactGA.event({
      category: 'Projects',
      action: 'Modal Open',
      label: project.title,
    });
  };

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "AI / ML") {
      return (
        project.badges.some((b) => b.includes("AI") || b.includes("LLM")) ||
        project.techStack.some((t) =>
          ["FastAPI", "InsightFace", "Gemini 2.5 Flash API", "Python"].includes(t)
        )
      );
    }
    if (activeCategory === "Full-Stack") {
      return project.badges.includes("Full-Stack") || project.techStack.includes("React") || project.techStack.includes("Node.js");
    }
    if (activeCategory === "Mobile & Utilities") {
      return (
        project.badges.includes("Mobile") ||
        project.badges.includes("C++") ||
        project.badges.includes("SQL") ||
        project.badges.includes("Python")
      );
    }
    return true;
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative pt-10 md:pt-12 pb-10 md:pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 id="projects-heading" className="section-heading">
                Key Projects
              </h2>
              <p className="text-muted-foreground text-[#00D4FF] text-sm">
                Click any project card for technical architecture, impact & full feature breakdowns
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 bg-card p-1.5 rounded-xl border border-border">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-[#2E75B6] text-white shadow-md shadow-blue-500/20 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="space-y-16 mb-20">
            {featuredProjects.map((project, index) => (
              <ScrollReveal
                key={project.id}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={0.1}
              >
                <article
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
                      <h3
                        onClick={() => handleOpenModal(project)}
                        className="text-2xl md:text-3xl font-bold text-foreground mb-4 cursor-pointer hover:text-[#00D4FF] transition-colors"
                      >
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {project.description}
                    </p>

                    {project.highlight && (
                      <div className="p-4 rounded-lg bg-card border border-border">
                        <p className="text-[#00D4FF] font-semibold">
                          {project.highlight}
                        </p>
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      <button
                        onClick={() => handleOpenModal(project)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#2E75B6] to-[#00D4FF] text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105"
                      >
                        <Layers size={18} />
                        View Architecture & Details
                      </button>

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} on GitHub`}
                          onClick={() => ReactGA.event({ category: 'Projects', action: 'GitHub Click', label: getFeaturedLabel(project.id, project.title) })}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-card border border-border text-[#00D4FF] hover:border-[#00D4FF] hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                        >
                          <Github size={18} />
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Visual */}
                  <div
                    onClick={() => handleOpenModal(project)}
                    className="cursor-pointer group"
                  >
                    {project.id === "skillloom" ? (
                      <div
                        className="relative group overflow-hidden rounded-xl border border-border shadow-xl hover:border-[#00D4FF] transition-all duration-300"
                        style={{ width: "100%", aspectRatio: "16/9" }}
                      >
                        <img
                          src="/images/skillloom.png"
                          alt="SkillLoom AI-Powered Textile Workforce Platform Admin Dashboard interface showing workforce telemetry and active jobs"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                        <div className="absolute top-3 left-3 bg-background/85 backdrop-blur-sm border border-[#2E75B6]/50 rounded-lg px-3 py-1">
                          <span className="text-[#00D4FF] text-xs font-mono flex items-center gap-1">
                            ⚡ AI Workforce Dashboard
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex gap-3">
                          <div className="bg-background/85 backdrop-blur-sm border border-border rounded-lg px-3 py-1 text-center">
                            <div className="text-[#00D4FF] text-sm font-bold">19</div>
                            <div className="text-muted-foreground text-xs">Workers</div>
                          </div>
                          <div className="bg-background/85 backdrop-blur-sm border border-border rounded-lg px-3 py-1 text-center">
                            <div className="text-[#00D4FF] text-sm font-bold">5</div>
                            <div className="text-muted-foreground text-xs">Employers</div>
                          </div>
                          <div className="bg-background/85 backdrop-blur-sm border border-border rounded-lg px-3 py-1 text-center">
                            <div className="text-[#00D4FF] text-sm font-bold">8</div>
                            <div className="text-muted-foreground text-xs">Active Jobs</div>
                          </div>
                        </div>
                      </div>
                    ) : project.id === "pmnh-museum" ? (
                      <div
                        className="relative group overflow-hidden rounded-xl border border-border shadow-xl hover:border-[#00D4FF] transition-all duration-300"
                        style={{ width: "100%", aspectRatio: "16/9" }}
                      >
                        <img
                          src="/images/pmnh-dashboard.png"
                          alt="Pakistan Museum of Natural History (PMNH) Admin Dashboard interface showing visitor analytics and QR scan telemetry"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                        <div className="absolute top-3 left-3 bg-background/85 backdrop-blur-sm border border-[#2E75B6]/50 rounded-lg px-3 py-1">
                          <span className="text-[#00D4FF] text-xs font-mono">
                            ⚡ Live Admin Dashboard
                          </span>
                        </div>
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
                    ) : project.id === "code-graveyard" ? (
                      <div
                        className="relative group overflow-hidden rounded-xl border border-border shadow-xl hover:border-[#00D4FF] transition-all duration-300"
                        style={{ width: "100%", aspectRatio: "16/9" }}
                      >
                        <img
                          src="/images/code-graveyard.png"
                          alt="Code Graveyard - The Developer's Post-Mortem Platform interface showing project statistics"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                        <div className="absolute top-3 left-3 bg-background/85 backdrop-blur-sm border border-[#9333EA]/50 rounded-lg px-3 py-1">
                          <span className="text-[#A855F7] text-xs font-mono">
                            ⚡ Developer Post-Mortem Platform
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex gap-3">
                          <div className="bg-background/85 backdrop-blur-sm border border-border rounded-lg px-3 py-1 text-center">
                            <div className="text-[#A855F7] text-sm font-bold">847</div>
                            <div className="text-muted-foreground text-xs">Projects Buried</div>
                          </div>
                          <div className="bg-background/85 backdrop-blur-sm border border-border rounded-lg px-3 py-1 text-center">
                            <div className="text-[#A855F7] text-sm font-bold">2,341</div>
                            <div className="text-muted-foreground text-xs">Snippets Salvaged</div>
                          </div>
                          <div className="bg-background/85 backdrop-blur-sm border border-border rounded-lg px-3 py-1 text-center">
                            <div className="text-[#A855F7] text-sm font-bold">156</div>
                            <div className="text-muted-foreground text-xs">Projects Adopted</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-80 rounded-lg bg-gradient-to-br from-card to-background border border-border flex items-center justify-center overflow-hidden hover:border-[#00D4FF] transition-all">
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-6xl opacity-20">
                            📁
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Other Projects Grid */}
        {otherProjects.length > 0 && (
          <div className="pt-12 border-t border-border">
            <ScrollReveal direction="up">
              <h3 className="text-2xl font-bold text-foreground mb-8">Additional Projects</h3>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1} delayChildren={0.15}>
              {otherProjects.map((project) => (
                <StaggerItem key={project.id} direction="scale">
                  <Tilt
                    className="h-full"
                    tiltMaxAngleX={8}
                    tiltMaxAngleY={8}
                    scale={1.03}
                  >
                    <article
                      onClick={() => handleOpenModal(project)}
                      className="h-full p-6 rounded-xl bg-card border border-border hover:border-[#00D4FF] transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-sm hover:shadow-lg hover:shadow-cyan-500/10"
                    >
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.badges.map((badge) => (
                            <span
                              key={badge}
                              className="px-2 py-1 rounded text-xs font-medium bg-background border border-border text-[#00D4FF]"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                        <h4 className="text-lg font-bold text-foreground group-hover:text-[#00D4FF] transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div className="pt-6 space-y-4">
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
                          {project.techStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 rounded text-xs font-mono bg-background border border-border text-[#00D4FF]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs font-semibold text-[#00D4FF]">
                          <span className="flex items-center gap-1 group-hover:underline">
                            <Info size={14} /> View Details
                          </span>
                          {project.github && (
                            <span className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                              <Github size={14} /> GitHub
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </Tilt>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}
      </div>

      {/* Interactive Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
