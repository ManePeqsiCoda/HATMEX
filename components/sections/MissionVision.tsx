'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type MissionVisionProps = {
  title: string;
  body: string;
  image: string;
  reverse?: boolean;
  tilt?: number;
  className?: string;
};

export default function MissionVision({ title, body, image, reverse, tilt = -2, className }: MissionVisionProps) {
  return (
    <section className={cn("py-24 px-6 md:px-12 overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto">
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-12 gap-16 items-center",
          reverse && "md:flex-row-reverse"
        )}>
          {/* Text Content */}
          <motion.div 
            className={cn(
              "md:col-span-7 flex flex-col gap-6",
              reverse ? "md:order-2" : "md:order-1"
            )}
            initial={{ x: reverse ? 50 : -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">
              {title}
            </h2>
            <p className="font-body text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed max-w-xl">
              {body}
            </p>
          </motion.div>

          {/* Image (Polaroid) */}
          <motion.div 
            className={cn(
              "md:col-span-5 flex justify-center",
              reverse ? "md:order-1" : "md:order-2"
            )}
            initial={{ rotate: 0, scale: 0.9, opacity: 0 }}
            whileInView={{ rotate: tilt, scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          >
            <div className="relative group">
              {/* Tape Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-8 bg-[var(--accent)] z-10 rotate-1 rounded-sm shadow-sm pointer-events-none" />
              
              <div className="bg-[var(--bg-card)] p-4 pb-12 border-8 border-[var(--bg-card)] shadow-[0_8px_40px_rgba(26,46,28,0.15)] transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="relative aspect-[4/5] w-full min-w-[300px] overflow-hidden grayscale contrast-125">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                  />

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
