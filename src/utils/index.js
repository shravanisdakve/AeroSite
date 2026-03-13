// Utility functions

/**
 * Format a date string (YYYY-MM-DD) to a localized readable format.
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Get today's date as a YYYY-MM-DD string.
 */
export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Generate a unique ID using the browser's crypto API.
 */
export const generateId = () => crypto.randomUUID();
