import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projects from '../data/projects';
import { MAX_PHOTOS, ACCEPTED_IMAGE_TYPES } from '../constants/config';
import { ROUTES } from '../constants/routes';
import { WEATHER_OPTIONS } from '../constants/weatherOptions';
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from '../constants/styles';
import { getTodayDate, generateId } from '../utils';
import { validateDPRForm } from '../utils/validators';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import InputField from '../components/InputField';
import ImagePreview from '../components/ImagePreview';
import { ArrowLeftIcon, MapPinIcon, PhotoIcon, SpinnerIcon } from '../components/icons';

const getInitialFormState = (projectId) => ({
  projectId: projectId ? Number(projectId) : '',
  date: getTodayDate(),
  weather: '',
  workDescription: '',
  workerCount: '',
});

const DPRFormPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(`dpr_draft_${projectId}`);
    return saved ? JSON.parse(saved) : getInitialFormState(projectId);
  });
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!isSubmitting) {
      localStorage.setItem(`dpr_draft_${projectId}`, JSON.stringify(form));
    }
  }, [form, projectId, isSubmitting]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const remaining = MAX_PHOTOS - photos.length;
    const toAdd = files.slice(0, remaining);
    const newPhotos = toAdd.map((file) => ({
      id: generateId(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
    if (errors.photos) setErrors((prev) => ({ ...prev, photos: '' }));
    e.target.value = '';
  };

  const removePhoto = (id) => {
    setPhotos((prev) => {
      const photo = prev.find((p) => p.id === id);
      if (photo) URL.revokeObjectURL(photo.preview);
      return prev.filter((p) => p.id !== id);
    });
  };

  useEffect(() => {
    return () => photos.forEach((p) => URL.revokeObjectURL(p.preview));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateDPRForm(form, photos.length);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const selectedProject = projects.find((p) => p.id === Number(form.projectId));
      
      // Save report to local storage for persistence in demo
      const newReport = {
        ...form,
        id: Date.now(),
        projectName: selectedProject?.name,
        labourCount: Number(form.workerCount),
        activities: form.workDescription,
        createdAt: new Date().toISOString()
      };
      
      const existingReports = JSON.parse(localStorage.getItem('submitted_reports') || '[]');
      localStorage.setItem('submitted_reports', JSON.stringify([newReport, ...existingReports]));

      localStorage.removeItem(`dpr_draft_${projectId}`);
      setToast(`DPR submitted successfully for "${selectedProject?.name}"!`);
      
      // Navigate back after a short delay so user sees the toast
      setTimeout(() => {
        navigate(ROUTES.PROJECTS);
      }, 1500);

      setIsSubmitting(false);
    }, 800);
  };

  const selectedProject = projects.find((p) => p.id === Number(form.projectId));
  const canUploadMore = photos.length < MAX_PHOTOS;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[150px] rounded-full -ml-80 -mb-80 pointer-events-none" />
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <Navbar title="Report Submission" maxWidth="max-w-4xl">
        <button
          onClick={() => navigate(ROUTES.ALL_REPORTS)}
          className="text-xs font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-white uppercase tracking-widest px-3 py-2 mr-2 transition-colors"
        >
          Reports
        </button>
        <button
          onClick={() => navigate(ROUTES.PROJECTS)}
          className={`${BUTTON_SECONDARY} px-3 h-10`}
        >
          <ArrowLeftIcon />
        </button>
      </Navbar>

      <main className="max-w-3xl mx-auto px-6 py-10 animate-slide-in">
        <div className="mb-12 flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-[1.5rem] glass-card shadow-sm flex items-center justify-center shrink-0 border-indigo-200/50 dark:border-indigo-500/20">
               <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">DPR</span>
           </div>
           <div>
              <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-1">Field Data Terminal</p>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">Record Deployment</h1>
           </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          {/* Section: Project Context */}
          <section className="glass-card rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-10 space-y-8">
            <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
                <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-widest">Site Parameters</h2>
            </div>

            <InputField
              id="projectId"
              label="Deployment Project"
              component="select"
              value={form.projectId}
              onChange={(e) => handleChange('projectId', e.target.value)}
              error={errors.projectId}
              required
            >
              <option value="">— Select Target Project —</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </InputField>

            {selectedProject && (
              <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-5 flex flex-col sm:flex-row gap-6 border border-slate-100 dark:border-white/5">
                <div className="flex-1 flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-600">
                       <MapPinIcon className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1.5">Site Location</p>
                      <p className="text-sm font-black text-slate-700 dark:text-slate-200">{selectedProject.location}</p>
                   </div>
                </div>
                <div className="flex-1 flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-600">
                       <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1.5">Site Condition</p>
                      <p className="text-sm font-black text-slate-700 dark:text-slate-200">{selectedProject.status}</p>
                   </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                id="date"
                label="Recording Date"
                type="date"
                value={form.date}
                max={getTodayDate()}
                onChange={(e) => handleChange('date', e.target.value)}
                error={errors.date}
              />

              <InputField
                id="weather"
                label="Weather Sync"
                component="select"
                value={form.weather}
                onChange={(e) => handleChange('weather', e.target.value)}
                error={errors.weather}
              >
                <option value="">— Status —</option>
                {WEATHER_OPTIONS.map((w) => (
                  <option key={w.value} value={w.value}>{w.label}</option>
                ))}
              </InputField>
            </div>
          </section>

          {/* Section: Operational Data */}
          <section className="glass-card rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-10 space-y-8">
             <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
                <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-widest">Operations Log</h2>
            </div>

            <InputField
              id="workDescription"
              label="Daily Activity Log"
              component="textarea"
              rows={5}
              placeholder="Log activities, material consumption, and equipment utilization..."
              value={form.workDescription}
              onChange={(e) => handleChange('workDescription', e.target.value)}
              error={errors.workDescription}
              required
            >
              <div className="absolute top-0 right-0 p-1">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                  {form.workDescription.trim().length} CHARS
                </span>
              </div>
            </InputField>

            <InputField
              id="workerCount"
              className="w-full sm:w-48"
              label="Active Staff"
              type="number"
              placeholder="Total"
              value={form.workerCount}
              onChange={(e) => handleChange('workerCount', e.target.value)}
              error={errors.workerCount}
            />
          </section>

          {/* Section: Visual Audit */}
          <section className="glass-card rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-10 space-y-8">
             <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-full" />
                <h2 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-widest">Visual Evidence</h2>
            </div>

            {photos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <ImagePreview
                    key={photo.id}
                    id={photo.id}
                    preview={photo.preview}
                    fileName={photo.file.name}
                    onRemove={removePhoto}
                  />
                ))}
              </div>
            )}

            {canUploadMore && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`w-full border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-2xl py-12 flex flex-col items-center gap-3 transition-all hover:bg-indigo-50/30 hover:border-indigo-200 group
                  ${errors.photos ? 'border-red-200 bg-red-50/20' : ''}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <PhotoIcon className={`h-6 w-6 ${errors.photos ? 'text-red-400' : 'text-slate-400'}`} />
                </div>
                <div className="text-center">
                  <span className="block text-sm font-bold text-slate-700">Attach Site Photography</span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    JPEG / PNG • UP TO {MAX_PHOTOS - photos.length} REMAINING
                  </span>
                </div>
              </button>
            )}

            <input ref={fileInputRef} type="file" accept={ACCEPTED_IMAGE_TYPES} multiple onChange={handleFileSelect} className="hidden" />
            <div className="text-center mt-2">
               {errors.photos && <p className="text-xs font-semibold text-red-500">{errors.photos}</p>}
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 pb-20">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${BUTTON_PRIMARY} flex-1 h-14 text-base`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <SpinnerIcon className="h-5 w-5 font-black" />
                  Processing...
                </span>
              ) : 'Publish Report'}
            </button>
            <button
              type="button"
              onClick={() => navigate(ROUTES.PROJECTS)}
              className={`${BUTTON_SECONDARY} px-10 h-14 font-bold text-slate-400`}
            >
              Discard
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default DPRFormPage;
