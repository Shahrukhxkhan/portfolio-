import ReactGA from 'react-ga4';
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Github, Linkedin, Send, Check } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import ScrollReveal from './ScrollReveal';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          title: formData.subject,
          message: formData.message,
          email: formData.email,
        },
        PUBLIC_KEY
      );

      ReactGA.event({
        category: 'Contact',
        action: 'Form Submit',
        label: 'Send Message'
      });

      setIsSuccess(true);
      toast.success("Message sent! I'll get back to you soon.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative pt-10 md:pt-12 pb-20 md:pb-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal direction="up" delay={0}>
          <h2 id="contact-heading" className="section-heading">
            Get In Touch
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15}>
          <p className="section-subheading">
            I'm open to internships, collaborations, and full-time opportunities.
            Let's build something impactful together.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="space-y-8">
              {/* Email */}
              <div
                className="flex gap-4 cursor-pointer group"
                onClick={() => copyToClipboard("shahrukh032003@gmail.com")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && copyToClipboard("shahrukh032003@gmail.com")}
                aria-label="Copy email address shahrukh032003@gmail.com to clipboard"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2E75B6] to-[#00D4FF] flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Email</p>
                  <p className="text-foreground font-medium group-hover:text-[#00D4FF] transition-colors">
                    shahrukh032003@gmail.com
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2E75B6] to-[#00D4FF] flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Location</p>
                  <p className="text-foreground font-medium">Wah Cantt, Pakistan</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-border">
                <p className="text-muted-foreground text-sm mb-4">Connect with me</p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/Shahrukhxkhan"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Muhammad Shahrukh Khan on GitHub"
                    className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center text-[#00D4FF] hover:border-[#00D4FF] hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/shahrukhxkhan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Muhammad Shahrukh Khan on LinkedIn"
                    className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center text-[#00D4FF] hover:border-[#00D4FF] hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right" delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-foreground text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:border-[#00D4FF] focus:outline-none transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-foreground text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:border-[#00D4FF] focus:outline-none transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-foreground text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:border-[#00D4FF] focus:outline-none transition-all duration-300"
                  placeholder="Subject"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-foreground text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:border-[#00D4FF] focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Your message..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#2E75B6] to-[#00D4FF] text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSuccess ? (
                  <>
                    <Check size={20} />
                    Message Sent!
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
