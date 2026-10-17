import { UserCampaign, TrainingWeek, Workout, Milestone, PaceZones, FuelPlan } from '../types';

// Helper to convert MM:SS to seconds
export function timeStringToSeconds(timeStr: string): number {
  if (!timeStr) return 0;
  const parts = timeStr.trim().split(':').map((p) => parseInt(p, 10));
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 1) {
    return parts[0] * 60;
  }
  return 0;
}

// Helper to convert seconds to MM:SS or HH:MM:SS
export function secondsToTimeString(seconds: number, includeHours = false): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (includeHours || h > 0) {
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  return `${pad(m)}:${pad(s)}`;
}

// Format pace per km e.g. "4:15 /km"
export function formatPace(secondsPerKm: number): string {
  return `${secondsToTimeString(Math.round(secondsPerKm))} /km`;
}

// Calculate Runna-style training paces from 5K benchmark time
export function calculatePaceZones(current5kTime: string, goalTime?: string, sport?: string): PaceZones {
  const sec5k = timeStringToSeconds(current5kTime) || 24 * 60; // default 24:00 5k (4:48/km)
  const basePacePerKm = sec5k / 5; // e.g. 288 sec/km

  const easyPaceSec = basePacePerKm * 1.25;
  const marathonPaceSec = basePacePerKm * 1.10;
  const thresholdPaceSec = basePacePerKm * 1.04;
  const intervalPaceSec = basePacePerKm * 0.94;
  const repetitionPaceSec = basePacePerKm * 0.88;

  // Split milestones for race targets
  const targetSec = goalTime ? timeStringToSeconds(goalTime) : sec5k * 4.2;
  const targetKm = sport === 'Marathon' ? 42.195 : sport === 'Half Marathon' ? 21.0975 : sport === '10K' ? 10 : 5;
  const racePacePerKm = targetSec / targetKm;

  return {
    easyPace: formatPace(easyPaceSec),
    marathonPace: formatPace(marathonPaceSec),
    thresholdPace: formatPace(thresholdPaceSec),
    intervalPace: formatPace(intervalPaceSec),
    repetitionPace: formatPace(repetitionPaceSec),
    splits: [
      { distance: '5 km', targetSplit: secondsToTimeString(racePacePerKm * 5, true), pacePerKm: formatPace(racePacePerKm) },
      { distance: '10 km', targetSplit: secondsToTimeString(racePacePerKm * 10, true), pacePerKm: formatPace(racePacePerKm) },
      { distance: '21.1 km (Half)', targetSplit: secondsToTimeString(racePacePerKm * 21.0975, true), pacePerKm: formatPace(racePacePerKm) },
      { distance: '30 km (Wall Check)', targetSplit: secondsToTimeString(racePacePerKm * 30, true), pacePerKm: formatPace(racePacePerKm) },
      { distance: '42.2 km (Finish)', targetSplit: secondsToTimeString(racePacePerKm * 42.195, true), pacePerKm: formatPace(racePacePerKm) },
    ],
  };
}

// Calculate Fuel Matrix based on workout duration
export function calculateFuelPlan(durationHours: number): FuelPlan {
  if (durationHours < 1.0) {
    return {
      hourlyCarbs: 0,
      hydrationMl: 350,
      sodiumMg: 300,
      protocol: 'Water & Electrolytes as needed. No exogenous carbs required.',
      preWorkoutCarbs: 'Light carb snack 45-60 min before (banana or toast with honey).',
      postWorkoutRecovery: 'Hydrate + 20g protein snack within 45 min.',
    };
  } else if (durationHours < 1.75) {
    return {
      hourlyCarbs: 45,
      hydrationMl: 500,
      sodiumMg: 500,
      protocol: 'Take 1 gel (22-25g carbs) at 45 min and another at 75 min with water.',
      preWorkoutCarbs: 'Carb-dense meal 2 hrs prior (oatmeal, bagel with peanut butter & banana).',
      postWorkoutRecovery: 'Recovery shake with 3:1 carb-to-protein ratio + electrolyte drink.',
    };
  } else {
    return {
      hourlyCarbs: 75,
      hydrationMl: 650,
      sodiumMg: 750,
      protocol: 'High absorption protocol: 1 hydrogel every 25-30 min (targeting 75-90g/hr). Alternate water and electrolyte sip.',
      preWorkoutCarbs: 'Full pre-race breakfast 3 hrs prior: 100-120g carbs, low fat/fiber + 500ml sodium hydration.',
      postWorkoutRecovery: 'Immediate 40g carbs + 25g protein within 30 min, followed by high-carb meal within 2 hours.',
    };
  }
}

interface GeneratePlanParams {
  name: string;
  sport: UserCampaign['sport'];
  location: string;
  raceDate: string;
  goalTime: string;
  current5kTime: string;
  daysPerWeek: number;
  longRunDay: string;
}

