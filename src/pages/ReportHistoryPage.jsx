/**
 * @module AeroSite
 * @description Module for ReportHistoryPage.jsx
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projects from '../data/projects';
import dprEntries from '../data/dprEntries';
import Navbar from '../components/Navbar';
import { ArrowLeftIcon, CalendarIcon, MapPinIcon } from '../components/icons';
import { ROUTES } from '../constants/routes';
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from '../constants/styles';
import { formatDate } from '../utils';

const ReportHistoryPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  const project = projects.find((p) => p.id === Number(projectId));

  useEffect(() => {
    // Combine static mock data with local storage data for this specific project
    const localReports = JSON.parse(localStorage.getItem('submitted_reports') || '[]')
      .filter(r => String(r.projectId) === String(projectId));
    
    const staticReports = dprEntries.filter((entry) => entry.projectId === Number(projectId));

    const combined = [...localReports, ...staticReports].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    setReports(combined);
  }, [projectId]);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors">
        <div className="text-center animate-slide-in">
          <div className="w-20 h-20 rounded-3xl glass-card flex items-center justify-center mx-auto mb-8 text-3xl shadow-xl">⚠️</div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight mb-2 tracking-tight">Signal Lost</h2>
          <p className="text-slate-400 dark:text-slate-500 font-medium mb-8">The requested project node could not be located.</p>
          <button
            onClick={() => navigate(ROUTES.PROJECTS)}
            className="text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-[0.2em] px-8 py-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[130px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <Navbar title="Reporting Log" maxWidth="max-w-4xl">
        <button
          onClick={() => navigate(ROUTES.ALL_REPORTS)}
          className="text-xs font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-white uppercase tracking-widest px-3 py-2 mr-2 transition-colors"
        >
          Reports
        </button>
        <button
          onClick={() => navigate(ROUTES.PROJECTS)}
          className={`${BUTTON_SECONDARY} h-10 px-3`}
        >
          <ArrowLeftIcon />
        </button>
      </Navbar>

      <main className="max-w-4xl mx-auto px-6 py-10 animate-slide-in relative z-10">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="space-y-2">
              <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] ml-1">Archive Manifest</p>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{project.name}</h1>
              <p className="text-base text-slate-400 dark:text-slate-500 font-medium">{project.location}</p>
           </div>
           
           <button
             onClick={() => navigate(ROUTES.DPR_FORM.replace(':projectId', project.id))}
             className={`${BUTTON_PRIMARY} px-8 h-14 rounded-[1.25rem]`}
           >
             + Deploy Report
           </button>
        </div>
        
        <div className="flex items-center gap-4 mb-8">
            <h2 className="text-base font-black text-slate-800 dark:text-white uppercase tracking-widest pl-2">Timeline Summary</h2>
            <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800" />
            <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">{reports.length} ENTRIES</span>
        </div>
        
        {reports.length === 0 ? (
          <div className="glass-card rounded-[2.5rem] border-dashed border-slate-200 dark:border-slate-800 p-24 text-center">
            <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-sm mb-2">Null Sequence</p>
            <p className="text-slate-300 dark:text-slate-600 font-medium tracking-tight">No historical manifestations recorded for this site.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 relative">
            {/* Timeline Line */}
            <div className="absolute left-10 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800/50 hidden lg:block" />
            
            {reports.map((report) => (
              <div key={report.id} className="glass-card rounded-[2.5rem] p-10 shadow-[0_20px_40px_rgba(0,0,0,0.02)] transition-all group relative overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-6">
                     <div className="w-20 h-20 rounded-[1.5rem] bg-indigo-600 border-4 border-white dark:border-slate-700 shadow-xl flex flex-col items-center justify-center shrink-0 z-10 transition-transform group-hover:scale-105">
                        <span className="text-2xl font-black text-white leading-none tracking-tighter">{new Date(report.date).getDate()}</span>
                        <span className="text-[10px] font-black text-indigo-200 uppercase mt-1 tracking-widest text-[9px]">
                            {new Date(report.date).toLocaleString('default', { month: 'short' })}
                        </span>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest leading-none mb-2">{report.weather}</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white transition-colors tracking-tight">{formatDate(report.date)}</p>
                     </div>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-5 py-2.5 rounded-2xl flex items-center gap-3">
                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse" />
                     <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                        {report.labourCount} DEPLOYED
                     </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-4">
                    <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">Activity Feed</p>
                    <p className="text-lg text-slate-700 dark:text-slate-300 font-medium leading-[1.8]">{report.activities}</p>
                  </div>
                  
                  <div className="space-y-6 lg:border-l lg:border-slate-50 lg:dark:border-white/5 lg:pl-10">
                    {report.materialsUsed && (
                        <div>
                          <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mb-3">Resources</p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-black bg-slate-100/50 dark:bg-white/5 border border-slate-100 dark:border-white/10 p-4 rounded-xl uppercase tracking-wider">{report.materialsUsed}</p>
                        </div>
                    )}
                    {report.equipmentUsed && (
                        <div>
                          <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mb-3">Equipment</p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-black bg-slate-100/50 dark:bg-white/5 border border-slate-100 dark:border-white/10 p-4 rounded-xl uppercase tracking-wider">{report.equipmentUsed}</p>
                        </div>
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

export default ReportHistoryPage;

// @module AeroSite

