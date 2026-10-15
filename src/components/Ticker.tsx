import React from 'react';
import { TICKER_ITEMS } from '../data/mockData';

export const Ticker: React.FC = () => {
  // Duplicate array to achieve seamless infinite scroll
  const marqueeItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="relative w-full overflow-hidden bg-surface-raised border-y border-surface-border py-3.5 select-none">
      {/* Left/Right Vignettes for fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
        {marqueeItems.map((item, idx) => (
          <div key={idx} className="flex items-center mx-4 gap-4">
            <span className="font-display font-black text-sm sm:text-base uppercase tracking-widest text-foreground hover:text-primary transition-colors">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
