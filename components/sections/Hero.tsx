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
    <section className="relative min-h-[420px] sm:min-h-[520px] md:min-h-[640px] lg:min-h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-home.png"
          alt="HATMEX Hero"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        {/* Overlay: gradiente oscuro sutil que crea contraste para el texto sin ocultar el sombrero */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E1C]/70 via-[#1A2E1C]/20 to-transparent" />
      </div>

      {/* Content */}
      <motion.div 
        className="absolute bottom-[12%] left-4 right-4 sm:left-[8%] sm:right-auto z-10 flex flex-col gap-5 sm:gap-6 max-w-4xl"
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
          className="flex flex-col font-display uppercase font-black tracking-[0.16em] leading-[1.1] text-white text-[42px] sm:text-[56px] md:text-[72px] lg:text-[88px]"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}
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
