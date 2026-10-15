import { WaitlistEntry } from '../types';

const STORAGE_KEY = 'train_bold_waitlist_entries';

export function getWaitlistEmails(): WaitlistEntry[] {
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
  const current = getWaitlistEmails();
  const normalized = email.trim().toLowerCase();
  return current.some((entry) => entry.email.toLowerCase() === normalized);
}

export function saveWaitlistEmail(email: string, sportInterest: string = 'HYROX'): { success: boolean; message: string; count: number } {
  const normalized = email.trim().toLowerCase();
  
  // Basic email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalized)) {
    return { success: false, message: 'Please enter a valid email address.', count: getWaitlistEmails().length };
  }

  const existing = getWaitlistEmails();
  if (existing.some((item) => item.email.toLowerCase() === normalized)) {
    return { success: true, message: "You're already on the early access list!", count: existing.length };
  }

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

  return { success: true, message: "You're on the early access list. Welcome to Train Bold.", count: updated.length };
}

export function exportWaitlistCSV(): void {
  const entries = getWaitlistEmails();
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

export function exportWaitlistJSON(): void {
  const entries = getWaitlistEmails();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(entries, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', `train-bold-waitlist-${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
