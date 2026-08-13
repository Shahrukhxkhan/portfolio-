export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  badge?: string;
  badgeType?: "gold" | "green" | string;
  description: string[];
  order: number;
}

export const experiences: Experience[] = [
  {
    id: "pof",
    role: "AI/ML & DevOps Intern",
    company: "Pakistan Ordnance Factories (POF)",
    duration: "July 2026 – Present",
    badge: "Currently Active",
    badgeType: "green",
    description: [
      "Applying AI/ML and DevOps practices in a government defense sector environment",
      "Working on intelligent systems and automation pipelines at one of Pakistan's largest manufacturing organizations",
      "Gaining experience in enterprise-scale infrastructure and deployment workflows",
    ],
    order: 1,
  },
  {
    id: "developershub",
    role: "AI & ML Engineering Intern",
    company: "DevelopersHub Corporation",
    duration: "June 2025 – July 2025",
    badge: "Best Performance Award",
    badgeType: "gold",
    description: [
      "Awarded Best Performance recognition for outstanding contributions",
      "Developed ML solutions and AI applications using Python",
      "Demonstrated rapid adaptation to emerging AI technologies",
    ],
    order: 2,
  },
  {
    id: "cosmicode",
    role: "Python Programming Intern",
    company: "Cosmicode Technologies",
    duration: "July 2025 – October 2025",
    description: [
      "Completed 4-month internship with professional conduct",
      "Built Python applications and contributed to backend projects",
      "Collaborated on software solutions and code optimization",
    ],
    order: 3,
  },
  {
    id: "codealpha",
    role: "Python Programming Intern",
    company: "CodeAlpha",
    duration: "June 2025",
    badge: "Letter of Recommendation",
    badgeType: "gold",
    description: [
      "Received Letter of Recommendation for excellent analytical skills",
      "Quickly adapted to emerging technologies with high productivity",
      "Strong team collaboration and mentorship contributions",
    ],
    order: 4,
  },
];
