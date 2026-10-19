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
    id: "warplab",
    title: "WarpLab — AI Vehicle Wrap Visualizer",
    description:
      "Automotive concept studio for visualizing custom vehicle wraps and exterior styling on user vehicle photos with AI generation and split-screen comparison.",
    longDescription:
      "WarpLab (Vanta Auto Studio) is an AI-driven automotive visualization web application. Car enthusiasts and wrap shops upload their own vehicle photos, choose from curated vinyl finishes (gloss, satin, matte, metallic, color-shift), and receive photorealistic AI concept previews. Built with an interactive before/after split slider, browser-side image processing, and persistent local build storage via IndexedDB.",
    badges: ["AI / Vision", "Full-Stack", "Automotive"],
    techStack: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Express",
      "tRPC",
      "Drizzle ORM",
      "IndexedDB",
    ],
    highlight: "AI Automotive Studio",
    github: "https://github.com/Shahrukhxkhan/warplab",
    features: [
      "Browser-Side Image Optimization with aspect-ratio preservation and client-side resizing",
      "Interactive Split-Screen Slider for real-time before/after wrap comparison",
      "Curated Finish Engine: Gloss, Matte, Satin, Metallic, and Carbon-Fiber textures",
      "Local Garage Archiving: Client-side persistent build history stored in IndexedDB",
      "Server-side validation for image signatures, MIME types, and secure generation pipelines",
    ],
    architecture: [
      { category: "Frontend", items: ["React 19", "TypeScript", "Tailwind CSS", "IndexedDB"] },
      { category: "Backend & API", items: ["Express 4", "tRPC 11", "Zod Validation"] },
      { category: "Database & Storage", items: ["Drizzle ORM", "MySQL / TiDB", "Object Storage"] },
    ],
    impact: [
      "Eliminates guesswork for vehicle customizers before thousands of dollars in physical vinyl installation",
      "Instant client-side rendering with sub-3-second AI concept turnaround",
    ],
  },
  {
    id: "contextforge",
    title: "ContextForge — Agentic RAG System",
    description:
      "Multi-stage agentic RAG pipeline with multi-format document ingestion, local Qdrant vector storage, FastEmbed re-ranking, and dynamic web search fallback.",
    longDescription:
      "ContextForge is an institutional-grade, multi-stage Retrieval-Augmented Generation system powered by CrewAI, Qdrant, and MarkItDown. It orchestrates a specialized agent team: an intent Router, a precision Retriever with FastEmbed cross-encoder re-ranking, a citation-backed Synthesizer, and an automated Hallucination Grader. It supports multi-format document parsing and automated web fallback via Serper and FireCrawl.",
    badges: ["AI / RAG", "Multi-Agent", "LLMs"],
    techStack: [
      "Python",
      "CrewAI",
      "Qdrant",
      "FastEmbed",
      "Streamlit",
      "MarkItDown",
      "Ollama",
    ],
    highlight: "Grounded Agentic RAG",
    github: "https://github.com/Shahrukhxkhan/ContextForge",
    features: [
      "Agentic Multi-Stage Pipeline: Router → Precision Retriever → Synthesizer → Hallucination Grader",
      "Multi-Format Document Ingestion: Parses PDF, DOCX, PPTX, XLSX, HTML, and Markdown via MarkItDown",
      "Persistent Local Vector Search: Embedded Qdrant disk storage eliminating cold-start re-indexing",
      "Cross-Encoder Re-Ranking: Passage re-scoring with ms-marco-MiniLM-L-6-v2 for semantic precision",
      "Autonomous Web Fallback: Dynamic real-time web retrieval via Serper and FireCrawl on knowledge gaps",
      "Dual Inference Support: Cloud models (OpenAI) and 100% private local models via Ollama (DeepSeek-R1, Llama 3.2)",
    ],
    architecture: [
      { category: "Agent Orchestration", items: ["CrewAI Flow", "Intent Router", "Hallucination Grader"] },
      { category: "Vector & Embeddings", items: ["Qdrant Vector DB", "FastEmbed", "Chonkie Chunking"] },
      { category: "UI & Retrieval", items: ["Streamlit UI", "MarkItDown", "Serper / FireCrawl APIs"] },
    ],
    impact: [
      "Virtually eliminates hallucinated responses through multi-agent groundedness verification",
      "Unifies offline enterprise document archives with live web-scale information retrieval",
    ],
  },
  {
    id: "crm",
    title: "SoloFlowCRM — Owner-Scoped CRM Platform",
    description:
      "Secure, owner-scoped customer relationship management platform for contacts, sales pipelines, deals, recurring tasks, quotes, and auditable CSV workflows.",
    longDescription:
      "SoloFlowCRM is an owner-scoped customer relationship management and sales operations platform. It features 360° contact and company relationship management with normalized duplicate detection, visual multi-stage sales pipelines with weighted forecasting, commercial quotes with frozen-snapshot pricing, auditable CSV import/export engines with rollback, and role-aware collaboration controls.",
    badges: ["Full-Stack", "SaaS / CRM", "Enterprise"],
    techStack: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Express",
      "tRPC",
      "Drizzle ORM",
      "MySQL",
    ],
    highlight: "Full-Lifecycle CRM",
    github: "https://github.com/Shahrukhxkhan/CRM",
    features: [
      "Contact 360° Hub: Normalized email duplicate detection, merging, custom fields, and file attachments",
      "Dynamic Sales Pipelines: Visual stage transitions, weighted revenue forecasting, and activity tracking",
      "Commercial Quotes & Price Books: Product catalogs, custom discount calculations, and snapshot pricing",
      "Auditable CSV Import Engine: Schema mapping profiles, data transforms, and instant rollback undo",
      "Task & Coordination System: Recurring tasks, reminders, direct assignee access controls, and saved views",
    ],
    architecture: [
      { category: "Frontend", items: ["React 19", "TypeScript", "Tailwind CSS v4", "Radix UI", "Wouter"] },
      { category: "Backend API", items: ["Express 4", "tRPC 11", "Zod Schema Validation", "TypeScript"] },
      { category: "Storage & Data", items: ["Drizzle ORM", "MySQL / TiDB", "S3-Compatible Object Storage"] },
    ],
    impact: [
      "Streamlines multi-stage sales pipelines and eliminates lost leads through automated recurring tasks",
      "Enforces multi-tenant data privacy through strict owner-scoped contextual middleware",
    ],
  },
  {
    id: "stock-portfolio-agent",
    title: "Stock Portfolio Analysis Agent",
    description:
      "Institutional-grade, multi-agent AI financial intelligence platform for quantitative risk modeling, DCA backtesting, Markowitz portfolio optimization, and real-time streaming market analytics.",
    longDescription:
      "An institutional-grade, multi-agent AI financial intelligence and quantitative portfolio management platform. Powered by CrewAI, FastAPI, Next.js 15, and CopilotKit's AG-UI Protocol, users submit natural language investment queries and watch the agent stream step-by-step financial reasoning live. Features Monte Carlo Markowitz Modern Portfolio Theory, Black-Litterman asset allocation, historical crisis stress testing, Black-Scholes options hedging (Greeks), and interactive TradingView candlestick charts.",
    badges: ["AI / FinTech", "Multi-Agent", "Quantitative"],
    techStack: [
      "React 19",
      "Next.js 15",
      "FastAPI",
      "Python",
      "CrewAI",
      "CopilotKit",
      "TradingView",
    ],
    highlight: "Institutional FinTech AI",
    github: "https://github.com/Shahrukhxkhan/stock-portfolio-analysis-agent",
    features: [
      "Real-Time AG-UI Streaming: Step-by-step agent thought streaming and live tool execution via Server-Sent Events",
      "Markowitz Modern Portfolio Theory: Monte Carlo Efficient Frontier, Max Sharpe tangency, and Capital Allocation Line",
      "Black-Litterman Allocation: Blends CAPM equilibrium returns with AI conviction views and confidence matrices",
      "Historical Crisis Stress Testing: Simulates portfolios against 2008 GFC, 2020 COVID, and computes 95%/99% VaR/CVaR",
      "Black-Scholes Options Hedging: Real-time option Greeks (Δ, Γ, Θ, ν, ρ) and automated zero-cost protective collars",
      "Interactive TradingView Charts: Candlesticks with EMA 20/50/200, RSI, MACD, and drag-and-drop rebalancer canvas",
    ],
    architecture: [
      { category: "Agent Orchestration", items: ["CrewAI Flow", "CopilotKit AG-UI", "yfinance Market Feed"] },
      { category: "Quantitative Engine", items: ["NumPy / SciPy", "Markowitz Optimization", "Black-Scholes-Merton"] },
      { category: "Frontend & Visuals", items: ["React 19 / Next.js", "TradingView Lightweight", "Tailwind CSS v4"] },
    ],
    impact: [
      "Brings institutional hedge-fund risk modeling and stress testing to retail investors via conversational AI",
      "Zero-latency streaming workflow handling complex multi-asset allocations and backtests in real-time",
    ],
  },
];

