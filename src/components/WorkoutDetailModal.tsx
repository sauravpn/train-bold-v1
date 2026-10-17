import React, { useState } from 'react';
import { X, CheckCircle2, Clock, Flame, Activity, Sparkles, Check } from 'lucide-react';
import { Workout } from '../types';
import { calculateFuelPlan } from '../lib/planGenerator';

interface WorkoutDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  workout: Workout | null;
  onSaveCompletion: (
    workoutId: string,
    actuals: { actualDistanceKm?: number; actualDuration?: string; feeling?: Workout['feeling']; notes?: string }
  ) => void;
}

export const WorkoutDetailModal: React.FC<WorkoutDetailModalProps> = ({
  isOpen,
  onClose,
  workout,
  onSaveCompletion,
}) => {
  if (!isOpen || !workout) return null;

  const [completed, setCompleted] = useState(workout.completed);
  const [actualDistance, setActualDistance] = useState(workout.actualDistanceKm ?? workout.distanceKm);
  const [actualDuration, setActualDuration] = useState(workout.actualDuration ?? workout.targetDuration);
  const [feeling, setFeeling] = useState<Workout['feeling']>(workout.feeling ?? 'moderate');
  const [notes, setNotes] = useState(workout.notes ?? '');

  const durationHours = (workout.distanceKm * 5.5) / 60;
  const fuel = calculateFuelPlan(durationHours);

  const handleSave = () => {
    onSaveCompletion(workout.id, {
      actualDistanceKm: Number(actualDistance),
      actualDuration,
      feeling,
      notes,
    });
    onClose();
  };

  const getBadgeColor = (type: Workout['workoutType']) => {
    switch (type) {
      case 'intervals':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'tempo':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'long_run':
        return 'bg-primary/20 text-primary border-primary/40';
      case 'hyrox_strength':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'recovery':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      default:
        return 'bg-surface text-foreground-muted border-surface-border';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-surface border border-surface-border shadow-2xl p-6 sm:p-8 flex flex-col max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-surface-border pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase border ${getBadgeColor(workout.workoutType)}`}>
                {workout.workoutType.replace('_', ' ')}
              </span>
              <span className="text-xs font-mono text-foreground-subtle">
                WEEK {workout.weekNumber} // {workout.dayName.toUpperCase()}
              </span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-foreground">
              {workout.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded bg-surface-raised border border-surface-border text-foreground-muted hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Metrics Strip */}
        <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-surface-raised border border-surface-border text-center">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-foreground-subtle block mb-0.5">
              Target Distance
            </span>
            <span className="font-display font-black text-2xl text-foreground block">
              {workout.distanceKm} <span className="text-xs font-mono text-foreground-muted">KM</span>
            </span>
          </div>
          <div className="border-x border-surface-border">
            <span className="text-[10px] uppercase font-mono tracking-widest text-foreground-subtle block mb-0.5">
              Target Pace
            </span>
            <span className="font-display font-black text-2xl text-primary block">
              {workout.targetPace}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-foreground-subtle block mb-0.5">
              Duration
            </span>
            <span className="font-display font-black text-2xl text-foreground block">
              {workout.targetDuration}
            </span>
          </div>
        </div>

        {/* Workout Structure Breakdown */}
        <div className="space-y-4 mb-6">
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
            STRUCTURED SESSION INSTRUCTIONS
          </h4>

          {/* Warmup */}
          <div className="p-3.5 rounded-lg bg-surface-card border border-surface-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
              01 / WARM-UP & DRILLS
            </span>
            <p className="text-xs text-foreground-muted leading-relaxed font-sans">
              {workout.warmupDesc}
            </p>
          </div>

          {/* Main Set */}
          <div className="p-3.5 rounded-lg bg-surface-card border border-primary/30">
            <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold block mb-1">
              02 / MAIN SET (KEY INTERVALS)
            </span>
            <p className="text-sm text-foreground font-medium leading-relaxed font-sans">
              {workout.mainSetDesc}
            </p>
          </div>

          {/* Cooldown */}
          <div className="p-3.5 rounded-lg bg-surface-card border border-surface-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
              03 / COOL-DOWN
            </span>
            <p className="text-xs text-foreground-muted leading-relaxed font-sans">
              {workout.cooldownDesc}
            </p>
          </div>

          {/* Coach Note */}
          <div className="p-3.5 rounded-lg bg-surface-raised border border-surface-border flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-foreground-muted font-sans italic">
              <span className="text-foreground font-semibold not-italic">Coach Note: </span>
              {workout.coachTips}
            </p>
          </div>

          {/* Fueling Strategy for this run */}
          {workout.distanceKm >= 8 && (
            <div className="p-3.5 rounded-lg bg-primary/10 border border-primary/30 flex items-start gap-2.5">
              <Flame className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-xs font-sans">
                <span className="text-primary font-bold uppercase font-mono block mb-0.5">
                  Fuel Strategy // {fuel.hourlyCarbs}g Carbs/hr
                </span>
                <p className="text-foreground-muted leading-relaxed">
                  {fuel.protocol}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* LOGGING CONTROLS */}
        <div className="pt-6 border-t border-surface-border space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-foreground font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              LOG COMPLETED WORKOUT
            </span>
            <button
              type="button"
              onClick={() => setCompleted(!completed)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                completed
                  ? 'bg-emerald-500 text-background font-bold shadow-[0_0_12px_rgba(34,197,94,0.4)]'
                  : 'bg-surface-raised border border-surface-border text-foreground-muted hover:text-foreground'
              }`}
            >
              {completed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Clock className="w-3.5 h-3.5" />}
              <span>{completed ? 'Completed' : 'Mark Complete'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-foreground-subtle mb-1">
                Actual Distance (km)
              </label>
              <input
                type="number"
                step="0.1"
                value={actualDistance}
                onChange={(e) => setActualDistance(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded bg-surface-raised border border-surface-border text-foreground text-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono tracking-widest text-foreground-subtle mb-1">
                Actual Duration
              </label>
              <input
                type="text"
                value={actualDuration}
                onChange={(e) => setActualDuration(e.target.value)}
                placeholder="e.g. 42:15"
                className="w-full px-3 py-2 rounded bg-surface-raised border border-surface-border text-foreground text-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-mono tracking-widest text-foreground-subtle mb-1.5">
              How did the effort feel?
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['easy', 'moderate', 'hard', 'all_out'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFeeling(level)}
                  className={`py-1.5 px-2 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                    feeling === level
                      ? 'bg-primary text-background font-bold'
                      : 'bg-surface-raised text-foreground-muted border border-surface-border hover:text-foreground'
                  }`}
                >
                  {level.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-mono tracking-widest text-foreground-subtle mb-1">
              Athlete Notes / Splits
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Felt great on intervals 1-5, headwind on 6. Practiced Maurten gel at 40m."
              className="w-full px-3 py-2 rounded bg-surface-raised border border-surface-border text-foreground text-xs font-sans focus:outline-none focus:border-primary"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-surface-raised border border-surface-border text-foreground-muted hover:text-foreground text-xs font-mono uppercase"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded bg-primary text-background font-display font-black uppercase tracking-wider text-sm hover:bg-primary-hover shadow-[0_0_15px_rgba(194,248,53,0.3)] flex items-center gap-1.5 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Workout</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
