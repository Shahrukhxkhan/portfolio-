import ScrollReveal from './ScrollReveal';

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative pt-16 md:pt-24 pb-10 md:pb-12 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <ScrollReveal direction="up" delay={0}>
          <h2 id="about-heading" className="section-heading text-center">
            About Me
          </h2>
        </ScrollReveal>

        {/* Text Content - Center Aligned */}
        <div className="space-y-6 max-w-3xl mx-auto text-center mt-6">
          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I'm a Computer Science student at COMSATS University Islamabad, Wah Campus, graduating in 2027. I specialize in building AI-powered full-stack applications that bridge the gap between intelligent systems and real-world usability.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-muted-foreground text-lg leading-relaxed">
              My flagship project, SkillLoom, is an AI-driven hiring platform for Pakistan's informal textile workforce — combining biometric verification, smart job matching, and demand heatmaps to connect 15M+ workers with opportunities.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I've completed 4 internships across AI/ML Engineering, Python development, and DevOps — including at Pakistan Ordnance Factories (POF), and earning a Best Performance Award at DevelopersHub Corporation. I'm passionate about technology that creates genuine social impact.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
