'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import VideoInteractive from '@/components/ui/VideoInteractive';

const VIDEOS = [
  {
    src: '/images/client/7.mp4',
    poster: '/images/client/posters/7.jpg',
    label: 'steam_shaping',
    aspect: 'aspect-[9/16]',
  },
  {
    src: '/images/client/4.mp4',
    poster: '/images/client/posters/4.jpg',
    label: 'brushing_finish',
    aspect: 'aspect-[9/16]',
  },
  {
    src: '/images/client/12.mp4',
    poster: '/images/client/posters/12.jpg',
    label: 'steam_color',
    aspect: 'aspect-[9/16]',
  },
  {
    src: '/images/client/6.mp4',
    poster: '/images/client/posters/6.jpg',
    label: 'band_fitting',
    aspect: 'aspect-[9/16]',
  },
  {
    src: '/images/client/10.mp4',
    poster: '/images/client/posters/10.jpg',
    label: 'buckle_detail',
    aspect: 'aspect-[9/16]',
  },
  {
    src: '/images/client/3.mp4',
    poster: '/images/client/posters/3.jpg',
    label: 'lifestyle_hold',
    aspect: 'aspect-[9/16]',
  },
];

export default function ProcessVideoGrid() {
  const t = useTranslations('home');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow text-[var(--accent)] mb-4 block">
            {t('processvideos_eyebrow')}
          </span>
          <h2 className="section-title text-[var(--text-primary)]">
            {t('processvideos_title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS.map((video, idx) => (
            <motion.div
              key={video.src}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="relative overflow-hidden rounded-[2px] border border-[var(--border)] bg-[var(--bg-card)]"
            >
              <VideoInteractive
                src={video.src}
                poster={video.poster}
                label={t(`processvideos_${video.label}`)}
                aspect={video.aspect}
                reducedMotion={reducedMotion}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
