import React, { useState, useEffect, useCallback } from 'react';
import { MarketOverview } from './market-overview';
import { WhaleAnalysisSlide } from './whale-movements';
import { AIAnalysisTeaser } from './onchain-highlights';

const slides = [
  { id: 'overview', Component: MarketOverview, duration: 3000 },
  { id: 'whale', Component: WhaleAnalysisSlide, duration: 3000 },
  { id: 'ai', Component: AIAnalysisTeaser, duration: 3000 },
];

export function AnalysisCarousel({ lang }: { lang: 'en' | 'ko' }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setTimeout(handleNext, slides[activeIndex].duration);
    return () => clearTimeout(timer);
  }, [activeIndex, handleNext]);
  
  return (
    <div className="w-full">
      <div className="relative h-[320px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {index === activeIndex && <slide.Component lang={lang} />}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4">
        {slides.map((slide, index) => (
          <div key={slide.id} className="flex-1 bg-muted/50 rounded-full h-1">
            <div
              className={`h-1 rounded-full ${index === activeIndex ? 'bg-primary animate-progress' : (index < activeIndex ? 'bg-primary w-full' : 'bg-transparent')}`}
              style={{ animationDuration: `${slides[activeIndex].duration}ms` } as React.CSSProperties}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 