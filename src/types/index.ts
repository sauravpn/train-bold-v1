export type DisciplineType = 'run' | 'cycle' | 'swim' | 'hyrox' | 'fuel';

export type WorkoutType =
  | 'intervals'
  | 'tempo'
  | 'long_run'
  | 'easy_run'
  | 'hyrox_strength'
  | 'recovery'
  | 'rest';

export interface Workout {
  id: string;
  campaignId: string;
  weekNumber: number;
  dayOfWeek: number; // 0 = Mon, 6 = Sun
  dayName: string;
  title: string;
  workoutType: WorkoutType;
  distanceKm: number;
  targetPace: string;
  targetDuration: string;
  warmupDesc: string;
  mainSetDesc: string;
  cooldownDesc: string;
  coachTips: string;
  completed: boolean;
  completedAt?: string;
  actualDistanceKm?: number;
  actualDuration?: string;
  feeling?: 'easy' | 'moderate' | 'hard' | 'all_out';
  notes?: string;
}

export interface TrainingWeek {
  weekNumber: number;
  totalWeeks: number;
  phase: 'Base Phase' | 'Build Phase' | 'Peak Simulation' | 'Taper Phase';
  focus: string;
  targetWeeklyVolumeKm: number;
  workouts: Workout[];
}

export interface MetricCardData {
  id: string;
  discipline: DisciplineType;
  title: string;
  primaryStat: string;
  primaryLabel: string;
  secondaryStat: string;
  secondaryLabel: string;
  trend: string;
  trendPositive: boolean;
  tag: string;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  benchmark: string;
  category: 'base' | 'speed' | 'simulation' | 'race';
}

export interface UserCampaign {
  id: string;
  userId?: string;
  name: string;
  sport: 'Marathon' | 'Half Marathon' | '10K' | '5K' | 'HYROX' | 'Ironman 70.3' | 'Triathlon' | 'Custom';
  location: string;
  raceDate: string;
  goalTime: string;
  predictedTime: string;
  current5kTime: string;
  daysPerWeek: number;
  longRunDay: string;
  totalWeeks: number;
  currentWeekNumber: number;
  journeyProgress: number; // percentage 0-100
  weeks: TrainingWeek[];
  milestones: Milestone[];
  createdAt: string;
}

// Backward-compatible for mock data
export interface CampaignData {
  id: string;
  name: string;
  sport: string;
  location: string;
  raceDate: string;
  daysToRace: number;
  goalTime: string;
  predictedTime: string;
  timeDelta: string;
  isAheadOfPace: boolean;
  journeyProgress: number;
  currentBlock: string;
  metrics: MetricCardData[];
  milestones: Milestone[];
}

export interface WaitlistEntry {
  id: string;
  email: string;
  timestamp: string;
  sportInterest?: string;
}

export interface AchievementCardData {
  athleteName: string;
  campaignName: string;
  milestoneTitle: string;
  metricValue: string;
  metricLabel: string;
  date: string;
  discipline: string;
  accentColor?: string;
}

export interface PaceZones {
  easyPace: string;
  marathonPace: string;
  thresholdPace: string;
  intervalPace: string;
  repetitionPace: string;
  splits: {
    distance: string;
    targetSplit: string;
    pacePerKm: string;
  }[];
}

export interface FuelPlan {
  hourlyCarbs: number; // in grams e.g. 60g/hr
  hydrationMl: number; // in ml/hr e.g. 500ml/hr
  sodiumMg: number; // in mg/hr e.g. 600mg/hr
  protocol: string;
  preWorkoutCarbs: string;
  postWorkoutRecovery: string;
}
