import { supabase } from './supabase';
import { UserCampaign, Workout } from '../types';
import { generateTrainingPlan } from './planGenerator';

const LOCAL_CAMPAIGNS_KEY = 'train_bold_user_campaigns';
const ACTIVE_CAMPAIGN_KEY = 'train_bold_active_campaign_id';

// Default starter campaign so the user immediately has an elite HYROX / Marathon plan ready
export function getInitialDemoCampaign(): UserCampaign {
  const futureRace = new Date();
  futureRace.setDate(futureRace.getDate() + 112); // ~16 weeks out
  const dateString = futureRace.toISOString().split('T')[0];

  return generateTrainingPlan({
    name: 'Road to HYROX Berlin',
    sport: 'HYROX',
    location: 'Berlin Arena, Germany',
    raceDate: dateString,
    goalTime: '01:25:00',
    current5kTime: '20:15',
    daysPerWeek: 4,
    longRunDay: 'Sun',
  });
}

// ----------------- Campaigns API (Supabase + Local Storage) -----------------

export async function getUserCampaigns(): Promise<UserCampaign[]> {
  // If Supabase is configured and user is logged in
  if (supabase) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user) {
        const { data, error } = await supabase
          .from('campaigns')
          .select('*')
          .eq('user_id', sessionData.session.user.id)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          // Parse data
          return data.map((row: any) => ({
            ...row.plan_payload,
            id: row.id,
            name: row.name,
            sport: row.sport,
            raceDate: row.race_date,
            goalTime: row.goal_time,
          }));
        }
      }
    } catch (e) {
      console.warn('Supabase campaign fetch error:', e);
    }
  }

  // Fallback to local storage
  try {
    const raw = localStorage.getItem(LOCAL_CAMPAIGNS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('LocalStorage load error', e);
  }

  // If completely empty, return the initial starter campaign
  const initial = [getInitialDemoCampaign()];
  localStorage.setItem(LOCAL_CAMPAIGNS_KEY, JSON.stringify(initial));
  localStorage.setItem(ACTIVE_CAMPAIGN_KEY, initial[0].id);
  return initial;
}

export async function saveUserCampaign(campaign: UserCampaign): Promise<void> {
  // Save to local storage
  const current = await getUserCampaigns();
  const index = current.findIndex((c) => c.id === campaign.id);
  let updated: UserCampaign[];

  if (index >= 0) {
    updated = [...current];
    updated[index] = campaign;
  } else {
    updated = [campaign, ...current];
  }

  localStorage.setItem(LOCAL_CAMPAIGNS_KEY, JSON.stringify(updated));
  localStorage.setItem(ACTIVE_CAMPAIGN_KEY, campaign.id);

  // Sync to Supabase if logged in
  if (supabase) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user) {
        await supabase.from('campaigns').upsert({
          id: campaign.id,
          user_id: sessionData.session.user.id,
          name: campaign.name,
          sport: campaign.sport,
          location: campaign.location,
          race_date: campaign.raceDate,
          goal_time: campaign.goalTime,
          predicted_time: campaign.predictedTime,
          plan_payload: campaign,
          updated_at: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.warn('Supabase campaign upsert error', e);
    }
  }
}

export function getActiveCampaignId(): string | null {
  return localStorage.getItem(ACTIVE_CAMPAIGN_KEY);
}

export function setActiveCampaignId(id: string): void {
  localStorage.setItem(ACTIVE_CAMPAIGN_KEY, id);
}

// ----------------- Workout Updating & Checkoff -----------------

export async function toggleWorkoutCompleted(
  campaignId: string,
  workoutId: string,
  actuals?: { actualDistanceKm?: number; actualDuration?: string; feeling?: Workout['feeling']; notes?: string }
): Promise<UserCampaign | null> {
  const campaigns = await getUserCampaigns();
  const campaign = campaigns.find((c) => c.id === campaignId);
  if (!campaign) return null;

  let found = false;

  const updatedWeeks = campaign.weeks.map((week) => {
    const updatedWorkouts = week.workouts.map((w) => {
      if (w.id === workoutId) {
        found = true;
        const newCompleted = !w.completed;
        return {
          ...w,
          completed: newCompleted,
          completedAt: newCompleted ? new Date().toISOString() : undefined,
          actualDistanceKm: actuals?.actualDistanceKm ?? w.distanceKm,
          actualDuration: actuals?.actualDuration ?? w.targetDuration,
          feeling: actuals?.feeling ?? 'moderate',
          notes: actuals?.notes ?? w.notes,
        };
      }
      return w;
    });
    return { ...week, workouts: updatedWorkouts };
  });

  if (!found) return campaign;

  // Calculate new journey progress
  const allWorkouts = updatedWeeks.flatMap((w) => w.workouts).filter((w) => w.workoutType !== 'rest');
  const completedCount = allWorkouts.filter((w) => w.completed).length;
  const progressPercent = Math.min(100, Math.round((completedCount / (allWorkouts.length || 1)) * 100));

  const updatedCampaign: UserCampaign = {
    ...campaign,
    weeks: updatedWeeks,
    journeyProgress: Math.max(5, progressPercent),
  };

  await saveUserCampaign(updatedCampaign);
  return updatedCampaign;
}

// Add a custom workout
export async function addCustomWorkoutToWeek(
  campaignId: string,
  weekNumber: number,
  workoutData: Omit<Workout, 'id' | 'campaignId' | 'weekNumber' | 'completed'>
): Promise<UserCampaign | null> {
  const campaigns = await getUserCampaigns();
  const campaign = campaigns.find((c) => c.id === campaignId);
  if (!campaign) return null;

  const newWorkout: Workout = {
    ...workoutData,
    id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    campaignId,
    weekNumber,
    completed: false,
  };

  const updatedWeeks = campaign.weeks.map((week) => {
    if (week.weekNumber === weekNumber) {
      return {
        ...week,
        targetWeeklyVolumeKm: Math.round((week.targetWeeklyVolumeKm + newWorkout.distanceKm) * 10) / 10,
        workouts: [...week.workouts, newWorkout],
      };
    }
    return week;
  });

  const updatedCampaign: UserCampaign = {
    ...campaign,
    weeks: updatedWeeks,
  };

  await saveUserCampaign(updatedCampaign);
  return updatedCampaign;
}

// ----------------- Supabase Auth Helpers -----------------

export async function signUpWithEmail(email: string, password: string, fullName?: string) {
  if (!supabase) {
    // Local demo signup
    const fakeUser = { id: 'demo_' + Date.now(), email, user_metadata: { full_name: fullName || 'Athlete' } };
    localStorage.setItem('train_bold_demo_user', JSON.stringify(fakeUser));
    return { user: fakeUser, error: null };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName || 'Athlete' },
    },
  });

  return { user: data.user, error };
}

export async function signInWithEmail(email: string, password: string) {
  if (!supabase) {
    const fakeUser = { id: 'demo_' + Date.now(), email, user_metadata: { full_name: 'Athlete' } };
    localStorage.setItem('train_bold_demo_user', JSON.stringify(fakeUser));
    return { user: fakeUser, error: null };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { user: data.user, error };
}

export async function signOutAthlete() {
  if (supabase) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem('train_bold_demo_user');
}

export async function getCurrentAthlete() {
  if (supabase) {
    try {
      const { data } = await supabase.auth.getUser();
      if (data.user) return data.user;
    } catch (e) {
      console.warn('Auth check error', e);
    }
  }

  try {
    const raw = localStorage.getItem('train_bold_demo_user');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Demo user parse error', e);
  }

  return null;
}
