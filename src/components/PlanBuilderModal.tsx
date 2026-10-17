import React, { useState } from 'react';
import { X, Calendar, MapPin, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserCampaign } from '../types';
import { generateTrainingPlan } from '../lib/planGenerator';
import { saveUserCampaign } from '../lib/supabaseAuth';

interface PlanBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanCreated: (campaign: UserCampaign) => void;
}

export const PlanBuilderModal: React.FC<PlanBuilderModalProps> = ({
  isOpen,
  onClose,
  onPlanCreated,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);

  // Form State
  const [sport, setSport] = useState<UserCampaign['sport']>('HYROX');
  const [raceName, setRaceName] = useState('');
  const [location, setLocation] = useState('');
  const [raceDate, setRaceDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 112); // ~16 weeks
    return d.toISOString().split('T')[0];
  });
  const [goalTime, setGoalTime] = useState('01:25:00');
  const [current5kTime, setCurrent5kTime] = useState('21:30');
  const [daysPerWeek, setDaysPerWeek] = useState(4);
  const [longRunDay, setLongRunDay] = useState('Sun');

  const sportsList: { type: UserCampaign['sport']; title: string; defaultDist: string; desc: string }[] = [
    { type: 'HYROX', title: 'HYROX', defaultDist: '8x 1km + 8 Stations', desc: 'Hybrid endurance + functional sleds, ski & burpees' },
    { type: 'Marathon', title: 'Full Marathon', defaultDist: '42.195 km', desc: 'Peak 16-20 week progressive endurance block' },
    { type: 'Half Marathon', title: 'Half Marathon', defaultDist: '21.0975 km', desc: 'Speed endurance, threshold & progressive 18k long runs' },
    { type: '10K', title: '10K Race', defaultDist: '10.0 km', desc: 'Lactate threshold, VO2 max speed intervals' },
    { type: '5K', title: '5K PB Hunter', defaultDist: '5.0 km', desc: 'Leg speed, high cadence & sub-threshold repeats' },
    { type: 'Ironman 70.3', title: 'Ironman 70.3', defaultDist: '1.9k Swim • 90k Bike • 21.1k Run', desc: 'Middle-distance multisport & aero brick sessions' },
  ];

  const handleSelectSport = (selected: UserCampaign['sport']) => {
    setSport(selected);
    if (!raceName || raceName.startsWith('Road to')) {
      if (selected === 'HYROX') setRaceName('Road to HYROX Berlin');
      else if (selected === 'Marathon') setRaceName('Road to Valencia Marathon');
      else if (selected === 'Half Marathon') setRaceName('Road to Half Marathon PB');
      else if (selected === '10K') setRaceName('Road to Sub-40 10K');
      else if (selected === '5K') setRaceName('Road to Sub-20 5K');
      else if (selected === 'Ironman 70.3') setRaceName('Road to 70.3 Mallorca');
    }
    if (selected === 'HYROX') setGoalTime('01:25:00');
    else if (selected === 'Marathon') setGoalTime('03:15:00');
    else if (selected === 'Half Marathon') setGoalTime('01:34:00');
    else if (selected === '10K') setGoalTime('00:41:30');
    else if (selected === '5K') setGoalTime('00:19:45');
    else if (selected === 'Ironman 70.3') setGoalTime('04:55:00');
  };

  const handleFinish = async () => {
    const newCampaign = generateTrainingPlan({
      name: raceName || `Road to ${sport}`,
      sport,
      location: location || 'Official Race Arena',
      raceDate,
      goalTime,
      current5kTime,
      daysPerWeek,
      longRunDay,
    });

    await saveUserCampaign(newCampaign);

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#c2f835', '#ffffff', '#22c55e', '#a3e635'],
    });

    onPlanCreated(newCampaign);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-surface border border-surface-border shadow-2xl p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-primary text-background flex items-center justify-center font-display font-black text-sm">
              TB
            </div>
            <div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight text-foreground">
                RUNNA-STYLE PLAN BUILDER
              </h3>
              <p className="text-[11px] font-mono text-foreground-muted">
                STEP {step} OF 4 // {step === 1 ? 'SELECT EVENT' : step === 2 ? 'RACE DETAILS' : step === 3 ? 'FITNESS BENCHMARKS' : 'TRAINING ROUTINE'}
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

        {/* Step Indicator */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s <= step ? 'bg-primary shadow-[0_0_8px_rgba(194,248,53,0.5)]' : 'bg-surface-border'
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Select Event */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="mb-2">
              <h4 className="font-display font-black text-xl uppercase tracking-tight text-foreground">
                What are you training for?
              </h4>
              <p className="text-xs text-foreground-muted font-sans">
                Select your primary discipline. Train Bold builds your target paces and progressive blocks accordingly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sportsList.map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => handleSelectSport(item.type)}
                  className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    sport === item.type
                      ? 'bg-surface-raised border-primary shadow-[0_0_15px_rgba(194,248,53,0.2)] ring-1 ring-primary'
                      : 'bg-surface-card border-surface-border hover:border-surface-borderLight hover:bg-surface-raised'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-black text-lg uppercase text-foreground">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-surface-border text-primary font-bold">
                      {item.defaultDist}
                    </span>
                  </div>
                  <p className="text-[11px] text-foreground-muted leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Race Details */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <h4 className="font-display font-black text-xl uppercase tracking-tight text-foreground">
                Name your race campaign & date
              </h4>
              <p className="text-xs text-foreground-muted font-sans">
                Give your training a concrete goal so every session builds towards a countdown.
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
                Campaign Name
              </label>
              <input
                type="text"
                value={raceName}
                onChange={(e) => setRaceName(e.target.value)}
                placeholder="e.g. Road to HYROX Berlin or Boston Marathon"
                className="w-full px-4 py-3 rounded-lg bg-surface-raised border border-surface-border text-foreground text-sm font-sans focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
                  Location / Host City
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-primary absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Berlin, Germany"
                    className="w-full pl-9 pr-3 py-3 rounded-lg bg-surface-raised border border-surface-border text-foreground text-sm font-sans focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-1">
                  Race Date (Start Line)
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-primary absolute left-3 top-3.5" />
                  <input
                    type="date"
                    value={raceDate}
                    onChange={(e) => setRaceDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 rounded-lg bg-surface-raised border border-surface-border text-foreground text-sm font-sans focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Fitness Benchmarks */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <h4 className="font-display font-black text-xl uppercase tracking-tight text-foreground">
                Set baseline fitness & goal finish
              </h4>
              <p className="text-xs text-foreground-muted font-sans">
                Train Bold uses this to calculate exact speeds for your intervals, tempo runs, and long runs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-raised border border-surface-border">
                <span className="text-[11px] uppercase font-mono tracking-widest text-foreground-subtle block mb-1">
                  Current 5K Time (Baseline)
                </span>
                <input
                  type="text"
                  value={current5kTime}
                  onChange={(e) => setCurrent5kTime(e.target.value)}
                  placeholder="MM:SS e.g. 21:30"
                  className="w-full px-3 py-2.5 rounded bg-surface border border-surface-border text-foreground text-lg font-mono font-bold focus:outline-none focus:border-primary"
                />
                <span className="text-[10px] text-foreground-subtle mt-1.5 block">
                  Used as the physiological anchor for all your training pace zones.
                </span>
              </div>

              <div className="p-4 rounded-xl bg-surface-raised border border-primary/40">
                <span className="text-[11px] uppercase font-mono tracking-widest text-primary block mb-1 font-bold">
                  Target Finish Time ({sport})
                </span>
                <input
                  type="text"
                  value={goalTime}
                  onChange={(e) => setGoalTime(e.target.value)}
                  placeholder="HH:MM:SS e.g. 01:25:00"
                  className="w-full px-3 py-2.5 rounded bg-surface border border-primary/50 text-primary text-lg font-mono font-bold focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <span className="text-[10px] text-foreground-subtle mt-1.5 block">
                  Your campaign hero goal. We will predict if you are on track week by week.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Training Routine */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <h4 className="font-display font-black text-xl uppercase tracking-tight text-foreground">
                Customize your weekly routine
              </h4>
              <p className="text-xs text-foreground-muted font-sans">
                Fit your training around your life, work, and recovery requirements.
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-2">
                Workouts Per Week:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[3, 4, 5, 6].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setDaysPerWeek(days)}
                    className={`py-3 rounded-lg border font-mono text-sm font-bold transition-all ${
                      daysPerWeek === days
                        ? 'bg-primary text-background border-primary shadow-[0_0_12px_rgba(194,248,53,0.3)]'
                        : 'bg-surface-raised text-foreground-muted border-surface-border hover:border-surface-borderLight'
                    }`}
                  >
                    {days} Days / wk
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-widest text-foreground-subtle mb-2">
                Preferred Long Run / Key Session Day:
              </label>
              <div className="grid grid-cols-7 gap-1.5">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setLongRunDay(day)}
                    className={`py-2 rounded border font-mono text-xs uppercase transition-all ${
                      longRunDay === day
                        ? 'bg-primary text-background border-primary font-bold'
                        : 'bg-surface-raised text-foreground-muted border-surface-border hover:text-foreground'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-raised border border-primary/30 flex items-start gap-3 mt-4">
              <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-xs text-foreground-muted leading-relaxed">
                <span className="text-foreground font-bold block mb-0.5">Algorithm Ready</span>
                Clicking Generate will create structured periodized weeks (Base, Build, Peak, Taper) with speed intervals, threshold tempo, long runs, fuel targets, and milestone checkpoints.
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-8 pt-4 border-t border-surface-border flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded bg-surface-raised border border-surface-border text-foreground hover:text-primary text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded bg-primary text-background font-display font-black uppercase tracking-wider text-sm hover:bg-primary-hover flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(194,248,53,0.3)]"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded bg-primary text-background font-display font-black uppercase tracking-wider text-sm hover:bg-primary-hover flex items-center gap-1.5 transition-all shadow-[0_0_20px_rgba(194,248,53,0.4)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate My Training Plan</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
