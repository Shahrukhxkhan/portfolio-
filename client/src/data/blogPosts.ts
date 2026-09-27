export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: "AI/ML" | "System Architecture" | "Engineering" | "Career";
  publishedAt: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "architecting-skillloom-ai-matching-engine",
    title: "Architecting SkillLoom: Scalable AI Matching for 50,000+ Industrial Profiles",
    summary: "How we leveraged FastAPI, vector embeddings, and an asynchronous pipeline to eliminate recruitment bottlenecks in the industrial manufacturing sector.",
    category: "AI/ML",
    publishedAt: "February 2026",
    readTime: "6 min read",
    tags: ["FastAPI", "Vector Search", "Python", "System Design"],
    content: `
### The Challenge

Matching technical skills in manufacturing requires more than keyword matching. Traditional ATS tools stumble on colloquial job titles, mismatched certification naming, and multi-skill workers. In Pakistan's textile and defense production sectors, candidate evaluations were manual, leading to multi-week hiring backlogs.

With **SkillLoom**, our objective was clear: parse resumes, standardize technical certifications across varying formats, and provide recruiters with a semantic similarity score under 350 milliseconds.

\`\`\`
[Candidate Profile] -> [Semantic Normalizer] -> [Vector Embedding]
                                                     |
                                            [Faiss / Vector Index]
                                                     |
[Recruiter Requirements] -> [Embedding] ----> [Cosine Similarity Ranker] -> [Top Candidate Matches]
\`\`\`

---

### Core Architecture Decisions

1. **FastAPI for Non-Blocking I/O**: We used asynchronous workers with Uvicorn to handle resume uploads, PDF text extraction, and vectorization without blocking the main event loop.
2. **Dense Vector Embeddings vs. Sparse BM25**: While traditional TF-IDF or BM25 captures exact acronyms, hybrid search allowed us to combine lexical match precision with dense contextual understanding.
3. **Caching Layer**: By caching frequent search vectors in Redis, query latency dropped from 1,200ms to under 180ms under high load.

---

### Key Takeaways

* **Graceful degradation** is critical when dealing with third-party ML inference APIs. Always maintain a local heuristic fallback.
* **Schema rigor** with Pydantic ensures corrupted document uploads fail safely before reaching the vector processing layer.
    `
  },
  {
    id: "2",
    slug: "realtime-web-performance-optimizing-threejs-portfolios",
    title: "Zero-Lag 3D on the Web: Optimizing Three.js for 60FPS on Low-Power Devices",
    summary: "Proven strategies for maintaining fluid frame rates with WebGL and Three.js canvas components across mobile and battery-saving modes.",
    category: "System Architecture",
    publishedAt: "January 2026",
    readTime: "5 min read",
    tags: ["Three.js", "WebGL", "Performance", "React"],
    content: `
### Why Most 3D Web Portfolios Drain Batteries

WebGL canvases frequently run infinite \`requestAnimationFrame\` loops even when:
- The user has scrolled past the section into another part of the page.
- The browser tab is inactive or in the background.
- The user is on a mobile device with constrained GPU fill-rate.

\`\`\`typescript
// The fix: Conditional frameloop based on IntersectionObserver
<Canvas
  frameloop={isElementInViewport ? "always" : "never"}
  dpr={isMobileOrLowPower ? [1, 1.25] : [1, 2]}
>
\`\`\`

---

### The Three Golden Rules of WebGL Performance

1. **Pause Canvas When Offscreen**: Utilizing a reactive \`IntersectionObserver\` to set \`frameloop="never"\` completely halts GPU draw calls when the canvas is hidden.
2. **Respect \`prefers-reduced-motion\`**: Users who configure reduced motion in their OS should not receive high-frequency particle clouds. Replacing animated geometries with a subtle CSS gradient saves both battery and cognitive overhead.
3. **Clamp Device Pixel Ratio (DPR)**: High-density mobile screens (DPR 3.0+) will crush mobile GPUs. Clamping DPR to 1.5 or 2.0 produces sharp visuals with a fraction of the rasterization cost.
    `
  },
  {
    id: "3",
    slug: "production-ready-flutter-fastapi-fullstack-patterns",
    title: "Building Production Full-Stack Apps with Flutter and FastAPI",
    summary: "Clean architecture, token refresh rotations, and offline-first state synchronization between Flutter clients and FastAPI backends.",
    category: "Engineering",
    publishedAt: "December 2025",
    readTime: "7 min read",
    tags: ["Flutter", "FastAPI", "Full-Stack", "JWT"],
    content: `
### The Power of Flutter + FastAPI

Combining **Flutter** for multi-platform client UI and **FastAPI** for lightning-fast asynchronous backend APIs is one of the most productive modern software stacks.

### Key Implementation Patterns

* **Repository Pattern in Flutter**: Keep business logic completely separated from UI widgets using BLoC or Provider with clean contract interfaces.
* **Token Rotation with Refresh Tokens**: Ensure stateless authentication stays secure by rotating JWT refresh tokens with short expiry windows and automatic silent renewal.
* **Optimistic Offline Sync**: Cache mutations locally in SQLite / Hive and replay them to the FastAPI synchronization endpoints whenever connectivity is restored.
    `
  }
];
