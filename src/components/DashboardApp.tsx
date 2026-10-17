import React, { useState, useEffect } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Flame,
  Timer,
  Award,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  MapPin,
  User,
  LogOut,
  Target,
  ArrowRight,
  Home,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserCampaign, Workout } from '../types';
import {
  getUserCampaigns,
  getActiveCampaignId,
  setActiveCampaignId,
  toggleWorkoutCompleted,
  addCustomWorkoutToWeek,
  getCurrentAthlete,
  signOutAthlete,
} from '../lib/supabaseAuth';
import { PlanBuilderModal } from './PlanBuilderModal';
import { WorkoutDetailModal } from './WorkoutDetailModal';
import { AddCustomWorkoutModal } from './AddCustomWorkoutModal';
import { PaceCalculatorModal } from './PaceCalculatorModal';
import { FuelCalculatorModal } from './FuelCalculatorModal';
import { AchievementCardModal } from './AchievementCardModal';
import { AuthModal } from './AuthModal';

interface DashboardAppProps {
  onBackToLanding: () => void;
}

export const DashboardApp: React.FC<DashboardAppProps> = ({ onBackToLanding }) => {
  const [campaigns, setCampaigns] = useState<UserCampaign[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<UserCampaign | null>(null);
  const [selectedWeekNumber, setSelectedWeekNumber] = useState(1);
  const [user, setUser] = useState<any>(null);

  // Modals state
  const [isPlanBuilderOpen, setIsPlanBuilderOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isAddWorkoutOpen, setIsAddWorkoutOpen] = useState(false);
  const [isPaceCalcOpen, setIsPaceCalcOpen] = useState(false);
  const [isFuelCalcOpen, setIsFuelCalcOpen] = useState(false);
  const [isAchievementOpen, setIsAchievementOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Load campaigns and active campaign
  useEffect(() => {
    loadData();
    getCurrentAthlete().then((u) => setUser(u));
  }, []);

  const loadData = async () => {
    const all = await getUserCampaigns();
    setCampaigns(all);
    const activeId = getActiveCampaignId();
    const found = all.find((c) => c.id === activeId) || all[0];
    setActiveCampaign(found || null);
    if (found) {
      setSelectedWeekNumber(found.currentWeekNumber || 1);
    }
  };

  const handleSelectCampaign = (camp: UserCampaign) => {
    setActiveCampaign(camp);
    setActiveCampaignId(camp.id);
    setSelectedWeekNumber(camp.currentWeekNumber || 1);
  };

  const handleWorkoutComplete = async (
    workoutId: string,
    actuals: { actualDistanceKm?: number; actualDuration?: string; feeling?: Workout['feeling']; notes?: string }
  ) => {
    if (!activeCampaign) return;
    const updated = await toggleWorkoutCompleted(activeCampaign.id, workoutId, actuals);
    if (updated) {
      setActiveCampaign(updated);
      setCampaigns((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#c2f835', '#ffffff', '#22c55e'],
      });
    }
  };

  const handleAddCustomWorkout = async (
    weekNum: number,
    data: Omit<Workout, 'id' | 'campaignId' | 'weekNumber' | 'completed'>
  ) => {
    if (!activeCampaign) return;
    const updated = await addCustomWorkoutToWeek(activeCampaign.id, weekNum, data);
    if (updated) {
      setActiveCampaign(updated);
      setCampaigns((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    }
  };

  const handlePlanCreated = (newCamp: UserCampaign) => {
    setActiveCampaign(newCamp);
    setActiveCampaignId(newCamp.id);
    setSelectedWeekNumber(1);
    setCampaigns((prev) => [newCamp, ...prev]);
  };

  const handleSignOut = async () => {
    await signOutAthlete();
    setUser(null);
    loadData();
  };

  if (!activeCampaign) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="font-mono text-sm text-foreground-muted">Loading your race terminal...</p>
        </div>
      </div>
    );
  }

  const currentWeek = activeCampaign.weeks.find((w) => w.weekNumber === selectedWeekNumber) || activeCampaign.weeks[0];

  // Calculate days to race
  const today = new Date();
  const raceDateObj = new Date(activeCampaign.raceDate);
  const diffDays = Math.max(0, Math.ceil((raceDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  // Completed workouts count
  const allWorkouts = activeCampaign.weeks.flatMap((w) => w.workouts).filter((w) => w.workoutType !== 'rest');
  const completedWorkouts = allWorkouts.filter((w) => w.completed).length;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-background">
      
      {/* TOP NAVIGATION CHROME BAR */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-surface-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left Brand & Home */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToLanding}
              title="Return to Public Landing Page"
              className="p-2 rounded bg-surface-raised border border-surface-border text-foreground-muted hover:text-foreground hover:border-primary/50 transition-all flex items-center gap-1.5 text-xs font-mono"
            >
              <Home className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">Landing</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary text-background flex items-center justify-center font-display font-black text-xl">
                TB
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-foreground uppercase hidden md:inline">
                TRAIN BOLD <span className="text-primary font-mono text-xs font-bold">OS</span>
              </span>
            </div>
          </div>

          {/* Center Campaign Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={activeCampaign.id}
              onChange={(e) => {
                const found = campaigns.find((c) => c.id === e.target.value);
                if (found) handleSelectCampaign(found);
              }}
              className="px-3 py-1.5 rounded-lg bg-surface-raised border border-surface-border text-foreground font-mono text-xs uppercase tracking-wider focus:outline-none focus:border-primary"
            >
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.sport})
                </option>
              ))}
            </select>

            <button
              onClick={() => setIsPlanBuilderOpen(true)}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-primary text-background font-display font-bold text-xs uppercase hover:bg-primary-hover flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Race</span>
            </button>
          </div>

          {/* Right Action Tools & Profile */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaceCalcOpen(true)}
              title="Pace Calculator"
              className="p-2 rounded bg-surface-raised border border-surface-border text-foreground-muted hover:text-primary transition-all text-xs font-mono hidden lg:flex items-center gap-1"
            >
              <Timer className="w-3.5 h-3.5 text-primary" />
              <span>Paces</span>
            </button>

            <button
              onClick={() => setIsFuelCalcOpen(true)}
              title="Fuel Strategy"
              className="p-2 rounded bg-surface-raised border border-surface-border text-foreground-muted hover:text-primary transition-all text-xs font-mono hidden lg:flex items-center gap-1"
            >
              <Flame className="w-3.5 h-3.5 text-primary" />
              <span>Fuel</span>
            </button>

            <button
              onClick={() => setIsAchievementOpen(true)}
              title="Mint PR Card"
              className="p-2 rounded bg-surface-raised border border-surface-border text-foreground-muted hover:text-primary transition-all text-xs font-mono flex items-center gap-1"
            >
              <Award className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">PR Card</span>
            </button>

            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-surface-border">
                <span className="text-xs font-mono text-foreground hidden sm:inline font-bold">
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </span>
                <button
                  onClick={handleSignOut}
                  title="Sign out"
                  className="p-1.5 rounded bg-surface-raised text-foreground-muted hover:text-rose-400"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-3 py-1.5 rounded bg-surface-raised border border-primary/40 text-primary hover:bg-primary hover:text-background font-mono text-xs uppercase transition-all flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* MAIN APP CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* HERO CAMPAIGN TELEMETRY HEADER */}
        <div className="rounded-2xl bg-surface border border-surface-border p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Campaign Meta */}
            <div className="lg:col-span-7">
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
                  {new Date(activeCampaign.raceDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                </span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-foreground">
                {activeCampaign.name}
              </h1>

              <p className="text-xs font-mono text-primary mt-1">
                Baseline 5K: {activeCampaign.current5kTime} • Routine: {activeCampaign.daysPerWeek} Days/week (Key Long Run: {activeCampaign.longRunDay})
              </p>
            </div>

            {/* Right: Countdown & Stats */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-3 p-4 rounded-xl bg-surface-raised border border-surface-border text-center">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-foreground-subtle block mb-0.5">
                  Countdown
                </span>
                <span className="font-display font-black text-3xl text-primary block leading-none">
                  {diffDays}
                </span>
                <span className="text-[10px] font-mono text-foreground-muted uppercase">days out</span>
              </div>

              <div className="border-x border-surface-border">
                <span className="text-[10px] uppercase font-mono tracking-widest text-foreground-subtle block mb-0.5">
                  Goal Target
                </span>
                <span className="font-display font-black text-3xl text-foreground block leading-none">
                  {activeCampaign.goalTime}
                </span>
                <span className="text-[10px] font-mono text-foreground-muted uppercase">race pace</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-foreground-subtle block mb-0.5">
                  Sessions Done
                </span>
                <span className="font-display font-black text-3xl text-emerald-400 block leading-none">
                  {completedWorkouts} <span className="text-xs font-mono text-foreground-subtle">/ {allWorkouts.length}</span>
                </span>
                <span className="text-[10px] font-mono text-foreground-muted uppercase">workouts</span>
              </div>
            </div>

          </div>

          {/* Journey Progress Bar */}
          <div className="mt-6 pt-6 border-t border-surface-border">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-foreground-muted uppercase flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                CAMPAIGN ROADMAP COMPLETION
              </span>
              <span className="text-primary font-bold text-sm">
                {activeCampaign.journeyProgress}% PROGRESS LOCKED
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

        {/* WEEK SELECTION & ACTIONS BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              disabled={selectedWeekNumber <= 1}
              onClick={() => setSelectedWeekNumber(selectedWeekNumber - 1)}
              className="p-2 rounded bg-surface border border-surface-border text-foreground-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-black text-2xl uppercase tracking-tight text-foreground">
                  WEEK {selectedWeekNumber} OF {activeCampaign.totalWeeks}
                </h2>
                <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-mono text-[10px] font-bold uppercase">
                  {currentWeek.phase}
                </span>
              </div>
              <p className="text-xs font-mono text-foreground-muted">
                {currentWeek.focus} • Target Volume: {currentWeek.targetWeeklyVolumeKm} km
              </p>
            </div>

            <button
              disabled={selectedWeekNumber >= activeCampaign.totalWeeks}
              onClick={() => setSelectedWeekNumber(selectedWeekNumber + 1)}
              className="p-2 rounded bg-surface border border-surface-border text-foreground-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddWorkoutOpen(true)}
              className="px-3 py-2 rounded bg-surface-raised border border-surface-border hover:border-primary text-xs font-mono uppercase text-foreground hover:text-primary flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-primary" />
              <span>Add Custom Session</span>
            </button>

            <button
              onClick={() => setIsPaceCalcOpen(true)}
              className="px-3 py-2 rounded bg-surface-raised border border-surface-border hover:border-primary text-xs font-mono uppercase text-foreground hover:text-primary flex items-center gap-1.5 transition-all"
            >
              <Timer className="w-3.5 h-3.5 text-primary" />
              <span>View Splits</span>
            </button>
          </div>
        </div>

        {/* WORKOUTS GRID (7 DAYS OF THE WEEK) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
          {currentWeek.workouts.map((workout) => {
            const isCompleted = workout.completed;
            const isRest = workout.workoutType === 'rest';

            return (
              <div
                key={workout.id}
                onClick={() => setSelectedWorkout(workout)}
                className={`cursor-pointer rounded-xl p-4 border transition-all duration-200 flex flex-col justify-between group ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-500'
                    : isRest
                    ? 'bg-surface/50 border-surface-border/50 opacity-70 hover:opacity-100 hover:border-surface-border'
                    : 'bg-surface border-surface-border hover:border-primary hover:bg-surface-raised shadow-lg'
                }`}
              >
                <div>
                  {/* Card Header: Day & Status */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-foreground uppercase">
                      {workout.dayName}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWorkoutComplete(workout.id, {});
                      }}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 text-background'
                          : 'bg-surface-raised border border-surface-border text-foreground-subtle hover:text-primary hover:border-primary'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4 stroke-[2.5]" /> : <Clock className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Workout Type Badge */}
                  <span
                    className={`inline-block text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold mb-2 ${
                      workout.workoutType === 'intervals'
                        ? 'bg-amber-500/20 text-amber-400'
                        : workout.workoutType === 'tempo'
                        ? 'bg-rose-500/20 text-rose-400'
                        : workout.workoutType === 'long_run'
                        ? 'bg-primary/20 text-primary'
                        : workout.workoutType === 'hyrox_strength'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-surface border border-surface-border text-foreground-subtle'
                    }`}
                  >
                    {workout.workoutType.replace('_', ' ')}
                  </span>

                  {/* Title */}
                  <h4 className="font-display font-bold text-base uppercase tracking-tight text-foreground line-clamp-2 leading-snug mb-2 group-hover:text-primary transition-colors">
                    {workout.title}
                  </h4>

                  {/* Distance & Pace */}
                  {!isRest && (
                    <div className="space-y-1 text-xs font-mono">
                      <div className="text-foreground font-black font-display text-lg">
                        {workout.distanceKm} <span className="text-[10px] font-mono text-foreground-muted font-normal">KM</span>
                      </div>
                      <div className="text-primary text-[11px] font-semibold">
                        {workout.targetPace}
                      </div>
                    </div>
                  )}

                  {isRest && (
                    <p className="text-[11px] text-foreground-subtle font-sans leading-tight">
                      Rest & Mobility day
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-2 border-t border-surface-border/60 text-[10px] font-mono text-foreground-subtle flex items-center justify-between">
                  <span>{workout.targetDuration}</span>
                  <span className="text-primary group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* MILESTONE CHECKPOINTS STRIP */}
        <div className="rounded-2xl bg-surface border border-surface-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-black text-2xl uppercase tracking-tight text-foreground flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              CAMPAIGN BENCHMARK MILESTONES
            </h3>
            <button
              onClick={() => setIsAchievementOpen(true)}
              className="text-xs font-mono text-primary hover:underline uppercase flex items-center gap-1"
            >
              <span>Mint PR Achievement Card</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {activeCampaign.milestones.map((m, idx) => (
              <div
                key={m.id || idx}
                className={`p-4 rounded-xl border transition-all ${
                  m.status === 'completed'
                    ? 'bg-surface-raised border-emerald-500/40'
                    : m.status === 'in_progress'
                    ? 'bg-primary/10 border-primary ring-1 ring-primary/40'
                    : 'bg-surface-card border-surface-border opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-foreground-subtle font-bold">
                    STEP 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-primary uppercase font-bold">
                    {m.date}
                  </span>
                </div>
                <h5 className="font-display font-bold text-sm uppercase tracking-tight text-foreground mb-1 leading-snug">
                  {m.title}
                </h5>
                <p className="text-[11px] text-foreground-muted font-sans leading-tight">
                  {m.benchmark}
                </p>
                <div className="mt-3 pt-2 border-t border-surface-border text-[10px] font-mono">
                  <span className={m.status === 'completed' ? 'text-emerald-400 font-bold' : m.status === 'in_progress' ? 'text-primary font-bold' : 'text-foreground-subtle'}>
                    {m.status === 'completed' ? '✓ Completed' : m.status === 'in_progress' ? '⚡ Active Checkpoint' : '○ Upcoming'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* MODALS */}
      <PlanBuilderModal
        isOpen={isPlanBuilderOpen}
        onClose={() => setIsPlanBuilderOpen(false)}
        onPlanCreated={handlePlanCreated}
      />

      <WorkoutDetailModal
        isOpen={Boolean(selectedWorkout)}
        onClose={() => setSelectedWorkout(null)}
        workout={selectedWorkout}
        onSaveCompletion={handleWorkoutComplete}
      />

      <AddCustomWorkoutModal
        isOpen={isAddWorkoutOpen}
        onClose={() => setIsAddWorkoutOpen(false)}
        weekNumber={selectedWeekNumber}
        onAddWorkout={handleAddCustomWorkout}
      />

      <PaceCalculatorModal
        isOpen={isPaceCalcOpen}
        onClose={() => setIsPaceCalcOpen(false)}
        initial5kTime={activeCampaign.current5kTime}
        initialGoalTime={activeCampaign.goalTime}
      />

      <FuelCalculatorModal
        isOpen={isFuelCalcOpen}
        onClose={() => setIsFuelCalcOpen(false)}
      />

      <AchievementCardModal
        isOpen={isAchievementOpen}
        onClose={() => setIsAchievementOpen(false)}
        campaign={{
          id: activeCampaign.id,
          name: activeCampaign.name,
          sport: activeCampaign.sport,
          location: activeCampaign.location,
          raceDate: activeCampaign.raceDate,
          daysToRace: diffDays,
          goalTime: activeCampaign.goalTime,
          predictedTime: activeCampaign.predictedTime,
          timeDelta: '+00:00 on pace',
          isAheadOfPace: true,
          journeyProgress: activeCampaign.journeyProgress,
          currentBlock: currentWeek.phase,
          metrics: [],
          milestones: activeCampaign.milestones,
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
      />

    </div>
  );
};
