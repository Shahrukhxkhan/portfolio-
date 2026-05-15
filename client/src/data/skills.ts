export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "JavaScript", "C++", "SQL", "Assembly"],
  },
  {
    category: "Frameworks & Tools",
    skills: [
      "FastAPI",
      "Flutter",
      "React.js",
      "Docker",
      "Git",
      "Supabase",
    ],
  },
  {
    category: "AI / ML",
    skills: [
      "InsightFace",
      "Scikit-learn",
      "Computer Vision",
      "Generative AI",
    ],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MongoDB", "SQL Server"],
  },
  {
    category: "Specializations",
    skills: [
      "REST APIs",
      "Backend Architecture",
      "Mobile Dev",
      "AI Integration",
    ],
  },
];

export interface SkillProficiency {
  name: string;
  level: number; // 0-100
}

export const topSkills: SkillProficiency[] = [
  { name: "Python", level: 95 },
  { name: "FastAPI", level: 90 },
  { name: "React.js", level: 85 },
  { name: "Machine Learning", level: 88 },
  { name: "Flutter", level: 82 },
  { name: "PostgreSQL", level: 85 },
];
