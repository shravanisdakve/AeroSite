import { ExclamationCircleIcon } from './icons';

/**
 * Inline field-level error message with icon.
 * Renders nothing if `message` is falsy.
 *
 * @param {{ message: string, id?: string }} props
 */
const FieldError = ({ message, id }) => {
  if (!message) return null;

  return (
    <p
      id={id}
      className="mt-1.5 text-xs text-red-600 flex items-center gap-1"
      aria-live="polite"
    >
      <ExclamationCircleIcon className="h-3.5 w-3.5" />
      {message}
    </p>
  );
};

export default FieldError;
