import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-[#2E75B6] to-[#00D4FF] bg-clip-text text-transparent">
              MSK
            </div>
            <p className="text-muted-foreground text-sm">
              Building intelligent systems that solve real-world problems.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-foreground font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-[#00D4FF] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#00D4FF] transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#00D4FF] transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#00D4FF] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-foreground font-semibold">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/Shahrukhxkhan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-[#00D4FF] hover:border-[#00D4FF] hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/shahrukhxkhan/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-[#00D4FF] hover:border-[#00D4FF] hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:shahrukh032003@gmail.com"
                className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-[#00D4FF] hover:border-[#00D4FF] hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
              >
                <Mail size={18} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} Muhammad Shahrukh Khan. All rights reserved.
            </p>
            <p>
              Crafted with <span className="text-[#00D4FF]">✨</span> using React, Three.js & Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