export function generateTrainingPlan(params: GeneratePlanParams): UserCampaign {
  const { name, sport, location, raceDate, goalTime, current5kTime, daysPerWeek, longRunDay } = params;

  // Calculate number of weeks between today and raceDate (capped between 6 and 20 weeks)
  const today = new Date();
  const race = new Date(raceDate);
  const diffTime = race.getTime() - today.getTime();
  const diffDays = Math.max(14, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const calculatedWeeks = Math.min(20, Math.max(6, Math.round(diffDays / 7)));

  const paceZones = calculatePaceZones(current5kTime, goalTime, sport);
  const campaignId = 'camp_' + Math.random().toString(36).substring(2, 9);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const weeks: TrainingWeek[] = [];

  for (let w = 1; w <= calculatedWeeks; w++) {
    let phase: TrainingWeek['phase'] = 'Base Phase';
    let focus = 'Aerobic Foundation & Running Cadence';

    const ratio = w / calculatedWeeks;
    if (ratio <= 0.3) {
      phase = 'Base Phase';
      focus = 'Aerobic Volume, Easy Miles & Muscular Endurance';
    } else if (ratio <= 0.65) {
      phase = 'Build Phase';
      focus = 'Lactate Threshold Intervals, Tempo Blocks & Stamina';
    } else if (ratio <= 0.88) {
      phase = 'Peak Simulation';
      focus = 'Race-Pace Rehearsals, Long Run Progression & Fuel Testing';
    } else {
      phase = 'Taper Phase';
      focus = 'Volume Reduction, Leg Freshness & Glycogen Optimization';
    }

    // Progressive distances based on week and sport
    const multiplier = 1 + (w / calculatedWeeks) * 0.45;
    const baseLongRun = sport === 'Marathon' ? 18 : sport === 'Half Marathon' ? 12 : sport === '10K' ? 8 : sport === 'HYROX' ? 10 : 6;
    const longRunDistance = Math.round((ratio > 0.88 ? baseLongRun * 0.6 : baseLongRun * multiplier) * 10) / 10;

    const workouts: Workout[] = [];

    // Schedule 7 days for this week
    for (let d = 0; d < 7; d++) {
      const dayName = daysOfWeek[d];
      const isLongRunDay = dayName === longRunDay || (d === 6 && !daysOfWeek.includes(longRunDay));

      let workoutType: Workout['workoutType'] = 'rest';
      let title = 'Rest & Regeneration';
      let distanceKm = 0;
      let targetPace = '-';
      let targetDuration = 'Full Rest';
      let warmupDesc = '10 min mobility & foam rolling';
      let mainSetDesc = 'Active rest. Hydrate and eat nutrient-dense meals.';
      let cooldownDesc = 'Hamstring & calf stretching';
      let coachTips = 'Muscles repair and grow during rest, not during workouts. Prioritize 8 hours of sleep.';

      if (isLongRunDay) {
        workoutType = 'long_run';
        title = `Key Long Run (${longRunDistance} km)`;
        distanceKm = longRunDistance;
        targetPace = paceZones.easyPace;
        targetDuration = `${Math.round(longRunDistance * 5.5)} min`;
        warmupDesc = '1 km progressive jog from recovery to easy pace';
        mainSetDesc = `${longRunDistance - 2} km steady aerobic effort at ${paceZones.easyPace}. Focus on relaxed shoulders and 175-180 cadence.`;
        cooldownDesc = '1 km easy jog + walk';
        coachTips = 'Practice your in-race fueling strategy. Consume 45-60g carbs per hour with water.';
      } else if (d === 1 && daysPerWeek >= 3) {
        // Tuesday: Speed/Intervals
        workoutType = 'intervals';
        const repCount = Math.min(10, 4 + Math.floor(w / 2));
        title = `${repCount}x 800m Speed Repeats`;
        distanceKm = Math.round((2 + (repCount * 0.8) + 1.5) * 10) / 10;
        targetPace = paceZones.intervalPace;
        targetDuration = `${Math.round(distanceKm * 5)} min`;
        warmupDesc = '2 km easy jog + dynamic drills + 4x 50m strides';
        mainSetDesc = `${repCount}x 800m @ ${paceZones.intervalPace} with 90 seconds light jog recovery between reps.`;
        cooldownDesc = '1.5 km light flush out jog';
        coachTips = 'Hit your splits consistently from rep 1 to the final rep. Avoid sprinting the first 200m.';
      } else if (d === 3 && daysPerWeek >= 4) {
        // Thursday: Tempo / Threshold
        workoutType = 'tempo';
        const tempoKm = Math.min(12, 4 + Math.floor(w / 1.5));
        title = `${tempoKm} km Lactate Threshold Tempo`;
        distanceKm = tempoKm + 3;
        targetPace = paceZones.thresholdPace;
        targetDuration = `${Math.round(distanceKm * 4.8)} min`;
        warmupDesc = '2 km gradual warm-up';
        mainSetDesc = `${tempoKm} km continuous run at threshold pace (${paceZones.thresholdPace}). Effort should feel comfortably hard.`;
        cooldownDesc = '1 km slow cool-down jog';
        coachTips = 'Threshold running trains your body to clear lactate efficiently while running at speed.';
      } else if (d === 4 && daysPerWeek >= 5) {
        // Friday: Easy Aerobic or HYROX Functional
        if (sport === 'HYROX') {
          workoutType = 'hyrox_strength';
          title = 'HYROX Functional Sim (SkiErg + Sled Push)';
          distanceKm = 5;
          targetPace = 'Terminal Circuit';
          targetDuration = '45 min';
          warmupDesc = '500m row + hip openers';
          mainSetDesc = '4 rounds: 500m SkiErg @ target split + 25m Sled Push (125-150kg) + 1km recovery run.';
          cooldownDesc = 'Mobility & thoracic spine release';
          coachTips = 'Breathe rhythmically on the sled. Push with long, driving leg strides.';
        } else {
          workoutType = 'easy_run';
          title = 'Aerobic Flush Run (6 km)';
          distanceKm = 6;
          targetPace = paceZones.easyPace;
          targetDuration = '35 min';
          warmupDesc = '5 min gentle dynamic stretching';
          mainSetDesc = `6 km easy aerobic run @ ${paceZones.easyPace}. Conversational effort throughout.`;
          cooldownDesc = '4x 50m strides for leg turnover';
          coachTips = 'Keep your heart rate strictly in Zone 2. You should easily speak in full sentences.';
        }
      } else if (d === 5 && daysPerWeek >= 6) {
        // Saturday: Shakeout or Strength
        workoutType = 'recovery';
        title = 'Shakeout Run & Core Stability';
        distanceKm = 4.5;
        targetPace = paceZones.easyPace;
        targetDuration = '28 min';
        warmupDesc = 'Foam roll quads & IT band';
        mainSetDesc = '4.5 km gentle jog followed by 15 min core and single-leg stability routine.';
        cooldownDesc = 'Full lower body stretch';
        coachTips = 'Stay light on your feet. Save your energy for tomorrow’s long run.';
      }

      workouts.push({
        id: `w_${w}_d_${d}_${Math.random().toString(36).substring(2, 6)}`,
        campaignId,
        weekNumber: w,
        dayOfWeek: d,
        dayName,
        title,
        workoutType,
        distanceKm,
        targetPace,
        targetDuration,
        warmupDesc,
        mainSetDesc,
        cooldownDesc,
        coachTips,
        completed: false,
      });
    }

    const totalWeeklyVolume = Math.round(
      workouts.reduce((acc, curr) => acc + curr.distanceKm, 0) * 10
    ) / 10;

    weeks.push({
      weekNumber: w,
      totalWeeks: calculatedWeeks,
      phase,
      focus,
      targetWeeklyVolumeKm: totalWeeklyVolume,
      workouts,
    });
  }

  // Milestones
  const milestones: Milestone[] = [
    {
      id: 'm_1',
      title: 'Aerobic Base Foundation Complete',
      date: `Week ${Math.max(1, Math.floor(calculatedWeeks * 0.25))}`,
      status: 'in_progress',
      benchmark: 'Complete all base volume sessions without missed mileage',
      category: 'base',
    },
    {
      id: 'm_2',
      title: '5K Benchmark Pace Checkpoint',
      date: `Week ${Math.floor(calculatedWeeks * 0.45)}`,
      status: 'upcoming',
      benchmark: `Target sub-${paceZones.intervalPace} split on track test`,
      category: 'speed',
    },
    {
      id: 'm_3',
      title: 'Peak Race Simulation & Fuel Dress Rehearsal',
      date: `Week ${Math.floor(calculatedWeeks * 0.75)}`,
      status: 'upcoming',
      benchmark: 'Full race kit, shoe choice & 75g/hr carb intake test',
      category: 'simulation',
    },
    {
      id: 'm_4',
      title: 'Taper Phase & Glycogen Supercompensation',
      date: `Week ${calculatedWeeks - 1}`,
      status: 'upcoming',
      benchmark: 'Volume reduced by 40%, muscle fullness locked in',
      category: 'race',
    },
    {
      id: 'm_5',
      title: `Race Day: ${name}`,
      date: raceDate,
      status: 'upcoming',
      benchmark: `Execute race plan for goal finish: ${goalTime}`,
      category: 'race',
    },
  ];

  return {
    id: campaignId,
    name,
    sport,
    location,
    raceDate,
    goalTime,
    predictedTime: goalTime,
    current5kTime,
    daysPerWeek,
    longRunDay,
    totalWeeks: calculatedWeeks,
    currentWeekNumber: 1,
    journeyProgress: 8,
    weeks,
    milestones,
    createdAt: new Date().toISOString(),
  };
}
