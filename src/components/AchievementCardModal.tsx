import React, { useState } from 'react';
import { X, Download, Copy, Check, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CampaignData } from '../types';

interface AchievementCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign?: CampaignData | null;
}

export const AchievementCardModal: React.FC<AchievementCardModalProps> = ({
  isOpen,
  onClose,
  campaign,
}) => {
  if (!isOpen) return null;

  const [athleteName, setAthleteName] = useState('ALEX CHEN');
  const [selectedDiscipline, setSelectedDiscipline] = useState('HYROX');
  const [milestoneTitle, setMilestoneTitle] = useState('5K TIME TRIAL PB');
  const [metricValue, setMetricValue] = useState('19:42');
  const [metricLabel, setMetricLabel] = useState('BENCHMARK PACE // -28s GAIN');
  const [copied, setCopied] = useState(false);

  const presets = [
    {
      sport: 'HYROX',
      title: '5K TIME TRIAL PB',
      val: '19:42',
      lbl: 'BENCHMARK PACE // -28s GAIN',
    },
    {
      sport: 'HYROX',
      title: 'SLED PUSH 175KG PB',
      val: '04:12',
      lbl: 'BERLIN SIMULATION // 8/8 STATIONS',
    },
    {
      sport: 'MARATHON',
      title: 'HALF MARATHON TUNE-UP PB',
      val: '01:24:18',
      lbl: 'SUB-3:00 PREDICTOR LOCKED',
    },
    {
      sport: 'IRONMAN',
      title: 'FTP POWER BREAKTHROUGH',
      val: '285 W',
      lbl: '20MIN RAMP TEST // +12W GAIN',
    },
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    setSelectedDiscipline(p.sport);
    setMilestoneTitle(p.title);
    setMetricValue(p.val);
    setMetricLabel(p.lbl);
  };

  const handleCopy = () => {
    const text = `🏆 TRAIN BOLD ACHIEVEMENT CERTIFICATE\nAthlete: ${athleteName}\nEvent: ${campaign?.name || 'Road to Race Day'}\nMilestone: ${milestoneTitle} (${metricValue})\nDetails: ${metricLabel}\n\nTracked with Train Bold — Your race is one day. Your training is every day.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#c2f835', '#ffffff', '#22c55e'],
    });
    alert('Achievement Card generated! Image export ready for Instagram, Strava, and WhatsApp.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-xl bg-surface border border-surface-border shadow-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="font-display font-black text-2xl uppercase tracking-tight text-foreground">
              SHAREABLE ACHIEVEMENT CARD MINTING
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded bg-surface-raised border border-surface-border text-foreground-muted hover:text-foreground hover:border-surface-borderLight transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1.5">
                Quick Preset
              </label>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className="p-2 text-left rounded bg-surface-raised border border-surface-border hover:border-primary/50 text-xs font-mono text-foreground-muted hover:text-foreground transition-all"
                  >
                    <span className="text-[10px] text-primary block">{p.sport}</span>
                    <span className="truncate block font-bold text-foreground">{p.val}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
                Athlete Name
              </label>
              <input
                type="text"
                value={athleteName}
                onChange={(e) => setAthleteName(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 rounded bg-surface-raised border border-surface-border text-foreground text-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
                  Discipline
                </label>
                <input
                  type="text"
                  value={selectedDiscipline}
                  onChange={(e) => setSelectedDiscipline(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 rounded bg-surface-raised border border-surface-border text-foreground text-sm font-mono focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
                  Metric Value
                </label>
                <input
                  type="text"
                  value={metricValue}
                  onChange={(e) => setMetricValue(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-surface-raised border border-surface-border text-foreground text-sm font-mono focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
                Milestone Title
              </label>
              <input
                type="text"
                value={milestoneTitle}
                onChange={(e) => setMilestoneTitle(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 rounded bg-surface-raised border border-surface-border text-foreground text-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
                Label / Context
              </label>
              <input
                type="text"
                value={metricLabel}
                onChange={(e) => setMetricLabel(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 rounded bg-surface-raised border border-surface-border text-foreground text-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={handleDownload}
                className="flex-1 py-2.5 rounded bg-primary text-background font-display font-bold uppercase tracking-wider text-xs hover:bg-primary-hover transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(194,248,53,0.3)]"
              >
                <Download className="w-4 h-4" />
                <span>Export Image</span>
              </button>
              <button
                onClick={handleCopy}
                className="px-3 py-2.5 rounded bg-surface-raised border border-surface-border text-foreground hover:text-primary text-xs font-mono uppercase flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Card Preview Column */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-md rounded-2xl bg-[#0b100d] border-2 border-primary p-7 relative shadow-[0_0_50px_rgba(194,248,53,0.2)] text-foreground overflow-hidden">
              
              {/* Tactical background grid */}
              <div className="absolute inset-0 bg-tactical-grid opacity-30 pointer-events-none" />

              {/* Watermark brand text */}
              <div className="absolute -right-8 -bottom-10 font-display font-black text-9xl text-white/[0.03] select-none pointer-events-none">
                BOLD
              </div>

              {/* Top Card Bar */}
              <div className="flex items-center justify-between border-b border-primary/20 pb-4 mb-6 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-primary text-background font-display font-black text-sm flex items-center justify-center">
                    TB
                  </div>
                  <div>
                    <span className="font-display font-black text-lg tracking-wider block leading-none">
                      TRAIN BOLD
                    </span>
                    <span className="text-[9px] font-mono tracking-widest text-primary uppercase">
                      VERIFIED TELEMETRY
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-mono text-[10px] font-bold uppercase">
                    {selectedDiscipline}
                  </span>
                </div>
              </div>

              {/* Athlete & Campaign Info */}
              <div className="mb-6 relative z-10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-foreground-subtle block">
                  OFFICIAL ATHLETE
                </span>
                <h4 className="font-display font-black text-2xl uppercase tracking-tight text-foreground">
                  {athleteName || 'ATHLETE'}
                </h4>
                <p className="text-xs font-mono text-primary mt-0.5">
                  {campaign?.name || 'ROAD TO HYROX BERLIN'}
                </p>
              </div>

              {/* Big Stat Box */}
              <div className="my-6 p-5 rounded-xl bg-surface border border-primary/30 relative z-10 text-center">
                <span className="text-xs font-mono uppercase tracking-widest text-foreground-subtle block mb-1">
                  {milestoneTitle}
                </span>
                <span className="font-display font-black text-6xl text-primary block tracking-tight leading-none my-2 drop-shadow-[0_0_20px_rgba(194,248,53,0.4)]">
                  {metricValue}
                </span>
                <span className="text-xs font-mono text-foreground-muted uppercase tracking-wider block">
                  {metricLabel}
                </span>
              </div>

              {/* Bottom Card Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-primary/20 relative z-10 text-[10px] font-mono text-foreground-subtle">
                <div className="flex flex-col">
                  <span>TIMESTAMP: {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                  <span className="text-primary">BENCHMARK CERTIFIED</span>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>TRAINBOLD.COM</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
