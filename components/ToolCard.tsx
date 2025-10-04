import React from 'react';
import type { Tool } from '../types';
import StarRating from './StarRating';

interface ToolCardProps {
  tool: Tool;
  onOpen: (tool: Tool) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function ToolCard({ tool, onOpen, isFavorite, onToggleFavorite }: ToolCardProps) {
  return (
    <article className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-amber-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative hover:shadow-lg hover:shadow-amber-500/10">
       <button 
        onClick={() => onToggleFavorite(tool.id)} 
        aria-label="Toggle Favorite" 
        className={`absolute top-3 right-3 p-2 rounded-full text-xl leading-none ${isFavorite ? 'text-amber-400' : 'text-slate-600 hover:text-amber-300'} transition-colors`}
      >
        ★
      </button>

      <div className="flex-grow">
        <h3 className="text-lg font-bold text-slate-100 pr-8">{tool.name}</h3>
        <p className="text-sm text-amber-400 font-medium mt-1">{tool.subcategory}</p>
        <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
            <StarRating value={tool.rating} />
            <span>({tool.rating})</span>
            <span className="font-semibold text-emerald-400">{tool.pricing}</span>
        </div>
        <p className="mt-3 text-sm text-slate-300 leading-relaxed">{tool.description}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700">
        <div className="flex flex-wrap gap-2 mb-4">
            {tool.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{tag}</span>
            ))}
        </div>
        <div className="flex items-center justify-between gap-3">
          <a
            href={tool.url}
            rel="noopener noreferrer nofollow"
            target="_blank"
            className="w-full text-center px-4 py-2 text-sm font-semibold bg-gradient-to-br from-amber-400 to-amber-500 text-slate-900 rounded-md hover:from-amber-500 hover:to-amber-600 transition-all duration-300"
          >
            Visit Site
          </a>
          <button
            onClick={() => onOpen(tool)}
            className="w-full px-4 py-2 text-sm font-semibold bg-slate-700 border border-slate-600 text-slate-200 rounded-md hover:bg-slate-600 transition"
          >
            Details
          </button>
        </div>
      </div>
    </article>
  );
}