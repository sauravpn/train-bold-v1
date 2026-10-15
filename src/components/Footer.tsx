import React from 'react';
import { ArrowUp, Database } from 'lucide-react';

interface FooterProps {
  onOpenWaitlistAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWaitlistAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-surface-border py-16 text-foreground-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-surface-border">
          
          {/* Brand & Tagline */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a href="#" className="flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 rounded bg-primary text-background flex items-center justify-center font-display font-black text-xl tracking-tighter">
                TB
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-foreground uppercase">
                TRAIN BOLD
              </span>
            </a>

            <p className="font-display font-bold text-xl uppercase tracking-tight text-foreground mb-3">
              YOUR RACE IS ONE DAY. YOUR TRAINING IS EVERY DAY.
            </p>

            <p className="text-sm text-foreground-muted max-w-sm font-sans leading-relaxed">
              The endurance and hybrid platform engineered to connect multi-sport metrics, progressive race campaigns, nutrition fuel, and milestone PR celebrations.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-foreground font-bold mb-4">
              PLATFORM NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a href="#features" className="hover:text-primary transition-colors uppercase">
                  Four Core Pillars
                </a>
              </li>
              <li>
                <a href="#dashboard-preview" className="hover:text-primary transition-colors uppercase">
                  Campaign Terminal Mock
                </a>
              </li>
              <li>
                <a href="#vision" className="hover:text-primary transition-colors uppercase">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-primary transition-colors uppercase">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#early-access" className="hover:text-primary transition-colors uppercase">
                  Early Access Access List
                </a>
              </li>
            </ul>
          </div>

          {/* Supported Sports */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-foreground font-bold mb-4">
              ENGINEERED FOR
            </h4>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-surface border border-surface-border text-foreground">
                HYROX & Deka
              </span>
              <span className="px-2.5 py-1 rounded bg-surface border border-surface-border text-foreground">
                Marathon (World Majors)
              </span>
              <span className="px-2.5 py-1 rounded bg-surface border border-surface-border text-foreground">
                Ironman 70.3 & 140.6
              </span>
              <span className="px-2.5 py-1 rounded bg-surface border border-surface-border text-foreground">
                Olympic & Sprint Triathlons
              </span>
              <span className="px-2.5 py-1 rounded bg-surface border border-surface-border text-foreground">
                Ultra-Endurance Trail
              </span>
            </div>

            <div className="mt-6 pt-4 border-t border-surface-border flex items-center gap-3">
              <button
                onClick={onOpenWaitlistAdmin}
                className="text-xs font-mono text-foreground-subtle hover:text-primary flex items-center gap-1.5 transition-colors"
              >
                <Database className="w-3.5 h-3.5 text-primary" />
                <span>Export Waitlist Signups (Local DB)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-foreground-subtle">
          <div>
            © {new Date().getFullYear()} TRAIN BOLD Inc. Pre-Launch Build v1.0. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Built with React 19 & Tailwind CSS</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors uppercase"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
