import React from 'react';
import { Target, Flag, CheckCircle } from 'lucide-react';

export const VisionSection: React.FC = () => {
  return (
    <section id="vision" className="relative py-24 sm:py-32 bg-surface-raised border-b border-surface-border overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Big Editorial Quote / Vision */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary mb-4">
              <Flag className="w-3.5 h-3.5" />
              THE TRAIN BOLD PHILOSOPHY
            </div>
            
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-foreground leading-[0.94] mb-8">
              WHAT IF EVERY TRAINING DAY FELT LIKE A{' '}
              <span className="text-primary underline decoration-primary/40 decoration-4 underline-offset-8">
                SMALL FINISH LINE?
              </span>
            </h2>

            <p className="text-lg text-foreground-muted font-sans leading-relaxed mb-6">
              When you train for an ultra, HYROX, or marathon, race day is only 0.5% of your total athletic experience.
              The other 99.5% is lived in cold pre-dawn tracks, indoor trainers, and nutrition rehearsals.
            </p>

            <p className="text-base text-foreground-muted font-sans leading-relaxed">
              Train Bold redesigns the psychological engine of endurance sport. We replace empty post-workout logs with an active campaign dashboard: calculating your predicted finish time in real time, detecting micro-PRs automatically, and transforming every block into a milestone worth taking pride in.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs">
              <div className="px-3 py-1.5 rounded bg-surface border border-surface-border flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                <span>Zero fake vanity metrics</span>
              </div>
              <div className="px-3 py-1.5 rounded bg-surface border border-surface-border flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                <span>Real performance telemetry</span>
              </div>
              <div className="px-3 py-1.5 rounded bg-surface border border-surface-border flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                <span>Goal-first milestone system</span>
              </div>
            </div>
          </div>

          {/* Right Visual Contrast Block: Shift from Old Way to Train Bold Way */}
          <div className="lg:col-span-5">
            <div className="rounded-lg bg-surface border border-surface-border p-6 sm:p-7 relative">
              <div className="text-xs uppercase font-mono tracking-widest text-foreground-subtle pb-3 border-b border-surface-border mb-6 flex justify-between items-center">
                <span>PARADIGM SHIFT</span>
                <span className="text-primary font-bold">2.0</span>
              </div>

              {/* The Old Way */}
              <div className="mb-6 opacity-60">
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 block mb-1">
                  ✕ The Old Fitness App Way
                </span>
                <h4 className="font-display font-bold text-xl uppercase tracking-tight text-foreground mb-1">
                  Passive Activity Ledger
                </h4>
                <p className="text-xs text-foreground-muted">
                  Logs yesterday’s run. Forgets tomorrow’s race. Treats your 40th workout like your 1st.
                </p>
              </div>

              {/* Arrow Divider */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="w-full border-t border-surface-border" />
                <span className="absolute px-3 bg-surface text-primary font-mono text-xs font-bold">
                  VS
                </span>
              </div>

              {/* The Train Bold Way */}
              <div className="p-4 rounded bg-primary/10 border border-primary/30">
                <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold block mb-1">
                  ✓ The Train Bold Way
                </span>
                <h4 className="font-display font-black text-2xl uppercase tracking-tight text-foreground mb-1">
                  Goal-Centered Campaign Engine
                </h4>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  Every split shifts your projected race time. Every milestone unlocks a permanent benchmark. Your training builds compounding momentum.
                </p>
                <div className="mt-3 pt-3 border-t border-primary/20 flex items-center justify-between text-[11px] font-mono text-primary">
                  <span>Race Countdown Active</span>
                  <span className="font-bold flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    Target Locked
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
