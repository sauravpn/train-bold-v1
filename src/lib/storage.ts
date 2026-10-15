import { WaitlistEntry } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEY = 'train_bold_waitlist_entries';

export function getLocalWaitlistEmails(): WaitlistEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load waitlist from localStorage', e);
    return [];
  }
}

export function isEmailRegistered(email: string): boolean {
  const current = getLocalWaitlistEmails();
  const normalized = email.trim().toLowerCase();
  return current.some((entry) => entry.email.toLowerCase() === normalized);
}

export async function saveWaitlistEmail(
  email: string,
  sportInterest: string = 'HYROX'
): Promise<{ success: boolean; message: string; count: number; syncedToSupabase: boolean }> {
  const normalized = email.trim().toLowerCase();
  
  // Basic email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalized)) {
    return {
      success: false,
      message: 'Please enter a valid email address.',
      count: getLocalWaitlistEmails().length,
      syncedToSupabase: false,
    };
  }

  const existing = getLocalWaitlistEmails();
  const alreadyInLocal = existing.some((item) => item.email.toLowerCase() === normalized);

  let syncedToSupabase = false;

  // Attempt Supabase insert if client is configured
  if (supabase) {
    try {
      const { error } = await supabase.from('waitlist').insert({
        email: normalized,
        sport_interest: sportInterest,
      });

      if (!error) {
        syncedToSupabase = true;
      } else if (error.code === '23505') {
        // Unique violation in Postgres
        return {
          success: true,
          message: "You're already on the early access list!",
          count: existing.length,
          syncedToSupabase: true,
        };
      } else {
        console.warn('Supabase insert note:', error.message);
      }
    } catch (err) {
      console.warn('Supabase sync warning:', err);
    }
  }

  if (alreadyInLocal) {
    return {
      success: true,
      message: "You're already on the early access list!",
      count: existing.length,
      syncedToSupabase,
    };
  }

  // Save to local storage cache
  const newEntry: WaitlistEntry = {
    id: 'tb_' + Math.random().toString(36).substring(2, 9),
    email: normalized,
    timestamp: new Date().toISOString(),
    sportInterest,
  };

  const updated = [newEntry, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Storage write error', e);
  }

  return {
    success: true,
    message: isSupabaseConfigured
      ? "You're locked into the database. Welcome to Train Bold."
      : "You're on the early access list. Welcome to Train Bold.",
    count: updated.length,
    syncedToSupabase,
  };
}

export async function fetchRemoteWaitlist(): Promise<WaitlistEntry[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((row: { id: string; email: string; created_at: string; sport_interest: string }) => ({
          id: row.id,
          email: row.email,
          timestamp: row.created_at,
          sportInterest: row.sport_interest,
        }));
      }
    } catch (e) {
      console.error('Failed to fetch from Supabase', e);
    }
  }
  return getLocalWaitlistEmails();
}

export function exportWaitlistCSV(entries: WaitlistEntry[] = getLocalWaitlistEmails()): void {
  if (entries.length === 0) {
    alert('No signups recorded yet.');
    return;
  }

  const headers = ['ID', 'Email', 'Sport Interest', 'Timestamp'];
  const rows = entries.map((e) => [e.id, `"${e.email}"`, `"${e.sportInterest || ''}"`, `"${e.timestamp}"`]);
  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `train-bold-waitlist-${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportWaitlistJSON(entries: WaitlistEntry[] = getLocalWaitlistEmails()): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(entries, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', `train-bold-waitlist-${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
