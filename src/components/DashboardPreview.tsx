import React, { useState } from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  Share2,
  Calendar,
  MapPin,
  ChevronRight,
  Shield,
  Activity,
} from 'lucide-react';
import { CAMPAIGNS } from '../data/mockData';
import { CampaignData } from '../types';

interface DashboardPreviewProps {
  onOpenAchievementModalWithCampaign: (campaign: CampaignData) => void;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  onOpenAchievementModalWithCampaign,
}) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState('hyrox-berlin');
  const activeCampaign = CAMPAIGNS.find((c) => c.id === selectedCampaignId) || CAMPAIGNS[0];

  return (
    <section id="dashboard-preview" className="py-24 sm:py-32 bg-background border-b border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary mb-3">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            LIVE SAAS DATA TERMINAL MOCK
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-foreground leading-[0.95]">
            THE ATHLETE’S <span className="text-primary">CAMPAIGN VIEW.</span>
          </h2>
          <p className="mt-4 text-base text-foreground-muted font-sans">
            Explore the live interface. Switch between HYROX, Marathon, and Ironman campaigns to test how Train Bold anchors performance to race day.
          </p>

          {/* Campaign Selector Tabs */}
          <div className="mt-8 inline-flex p-1 rounded-lg bg-surface border border-surface-border gap-1 overflow-x-auto max-w-full">
            {CAMPAIGNS.map((camp) => (
              <button
                key={camp.id}
                onClick={() => setSelectedCampaignId(camp.id)}
                className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCampaignId === camp.id
                    ? 'bg-primary text-background font-bold shadow-[0_0_12px_rgba(194,248,53,0.3)]'
                    : 'text-foreground-muted hover:text-foreground hover:bg-surface-raised'
                }`}
              >
                {camp.name.replace('Road to ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* The Big SaaS Terminal Container */}
        <div className="rounded-xl bg-surface border border-surface-border shadow-2xl overflow-hidden">
          
          {/* Top Window Chrome Bar */}
          <div className="px-5 py-3.5 bg-surface-raised border-b border-surface-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="hidden sm:inline font-mono text-xs text-foreground-subtle border-l border-surface-border pl-3">
                TRAIN BOLD OS // CAMPAIGN TELEMETRY ENGINE
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded bg-surface border border-surface-border text-emerald-400 font-mono text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                SYNCED: GARMIN & POLAR
              </span>
              <button
                onClick={() => onOpenAchievementModalWithCampaign(activeCampaign)}
                className="px-3 py-1 rounded bg-primary/20 border border-primary/40 text-primary hover:bg-primary hover:text-background font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Mint PR Card</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Campaign Header Card */}
            <div className="rounded-lg bg-surface-raised border border-surface-border p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Left: Campaign Meta */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded bg-primary text-background font-display font-black text-xs uppercase tracking-wider">
                      {activeCampaign.sport}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-mono text-foreground-muted">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {activeCampaign.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-mono text-foreground-muted">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {activeCampaign.raceDate}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-foreground">
                    {activeCampaign.name}
                  </h3>
                  <p className="text-xs font-mono text-primary mt-1">
                    Current Focus: {activeCampaign.currentBlock}
                  </p>
                </div>

                {/* Right: Race Countdown & Goal Delta */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-surface p-4 rounded-lg border border-surface-border">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-foreground-subtle block mb-0.5">
                      Countdown
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-black text-3xl text-foreground">
                        {activeCampaign.daysToRace}
                      </span>
                      <span className="text-xs font-mono text-foreground-muted uppercase">days</span>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-surface-border hidden sm:block" />

                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-foreground-subtle block mb-0.5">
                      Goal Target
                    </span>
                    <span className="font-display font-black text-3xl text-foreground block">
                      {activeCampaign.goalTime}
                    </span>
                  </div>

                  <div className="h-8 w-px bg-surface-border hidden sm:block" />

                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-foreground-subtle block mb-0.5">
                      Predicted Finish
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-black text-3xl text-primary">
                        {activeCampaign.predictedTime}
                      </span>
                      <span
                        className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          activeCampaign.isAheadOfPace
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {activeCampaign.timeDelta}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Journey Progress Bar */}
              <div className="mt-6 pt-6 border-t border-surface-border">
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-foreground-muted uppercase flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-primary" />
                    CAMPAIGN JOURNEY PROGRESS
                  </span>
                  <span className="text-primary font-bold text-sm">
                    {activeCampaign.journeyProgress}% ROADMAP COMPLETED
                  </span>
                </div>
                <div className="w-full bg-background rounded-full h-3 p-0.5 border border-surface-border overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 via-primary to-primary-hover h-full rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(194,248,53,0.7)]"
                    style={{ width: `${activeCampaign.journeyProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 4 Metric Cards Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">
                  DISCIPLINE TELEMETRY & PRS
                </span>
                <span className="text-xs font-mono text-primary flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  AUTOMATED BENCHMARKS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeCampaign.metrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="p-5 rounded-lg bg-surface-raised border border-surface-border hover:border-surface-borderLight transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                          {metric.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-surface-border text-foreground-muted">
                          {metric.tag}
                        </span>
                      </div>

                      <div className="mb-4">
                        <span className="font-display font-black text-3xl sm:text-4xl text-foreground block leading-tight">
                          {metric.primaryStat}
                        </span>
                        <span className="text-xs font-mono text-foreground-muted uppercase tracking-wider">
                          {metric.primaryLabel}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-surface-border space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-foreground-subtle">{metric.secondaryLabel}:</span>
                        <span className="text-foreground font-semibold">{metric.secondaryStat}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-medium">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{metric.trend}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestone Timeline */}
            <div className="rounded-lg bg-surface-raised border border-surface-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-display font-black text-2xl uppercase tracking-tight text-foreground">
                    CAMPAIGN MILESTONE TIMELINE
                  </h4>
                  <p className="text-xs font-mono text-foreground-muted">
                    Clear progressive checkpoints from base building to race simulation
                  </p>
                </div>
                <button
                  onClick={() => onOpenAchievementModalWithCampaign(activeCampaign)}
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-primary hover:underline uppercase"
                >
                  Create Shareable Card →
                </button>
              </div>

              <div className="relative">
                {/* Horizontal progress guide line (desktop) */}
                <div className="hidden lg:block absolute top-6 left-6 right-6 h-0.5 bg-surface-border -z-0" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
                  {activeCampaign.milestones.map((m, idx) => {
                    const isCompleted = m.status === 'completed';
                    const isInProgress = m.status === 'in_progress';
                    return (
                      <div
                        key={m.id}
                        className={`p-4 rounded-lg border transition-all ${
                          isCompleted
                            ? 'bg-surface border-surface-border'
                            : isInProgress
                            ? 'bg-primary/10 border-primary ring-1 ring-primary/40'
                            : 'bg-surface/50 border-surface-border/40 opacity-70'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono text-foreground-subtle font-bold">
                            STEP 0{idx + 1}
                          </span>
                          {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          {isInProgress && (
                            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                          )}
                          {m.status === 'upcoming' && <Clock className="w-4 h-4 text-foreground-subtle" />}
                        </div>

                        <span className="text-[11px] font-mono text-primary uppercase block mb-1">
                          {m.date}
                        </span>

                        <h5 className="font-display font-bold text-base uppercase tracking-tight text-foreground mb-2 leading-snug">
                          {m.title}
                        </h5>

                        <p className="text-[11px] text-foreground-muted font-sans leading-tight">
                          {m.benchmark}
                        </p>

                        <div className="mt-3 pt-2 border-t border-surface-border text-[10px] font-mono">
                          <span
                            className={`uppercase ${
                              isCompleted
                                ? 'text-emerald-400 font-bold'
                                : isInProgress
                                ? 'text-primary font-bold'
                                : 'text-foreground-subtle'
                            }`}
                          >
                            {isCompleted ? '✓ Completed' : isInProgress ? '⚡ In Progress' : '○ Upcoming'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Callout banner inside terminal */}
            <div className="p-4 rounded bg-surface border border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-xs font-mono text-foreground-muted">
                  Every metric, PR, and milestone in this terminal is ready to be minted as an achievement card.
                </span>
              </div>
              <button
                onClick={() => onOpenAchievementModalWithCampaign(activeCampaign)}
                className="px-4 py-2 rounded bg-primary text-background font-display font-bold uppercase tracking-wider text-xs hover:bg-primary-hover transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Generate Your First Card</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
