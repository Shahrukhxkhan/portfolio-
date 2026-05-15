export interface Project {
  id: string;
  title: string;
  description: string;
  badges: string[];
  techStack: string[];
  highlight?: string;
  featured?: boolean;
  github?: string;
  links?: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    id: "skillloom",
    title: "SkillLoom — AI-Powered Textile Workforce Platform",
    description:
      "AI-driven hiring platform for Pakistan's informal textile sector. Cosine similarity job matching, InsightFace biometric verification, KDE demand heatmaps, dual interfaces for workers and employers.",
    badges: ["Final Year Project", "AI", "Full-Stack"],
    techStack: [
      "Python",
      "FastAPI",
      "Flutter",
      "React.js",
      "Supabase",
      "Docker",
      "InsightFace",
    ],
    highlight: "15M+ Potential Users",
    featured: true,
    github: "https://github.com/shahrukh032003",
  },
  {
    id: "pmnh-museum",
    title: "Pakistan Museum of Natural History — QR Guide App",
    description:
      "Commissioned mobile guide app. QR-based exhibit scanning, session management, admin portal for museum staff, WiFi-gated access control.",
    badges: ["Client Project", "Mobile", "Backend"],
    techStack: ["Python", "FastAPI", "Flutter", "Supabase", "PostgreSQL"],
    highlight: "Real Client · Production System",
    featured: true,
    github: "https://github.com/shahrukh032003",
  },
  {
    id: "bone-fracture",
    title: "AI-Powered Bone Fracture Detection System",
    description:
      "Medical imaging system to detect and classify bone fracture severity from X-ray images using computer vision and ML algorithms.",
    badges: ["AI", "Computer Vision", "Healthcare"],
    techStack: [
      "Python",
      "Computer Vision",
      "Machine Learning",
      "Image Processing",
    ],
    featured: true,
    github: "https://github.com/shahrukh032003",
  },
  {
    id: "library-management",
    title: "Library Management System",
    description: "Full-stack library management with user authentication and book tracking.",
    badges: ["Full-Stack"],
    techStack: ["Python", "FastAPI", "React.js", "PostgreSQL"],
    github: "https://github.com/shahrukh032003",
  },
  {
    id: "movie-booking",
    title: "Movie Ticket Booking System",
    description: "Online movie ticket reservation platform with seat selection and payment integration.",
    badges: ["Full-Stack"],
    techStack: ["Python", "FastAPI", "React.js", "MongoDB"],
    github: "https://github.com/shahrukh032003",
  },
  {
    id: "university-management",
    title: "University Management System",
    description: "Comprehensive system for managing student records, courses, and grades.",
    badges: ["Full-Stack"],
    techStack: ["Python", "FastAPI", "React.js", "SQL Server"],
    github: "https://github.com/shahrukh032003",
  },
  {
    id: "fitness-follies",
    title: "Fitness Follies",
    description: "Mobile fitness tracking application with workout logging and progress monitoring.",
    badges: ["Mobile"],
    techStack: ["Flutter", "Firebase"],
    github: "https://github.com/shahrukh032003",
  },
  {
    id: "digital-watch",
    title: "Digital Watch",
    description: "Python-based digital watch application with multiple time zones.",
    badges: ["Python"],
    techStack: ["Python"],
    github: "https://github.com/shahrukh032003",
  },
  {
    id: "mcq-game",
    title: "MCQ Game",
    description: "Interactive multiple-choice question game with scoring system.",
    badges: ["Python"],
    techStack: ["Python"],
    github: "https://github.com/shahrukh032003",
  },
  {
    id: "calculator",
    title: "Calculator",
    description: "Advanced calculator with support for complex mathematical operations.",
    badges: ["Python"],
    techStack: ["Python"],
    github: "https://github.com/shahrukh032003",
  },
];
