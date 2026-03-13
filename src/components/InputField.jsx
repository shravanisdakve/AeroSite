/**
 * @module AeroSite
 * @description Module for InputField.jsx
 */
import FieldError from './FieldError';
import { INPUT_BASE_CLASS, inputStateClass } from '../constants/styles';

/**
 * Reusable input field that handles label, input, and error messaging.
 */
const InputField = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  component: Component = 'input',
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs font-bold text-slate-500 uppercase tracking-widest pl-1 mb-2">
          {label} {required && <span className="text-indigo-400" aria-hidden="true">*</span>}
        </label>
      )}
      
      <div className="relative">
        <Component
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${INPUT_BASE_CLASS} ${inputStateClass(error)} ${Component === 'textarea' ? 'py-3 resize-none' : 'h-12'}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          required={required}
          {...props}
        >
          {Component === 'select' ? children : null}
        </Component>
        {Component !== 'select' ? children : null}
      </div>
      
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
};

export default InputField;

// @module AeroSite
 

