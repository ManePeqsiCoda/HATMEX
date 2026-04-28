'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/lib/navigation';

export default function Hero() {
  const t = useTranslations('home');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  const headingLines = t('hero_heading').split('\n');

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-home.png"
          alt="HATMEX Hero"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[rgba(26,46,28,0.40)]" />
      </div>

      {/* Content */}
      <motion.div 
        className="absolute bottom-[10%] left-[8%] z-10 flex flex-col gap-6 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span 
          variants={itemVariants}
          className="eyebrow text-[var(--accent)]"
        >
          {t('hero_eyebrow')}
        </motion.span>

        <motion.h1 
          className="flex flex-col hero-title text-white"
        >
          {headingLines.map((line, idx) => (
            <span key={idx} className="overflow-hidden">
              <motion.span 
                variants={itemVariants}
                className="inline-block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.div 
          variants={itemVariants}
          className="flex flex-row gap-4 mt-4"
        >
          <Link 
            href="/contact"
            className="btn-primary"
          >
            {t('hero_cta_primary')}
          </Link>
          <Link 
            href="/about"
            className="btn-outline"
          >
            {t('hero_cta_secondary')}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--accent)]">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  );
}
