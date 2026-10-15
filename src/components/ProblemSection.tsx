import React from 'react';
import { Layers, EyeOff, BatteryLow, Award } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: EyeOff,
      step: '01 / INVISIBILITY',
      title: 'Progress Disappears Day to Day',
      description:
        'You shave 4 seconds off threshold pace or survive a 34km rain-soaked long run on a Tuesday morning. But tomorrow it feels like nothing happened. The slow, compounding micro-gains remain invisible.',
    },
    {
      icon: Layers,
      step: '02 / FRAGMENTATION',
      title: 'Dozens of Apps, Zero Unified Vision',
      description:
        'Your mileage is in Strava, your intervals in Garmin Connect, your lifting in Apple Notes, and your race nutrition in an Excel sheet. None of them understand your race day or tell you if you are actually ready.',
    },
    {
      icon: BatteryLow,
      step: '03 / THE MOTIVATION CHASM',
      title: 'The Dangerous Middle Months',
      description:
        'When race day is 16 weeks away, motivation evaporates without daily positive reinforcement. Existing apps log workouts as isolated silos rather than steps in an unfolding campaign.',
    },
    {
      icon: Award,
      step: '04 / UNMARKED MILESTONES',
      title: 'Only The Finish Medal Counts',
      description:
        'If you get sick on race day, get a flat tire on the bike leg, or suffer cramps, months of elite discipline vanish. Your personal records and monumental milestones go completely uncelebrated.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-background border-b border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary mb-3">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            THE ENDURANCE PARADOX
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-foreground leading-[0.95]">
            YOU TRAIN FOR MONTHS.<br />
            YOU RACE FOR <span className="text-primary">ONE DAY.</span>
          </h2>
          <p className="mt-5 text-lg text-foreground-muted font-normal leading-relaxed">
            Athletes training for HYROX, Ironman, and marathons pour 300+ hours into preparation.
            Yet existing fitness platforms treat your effort like disconnected transaction receipts.
          </p>
        </div>

        {/* 4 Problem Grid with Sharp 1px Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-surface-border">
          {problems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-surface p-7 sm:p-8 flex flex-col justify-between hover:bg-surface-raised transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                      {item.step}
                    </span>
                    <div className="w-9 h-9 rounded bg-surface-card border border-surface-border flex items-center justify-center text-foreground-muted group-hover:text-primary group-hover:border-primary/40 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-foreground mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground-muted leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-surface-border/60 flex items-center justify-between text-xs font-mono text-foreground-subtle">
                  <span>ISSUE IDENTIFIED</span>
                  <span className="text-primary font-bold group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Core Summary Quote Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded bg-surface border-l-4 border-primary">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-primary block mb-1">
                THE ROOT FAILURE OF WORKOUT LOGGERS
              </span>
              <p className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-foreground">
                "Months of discipline should never disappear into a single finish line result."
              </p>
            </div>
            <a
              href="#vision"
              className="px-5 py-2.5 rounded bg-surface-raised border border-surface-border text-foreground hover:text-primary hover:border-primary text-xs uppercase font-mono tracking-wider whitespace-nowrap self-start md:self-auto transition-all"
            >
              See Our Solution ↓
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
