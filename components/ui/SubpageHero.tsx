'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type SubpageHeroProps = {
  title: string;
  image: string;
};

export default function SubpageHero({ title, image }: SubpageHeroProps) {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-[rgba(26,46,28,0.50)]" />
      </div>

      {/* Content */}
      <div className="absolute bottom-[10%] left-[8%] z-10 max-w-4xl">
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display font-black text-5xl md:text-7xl lg:text-[72px] leading-none tracking-[0.16em] uppercase text-white"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}
