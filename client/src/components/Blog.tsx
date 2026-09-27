import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, Tag, ArrowRight, X, Sparkles } from "lucide-react";
import { BLOG_POSTS, type BlogPost } from "@/data/blogPosts";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = ["All", "AI/ML", "System Architecture", "Engineering"];

  const filteredPosts =
    filterCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === filterCategory);

  return (
    <section id="blog" aria-labelledby="blog-heading" className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal direction="up" delay={0}>
          <div className="flex flex-col items-center mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <Sparkles size={14} />
              <span>Technical Notes &amp; Engineering Articles</span>
            </div>
            <h2 id="blog-heading" className="section-heading">
              Engineering Insights
            </h2>
            <p className="text-muted-foreground max-w-2xl text-sm sm:text-base mt-2">
              Deep dives into AI systems, full-stack architecture, and building production-grade software.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border ${
                filterCategory === category
                  ? "bg-[#2E75B6] text-white border-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                  : "bg-card/60 text-muted-foreground border-border hover:text-foreground hover:border-[#00D4FF]/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Post Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <StaggerItem key={post.id}>
              <div
                onClick={() => setSelectedPost(post)}
                className="group relative flex flex-col justify-between h-full p-6 rounded-2xl bg-card border border-border hover:border-cyan-500/50 transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(0,212,255,0.12)] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-secondary/20 text-cyan-400 font-mono text-[11px] border border-cyan-500/20">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-cyan-400 transition-colors duration-200 mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded bg-muted/60 text-muted-foreground font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                    <span>Read Full Note</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-2xl text-foreground"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                aria-label="Close article modal"
                className="absolute top-5 right-5 p-2 rounded-full bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-400 font-mono">
                  {selectedPost.category}
                </span>
                <span>•</span>
                <span>{selectedPost.publishedAt}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {selectedPost.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                {selectedPost.title}
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground border-l-2 border-cyan-400 pl-4 py-1 mb-6 italic">
                {selectedPost.summary}
              </p>

              <div className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed text-foreground/90 space-y-4">
                {selectedPost.content.split("\n\n").map((block, idx) => {
                  const trimmed = block.trim();
                  if (!trimmed) return null;

                  if (trimmed.startsWith("### ")) {
                    return (
                      <h4 key={idx} className="text-lg font-bold text-cyan-300 mt-6 mb-2">
                        {trimmed.replace("### ", "")}
                      </h4>
                    );
                  }

                  if (trimmed.startsWith("```")) {
                    const cleanCode = trimmed.replace(/```[a-z]*/g, "").trim();
                    return (
                      <pre
                        key={idx}
                        className="p-4 rounded-xl bg-muted/50 border border-border font-mono text-xs overflow-x-auto text-cyan-300 my-4"
                      >
                        <code>{cleanCode}</code>
                      </pre>
                    );
                  }

                  if (trimmed.startsWith("* ") || trimmed.startsWith("1. ")) {
                    return (
                      <div key={idx} className="pl-4 border-l border-border/60 my-2 text-muted-foreground space-y-2">
                        {trimmed.split("\n").map((line, lIdx) => (
                          <p key={lIdx} className="text-sm">
                            {line.replace(/^(\*|\d+\.)\s*/, "• ")}
                          </p>
                        ))}
                      </div>
                    );
                  }

                  return (
                    <p key={idx} className="text-muted-foreground text-sm sm:text-base">
                      {trimmed}
                    </p>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded bg-muted text-muted-foreground font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2 text-xs font-semibold rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
                >
                  Close Note
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Blog;
