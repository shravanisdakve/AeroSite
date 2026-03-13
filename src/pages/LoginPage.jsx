/**
 * @module AeroSite
 * @description Module for LoginPage.jsx
 */
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validators';
import InputField from '../components/InputField';
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon, SpinnerIcon } from '../components/icons';
import logo from '../assets/logo.png';
import { APP_NAME, MOCK_EMAIL, MOCK_PASSWORD } from '../constants/config';
import { ROUTES } from '../constants/routes';
import { BUTTON_PRIMARY } from '../constants/styles';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.PROJECTS, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearFieldError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    if (apiError) setApiError('');
  };

  const handleBlur = (field, validator, value) => {
    setErrors((prev) => ({ ...prev, [field]: validator(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError('');

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    if (emailErr || passwordErr) {
      setErrors({ email: emailErr, password: passwordErr });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = login(email.trim(), password);
      if (result.success) {
        navigate(ROUTES.PROJECTS, { replace: true });
      } else {
        setApiError(result.message);
      }
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 px-4 py-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-100 pointer-events-none" />
      
      <div className="w-full max-w-[460px] animate-slide-in relative z-10 px-4">
        <div className="flex flex-col items-center mb-12 text-center">
            <div className="relative group mb-8">
                <img 
                  src={logo} 
                  alt={APP_NAME} 
                  className="w-20 h-20 rounded-[2rem] object-cover shadow-2xl shadow-indigo-500/20 transform group-hover:scale-110 transition-transform duration-500 border border-slate-200 dark:border-white/10" 
                />
                <div className="absolute inset-0 rounded-[2rem] shadow-inner pointer-events-none" />
            </div>
            <p className="text-[11px] font-black text-indigo-600 dark:text-indigo-500 uppercase tracking-[0.4em] mb-3 leading-none ml-1">Secure Terminal</p>
            <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none uppercase">{APP_NAME}</h1>
        </div>

        <div className="glass-card rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] p-12 sm:p-14 border border-slate-200/50 dark:border-white/5">
          <div className="mb-12">
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Identity</h2>
             <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 mt-3 uppercase tracking-[0.2em]">Authorize to establish connection</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {apiError && (
              <div className="flex items-center gap-3 bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-wider px-5 py-4 rounded-2xl animate-shake" role="alert">
                <ExclamationCircleIcon className="h-5 w-5" />
                <span>{apiError}</span>
              </div>
            )}

            <InputField
              id="email"
              label="Personnel Email"
              type="email"
              placeholder="operator@aerosite.io"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearFieldError('email'); }}
              onBlur={() => handleBlur('email', validateEmail, email)}
              error={errors.email}
              required
            />

            <InputField
              id="password"
              label="Security Key"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearFieldError('password'); }}
              onBlur={() => handleBlur('password', validatePassword, password)}
              error={errors.password}
              required
            >
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </InputField>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${BUTTON_PRIMARY} w-full h-14 text-sm uppercase tracking-[0.2em] font-black rounded-2xl`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-3">
                  <SpinnerIcon className="h-6 w-6 animate-spin" />
                  Verifying...
                </span>
              ) : 'Establish Link'}
            </button>

            <div className="pt-6 mt-10 border-t border-slate-100 dark:border-white/5">
              <div className="bg-slate-50/50 dark:bg-white/5 rounded-2xl p-6 border border-slate-100 dark:border-white/5">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] mb-3 text-center">Simulation Access</p>
                <div className="flex items-center justify-between text-[11px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest tabular-nums font-mono">
                  <span>{MOCK_EMAIL}</span>
                  <span className="text-slate-200 dark:text-slate-800">|</span>
                  <span>{MOCK_PASSWORD}</span>
                </div>
              </div>
            </div>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-bold text-slate-400 dark:text-slate-500">
              New personnel?{' '}
              <Link to={ROUTES.REGISTER} className="text-indigo-600 hover:text-indigo-500 transition-colors uppercase tracking-[0.1em] ml-1">
                Enroll Identity
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] font-black text-slate-300 dark:text-slate-800 uppercase tracking-[0.5em] mt-16 pb-12">
          Industrial OS &copy; 2026
        </p>
      </div>
    </div>

  );
};

export default LoginPage;

// @module AeroSite

