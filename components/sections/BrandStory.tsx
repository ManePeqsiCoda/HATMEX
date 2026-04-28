'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function BrandStory() {
  const t = useTranslations('about');

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <motion.span 
            className="eyebrow mb-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            {t('story_eyebrow')}
          </motion.span>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Vertical Divider (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[var(--border)] -translate-x-1/2" />

          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <p className="font-body text-[var(--text-secondary)] text-[15px] leading-[1.8]">
              {t('story_left')}
            </p>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <p className="font-body text-[var(--text-secondary)] text-[15px] leading-[1.8]">
              {t('story_right')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
