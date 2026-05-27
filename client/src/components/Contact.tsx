import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Mail, MapPin, Github, Linkedin, Send, Check } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export function Contact() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
            Get In Touch
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="section-subheading"
          >
            I'm open to internships, collaborations, and full-time opportunities.
            Let's build something impactful together.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              {/* Email */}
              <div
                className="flex gap-4 cursor-pointer group"
                onClick={() => copyToClipboard("shahrukh032003@gmail.com")}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2E75B6] to-[#00D4FF] flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[#8892A4] text-sm mb-1">Email</p>
                  <p className="text-white font-medium group-hover:text-[#00D4FF] transition-colors">
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
                  <p className="text-[#8892A4] text-sm mb-1">Location</p>
                  <p className="text-white font-medium">Wah Cantt, Pakistan</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-[#1E3A5F]">
                <p className="text-[#8892A4] text-sm mb-4">Connect with me</p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/shahrukh032003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-[#111827] border border-[#1E3A5F] flex items-center justify-center text-[#00D4FF] hover:border-[#00D4FF] hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/shahrukhxkhan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg bg-[#111827] border border-[#1E3A5F] flex items-center justify-center text-[#00D4FF] hover:border-[#00D4FF] hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name */}
              <div>
                <label className="block text-[#F0F4FF] text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-[#1E3A5F] text-white placeholder-[#8892A4] focus:border-[#00D4FF] focus:outline-none transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[#F0F4FF] text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-[#1E3A5F] text-white placeholder-[#8892A4] focus:border-[#00D4FF] focus:outline-none transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[#F0F4FF] text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-[#1E3A5F] text-white placeholder-[#8892A4] focus:border-[#00D4FF] focus:outline-none transition-all duration-300"
                  placeholder="Subject"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[#F0F4FF] text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-[#1E3A5F] text-white placeholder-[#8892A4] focus:border-[#00D4FF] focus:outline-none transition-all duration-300 resize-none"
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
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
