export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: number;
  badge?: string;
  badgeType?: "gold" | "green" | string;
  icon?: string;
}

export const certifications: Certification[] = [
  {
    id: "pof-internship",
    name: "AI/ML & DevOps Internship",
    issuer: "Pakistan Ordnance Factories (POF)",
    year: 2026,
    badge: "🟢 Currently Active",
    badgeType: "green",
  },
  {
    id: "generative-ai",
    name: "Generative AI Boot Camp",
    issuer: "Tech Academy",
    year: 2024,
  },
  {
    id: "python-fundamentals",
    name: "Python Fundamentals",
    issuer: "Coursera",
    year: 2024,
  },
  {
    id: "database-fundamentals",
    name: "Database Fundamentals (SQL, MongoDB)",
    issuer: "Udemy",
    year: 2024,
  },
  {
    id: "ai-ml-internship",
    name: "AI & ML Engineering Internship",
    issuer: "DevelopersHub Corporation",
    year: 2025,
  },
  {
    id: "python-internship-cosmicode",
    name: "Python Programming Internship",
    issuer: "Cosmicode Technologies",
    year: 2025,
  },
  {
    id: "python-internship-codealpha",
    name: "Python Programming Internship",
    issuer: "CodeAlpha",
    year: 2025,
  },
];
