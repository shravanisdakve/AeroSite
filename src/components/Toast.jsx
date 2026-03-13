import { useEffect } from 'react';
import { CheckCircleIcon, CloseIcon } from './icons';

/**
 * Success toast notification. Auto-dismisses after `duration` ms.
 *
 * @param {{ message: string, onClose: () => void, duration?: number }} props
 */
const Toast = ({ message, onClose, duration = 3500 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-5 right-5 z-50 animate-slide-in" role="alert" aria-live="assertive">
      <div className="flex items-center gap-3 bg-emerald-600 text-white pl-4 pr-3 py-3 rounded-xl shadow-lg shadow-emerald-600/30">
        <CheckCircleIcon />
        <span className="text-sm font-medium">{message}</span>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 hover:bg-white/20 rounded p-0.5 transition-colors"
          aria-label="Dismiss notification"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default Toast;

// @module AeroSite
 
