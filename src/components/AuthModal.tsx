import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';
import { signInWithEmail, signUpWithEmail } from '../lib/supabaseAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (mode === 'signup') {
        const { user, error } = await signUpWithEmail(email, password, fullName);
        if (error) {
          setErrorMsg(error.message);
        } else if (user) {
          onAuthSuccess(user);
          onClose();
        }
      } else {
        const { user, error } = await signInWithEmail(email, password);
        if (error) {
          setErrorMsg(error.message);
        } else if (user) {
          onAuthSuccess(user);
          onClose();
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleInstantDemo = () => {
    const demoUser = {
      id: 'demo_athlete',
      email: 'demo@trainbold.com',
      user_metadata: { full_name: 'Alex Rivera (Demo Athlete)' },
    };
    localStorage.setItem('train_bold_demo_user', JSON.stringify(demoUser));
    onAuthSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-surface border border-surface-border shadow-2xl p-6 sm:p-8 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-primary text-background flex items-center justify-center font-display font-black text-sm">
              TB
            </div>
            <div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight text-foreground">
                ATHLETE ACCESS
              </h3>
              <p className="text-[10px] font-mono text-primary font-bold">
                {isSupabaseConfigured ? '● SUPABASE AUTH ACTIVE' : '○ INSTANT CLOUD DEMO'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded bg-surface-raised border border-surface-border text-foreground-muted hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 p-1 rounded-lg bg-surface-raised border border-surface-border mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMsg('');
            }}
            className={`py-2 text-xs font-mono uppercase tracking-wider rounded transition-all ${
              mode === 'signin'
                ? 'bg-primary text-background font-bold shadow-md'
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg('');
            }}
            className={`py-2 text-xs font-mono uppercase tracking-wider rounded transition-all ${
              mode === 'signup'
                ? 'bg-primary text-background font-bold shadow-md'
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
                Athlete Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-foreground-subtle absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-surface-raised border border-surface-border text-foreground text-sm font-sans focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-foreground-subtle absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@domain.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-surface-raised border border-surface-border text-foreground text-sm font-sans focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-foreground-subtle absolute left-3 top-3.5" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-surface-raised border border-surface-border text-foreground text-sm font-sans focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-400 font-mono p-2 rounded bg-rose-500/10 border border-rose-500/20">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-background font-display font-black uppercase tracking-wider text-sm hover:bg-primary-hover shadow-[0_0_15px_rgba(194,248,53,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : mode === 'signin' ? 'Sign In to Terminal' : 'Register Athlete Profile'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="w-full border-t border-surface-border" />
          <span className="absolute px-3 bg-surface text-foreground-subtle font-mono text-[11px]">
            OR TEST DRIVE
          </span>
        </div>

        {/* Instant Demo Button */}
        <button
          type="button"
          onClick={handleInstantDemo}
          className="w-full py-2.5 rounded-lg bg-surface-raised border border-primary/40 text-primary hover:bg-primary/10 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all group"
        >
          <Zap className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
          <span>Launch Instant Athlete Demo Mode</span>
        </button>

        <p className="text-[10px] text-foreground-subtle text-center mt-4 font-mono flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          Encrypted authentication via Supabase
        </p>

      </div>
    </div>
  );
};
