import React, { useEffect } from 'react';
import type { Tool } from '../types';
import StarRating from './StarRating';

interface ToolModalProps {
  tool: Tool;
  onClose: () => void;
}

export default function ToolModal({ tool, onClose }: ToolModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tool-modal-title"
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-lg shadow-2xl max-w-2xl w-full p-8 transform transition-transform duration-300 scale-95 animate-scale-in border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 id="tool-modal-title" className="text-2xl font-bold text-slate-100">{tool.name}</h2>
            <p className="text-sm text-slate-400 mt-1">{tool.subcategory} • <span className="font-semibold text-emerald-500">{tool.pricing}</span></p>
          </div>
          <button onClick={onClose} className="text-slate-500 text-3xl leading-none hover:text-slate-300 transition">&times;</button>
        </div>

        <div className="mt-6 text-slate-300 space-y-4">
          <p>{tool.description}</p>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">Rating:</span>
            <StarRating value={tool.rating} />
            <span className="text-sm text-slate-400">({tool.rating} / 5.0)</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-200">Tags:</span>
            {tool.tags.map(tag => (
              <span key={tag} className="text-xs bg-slate-700 text-slate-200 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700 flex items-center justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-slate-700 text-slate-200 rounded-md hover:bg-slate-600 transition font-medium">Close</button>
          <a href={tool.url} rel="noopener noreferrer nofollow" target="_blank" className="px-6 py-2 bg-gradient-to-br from-amber-400 to-amber-500 text-slate-900 rounded-md hover:from-amber-500 hover:to-amber-600 transition-all duration-300 font-semibold">
            Visit Site
          </a>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
        
        @keyframes scale-in {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
}