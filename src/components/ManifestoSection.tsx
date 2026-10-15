import React from 'react';
import { Quote } from 'lucide-react';

export const ManifestoSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-36 bg-background relative overflow-hidden border-b border-surface-border">
      {/* Background ambient light */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-surface-border text-primary mb-8 shadow-[0_0_20px_rgba(194,248,53,0.15)]">
          <Quote className="w-5 h-5" />
        </div>

        <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-foreground leading-[0.95] mb-8">
          DON’T WAIT FOR RACE DAY TO FEEL LIKE <span className="text-primary">YOU’VE WON.</span>
        </h2>

        <div className="space-y-6 max-w-3xl mx-auto text-base sm:text-lg text-foreground-muted font-sans leading-relaxed">
          <p>
            The medal at the finish line is just metal and ribbon. The real victory was the 5:15 AM alarm on a freezing November Thursday. It was the 4th interval when your lungs burned and you refused to step off the track.
          </p>
          <p>
            It was the strict recovery meal when you were too exhausted to cook, and the brick session you finished when every voice in your head told you to cut it short.
          </p>
          <p className="text-foreground font-semibold">
            That is the race. You are winning it right now. Train Bold exists to make sure every drop of that sweat is tracked, recognized, and remembered.
          </p>
        </div>

        {/* Tactical metrics strip */}
        <div className="mt-12 pt-8 border-t border-surface-border grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono text-center">
          <div>
            <span className="font-display font-black text-3xl sm:text-4xl text-primary block">
              120+
            </span>
            <span className="text-[11px] text-foreground-subtle uppercase tracking-wider">
              Training Days / Block
            </span>
          </div>
          <div>
            <span className="font-display font-black text-3xl sm:text-4xl text-foreground block">
              300+
            </span>
            <span className="text-[11px] text-foreground-subtle uppercase tracking-wider">
              Hours Logged
            </span>
          </div>
          <div>
            <span className="font-display font-black text-3xl sm:text-4xl text-primary block">
              01
            </span>
            <span className="text-[11px] text-foreground-subtle uppercase tracking-wider">
              Race Day Finish
            </span>
          </div>
          <div>
            <span className="font-display font-black text-3xl sm:text-4xl text-foreground block">
              100%
            </span>
            <span className="text-[11px] text-foreground-subtle uppercase tracking-wider">
              Compounding Effort
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
