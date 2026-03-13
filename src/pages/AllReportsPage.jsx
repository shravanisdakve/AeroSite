/**
 * @module AeroSite
 * @description Module for AllReportsPage.jsx
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import projects from '../data/projects';
import dprEntries from '../data/dprEntries';
import Navbar from '../components/Navbar';
import { CalendarIcon, MapPinIcon, LayoutIcon, FilterIcon } from '../components/icons';
import { ROUTES } from '../constants/routes';
import { formatDate } from '../utils';

const AllReportsPage = () => {
  const navigate = useNavigate();
  const [allReports, setAllReports] = useState([]);
  const [filterProject, setFilterProject] = useState('All');

  useEffect(() => {
    // Combine static mock data with local storage data
    const localReports = JSON.parse(localStorage.getItem('submitted_reports') || '[]');
    
    // Format mock data to match our local report structure if needed
    const formattedMockData = dprEntries.map(report => ({
      ...report,
      projectName: projects.find(p => p.id === report.projectId)?.name || 'Unknown Project',
      workDescription: report.activities // Ensure field name consistency
    }));

    const combined = [...localReports, ...formattedMockData].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    setAllReports(combined);
  }, []);

  const filteredReports = allReports.filter(report => 
    filterProject === 'All' || String(report.projectId) === String(filterProject)
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[130px] rounded-full -ml-64 -mt-64 pointer-events-none" />
      
      <Navbar title="AeroSite">
        <button
          onClick={() => navigate(ROUTES.PROJECTS)}
          className="text-xs font-black text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 uppercase tracking-widest px-3 py-2"
        >
          Dashboard
        </button>
      </Navbar>

      <main className="max-w-5xl mx-auto px-6 py-10 animate-slide-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
          <div>
            <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-2">Central Reporting</p>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Site Activities</h1>
          </div>

          <div className="flex items-center gap-4 glass-card p-2 rounded-2xl shadow-sm">
            <div className="pl-3">
              <FilterIcon className="h-4 w-4 text-indigo-400 dark:text-indigo-600" />
            </div>
            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-[13px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 pr-8 cursor-pointer"
            >
              <option value="All">Global Filter</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredReports.length === 0 ? (
          <div className="glass-card rounded-[2.5rem] p-24 text-center border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-sm mb-6">No sequence found for this parameter</p>
            <button 
                onClick={() => navigate(ROUTES.PROJECTS)}
                className="text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-[0.2em] px-8 py-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:scale-105 transition-transform"
            >
                Return to Node
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 relative pb-20">
            {/* Timeline connector line */}
            <div className="absolute left-12 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800/50 hidden lg:block" />
            
            {filteredReports.map((report) => (
              <div 
                key={report.id} 
                className="glass-card rounded-[2.5rem] p-10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all group relative overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-6">
                     <div className="w-20 h-20 rounded-[1.5rem] bg-indigo-600 border-4 border-white dark:border-slate-700 shadow-xl flex flex-col items-center justify-center shrink-0 z-10">
                        <span className="text-2xl font-black text-white leading-none tracking-tighter">{new Date(report.date).getDate()}</span>
                        <span className="text-[10px] font-black text-indigo-200 uppercase mt-1 tracking-widest">
                            {new Date(report.date).toLocaleString('default', { month: 'short' })}
                        </span>
                     </div>
                     <div>
                        <div className="flex items-center gap-2 mb-1.5">
                           <MapPinIcon className="h-3 w-3 text-indigo-500" />
                           <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{report.projectName}</p>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-none">
                            Sequence Activity Log
                        </h3>
                     </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-5 py-2.5 rounded-2xl flex items-center gap-3">
                        <CalendarIcon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                        <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">{formatDate(report.date)}</span>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-5 py-2.5 rounded-2xl flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse" />
                        <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">{report.labourCount} DEPLOYED</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                   <div>
                      <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <LayoutIcon className="h-3.5 w-3.5" /> Log Content
                      </p>
                      <p className="text-lg text-slate-700 dark:text-slate-300 font-medium leading-[1.8] max-w-4xl">
                        {report.activities || report.workDescription}
                      </p>
                   </div>
                   
                   <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-50 dark:border-white/5">
                      <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mr-2">Certified Data:</span>
                      <span className="text-[11px] font-black bg-indigo-50 dark:bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-xl border border-indigo-100 dark:border-indigo-500/10 flex items-center gap-2">
                        <MapPinIcon className="h-3.5 w-3.5" /> SITE VERIFIED
                      </span>
                      {report.weather && (
                        <span className="text-[11px] font-black bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 flex items-center gap-2 uppercase tracking-widest">
                            {report.weather}
                        </span>
                      )}
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AllReportsPage;

// @module AeroSite

