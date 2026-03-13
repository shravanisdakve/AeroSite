import { useAuth } from '../context/AuthContext';
import { SunIcon, MoonIcon } from './icons';
import { APP_NAME } from '../constants/config';
import logo from '../assets/logo.png';

/**
 * Shared sticky navbar used across authenticated pages.
 */
const Navbar = ({ title = APP_NAME, maxWidth = 'max-w-7xl', children }) => {
  const { darkMode, toggleDarkMode } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border-b border-slate-200/50 dark:border-white/5 transition-colors duration-500">
      <nav className={`${maxWidth} mx-auto flex items-center justify-between px-6 sm:px-12 py-6`}>
        {/* Brand */}
        <div className="flex items-center gap-6 min-w-0">
          <div className="relative group cursor-pointer" onClick={() => window.location.href = '/'}>
              <img 
                src={logo} 
                alt={APP_NAME} 
                className="w-12 h-12 rounded-[1.25rem] object-cover border border-slate-200/80 dark:border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 rounded-[1.25rem] shadow-inner pointer-events-none" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-900 dark:text-white leading-none tracking-tighter uppercase">{title}</span>
            <div className="flex items-center gap-2 mt-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)] animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] leading-none">SYSTEM.LIVE</span>
            </div>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="ml-4 p-3 rounded-2xl glass-card text-slate-400 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-white transition-all shadow-sm hover:scale-110 active:scale-95 border border-slate-200/50 dark:border-white/5"
            aria-label="Toggle Theme"
          >
            {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
        </div>

        {/* Right-side actions */}
        <div className="flex items-center gap-6 shrink-0">{children}</div>
      </nav>
    </header>
  );
};


export default Navbar;

// @module AeroSite
