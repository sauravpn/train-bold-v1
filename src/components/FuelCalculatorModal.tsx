import React, { useState } from 'react';
import { X, Flame } from 'lucide-react';
import { calculateFuelPlan } from '../lib/planGenerator';

interface FuelCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FuelCalculatorModal: React.FC<FuelCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [durationHours, setDurationHours] = useState(2.5); // 2h 30m default long run
  const fuel = calculateFuelPlan(durationHours);

  const totalGels = Math.max(1, Math.round((durationHours * fuel.hourlyCarbs) / 25));
  const totalFluidLitres = ((durationHours * fuel.hydrationMl) / 1000).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-surface border border-surface-border shadow-2xl p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Flame className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight text-foreground">
                INTRA-RUN FUEL & HYDRATION MATRIX
              </h3>
              <p className="text-[10px] font-mono text-foreground-muted">
                OPTIMIZED CARBOHYDRATE ABSORPTION & CRAMP PREVENTION
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

        {/* Duration Slider */}
        <div className="p-4 rounded-xl bg-surface-raised border border-surface-border mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono uppercase tracking-widest text-foreground-subtle">
              Planned Run / Race Duration:
            </span>
            <span className="font-display font-black text-2xl text-primary">
              {Math.floor(durationHours)}h {Math.round((durationHours % 1) * 60)}m
            </span>
          </div>
          <input
            type="range"
            min="0.75"
            max="5"
            step="0.25"
            value={durationHours}
            onChange={(e) => setDurationHours(parseFloat(e.target.value))}
            className="w-full accent-primary cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-foreground-subtle mt-1">
            <span>45 min (Easy)</span>
            <span>2h 00m (Half)</span>
            <span>3h 30m (Marathon)</span>
            <span>5h 00m (Ultra)</span>
          </div>
        </div>

        {/* Hero Macro Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-surface-card border border-primary/40 text-center bg-primary/5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-bold block mb-1">
              Exogenous Carbs
            </span>
            <span className="font-display font-black text-4xl text-primary block leading-none my-1">
              {fuel.hourlyCarbs} <span className="text-sm font-mono">g/hr</span>
            </span>
            <span className="text-[10px] font-mono text-foreground-muted">
              ~{totalGels} Gels Total ({totalGels * 25}g Carbs)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface-card border border-surface-border text-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-foreground-subtle block mb-1">
              Hydration Rate
            </span>
            <span className="font-display font-black text-4xl text-foreground block leading-none my-1">
              {fuel.hydrationMl} <span className="text-sm font-mono">ml/hr</span>
            </span>
            <span className="text-[10px] font-mono text-foreground-muted">
              ~{totalFluidLitres} Litres Fluid Total
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface-card border border-surface-border text-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-foreground-subtle block mb-1">
              Sodium Electrolytes
            </span>
            <span className="font-display font-black text-4xl text-emerald-400 block leading-none my-1">
              {fuel.sodiumMg} <span className="text-sm font-mono">mg/hr</span>
            </span>
            <span className="text-[10px] font-mono text-foreground-muted">
              Anti-Cramping Balance
            </span>
          </div>
        </div>

        {/* Detailed Timeline Instructions */}
        <div className="space-y-3 mb-6">
          <div className="p-3.5 rounded-lg bg-surface-card border border-surface-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
              PRE-RACE / PRE-WORKOUT FUELING
            </span>
            <p className="text-xs text-foreground-muted leading-relaxed font-sans">
              {fuel.preWorkoutCarbs}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-card border border-primary/30">
            <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold block mb-1">
              ON-COURSE EXECUTION TIMETABLE
            </span>
            <p className="text-xs text-foreground font-medium leading-relaxed font-sans">
              {fuel.protocol}
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-card border border-surface-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
              POST-RUN RECOVERY WINDOW (0-45 MIN)
            </span>
            <p className="text-xs text-foreground-muted leading-relaxed font-sans">
              {fuel.postWorkoutRecovery}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-surface-border flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-primary text-background font-display font-bold uppercase tracking-wider text-xs hover:bg-primary-hover transition-colors"
          >
            Apply to My Plan
          </button>
        </div>

      </div>
    </div>
  );
};
