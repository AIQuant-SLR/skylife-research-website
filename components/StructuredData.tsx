export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Skylife Research",
    "url": "https://skyliferesearch.com",
    "logo": "https://skyliferesearch.com/icon.svg",
    "description": "Trade the Hidden Network. Advanced graph theory and community detection algorithms for the Indian Stock Market.",
    "sameAs": [
      "https://twitter.com/skyliferesearch",
      "https://linkedin.com/company/skylife-research"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "contact@skyliferesearch.com"
    },
    "areaServed": "IN",
    "knowsAbout": [
      "Quantitative Trading",
      "Network Analysis",
      "Graph Theory",
      "Algorithmic Trading",
      "Stock Market Analysis",
      "Portfolio Optimization"
    ],
    "offers": {
      "@type": "Service",
      "serviceType": "Financial Technology",
      "description": "Advanced quantitative trading tools and network analysis for the Indian stock market",
      "areaServed": "IN"
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Skylife Research",
    "url": "https://skyliferesearch.com",
    "description": "Trade the Hidden Network. Advanced graph theory and community detection algorithms for the Indian Stock Market.",
    "publisher": {
      "@type": "Organization",
      "name": "Skylife Research"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://skyliferesearch.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Skylife Research Platform",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "description": "Advanced quantitative trading platform featuring portfolio analyzer, network graph visualization, and momentum stock analysis.",
    "featureList": [
      "Portfolio Analysis",
      "Network Graph Visualization",
      "Momentum Stock Detection",
      "Community Detection Algorithms",
      "Real-time Market Data"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
      />
    </>
  );
}
