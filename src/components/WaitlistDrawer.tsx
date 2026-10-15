import React, { useState, useEffect } from 'react';
import { X, Download, Trash2, Database, Mail, Calendar, Sparkles } from 'lucide-react';
import { getWaitlistEmails, exportWaitlistCSV, exportWaitlistJSON } from '../lib/storage';
import { WaitlistEntry } from '../types';

interface WaitlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRefresh?: number;
}

export const WaitlistDrawer: React.FC<WaitlistDrawerProps> = ({
  isOpen,
  onClose,
  triggerRefresh,
}) => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);

  useEffect(() => {
    if (isOpen) {
      setEntries(getWaitlistEmails());
    }
  }, [isOpen, triggerRefresh]);

  if (!isOpen) return null;

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all stored early-access entries?')) {
      localStorage.removeItem('train_bold_waitlist_entries');
      setEntries([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-background/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-surface border-l border-surface-border shadow-2xl p-6 flex flex-col h-full animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-surface-border mb-6">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-foreground">
                EARLY-ACCESS WAITLIST DB
              </h3>
              <p className="text-[10px] font-mono text-foreground-muted">
                {entries.length} ATHLETES REGISTERED (LOCAL STORAGE)
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

        {/* Action Controls */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={exportWaitlistCSV}
            disabled={entries.length === 0}
            className="flex-1 py-2 px-3 rounded bg-primary text-background font-mono text-xs uppercase font-bold hover:bg-primary-hover disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={exportWaitlistJSON}
            disabled={entries.length === 0}
            className="flex-1 py-2 px-3 rounded bg-surface-raised border border-surface-border text-foreground font-mono text-xs uppercase font-semibold hover:border-primary disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={handleClear}
            disabled={entries.length === 0}
            title="Clear list"
            className="p-2 rounded bg-surface-raised border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Entries List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {entries.length === 0 ? (
            <div className="text-center py-16 text-foreground-subtle">
              <Mail className="w-10 h-10 mx-auto mb-3 opacity-30 text-primary" />
              <p className="font-mono text-xs uppercase tracking-wider text-foreground-muted">
                No Signups Recorded Yet
              </p>
              <p className="text-xs text-foreground-subtle max-w-xs mx-auto mt-1">
                Enter an email in the hero form or bottom CTA banner to see live waitlist telemetry appear here.
              </p>
            </div>
          ) : (
            entries.map((item, index) => (
              <div
                key={item.id || index}
                className="p-3.5 rounded-lg bg-surface-raised border border-surface-border hover:border-surface-borderLight transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-foreground">
                    {item.email}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-primary/15 text-primary text-[10px] font-mono uppercase font-bold">
                    {item.sportInterest || 'HYROX'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-foreground-subtle mt-1.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-primary" />
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                  <span className="text-[9px] text-foreground-subtle">ID: {item.id}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-surface-border mt-auto text-[11px] font-mono text-foreground-subtle flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-primary" />
            Phase 0 Pre-Launch Deliverable
          </span>
          <button onClick={onClose} className="text-primary hover:underline">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
