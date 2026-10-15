export interface MetricCardData {
  id: string;
  discipline: 'run' | 'cycle' | 'swim' | 'hyrox' | 'fuel';
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
  journeyProgress: number; // percentage e.g. 68
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
