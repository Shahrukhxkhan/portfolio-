export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  badges: string[];
  techStack: string[];
  highlight?: string;
  featured?: boolean;
  github?: string;
  image?: string;
  features?: string[];
  architecture?: { category: string; items: string[] }[];
  impact?: string[];
  links?: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    id: "skillloom",
    title: "SkillLoom — AI-Powered Textile Workforce Platform",
    description:
      "AI-driven hiring platform for Pakistan's informal textile sector. Cosine similarity job matching, InsightFace biometric verification, KDE demand heatmaps, dual interfaces for workers and employers.",
    longDescription:
      "SkillLoom is a comprehensive AI-driven ecosystem designed to bridge the gap between 15M+ informal textile workers and employers across Pakistan. By combining high-accuracy facial biometric verification, cosine-similarity skill matching, and real-time Kernel Density Estimation (KDE) geographical demand heatmaps, SkillLoom enables quick, transparent, and trusted employment matchmaking.",
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
    github: "https://github.com/Shahrukhxkhan/SKILLLOOM-REVIEW-",
    image: "/images/skillloom.png",
    features: [
      "Biometric Worker Authentication using InsightFace facial embeddings",
      "Smart Skill Matching with Cosine Similarity vector scoring",
      "Kernel Density Estimation (KDE) geographical heatmaps for workforce demand",
      "Dual Mobile & Web portals tailored for illiterate workers and enterprise hiring managers",
      "Real-time contract & payment telemetry backed by Supabase & Dockerized microservices",
    ],
    architecture: [
      { category: "Frontend", items: ["React.js", "Flutter", "Tailwind CSS", "Recharts"] },
      { category: "AI & ML", items: ["InsightFace (Biometrics)", "SciPy / NumPy (KDE)", "Vector Cosine Matching"] },
      { category: "Backend & Infra", items: ["FastAPI", "Supabase PostgreSQL", "Docker Containers"] },
    ],
    impact: [
      "Architected for 15M+ informal textile industry workers in Pakistan",
      "Reduced hiring verification time from days to under 10 seconds via biometric AI",
      "Selected as flagship Final Year Project at COMSATS University Islamabad",
    ],
  },
  {
    id: "pmnh-museum",
    title: "Pakistan Museum of Natural History — QR Guide App",
    description:
      "Commissioned mobile guide app. QR-based exhibit scanning, session management, admin portal for museum staff, WiFi-gated access control.",
    longDescription:
      "A production client solution built for the Pakistan Museum of Natural History (PMNH). Visitors scan exhibit QR codes to access interactive audio guides, rich botanical and geological taxonomy, and multilingual media. Includes an enterprise admin portal for real-time visitor flow tracking, QR code generation, and exhibit telemetry.",
    badges: ["Client Project", "Mobile", "Backend"],
    techStack: ["Python", "FastAPI", "Flutter", "Supabase", "PostgreSQL"],
    highlight: "Real Client · Production System",
    featured: true,
    github: "https://github.com/Shahrukhxkhan/PMNH-QR",
    image: "/images/pmnh-dashboard.png",
    features: [
      "Instant QR Code Exhibit Scanner with low-latency media delivery",
      "WiFi-Gated Session Access & captive portal integration",
      "Comprehensive Admin Control Panel for museum curators",
      "Visitor Flow Analytics & peak hour heatmaps",
      "Offline caching for uninterrupted gallery exploration",
    ],
    architecture: [
      { category: "Mobile App", items: ["Flutter (iOS & Android)", "QR Scanner Engine"] },
      { category: "Backend API", items: ["FastAPI", "Python", "JWT Auth"] },
      { category: "Database & Analytics", items: ["Supabase PostgreSQL", "Realtime WebSockets"] },
    ],
    impact: [
      "Deployed live for thousands of museum visitors at PMNH Islamabad",
      "Digitized over 100+ natural history exhibits with instant QR guides",
    ],
  },
  {
    id: "code-graveyard",
    title: "Code Graveyard",
    description:
      "A curated collection of web projects, experiments, and development explorations built while learning React, TypeScript, and modern frontend tooling.",
    longDescription:
      "Code Graveyard is a developer post-mortem platform and code archive showcasing prototype experiments, architectural iterations, and open-source utility code. It provides insights into failed prototypes, resurrected snippets, and technical lessons learned throughout continuous development.",
    badges: ["Archive", "Web", "Showcase"],
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
    ],
    featured: true,
    github: "https://github.com/Shahrukhxkhan/Code-Graveyard",
    image: "/images/code-graveyard.png",
    features: [
      "Interactive Project Graveyard with post-mortem breakdowns",
      "Snippet Salvage Engine for re-usable open-source utilities",
      "Developer Adoption Portal for unmaintained open-source concepts",
      "Ultra-fast client-side filtering and full-text search",
    ],
    architecture: [
      { category: "Frontend Framework", items: ["React 19", "TypeScript", "Vite"] },
      { category: "Styling & Animations", items: ["Tailwind CSS v4", "Framer Motion"] },
    ],
    impact: [
      "Hub for 800+ archived code prototypes and experiment logs",
    ],
  },
  {
    id: "ai-review-pro",
    title: "AI Review Pro",
    description:
      "Automated AI code and content audit platform with real-time scoring, diff comparison, Supabase storage, and PDF report generation.",
    longDescription:
      "AI Review Pro is an automated developer audit tool powered by Gemini 2.5 Flash API. Developers submit code files or full repositories for immediate static analysis, security vulnerability scanning, performance profiling, and line-by-line AI recommendations.",
    badges: ["AI / LLM", "Full-Stack", "Developer Tools"],
    techStack: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Gemini 2.5 Flash API",
      "Supabase",
      "Monaco Editor",
      "Recharts",
    ],
    highlight: "Real-World System",
    github: "https://github.com/Shahrukhxkhan/AI-Review-Pro",
    features: [
      "Monaco Code Editor integration with live syntax highlighting and AI annotations",
      "Real-time Code Scoring & Security Risk Radar Charts",
      "Gemini 2.5 Flash LLM integration for sub-second code audits",
      "Downloadable PDF Audit Reports & Supabase history tracking",
    ],
    architecture: [
      { category: "Frontend", items: ["React 19", "Monaco Editor", "Recharts", "Tailwind CSS"] },
      { category: "Backend & AI", items: ["Node.js Express", "Google Gemini 2.5 Flash API"] },
      { category: "Storage", items: ["Supabase PostgreSQL", "Blob Storage"] },
    ],
    impact: [
      "Accelerates pull-request and code review cycles by 4x using automated LLM prompts",
    ],
  },
  {
    id: "library-management",
    title: "Library Management System",
    description: "Full-stack library management with user authentication and book tracking.",
    longDescription: "Robust object-oriented desktop application built in C++ for tracking book inventories, patron borrowing schedules, fine calculations, and persistent file storage.",
    badges: ["C++"],
    techStack: ["C++", "OOP", "File Handling"],
    github: "https://github.com/Shahrukhxkhan",
    features: [
      "Object-Oriented Architecture with encapsulated patron and inventory models",
      "Persistent Binary & Text File Storage for catalog records",
      "Automated Overdue Fine Calculation Engine",
    ],
  },
  {
    id: "movie-booking",
    title: "Movie Ticket Booking System",
    description: "Online movie ticket reservation platform with seat selection and payment integration.",
    longDescription: "High-performance terminal and CLI application simulating multi-screen cinema ticket booking, seat matrix selection, price calculations, and receipt generation.",
    badges: ["C++"],
    techStack: ["C++", "OOP", "Data Structures"],
    github: "https://github.com/Shahrukhxkhan",
    features: [
      "Real-Time Seat Matrix Mapping (Available, Reserved, Selected)",
      "Dynamic Pricing by screening time and tier",
      "Receipt generation & transaction summary",
    ],
  },
  {
    id: "university-management",
    title: "University Management System",
    description: "Comprehensive system for managing student records, courses, and grades.",
    longDescription: "Normalized relational database design and SSMS management interface handling multi-department student enrollment, prerequisite checks, GPA calculation, and faculty assignments.",
    badges: ["SQL"],
    techStack: ["SQL", "SQL Server", "Database Design", "SSMS"],
    github: "https://github.com/Shahrukhxkhan",
    features: [
      "Fully normalized 3NF relational schema across 12+ tables",
      "Stored procedures and triggers for GPA calculation and prerequisite validation",
      "Index-optimized query performance for rapid record lookups",
    ],
  },
  {
    id: "fitness-follies",
    title: "Fitness Follies",
    description: "Mobile fitness tracking application with workout logging and progress monitoring.",
    longDescription: "C++ CLI fitness monitoring system tracking daily calorie expenditure, workout routines, strength progression, and target goal milestones.",
    badges: ["C++"],
    techStack: ["C++", "OOP", "File Handling"],
    github: "https://github.com/Shahrukhxkhan",
    features: [
      "Custom Workout & Macro-Nutrient Logging",
      "Weekly Progress Metrics Calculation",
      "File-based data persistence across app sessions",
    ],
  },
  {
    id: "digital-watch",
    title: "Digital Watch",
    description: "Python-based digital watch application with multiple time zones.",
    longDescription: "Python application leveraging timezone APIs to display synchronized digital clocks, alarm alerts, and time conversion across global cities.",
    badges: ["Python"],
    techStack: ["Python", "APIs", "Timezone"],
    github: "https://github.com/Shahrukhxkhan",
    features: [
      "Multi-city World Clock display",
      "Custom alarm timers with audio triggers",
    ],
  },
  {
    id: "mcq-game",
    title: "MCQ Game",
    description: "Interactive multiple-choice question game with scoring system.",
    longDescription: "Python-driven interactive quiz game featuring timed questions, difficulty progression, streak bonuses, and high score leaderboards.",
    badges: ["Python"],
    techStack: ["Python", "CLI", "Game Logic"],
    github: "https://github.com/Shahrukhxkhan",
    features: [
      "Dynamic Question Loader from JSON/CSV datasets",
      "Score & Streak tracking logic",
    ],
  },
  {
    id: "calculator",
    title: "Calculator",
    description: "Advanced calculator with support for complex mathematical operations.",
    longDescription: "Python utility for evaluating algebraic expressions, trigonometric functions, memory storage, and error handling for invalid operations.",
    badges: ["Python"],
    techStack: ["Python"],
    github: "https://github.com/Shahrukhxkhan",
    features: [
      "Mathematical expression parser",
      "Memory store (MS, MR, MC) support",
    ],
  },
];

