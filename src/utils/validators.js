import {
  MIN_PASSWORD_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MAX_WORKER_COUNT,
} from '../constants/config';

// ── Reusable validators ─────────────────────────────────────────────
// Each returns an error string (empty string = valid).

// Requires at least a 2-char TLD to reject edge cases like "a@b.c"
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validate an email address.
 * @param {string} value
 * @returns {string} Error message or empty string.
 */
export const validateEmail = (value) => {
  if (!value.trim()) return 'Email is required.';
  if (!EMAIL_REGEX.test(value)) return 'Enter a valid email address.';
  return '';
};

/**
 * Validate a password.
 * @param {string} value
 * @returns {string} Error message or empty string.
 */
export const validatePassword = (value) => {
  if (!value) return 'Password is required.';
  if (value.length < MIN_PASSWORD_LENGTH)
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  return '';
};

/**
 * Validate the entire DPR form and return an errors object.
 * @param {object} form       - The form state object.
 * @param {number} photoCount - Number of uploaded photos.
 * @returns {object} Map of field → error message (only invalid fields included).
 */
export const validateDPRForm = (form, photoCount) => {
  const errors = {};

  if (!form.projectId) errors.projectId = 'Please select a project.';
  if (!form.date) errors.date = 'Date is required.';
  if (!form.weather) errors.weather = 'Please select the weather condition.';

  const descTrimmed = form.workDescription.trim();
  if (!descTrimmed) {
    errors.workDescription = 'Work description cannot be empty.';
  } else if (descTrimmed.length < MIN_DESCRIPTION_LENGTH) {
    errors.workDescription = `Please provide at least ${MIN_DESCRIPTION_LENGTH} characters.`;
  } else if (descTrimmed.length > MAX_DESCRIPTION_LENGTH) {
    errors.workDescription = `Description must not exceed ${MAX_DESCRIPTION_LENGTH} characters.`;
  }

  const count = Number(form.workerCount);
  if (!form.workerCount || !Number.isInteger(count) || count < 1) {
    errors.workerCount = 'Enter a valid worker count (whole number ≥ 1).';
  } else if (count > MAX_WORKER_COUNT) {
    errors.workerCount = `Worker count must not exceed ${MAX_WORKER_COUNT}.`;
  }

  if (photoCount === 0) errors.photos = 'Upload at least 1 photo.';

  return errors;
};

// @module AeroSite
