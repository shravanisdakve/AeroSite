export const STATUS_STYLES = {
  'In Progress': 'bg-amber-100/50 text-amber-700 ring-amber-400/20 dark:bg-amber-500/10 dark:text-amber-500 dark:ring-amber-500/20',
  Planning: 'bg-indigo-100/50 text-indigo-700 ring-indigo-400/20 dark:bg-indigo-500/10 dark:text-indigo-400 dark:ring-indigo-500/20',
  Completed: 'bg-emerald-100/50 text-emerald-700 ring-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20',
  'On Hold': 'bg-slate-100/50 text-slate-600 ring-slate-400/20 dark:bg-slate-500/10 dark:text-slate-400 dark:ring-slate-500/20',
};

// Layout Tokens
export const CARD_CLASS = `glass-card rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-500 overflow-hidden`;

// Input Tokens
export const INPUT_BASE_CLASS = `w-full px-5 py-3 rounded-[1.25rem] border text-sm font-bold transition-all duration-300
  focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50`;

export const inputStateClass = (hasError) =>
  hasError
    ? 'border-red-300 bg-red-50/30 dark:border-red-500/30 dark:bg-red-500/5'
    : 'border-slate-200 bg-white/50 hover:border-slate-300 dark:border-white/5 dark:bg-slate-900/50 dark:hover:border-white/10 dark:text-white';

// Button Tokens
export const BUTTON_PRIMARY = `inline-flex items-center justify-center px-6 py-3 rounded-[1.25rem] text-sm font-black uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 active:scale-[0.96] transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40`;

export const BUTTON_SECONDARY = `inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 active:scale-[0.96] transition-all`;

export const BUTTON_GHOST = `inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100/80 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-white transition-all`;

export const BUTTON_DANGER = `inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/20 active:scale-[0.96] transition-all`;


// @module AeroSite
