'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const CUSTOMERS = [
  'Alvies', 'Boulet', 'Frye', 'John Fleming', 'Cinch', 'Korky\'s', 'Palacioazul', 'Slixa', 'Cuero'
];

export default function Customers() {
  const t = useTranslations('home');

  return (
    <section className="py-24 bg-[var(--bg-primary)] overflow-hidden border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="font-display font-black text-xs tracking-[0.2em] uppercase text-[var(--accent)] text-center">
          {t('customers_heading')}
        </h2>
      </div>

      <div className="relative flex overflow-hidden group">
        <div className="flex animate-marquee whitespace-nowrap py-4">
          {[...CUSTOMERS, ...CUSTOMERS].map((name, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-center px-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
            >
              <span className="font-display font-black text-2xl md:text-3xl tracking-widest text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-500">
                {name.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
        
        {/* Transparent gradient edges for smoothness */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10" />
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
