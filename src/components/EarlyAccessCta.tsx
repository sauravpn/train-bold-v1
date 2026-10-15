import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveWaitlistEmail } from '../lib/storage';

interface EarlyAccessCtaProps {
  onSignupSuccess?: () => void;
}

export const EarlyAccessCta: React.FC<EarlyAccessCtaProps> = ({ onSignupSuccess }) => {
  const [email, setEmail] = useState('');
  const [sport, setSport] = useState('HYROX');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const sports = ['HYROX', 'Marathon', 'Ironman 70.3', 'Triathlon', 'Trail / Ultra'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await saveWaitlistEmail(email, sport);
      if (res.success) {
        setStatus('success');
        setMessage(res.message);
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.8 },
          colors: ['#c2f835', '#080d0a', '#ffffff'],
        });
        if (onSignupSuccess) onSignupSuccess();
      } else {
        setStatus('error');
        setMessage(res.message);
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="early-access" className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The High-Impact Acid Lime Banner Container */}
        <div className="relative rounded-2xl bg-primary text-background p-8 sm:p-12 lg:p-16 shadow-[0_0_60px_rgba(194,248,53,0.3)] overflow-hidden">
          
          {/* Tactical Background Patterns */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none select-none font-display font-black text-9xl text-background leading-none overflow-hidden flex items-center justify-end pr-8">
            BOLD
          </div>

          <div className="relative z-10 max-w-3xl">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-background text-primary font-mono text-xs font-bold uppercase tracking-wider mb-6">
              <Zap className="w-3.5 h-3.5" />
              <span>FOUNDING ATHLETE ACCESS</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-background leading-[0.92] mb-6">
              BE READY FOR YOUR NEXT START LINE.
            </h2>

            <p className="text-base sm:text-xl font-medium text-background/85 mb-8 max-w-2xl leading-relaxed">
              We are inviting the first cohort of dedicated endurance athletes to experience Train Bold.
              Lock in early access, shape the roadmap, and never let your hard work go unmeasured again.
            </p>

            {/* Sport Interest Chips */}
            <div className="mb-6">
              <label className="block text-xs font-mono uppercase tracking-widest text-background/70 mb-2 font-bold">
                Your Primary Discipline:
              </label>
              <div className="flex flex-wrap gap-2">
                {sports.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSport(s)}
                    className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                      sport === s
                        ? 'bg-background text-primary font-bold shadow-md'
                        : 'bg-background/15 text-background hover:bg-background/25'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            {status === 'success' ? (
              <div className="p-6 rounded-xl bg-background text-foreground flex items-start gap-4 shadow-xl animate-in zoom-in-95">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-black text-2xl uppercase tracking-wide text-foreground">
                    Spot Secured on Early Access List
                  </h4>
                  <p className="text-sm text-foreground-muted mt-1">
                    {message} We will notify you at <span className="text-primary font-mono">{email}</span> as soon as invites roll out.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setEmail('');
                    }}
                    className="mt-3 text-xs uppercase font-mono text-primary hover:underline"
                  >
                    Sign up with another email
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="px-4 py-4 rounded-lg bg-background text-foreground placeholder:text-foreground-subtle text-sm font-sans focus:outline-none focus:ring-2 focus:ring-background flex-grow"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-8 py-4 rounded-lg bg-background text-foreground font-display font-black uppercase tracking-wider text-base hover:bg-surface-raised hover:text-primary transition-all flex items-center justify-center gap-2 group whitespace-nowrap shadow-lg active:scale-95"
                >
                  <span>{status === 'loading' ? 'Securing...' : 'Claim Early Access'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="mt-2 text-xs font-mono text-rose-950 bg-rose-200/60 px-3 py-1 rounded inline-block">
                {message}
              </p>
            )}

            <div className="mt-6 flex items-center gap-4 text-xs font-mono text-background/80">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Strictly zero spam. Unsubscribe anytime.
              </span>
              <span>•</span>
              <span>Direct access to the founders</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
