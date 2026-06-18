'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function GEOSection() {
  const t = useTranslations('geo');
  return (
    <section className="w-full bg-[#fdfbf7] py-12 md:py-16 border-t border-[#e6dfd4]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#4a3427] mb-4 tracking-tight">
          {t('heading')}
        </h2>
        <p className="text-[#5a4a3a] leading-relaxed text-base md:text-lg">
          {t('body')}
        </p>
      </div>
    </section>
  );
}
