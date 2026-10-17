import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, Database } from 'lucide-react';
import { getLocalWaitlistEmails } from '../lib/storage';

interface HeaderProps {
  onOpenWaitlistAdmin: () => void;
  onOpenAchievementModal: () => void;
  onLaunchApp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWaitlistAdmin,
  onOpenAchievementModal,
  onLaunchApp,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    setWaitlistCount(getLocalWaitlistEmails().length);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-surface-border py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Mark */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-primary text-background flex items-center justify-center font-display font-black text-xl tracking-tighter group-hover:scale-105 transition-transform">
              TB
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl tracking-tight text-foreground flex items-center gap-1.5 leading-none">
                TRAIN BOLD
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-foreground-muted">
                Endurance Data Terminal
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground-muted">
            <a href="#features" className="hover:text-primary transition-colors uppercase tracking-wider text-xs">
              Platform Pillars
            </a>
            <a href="#dashboard-preview" className="hover:text-primary transition-colors uppercase tracking-wider text-xs">
              Terminal Preview
            </a>
            <a href="#how-it-works" className="hover:text-primary transition-colors uppercase tracking-wider text-xs">
              How It Works
            </a>
            <button
              onClick={onOpenAchievementModal}
              className="text-xs uppercase tracking-wider text-foreground-muted hover:text-primary transition-colors flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5 text-primary" />
              PR Card Creator
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenWaitlistAdmin}
              title="View waitlist list"
              className="px-2.5 py-1.5 rounded bg-surface border border-surface-border text-foreground-muted hover:text-foreground text-xs font-mono flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5 text-primary" />
              <span>Waitlist</span>
              {waitlistCount > 0 && (
                <span className="px-1.5 py-0.2 bg-primary/20 text-primary font-bold rounded-sm text-[10px]">
                  {waitlistCount}
                </span>
              )}
            </button>

            {/* Launch App Button */}
            <button
              onClick={onLaunchApp}
              className="px-4 py-2 rounded bg-primary text-background font-display font-black uppercase tracking-wider text-sm hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(194,248,53,0.35)] transition-all flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 fill-background" />
              <span>Launch App</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onLaunchApp}
              className="px-2.5 py-1 rounded bg-primary text-background font-mono text-xs font-bold uppercase"
            >
              App
            </button>
            <button
              onClick={onOpenWaitlistAdmin}
              className="p-2 rounded bg-surface border border-surface-border text-foreground-muted hover:text-foreground"
            >
              <Database className="w-4 h-4 text-primary" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-surface border border-surface-border text-foreground hover:text-primary transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-lg bg-surface-raised border border-surface-border flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLaunchApp();
              }}
              className="w-full text-center py-2.5 rounded bg-primary text-background font-display font-black uppercase tracking-wider text-sm flex items-center justify-center gap-1.5"
            >
              <Zap className="w-4 h-4 fill-background" />
              <span>Launch Training App</span>
            </button>

            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-foreground-muted hover:text-primary py-1 uppercase tracking-wider"
            >
              Platform Pillars
            </a>
            <a
              href="#dashboard-preview"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-foreground-muted hover:text-primary py-1 uppercase tracking-wider"
            >
              Terminal Preview
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-foreground-muted hover:text-primary py-1 uppercase tracking-wider"
            >
              How It Works
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAchievementModal();
              }}
              className="text-left text-sm font-medium text-foreground-muted hover:text-primary py-1 uppercase tracking-wider flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-primary" />
              PR Card Creator
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
