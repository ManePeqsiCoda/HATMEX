'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const STANDARDS = [
  { key: 'standard_1', icon: '✦' },
  { key: 'standard_2', icon: '◎' },
  { key: 'standard_3', icon: '⬡' },
  { key: 'standard_4', icon: '▣' },
  { key: 'standard_5', icon: '◈' },
  { key: 'standard_6', icon: '◇' },
  { key: 'standard_7', icon: '▲' },
];

export default function Standards() {
  const t = useTranslations('processes_standards');

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            className="eyebrow text-[var(--accent)] mb-4 block"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('eyebrow')}
          </motion.span>
          <motion.h2 
            className="section-title text-[var(--text-primary)]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('title')}
          </motion.h2>
        </div>

        {/* Grid for Standards */}
        <div className="flex flex-wrap justify-center gap-8">
          {STANDARDS.map((standard, idx) => (
            <motion.div
              key={standard.key}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "bg-[var(--bg-card)] p-8 border border-dashed border-[var(--border)] hover:border-solid hover:border-[var(--accent)] hover:shadow-xl transition-all duration-300 group flex flex-col w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]",
                idx >= 4 && "lg:w-[calc(33.33%-1.5rem)]" // Specific width for bottom row to look centered if logic holds
              )}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-[var(--accent-light)] border border-[var(--border)] text-[var(--accent)] mb-8 transition-colors group-hover:bg-[var(--accent)] group-hover:text-white text-xl">
                {standard.icon}
              </div>
              <h3 className="font-display font-bold text-base tracking-[0.12em] uppercase text-[var(--text-primary)] mb-4">
                {t(`${standard.key}_title`)}
              </h3>
              <p className="font-body text-[var(--text-secondary)] text-[13px] leading-[1.75] whitespace-pre-line">
                {t(`${standard.key}_body`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
