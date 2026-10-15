import React from 'react';
import { Target, Activity, Award, ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';

export const HowItWorks: React.FC = () => {
  const icons = [Target, Activity, Award];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-surface-raised border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary mb-3">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            THE CAMPAIGN METHODOLOGY
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-foreground leading-[0.95]">
            HOW TRAIN BOLD <span className="text-primary">WORKS.</span>
          </h2>
          <p className="mt-4 text-base text-foreground-muted font-sans">
            Three simple phases connecting raw effort on the track to absolute confidence at the start line.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={step.step}
                className="p-7 sm:p-8 rounded-lg bg-surface border border-surface-border hover:border-surface-borderLight transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-black text-4xl text-primary/40 group-hover:text-primary transition-colors">
                      {step.step}
                    </span>
                    <div className="w-11 h-11 rounded bg-surface-raised border border-surface-border flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-xs font-mono uppercase tracking-widest text-primary block mb-2 font-bold">
                    {step.tagline}
                  </span>

                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-foreground mb-4">
                    {step.title}
                  </h3>

                  <p className="text-sm text-foreground-muted font-sans leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-border flex items-center justify-between text-xs font-mono text-foreground-subtle">
                  <span>OUTCOME</span>
                  <span className="text-primary font-bold flex items-center gap-1">
                    {step.highlight}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
