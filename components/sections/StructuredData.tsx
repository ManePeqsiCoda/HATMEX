import React from 'react';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hatmex',
    url: 'https://hatmex.com.mx',
    logo: 'https://hatmex.com.mx/favicon.ico',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+52-1-477-109-6896',
      contactType: 'sales',
      areaServed: ['MX', 'US'],
      availableLanguage: ['Spanish', 'English'],
    },
    sameAs: [
      'https://instagram.com/hatmex',
      'https://facebook.com/hatmex',
      'https://tiktok.com/@hatmex',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ questions }: { questions: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
