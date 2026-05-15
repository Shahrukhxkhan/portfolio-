import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", to: "about" },
    { label: "Skills", to: "skills" },
    { label: "Projects", to: "projects" },
    { label: "Experience", to: "experience" },
    { label: "Certifications", to: "certifications" },
    { label: "Contact", to: "contact" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0F1E]/80 backdrop-blur-md border-b border-[#1E3A5F]"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-[#2E75B6] to-[#00D4FF] bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            MSK
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                className="text-[#8892A4] hover:text-[#00D4FF] transition-colors cursor-pointer text-sm font-medium relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2E75B6] to-[#00D4FF] group-hover:w-full transition-all duration-300" />
              </ScrollLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#00D4FF] hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            className="md:hidden bg-[#111827]/95 backdrop-blur-md border-t border-[#1E3A5F]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  className="block text-[#8892A4] hover:text-[#00D4FF] transition-colors cursor-pointer text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </ScrollLink>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
