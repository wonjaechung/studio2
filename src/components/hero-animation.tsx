import React from 'react';

export const HeroAnimation = () => {
  const pathData = "M-28.5 259.5C148.2 259.5 248.5 137 400.5 137C552.5 137 622.5 362.5 768 362.5C913.5 362.5 978 48.5 1125 48.5C1272 48.5 1380 100 1440 -50";

  return (
    <div className="absolute inset-x-0 bottom-0 z-0 h-full overflow-hidden pointer-events-none">
      <div className="absolute inset-0 animate-pulse-glow">
        <svg
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[250%] max-w-none h-auto text-primary"
          viewBox="0 -60 1440 380"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax meet"
        >
          <defs>
            <linearGradient id="moon-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.7" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.7" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Glow path */}
          <path
            d={pathData}
            stroke="url(#moon-gradient)"
            strokeWidth="10"
            fill="none"
            className="opacity-30"
          />
          
          {/* Main path */}
          <path
            d={pathData}
            stroke="url(#moon-gradient)"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
}; 