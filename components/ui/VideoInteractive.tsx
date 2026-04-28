'use client';

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type VideoInteractiveProps = {
  src: string;
  poster: string;
  label: string;
  aspect?: string;
  reducedMotion?: boolean;
};

export default function VideoInteractive({
  src,
  poster,
  label,
  aspect = 'aspect-[9/16]',
  reducedMotion = false,
}: VideoInteractiveProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* ── Mount gate for Portal (client-only) ───────────────────────── */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ── Detect touch device ───────────────────────────────────────── */
  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    setIsTouch(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  /* ── Lazy-load video src ───────────────────────────────────────── */
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── Hover playback (desktop only) ─────────────────────────────── */
  const handleMouseEnter = useCallback(() => {
    if (isTouch || reducedMotion) return;
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  }, [isTouch, reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (isTouch || reducedMotion) return;
    setIsHovered(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }, [isTouch, reducedMotion]);

  /* ── Modal open / close ────────────────────────────────────────── */
  const openModal = useCallback(() => {
    setIsModalOpen(true);
    videoRef.current?.pause();
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  /* ── ESC to close + body scroll lock ───────────────────────────── */
  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isModalOpen, closeModal]);

  return (
    <>
      {/* ── Grid card ─────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden rounded-[2px] cursor-pointer bg-[#0a0a0a] group ${aspect}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={openModal}
        role="button"
        aria-label={`${label} — ${isTouch ? 'Tap to open video' : 'Hover to preview, click to expand'}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal();
          }
        }}
      >
        {/* Poster image */}
        <Image
          src={poster}
          alt={label}
          fill
          className={`object-cover transition-opacity duration-500 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Video (lazy-loaded) */}
        {isInViewport && (
          <video
            ref={videoRef}
            src={src}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Play overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/25 shadow-lg transition-transform duration-300 group-hover:scale-110">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Fullscreen modal via Portal ───────────────────────────── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className="fixed inset-0 z-[99999] flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0.01 : 0.25 }}
                onClick={closeModal}
              >
                <motion.div
                  className="relative w-[90vw] max-w-[1200px] max-h-[90vh] flex flex-col items-center justify-center"
                  initial={{ scale: reducedMotion ? 1 : 0.88, opacity: reducedMotion ? 1 : 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: reducedMotion ? 1 : 0.88, opacity: reducedMotion ? 1 : 0 }}
                  transition={
                    reducedMotion
                      ? { duration: 0.01 }
                      : { type: 'spring', damping: 28, stiffness: 320 }
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={closeModal}
                    className="absolute -top-14 right-0 w-12 h-12 rounded-full bg-white/10 border border-white/30 text-white hover:bg-white/20 hover:scale-110 transition-all flex items-center justify-center z-10"
                    aria-label="Cerrar video"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>

                  <video
                    src={src}
                    autoPlay={!reducedMotion}
                    controls
                    playsInline
                    preload="auto"
                    className="w-full max-h-[80vh] object-contain rounded-[4px]"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
