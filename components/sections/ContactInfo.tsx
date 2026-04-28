'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function ContactInfo() {
  const t = useTranslations('contact');

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex flex-col h-full p-12 lg:p-16 border-r border-[var(--border-light)]"
    >
      <div className="mb-12">
        <p className="eyebrow mb-4 text-[var(--accent)]">
          {t('subheading')}
        </p>
        <h2 className="section-title mb-8 text-[var(--text-primary)]">
          {t('heading')}
        </h2>
        <p className="font-body text-[var(--text-secondary)] text-lg leading-relaxed">
          {t('body')}
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="eyebrow text-[var(--accent)] text-[10px]">
            {t('info.email_label')}
          </span>
          <a href={`mailto:contact@hatmex.com`} className="font-body text-xl text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-3">
            <span className="text-[var(--accent)]">✉</span> contact@hatmex.com
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <span className="eyebrow text-[var(--accent)] text-[10px]">
            {t('info.address_label')}
          </span>
          <div className="flex flex-col gap-2">
            <p className="font-body text-xl text-[var(--text-primary)] inline-flex items-center gap-3">
              <span className="text-[var(--accent)]">📍</span> Eagle Pass, Texas. USA
            </p>
            <p className="font-body text-xl text-[var(--text-primary)] inline-flex items-center gap-3">
              <span className="text-[var(--accent)]">📍</span> León, Guanajuato. México
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="eyebrow text-[var(--accent)] text-[10px]">
            {t('info.social_label')}
          </span>
          <div className="flex flex-wrap items-center gap-6">
            <a href="https://instagram.com/hatmex" target="_blank" className="font-body text-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-2">
              <span className="text-[var(--accent)] text-xs">📸</span> Instagram
            </a>
            <a href="https://facebook.com/hatmex" target="_blank" className="font-body text-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-2">
              <span className="text-[var(--accent)] text-xs">📘</span> Facebook
            </a>
            <a href="https://tiktok.com/@hatmex" target="_blank" className="font-body text-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-2">
              <span className="text-[var(--accent)] text-xs">🎵</span> TikTok
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
