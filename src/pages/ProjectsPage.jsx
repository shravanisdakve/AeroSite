import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import projects from '../data/projects';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { SearchIcon, LogoutIcon, NoResultsIcon } from '../components/icons';
import { ROUTES } from '../constants/routes';
import { BUTTON_DANGER, INPUT_BASE_CLASS } from '../constants/styles';

const allStatuses = [...new Set(projects.map((p) => p.status))];

const ProjectsPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return projects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(term) ||
        p.location.toLowerCase().includes(term);
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const stats = useMemo(() => {
    return {
      active: projects.filter(p => p.status === 'In Progress').length,
      upcoming: projects.filter(p => p.status === 'Planning').length,
      staff: projects.reduce((acc, p) => acc + (p.labourCount || 0), 0) || 452 // Fallback for demo
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-100 pointer-events-none" />
      
      <Navbar title="Dashboard">
        <div className="flex items-center gap-8 mr-4">
            <button
                onClick={() => navigate(ROUTES.ALL_REPORTS)}
                className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-white uppercase tracking-[0.2em] transition-all"
            >
                Reports
            </button>
            <div className="hidden lg:flex flex-col items-end">
                <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-wider leading-tight">{user?.name || 'User'}</span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tabular-nums uppercase tracking-[0.1em] leading-tight">{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className={`${BUTTON_DANGER} h-11 w-11 p-0 flex items-center justify-center rounded-[1.25rem]`}
              aria-label="Logout"
            >
              <LogoutIcon className="h-4.5 w-4.5" />
            </button>
        </div>
      </Navbar>

      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-12 animate-slide-in relative z-10">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 mb-16">
          <div className="space-y-4">
            <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-500 uppercase tracking-[0.4em] ml-1">Central Hub</p>
            <h1 className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">Global Projects</h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <div className="glass-card px-8 py-5 rounded-[2rem] flex flex-col min-w-[140px] dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5">
               <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Active Sites</span>
               <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{stats.active}</span>
            </div>
            <div className="glass-card px-8 py-5 rounded-[2rem] flex flex-col min-w-[140px] dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5">
               <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Upcoming</span>
               <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">{stats.upcoming}</span>
            </div>
            <div className="glass-card px-8 py-5 rounded-[2rem] flex flex-col min-w-[140px] dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5">
               <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Global Staff</span>
               <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">{stats.staff}</span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
          <div className="relative flex-1 w-full group">
            <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 dark:text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by project name, location or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`${INPUT_BASE_CLASS} pl-14 h-16 bg-white dark:bg-slate-900/60 dark:border-white/5 dark:text-white border-slate-200/60 shadow-inner`}
            />
          </div>

          <div className="w-full md:w-64">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`${INPUT_BASE_CLASS} h-16 bg-white dark:bg-slate-900/60 dark:border-white/5 dark:text-white border-slate-200/60 cursor-pointer font-black text-[13px] uppercase tracking-widest`}
            >
              <option value="All">All Projects</option>
              {allStatuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Grid */}
        {filtered.length === 0 ? (
          <div className="glass-card rounded-[3rem] p-32 text-center border-dashed border-slate-200 dark:border-white/5">
            <div className="w-24 h-24 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 flex items-center justify-center mx-auto mb-8 shadow-inner">
                <NoResultsIcon className="h-12 w-12 text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System match not found</h3>
            <p className="text-slate-400 dark:text-slate-500 font-bold mt-2 uppercase tracking-widest text-[10px]">Verify coordinates and parameters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filtered.map((project, idx) => (
              <div key={project.id} className="animate-slide-in" style={{ animationDelay: `${idx * 0.08}s` }}>
                <ProjectCard
                  project={project}
                  onClick={() => navigate(`/projects/${project.id}/dpr`)}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>

  );
};

export default ProjectsPage;

// @module AeroSite
