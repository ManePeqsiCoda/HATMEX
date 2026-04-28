'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const VALUES = [
  { 
    key: 'respect',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 21c4.418 0 8-1.791 8-4s-3.582-4-8-4-8 1.791-8 4 3.582 4 8 4z" />
      </svg>
    )
  },
  { 
    key: 'commitment',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  { 
    key: 'communication',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 9h8m-8 4h6m-1 7l-5 3v-3H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-4l-5 3z" />
      </svg>
    )
  },
  { 
    key: 'honesty',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  { 
    key: 'responsibility',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  { 
    key: 'leadership',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
];

export default function AboutValues() {
  const t = useTranslations('about');

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="section-title mb-16 text-center"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('values_title')}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUES.map((value, idx) => (
            <motion.div
              key={value.key}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[var(--bg-card)] p-10 border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-[var(--accent-light)] border border-[var(--border)] text-[var(--accent)] mb-8 transition-colors group-hover:bg-[var(--accent)] group-hover:text-white">
                {value.icon}
              </div>
              <h3 className="font-display font-bold text-lg tracking-[0.10em] uppercase text-[var(--text-primary)] mb-4">
                {t(`values.${value.key}.title`)}
              </h3>
              <p className="font-body text-[var(--text-secondary)] text-[14px] leading-relaxed">
                {t(`values.${value.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
