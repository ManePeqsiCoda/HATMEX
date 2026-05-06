'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const PROCESS_STEPS = [
  {
    id: 1,
    image: '/images/processes/process-01.png',
    label: 'STEP 01'
  },
  {
    id: 2,
    image: '/images/processes/process-10.png',
    label: 'STEP 02'
  },
  {
    id: 3,
    image: '/images/processes/process-09.png',
    label: 'STEP 03'
  },
  {
    id: 4,
    image: '/images/processes/process-06.png',
    label: 'STEP 04'
  },
  {
    id: 5,
    image: '/images/processes/process-12.png',
    label: 'STEP 05'
  },
];

export default function Processes() {
  const t = useTranslations('processes');
  const [activeIdx, setActiveIdx] = useState(0);

  const next = () => setActiveIdx((prev) => (prev + 1) % PROCESS_STEPS.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length);

  return (
    <section className="py-24 bg-[var(--bg-secondary)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2 
          className="section-title mb-16 text-center text-[var(--text-primary)]"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          {t('processes_heading')}
        </motion.h2>
      </div>

      <div className="relative w-full max-w-[1440px] mx-auto group text-white">
        <div className="relative aspect-[21/9] md:aspect-[24/10] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative w-full h-full transition-all duration-700"
            >
              <Image
                src={PROCESS_STEPS[activeIdx].image}
                alt={PROCESS_STEPS[activeIdx].label}
                fill
                className="object-cover transition-all duration-700"
              />

              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1c]/80 via-transparent to-transparent" />
              
              <span className="absolute bottom-4 left-8 font-display font-black text-[80px] md:text-[120px] leading-none text-white/10 select-none">
                {(activeIdx + 1).toString().padStart(2, '0')}
              </span>
              
              <div className="absolute bottom-0 left-0 right-0 py-8 px-8 md:px-12 bg-[#1a2e1c]/75 backdrop-blur-sm">
                <span className="eyebrow block text-[var(--accent)]">
                  {t(`steps.${activeIdx + 1}`)}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute inset-y-0 left-4 md:left-8 flex items-center z-20">
            <button 
              onClick={prev}
              className="w-12 h-12 flex items-center justify-center border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-all backdrop-blur-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="absolute inset-y-0 right-4 md:right-8 flex items-center z-20">
            <button 
              onClick={next}
              className="w-12 h-12 flex items-center justify-center border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-all backdrop-blur-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-8 px-6 overflow-x-auto pb-4 scrollbar-hide">
          {PROCESS_STEPS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIdx === idx ? 'bg-[var(--accent)] scale-125' : 'bg-[var(--border)] hover:bg-[var(--accent)]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
