import { STATUS_STYLES } from '../constants/styles';

/**
 * Reusable badge component for displaying project status.
 */
const StatusBadge = ({ status }) => {
  const baseClass = 'text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ring-1 ring-inset';
  const statusClass = STATUS_STYLES[status] || 'bg-slate-50 text-slate-600 ring-slate-200/50';

  return (
    <span className={`${baseClass} ${statusClass}`}>
      {status}
    </span>
  );
};

export default StatusBadge;

// @module AeroSite
