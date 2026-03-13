import { CloseIcon } from './icons';

/**
 * Individual photo preview card used in form photo grids.
 */
const ImagePreview = ({ id, preview, fileName, onRemove }) => {
  return (
    <div className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 ring-1 ring-slate-100 transition-all hover:ring-indigo-200 animate-slide-in">
      <img src={preview} alt="Site" className="w-full h-full object-cover" />
      <button
        type="button"
        onClick={() => onRemove(id)}
        className="absolute top-2 right-2 bg-slate-900/40 backdrop-blur-md text-white rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`Remove photo ${fileName}`}
      >
        <CloseIcon className="h-4 w-4" />
      </button>
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/60 p-3">
        <p className="text-[10px] font-bold text-white truncate">{fileName}</p>
      </div>
    </div>
  );
};

export default ImagePreview;
