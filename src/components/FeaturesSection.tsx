import React, { useState } from 'react';
import { Activity, Target, Flame, Award, ChevronRight, CheckCircle2 } from 'lucide-react';
import { PLATFORM_PILLARS } from '../data/mockData';

export const FeaturesSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState('performance');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Activity':
        return <Activity className="w-5 h-5 text-primary" />;
      case 'Target':
        return <Target className="w-5 h-5 text-primary" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-primary" />;
      case 'Award':
        return <Award className="w-5 h-5 text-primary" />;
      default:
        return <Activity className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <section id="features" className="py-24 sm:py-32 bg-background border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary mb-3">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              THE FOUR CORE PILLARS
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-foreground leading-[0.95]">
              BUILT FOR THE RIGORS OF <span className="text-primary">ENDURANCE.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-foreground-muted max-w-md font-sans">
            Every feature in Train Bold is engineered specifically for athletes training for long-distance, multi-sport, and hybrid events.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLATFORM_PILLARS.map((pillar) => {
            const isSelected = activePillar === pillar.id;
            return (
              <div
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`cursor-pointer rounded-lg p-6 sm:p-7 border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-surface-raised border-primary shadow-[0_0_25px_rgba(194,248,53,0.15)] ring-1 ring-primary/40'
                    : 'bg-surface border-surface-border hover:border-surface-borderLight hover:bg-surface-card'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">
                      {pillar.badge}
                    </span>
                    <div className="w-10 h-10 rounded bg-surface border border-surface-border flex items-center justify-center">
                      {getIcon(pillar.iconName)}
                    </div>
                  </div>

                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-foreground mb-2">
                    {pillar.pillar}
                  </h3>

                  <p className="text-xs font-mono text-primary mb-4 leading-snug">
                    {pillar.subtitle}
                  </p>

                  <p className="text-xs text-foreground-muted leading-relaxed font-sans mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-surface-border">
                  {pillar.stats.map((s, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px] font-mono">
                      <span className="text-foreground-subtle">{s.label}:</span>
                      <span className="text-foreground font-semibold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Spotlight for Active Pillar */}
        <div className="mt-8 p-6 sm:p-8 rounded-lg bg-surface border border-surface-border">
          {(() => {
            const current = PLATFORM_PILLARS.find((p) => p.id === activePillar) || PLATFORM_PILLARS[0];
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-primary mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Deep Dive // {current.pillar}</span>
                  </div>
                  <h4 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-foreground mb-3">
                    {current.title}
                  </h4>
                  <p className="text-sm text-foreground-muted font-sans leading-relaxed">
                    {current.description}
                  </p>
                </div>
                <div className="lg:col-span-4 flex flex-col justify-end gap-3">
                  <a
                    href="#dashboard-preview"
                    className="w-full text-center px-4 py-3 rounded bg-primary text-background font-display font-bold uppercase tracking-wider text-sm hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Test In Live Terminal</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })()}
        </div>

      </div>
    </section>
  );
};
