import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import NeuralNetwork from "@/components/NeuralNetwork";

export default function Home() {
  return (
    <div style={{ position: 'relative', backgroundColor: '#0A0F1E', minHeight: '100vh' }}>
      {/* Neural Network particle background */}
      <NeuralNetwork />

      <div className="relative text-foreground overflow-hidden">
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main id="main-content" className="relative z-10">
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Skills Section */}
          <Skills />

          {/* Projects Section */}
          <Projects />

          {/* Experience Section */}
          <Experience />

          {/* Certifications Section */}
          <Certifications />

          {/* Contact Section */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
