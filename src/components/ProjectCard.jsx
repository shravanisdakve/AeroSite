/**
 * @module AeroSite
 * @description Module for ProjectCard.jsx
 */
import StatusBadge from './StatusBadge';
import { MapPinIcon, CalendarIcon, SunIcon, RainIcon, CloudIcon } from './icons';
import { formatDate } from '../utils';
import { CARD_CLASS } from '../constants/styles';
import { ROUTES } from '../constants/routes';

/**
 * Clickable project card used in the Project List page.
 */
const ProjectCard = ({ project, onClick }) => {
  const WeatherIcon = () => {
    switch (project.currentWeather?.condition) {
      case 'Sunny': return <SunIcon className="h-4 w-4 text-amber-500" />;
      case 'Rainy': return <RainIcon className="h-4 w-4 text-blue-500" />;
      default: return <CloudIcon className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${CARD_CLASS} group w-full text-left flex flex-col relative`}
      aria-label={`Open DPR for ${project.name}`}
    >
      <div className="p-10 flex-1 flex flex-col gap-8">
        {/* Top row: name + status */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight tracking-tighter">
              {project.name}
            </h3>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest leading-none">ID: {project.id * 1024}</span>
            </div>
          </div>
          <StatusBadge status={project.status} />
        </div>

        {/* Progress Bar Component */}
        <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                <span>Site Progress</span>
                <span className="text-indigo-600 dark:text-indigo-400">{project.progress}%</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                <div 
                    className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(79,70,229,0.3)]" 
                    style={{ width: `${project.progress}%` }}
                />
            </div>
        </div>

        {/* Meta info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/5">
              <MapPinIcon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 truncate">{project.location}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50/50 dark:bg-indigo-500/5 flex items-center justify-center border border-indigo-100/30 dark:border-indigo-500/10">
              <WeatherIcon />
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{project.currentWeather?.temp}°C {project.currentWeather?.condition}</span>
          </div>
        </div>
      </div>

      {/* Footer CTA Section */}
      <div className="px-10 py-6 bg-slate-50/50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2 group/btn">
          <span className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">TRACK SITE</span>
          <span className="text-[13px] font-bold text-indigo-600 dark:text-indigo-400 group-hover/btn:translate-x-1.5 transition-transform duration-300">→</span>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = ROUTES.DPR_HISTORY.replace(':projectId', project.id);
          }}
          className="text-[10px] font-black text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 uppercase tracking-[0.25em] px-5 py-2.5 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 transition-all shadow-sm active:scale-95"
        >
          LOGS
        </button>
      </div>
    </button>
  );
};


export default ProjectCard;

// @module AeroSite
 

