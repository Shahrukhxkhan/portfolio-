import { Helmet } from 'react-helmet-async';

const SEO = () => {
  const siteUrl = 'https://shahrukhxkhan.vercel.app';
  const fullName = 'Muhammad Shahrukh Khan';
  const title = 'Muhammad Shahrukh Khan — AI Developer & Full-Stack Engineer';
  const description = 'Final-year CS student at COMSATS University specializing in AI/ML engineering and full-stack development. Built SkillLoom — an AI-powered hiring platform for Pakistan\'s textile workforce. 4 internships including Pakistan Ordnance Factories.';
  const keywords = 'Muhammad Shahrukh Khan, AI Developer Pakistan, Full-Stack Engineer Pakistan, ML Engineer Pakistan, COMSATS University, SkillLoom, FastAPI developer, Flutter developer, React developer, Python developer, AI ML internship Pakistan, software engineer Wah Cantt, shahrukhxkhan';

  return (
    <Helmet>
      {/* ===== PRIMARY META TAGS ===== */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={fullName} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#0A0F1E" />
      <link rel="canonical" href={siteUrl} />

      {/* ===== OPEN GRAPH (Facebook, LinkedIn) ===== */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Muhammad Shahrukh Khan Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* ===== TWITTER CARD ===== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
      <meta name="twitter:creator" content="@shahrukhxkhan" />

      {/* ===== STRUCTURED DATA (JSON-LD) ===== */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": fullName,
          "url": siteUrl,
          "image": `${siteUrl}/og-image.png`,
          "jobTitle": "AI Developer & Full-Stack Engineer",
          "description": description,
          "email": "shahrukh032003@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Wah Cantt",
            "addressCountry": "Pakistan"
          },
          "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "COMSATS University Islamabad, Wah Campus"
          },
          "knowsAbout": [
            "Artificial Intelligence",
            "Machine Learning",
            "Full-Stack Development",
            "Python",
            "FastAPI",
            "Flutter",
            "React.js",
            "Computer Vision",
            "DevOps"
          ],
          "sameAs": [
            "https://linkedin.com/in/shahrukhxkhan",
            "https://github.com/Shahrukhxkhan"
          ],
          "worksFor": [
            {
              "@type": "Organization",
              "name": "Pakistan Ordnance Factories",
              "description": "AI/ML & DevOps Intern"
            }
          ]
        })}
      </script>

      {/* ===== ADDITIONAL SEO ===== */}
      <meta name="geo.region" content="PK" />
      <meta name="geo.placename" content="Wah Cantt, Pakistan" />
      <meta name="category" content="Technology, Software Development, AI/ML" />
    </Helmet>
  );
};

export default SEO;
