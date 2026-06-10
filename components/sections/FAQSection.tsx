'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const items = React.useMemo(() => {
    const list: { question: string; answer: string }[] = [];
    let i = 0;
    while (t.has(`items.${i}.question`)) {
      list.push({
        question: t(`items.${i}.question`),
        answer: t(`items.${i}.answer`),
      });
      i++;
    }
    return list;
  }, [t]);

  return (
    <section className="w-full bg-[#f7f3ed] py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#4a3427] text-center mb-12 tracking-tight">
          {t('title')}
        </h2>
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#e6dfd4] overflow-hidden shadow-sm"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <span className="font-semibold text-[#4a3427] pr-4">{item.question}</span>
                <ChevronDown
                  className={`flex-shrink-0 w-5 h-5 text-[#8a6a50] transition-transform duration-200 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-5 pb-5 text-[#5a4a3a] leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
