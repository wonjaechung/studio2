'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CompetitionVisual } from './competition-visual';
import { PlayerDetailSlide } from './player-detail-slide';
import { TeamBattleSlide } from './team-battle-slide';

const slides = [
  CompetitionVisual,
  PlayerDetailSlide,
  TeamBattleSlide,
];

export function CompetitionCarousel({ lang }: { lang: 'en' | 'ko' }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);

    return () => clearTimeout(timer);
  }, [index]);

  const CurrentSlide = slides[index];

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <CurrentSlide lang={lang} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="h-1.5 w-1/4 rounded-full bg-gray-500/30"
          >
            {index === i && (
              <motion.div
                className="h-1.5 rounded-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
} 