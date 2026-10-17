import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Flame, Timer, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveWaitlistEmail } from '../lib/storage';

interface HeroProps {
  onSignupSuccess?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSignupSuccess }) => {
  const [email, setEmail] = useState('');
  const [selectedSport, setSelectedSport] = useState('HYROX');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const sports = ['HYROX', 'Marathon', 'Ironman 70.3', 'Triathlon', 'Ultra'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const result = await saveWaitlistEmail(email, selectedSport);
      if (result.success) {
        setStatus('success');
        setFeedbackMessage(result.message);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#c2f835', '#ffffff', '#22c55e', '#a3e635'],
        });
        if (onSignupSuccess) onSignupSuccess();
      } else {
        setStatus('error');
        setFeedbackMessage(result.message);
      }
    } catch {
      setStatus('error');
      setFeedbackMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-background bg-tactical-grid">
      {/* Radial glow background effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-0 w-96 h-96 bg-emerald-900/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Value Proposition & Capture Form */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-surface-border text-xs font-mono text-foreground-muted mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="text-foreground tracking-wider uppercase">PRE-LAUNCH ACCESS // OCTOBER 2026</span>
              <span className="text-primary font-bold">V1.0</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-foreground uppercase leading-[0.92] mb-6">
              YOUR RACE IS <span className="text-primary">ONE DAY.</span><br />
              YOUR TRAINING IS <span className="text-foreground">EVERY DAY.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-foreground-muted max-w-2xl font-normal leading-relaxed mb-8">
              Endurance and hybrid athletes spend months in the dark for a single finish line.
              Train Bold turns every interval, nutrition target, and milestone into visible,
              celebrated daily momentum.
            </p>

            {/* Sport selector chips */}
            <div className="mb-6 w-full">
              <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-2">
                Select Your Focus:
              </label>
              <div className="flex flex-wrap gap-2">
                {sports.map((sport) => (
                  <button
                    key={sport}
                    type="button"
                    onClick={() => setSelectedSport(sport)}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-all ${
                      selectedSport === sport
                        ? 'bg-primary text-background border-primary font-bold shadow-[0_0_12px_rgba(194,248,53,0.3)]'
                        : 'bg-surface text-foreground-muted border-surface-border hover:border-surface-borderLight hover:text-foreground'
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Signup Form or Success State */}
            <div className="w-full max-w-xl">
              {status === 'success' ? (
                <div className="p-5 rounded-lg bg-surface border border-primary/40 text-foreground flex items-start gap-3.5 shadow-[0_0_30px_rgba(194,248,53,0.15)] animate-in fade-in zoom-in-95">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display font-bold text-xl uppercase tracking-wide text-foreground">
                      You are locked in.
                    </h3>
                    <p className="text-sm text-foreground-muted mt-1 leading-snug">
                      {feedbackMessage} You will receive early access before the public launch for{' '}
                      <span className="text-primary font-bold">{selectedSport}</span>.
                    </p>
                    <button
                      onClick={() => {
                        setStatus('idle');
                        setEmail('');
                      }}
                      className="mt-3 text-xs uppercase tracking-wider font-mono text-primary hover:underline"
                    >
                      Enter another email
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-grow">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your athlete email..."
                      required
                      className="w-full px-4 py-3.5 rounded bg-surface border border-surface-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-sans transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-6 py-3.5 rounded bg-primary text-background font-display font-black uppercase tracking-wider text-base hover:bg-primary-hover hover:shadow-[0_0_25px_rgba(194,248,53,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 group whitespace-nowrap"
                  >
                    <span>{status === 'loading' ? 'Joining...' : 'Get Early Access'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}

              {status === 'error' && (
                <p className="mt-2 text-xs text-rose-400 font-mono flex items-center gap-1">
                  {feedbackMessage}
                </p>
              )}

              {/* Credibility statement without fake counters */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-foreground-subtle font-mono">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  Encrypted telemetry
                </span>
                <span className="hidden sm:inline text-surface-border">|</span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  Free founder tier
                </span>
                <span className="hidden sm:inline text-surface-border">|</span>
                <a
                  href="#app"
                  className="text-primary hover:underline font-bold flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>Launch Live App Terminal →</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Floating Mini Dashboard Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg bg-surface border border-surface-border shadow-2xl p-5 md:p-6 backdrop-blur-xl">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-surface-border pb-3.5 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-foreground-muted font-bold">
                    ACTIVE CAMPAIGN TELEMETRY
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary font-mono text-[11px] font-bold">
                  BERLIN '27
                </span>
              </div>

              {/* Campaign Title & Target */}
              <div className="mb-5">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs uppercase font-mono tracking-widest text-foreground-subtle">Target Event</span>
                  <span className="text-xs font-mono text-primary flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5" />
                    126 DAYS OUT
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-foreground">
                  ROAD TO HYROX BERLIN
                </h3>
                <p className="text-xs text-foreground-muted font-mono mt-0.5">
                  Official Men Open Pro Division • Feb 19
                </p>
              </div>

              {/* Journey Progress Bar */}
              <div className="p-3.5 rounded bg-surface-raised border border-surface-border mb-5">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-foreground-muted uppercase">Campaign Journey</span>
                  <span className="text-primary font-bold">68% COMPLETE</span>
                </div>
                <div className="w-full bg-background rounded-full h-2 overflow-hidden border border-surface-border">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(194,248,53,0.8)]"
                    style={{ width: '68%' }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-foreground-subtle font-mono mt-1.5">
                  <span>Base Built</span>
                  <span className="text-foreground font-semibold">Sim Phase (Current)</span>
                  <span>Taper & Race</span>
                </div>
              </div>

              {/* Mini PR & Metric Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                <div className="p-3 rounded bg-surface-card border border-surface-border">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-foreground-subtle block mb-1">
                    Target Time
                  </span>
                  <span className="font-display font-black text-2xl text-foreground block leading-none">
                    01:25:00
                  </span>
                  <span className="text-[10px] font-mono text-primary mt-1 block">
                    Predicted: 01:29:42
                  </span>
                </div>

                <div className="p-3 rounded bg-surface-card border border-surface-border">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-foreground-subtle block mb-1">
                    Latest Milestone
                  </span>
                  <span className="font-display font-black text-2xl text-primary block leading-none">
                    19:42
                  </span>
                  <span className="text-[10px] font-mono text-foreground-muted mt-1 block">
                    5K Time Trial PB (-28s)
                  </span>
                </div>
              </div>

              {/* Floating Benchmark Card Badge */}
              <div className="p-3 rounded bg-surface-raised border border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-foreground-subtle block">
                      Consistency Streak
                    </span>
                    <span className="text-xs font-bold font-mono text-foreground">
                      24 Consecutive Days Logged
                    </span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-primary text-background font-black">
                  ACTIVE
                </span>
              </div>

            </div>

            {/* Decorative Corner accents */}
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-primary pointer-events-none" />
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-primary/40 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};
