import React, { useState } from 'react';
import { X, Plus, Activity } from 'lucide-react';
import { Workout } from '../types';

interface AddCustomWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  weekNumber: number;
  onAddWorkout: (
    weekNumber: number,
    workoutData: Omit<Workout, 'id' | 'campaignId' | 'weekNumber' | 'completed'>
  ) => void;
}

export const AddCustomWorkoutModal: React.FC<AddCustomWorkoutModalProps> = ({
  isOpen,
  onClose,
  weekNumber,
  onAddWorkout,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [dayName, setDayName] = useState('Wed');
  const [workoutType, setWorkoutType] = useState<Workout['workoutType']>('tempo');
  const [distanceKm, setDistanceKm] = useState(8);
  const [targetPace, setTargetPace] = useState('4:30 /km');
  const [targetDuration, setTargetDuration] = useState('40 min');
  const [mainSetDesc, setMainSetDesc] = useState('');
  const warmupDesc = '1.5 km easy jog + dynamic stretching';
  const cooldownDesc = '1 km cool-down jog';
  const coachTips = 'Focus on smooth cadence and relaxed breathing.';

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onAddWorkout(weekNumber, {
      dayOfWeek: daysOfWeek.indexOf(dayName),
      dayName,
      title,
      workoutType,
      distanceKm: Number(distanceKm),
      targetPace,
      targetDuration,
      warmupDesc,
      mainSetDesc: mainSetDesc || `${distanceKm}km custom endurance session`,
      cooldownDesc,
      coachTips,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-surface border border-surface-border shadow-2xl p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="font-display font-black text-2xl uppercase tracking-tight text-foreground">
              ADD CUSTOM SESSION // WEEK {weekNumber}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded bg-surface-raised border border-surface-border text-foreground-muted hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
              Session Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 10x 400m Hill Sprints or Sled Push Drill"
              className="w-full px-3 py-2.5 rounded bg-surface-raised border border-surface-border text-foreground text-sm font-sans focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
                Day of Week
              </label>
              <select
                value={dayName}
                onChange={(e) => setDayName(e.target.value)}
                className="w-full px-3 py-2.5 rounded bg-surface-raised border border-surface-border text-foreground text-sm font-mono focus:outline-none focus:border-primary"
              >
                {daysOfWeek.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
                Workout Category
              </label>
              <select
                value={workoutType}
                onChange={(e) => setWorkoutType(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded bg-surface-raised border border-surface-border text-foreground text-sm font-mono focus:outline-none focus:border-primary"
              >
                <option value="intervals">Speed Intervals</option>
                <option value="tempo">Threshold Tempo</option>
                <option value="long_run">Long Run</option>
                <option value="easy_run">Easy Aerobic</option>
                <option value="hyrox_strength">HYROX / Strength</option>
                <option value="recovery">Recovery</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
                Distance (km)
              </label>
              <input
                type="number"
                step="0.5"
                value={distanceKm}
                onChange={(e) => setDistanceKm(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded bg-surface-raised border border-surface-border text-foreground text-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
                Target Pace
              </label>
              <input
                type="text"
                value={targetPace}
                onChange={(e) => setTargetPace(e.target.value)}
                placeholder="4:15 /km"
                className="w-full px-3 py-2 rounded bg-surface-raised border border-surface-border text-foreground text-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
                Duration
              </label>
              <input
                type="text"
                value={targetDuration}
                onChange={(e) => setTargetDuration(e.target.value)}
                placeholder="45 min"
                className="w-full px-3 py-2 rounded bg-surface-raised border border-surface-border text-foreground text-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
              Main Set Description
            </label>
            <textarea
              rows={2}
              value={mainSetDesc}
              onChange={(e) => setMainSetDesc(e.target.value)}
              placeholder="e.g. 5 rounds of 1km at threshold pace with 60s walk recovery."
              className="w-full px-3 py-2 rounded bg-surface-raised border border-surface-border text-foreground text-xs font-sans focus:outline-none focus:border-primary"
            />
          </div>

          <div className="pt-4 border-t border-surface-border flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-surface-raised border border-surface-border text-foreground-muted hover:text-foreground text-xs font-mono uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded bg-primary text-background font-display font-black uppercase tracking-wider text-sm hover:bg-primary-hover flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(194,248,53,0.3)]"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Week {weekNumber}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
