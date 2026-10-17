import React, { useState } from 'react';
import { X, Timer } from 'lucide-react';
import { calculatePaceZones } from '../lib/planGenerator';

interface PaceCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initial5kTime?: string;
  initialGoalTime?: string;
}

export const PaceCalculatorModal: React.FC<PaceCalculatorModalProps> = ({
  isOpen,
  onClose,
  initial5kTime = '21:30',
  initialGoalTime = '03:15:00',
}) => {
  if (!isOpen) return null;

  const [benchmark5k, setBenchmark5k] = useState(initial5kTime);
  const [goalTime, setGoalTime] = useState(initialGoalTime);
  const [sport, setSport] = useState('Marathon');

  const paceZones = calculatePaceZones(benchmark5k, goalTime, sport);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl rounded-2xl bg-surface border border-surface-border shadow-2xl p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Timer className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight text-foreground">
                RUNNA-STYLE PACE & SPLIT ENGINE
              </h3>
              <p className="text-[10px] font-mono text-foreground-muted">
                PHYSIOLOGICAL TRAINING ZONES & PREDICTED RACE SPLITS
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

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-surface-raised border border-surface-border">
          <div>
            <label className="block text-[10px] uppercase font-mono tracking-widest text-foreground-subtle mb-1">
              Current 5K Benchmark
            </label>
            <input
              type="text"
              value={benchmark5k}
              onChange={(e) => setBenchmark5k(e.target.value)}
              placeholder="MM:SS e.g. 20:00"
              className="w-full px-3 py-2 rounded bg-surface border border-surface-border text-foreground font-mono text-base font-bold focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-mono tracking-widest text-primary mb-1 font-bold">
              Target Finish Time
            </label>
            <input
              type="text"
              value={goalTime}
              onChange={(e) => setGoalTime(e.target.value)}
              placeholder="HH:MM:SS"
              className="w-full px-3 py-2 rounded bg-surface border border-primary/40 text-primary font-mono text-base font-bold focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-mono tracking-widest text-foreground-subtle mb-1">
              Target Race Event
            </label>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="w-full px-3 py-2 rounded bg-surface border border-surface-border text-foreground font-mono text-sm focus:outline-none focus:border-primary"
            >
              <option value="Marathon">Full Marathon (42.2k)</option>
              <option value="Half Marathon">Half Marathon (21.1k)</option>
              <option value="10K">10K Race</option>
              <option value="5K">5K Race</option>
            </select>
          </div>
        </div>

        {/* Training Zones Grid */}
        <div className="mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold block mb-3">
            YOUR PHYSIOLOGICAL TRAINING ZONES
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className="p-3.5 rounded-lg bg-surface-card border border-surface-border text-center">
              <span className="text-[10px] font-mono uppercase text-foreground-subtle block mb-1">
                Zone 2 Easy
              </span>
              <span className="font-display font-black text-2xl text-foreground block">
                {paceZones.easyPace}
              </span>
              <span className="text-[9px] font-mono text-foreground-subtle block mt-0.5">
                Conversational
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-card border border-surface-border text-center">
              <span className="text-[10px] font-mono uppercase text-foreground-subtle block mb-1">
                Marathon Pace
              </span>
              <span className="font-display font-black text-2xl text-foreground block">
                {paceZones.marathonPace}
              </span>
              <span className="text-[9px] font-mono text-foreground-subtle block mt-0.5">
                Steady Aerobic
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-card border border-primary/40 text-center bg-primary/5">
              <span className="text-[10px] font-mono uppercase text-primary font-bold block mb-1">
                Lactate Threshold
              </span>
              <span className="font-display font-black text-2xl text-primary block">
                {paceZones.thresholdPace}
              </span>
              <span className="text-[9px] font-mono text-foreground-subtle block mt-0.5">
                Comfortably Hard
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-card border border-surface-border text-center">
              <span className="text-[10px] font-mono uppercase text-foreground-subtle block mb-1">
                VO2 Max Interval
              </span>
              <span className="font-display font-black text-2xl text-foreground block">
                {paceZones.intervalPace}
              </span>
              <span className="text-[9px] font-mono text-foreground-subtle block mt-0.5">
                3-5 Min Reps
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-surface-card border border-surface-border text-center">
              <span className="text-[10px] font-mono uppercase text-foreground-subtle block mb-1">
                Repetition Speed
              </span>
              <span className="font-display font-black text-2xl text-foreground block">
                {paceZones.repetitionPace}
              </span>
              <span className="text-[9px] font-mono text-foreground-subtle block mt-0.5">
                200-400m Track
              </span>
            </div>
          </div>
        </div>

        {/* Projected Splits Table */}
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold block mb-3">
            RACE DAY SPLIT EXECUTION PLAN ({sport.toUpperCase()})
          </span>
          <div className="rounded-lg border border-surface-border overflow-hidden">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-surface-raised border-b border-surface-border text-foreground-subtle text-[10px] uppercase">
                <tr>
                  <th className="p-3">Checkpoint Distance</th>
                  <th className="p-3">Required Split Pace</th>
                  <th className="p-3 text-right">Elapsed Clock Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/50 text-foreground">
                {paceZones.splits.map((s, idx) => (
                  <tr key={idx} className="hover:bg-surface-raised/50 transition-colors">
                    <td className="p-3 font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {s.distance}
                    </td>
                    <td className="p-3 text-primary font-medium">{s.pacePerKm}</td>
                    <td className="p-3 text-right font-display font-black text-base text-foreground">
                      {s.targetSplit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-surface-border flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-primary text-background font-display font-bold uppercase tracking-wider text-xs hover:bg-primary-hover transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
