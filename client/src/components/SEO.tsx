import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  jsonLdSchema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DEFAULT_TITLE = "Muhammad Shahrukh Khan | AI Developer & Full-Stack Engineer Pakistan";
const DEFAULT_DESCRIPTION = "Explore the official portfolio of Muhammad Shahrukh Khan, top AI Developer & Full-Stack Engineer in Pakistan. Specializing in Machine Learning systems, Python, FastAPI, React, and scalable enterprise software solutions.";
const DEFAULT_KEYWORDS = "Muhammad Shahrukh Khan, AI Developer Pakistan, AI Engineer Pakistan, Full-Stack Developer Pakistan, Machine Learning Engineer Pakistan, Python Developer Pakistan, SkillLoom AI, POF AI Developer, COMSATS Wah AI, Software Engineer Pakistan, React Developer Pakistan";
const DEFAULT_CANONICAL = "https://shahrukhxkhan.vercel.app/";
const DEFAULT_OG_IMAGE = "https://shahrukhxkhan.vercel.app/images/pmnh-dashboard.png";

const DEFAULT_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://shahrukhxkhan.vercel.app/#profilepage",
      "url": "https://shahrukhxkhan.vercel.app/",
      "name": "Muhammad Shahrukh Khan | AI Developer & Full-Stack Engineer",
      "description": "Official personal profile and portfolio of Muhammad Shahrukh Khan, AI Developer and Full-Stack Engineer in Pakistan.",
      "mainEntity": {
        "@id": "https://shahrukhxkhan.vercel.app/#person"
      }
    },
    {
      "@type": "Person",
      "@id": "https://shahrukhxkhan.vercel.app/#person",
      "name": "Muhammad Shahrukh Khan",
      "alternateName": ["Shahrukh Khan", "Shahrukh Khan AI Developer", "Muhammad Shahrukh Khan AI Engineer"],
      "url": "https://shahrukhxkhan.vercel.app/",
      "image": "https://shahrukhxkhan.vercel.app/images/pmnh-dashboard.png",
      "sameAs": [
        "https://github.com/Shahrukhxkhan",
        "https://www.linkedin.com/in/shahrukhxkhan/"
      ],
      "jobTitle": ["AI Developer", "AI/ML Engineer", "Full-Stack Software Engineer"],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Wah Cantt / Islamabad",
        "addressRegion": "Punjab",
        "addressCountry": "PK"
      },
      "worksFor": {
        "@type": "Organization",
        "name": "Pakistan Ordnance Factories (POF)"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "COMSATS University Islamabad, Wah Campus"
      },
      "knowsAbout": [
        "Artificial Intelligence",
        "Machine Learning",
        "Full-Stack Web Development",
        "Python",
        "FastAPI",
        "React.js",
        "Flutter",
        "DevOps",
        "TypeScript",
        "Docker",
        "PyTorch",
        "InsightFace Biometric AI",
        "Cosine Similarity Matching"
      ],
      "description": "AI/ML Engineer & Full-Stack Developer based in Pakistan specializing in intelligent machine learning solutions, scalable web applications, and robust DevOps pipelines."
    },
    {
      "@type": "SoftwareApplication",
      "name": "SkillLoom — AI Workforce Platform",
      "operatingSystem": "Web / Mobile",
      "applicationCategory": "BusinessApplication",
      "description": "AI-driven hiring platform for Pakistan's informal textile sector combining InsightFace biometric verification and cosine similarity matching.",
      "author": {
        "@id": "https://shahrukhxkhan.vercel.app/#person"
      }
    },
    {
      "@type": "SoftwareApplication",
      "name": "PMNH QR Guide App",
      "operatingSystem": "Mobile / Web",
      "applicationCategory": "TravelApplication",
      "description": "Interactive QR-based exhibit guide app commissioned for Pakistan Museum of Natural History with telemetry and admin controls.",
      "author": {
        "@id": "https://shahrukhxkhan.vercel.app/#person"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://shahrukhxkhan.vercel.app/#website",
      "url": "https://shahrukhxkhan.vercel.app/",
      "name": "Muhammad Shahrukh Khan Portfolio",
      "publisher": {
        "@id": "https://shahrukhxkhan.vercel.app/#person"
      },
      "description": "Personal portfolio website of Muhammad Shahrukh Khan showcasing AI engineering projects, full-stack development, and professional experience in Pakistan.",
      "inLanguage": "en-US"
    }
  ]
};

export function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalUrl = DEFAULT_CANONICAL,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
  jsonLdSchema = DEFAULT_STRUCTURED_DATA,
}: SEOProps) {
  const schemaString = JSON.stringify(jsonLdSchema);

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Muhammad Shahrukh Khan" />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - Portfolio Showcase`} />
      <meta property="og:site_name" content="Muhammad Shahrukh Khan Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Shahrukhxkhan" />
      <meta name="twitter:creator" content="@Shahrukhxkhan" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${title} - Portfolio Showcase`} />

      {/* JSON-LD Structured Data Schema */}
      <script type="application/ld+json">{schemaString}</script>
    </Helmet>
  );
}

export default SEO;
