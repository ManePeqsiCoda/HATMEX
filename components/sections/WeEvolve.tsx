'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/lib/navigation';

export default function WeEvolve() {
  const t = useTranslations('home');

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--bg-secondary)] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Image */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] w-full order-1"
        >
            <Image
              src="/images/client/1.jpeg"
              alt="Pareja con sombrero vaquero HATMEX — tradición y legado familiar"
              fill
              className="object-cover"
            />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8 order-2"
        >
          <h2 className="section-title text-[var(--text-primary)]">
            {t('evolve_heading')}
          </h2>
          <p className="font-body text-[var(--text-secondary)] text-lg leading-relaxed max-w-[620px]">
            {t('evolve_body')}
          </p>
          <div>
            <Link
              href="/about"
              className="font-display text-[var(--accent)] font-semibold tracking-widest uppercase hover:text-[var(--accent-hover)] transition-colors"
            >
              {t('hero_cta_secondary')} →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
