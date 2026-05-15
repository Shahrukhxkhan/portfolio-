export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  badge?: string;
  description: string[];
  order: number;
}

export const experiences: Experience[] = [
  {
    id: "developershub",
    role: "AI & ML Engineering Intern",
    company: "DevelopersHub Corporation",
    duration: "June 2025 – July 2025",
    badge: "🏆 Best Performance Award",
    description: [
      "Awarded Best Performance recognition for outstanding contributions",
      "Developed ML solutions and AI applications using Python",
      "Demonstrated rapid adaptation to emerging AI technologies",
    ],
    order: 1,
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
    order: 2,
  },
  {
    id: "codealpha",
    role: "Python Programming Intern",
    company: "CodeAlpha",
    duration: "June 2025",
    badge: "📄 Letter of Recommendation",
    description: [
      "Received Letter of Recommendation for excellent analytical skills",
      "Quickly adapted to emerging technologies with high productivity",
      "Strong team collaboration and mentorship contributions",
    ],
    order: 3,
  },
];
