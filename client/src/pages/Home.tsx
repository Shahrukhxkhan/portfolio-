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
import { ParticleField } from "@/components/three/ParticleField";

export default function Home() {
  return (
    <div className="relative bg-[#0A0F1E] text-white overflow-hidden">
      {/* 3D Particle Background */}
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
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

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
