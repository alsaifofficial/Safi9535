import React from 'react';
import { CATEGORIES } from '../constants';
import type { Tool } from '../types';
import AdPlaceholder from './AdPlaceholder';

// Import all icons
import AllIcon from './icons/AllIcon';
import ImageIcon from './icons/ImageIcon';
import WritingIcon from './icons/WritingIcon';
import CodingIcon from './icons/CodingIcon';
import ProductivityIcon from './icons/ProductivityIcon';
import VideoIcon from './icons/VideoIcon';
import AudioIcon from './icons/AudioIcon';
import MarketingIcon from './icons/MarketingIcon';
import BusinessIcon from './icons/BusinessIcon';

const categoryIcons: { [key: string]: React.ComponentType } = {
  'All': AllIcon,
  'Image Generation': ImageIcon,
  'Writing': WritingIcon,
  'Coding': CodingIcon,
  'Productivity': ProductivityIcon,
  'Video': VideoIcon,
  'Audio': AudioIcon,
  'Marketing': MarketingIcon,
  'Business': BusinessIcon
};

interface SidebarProps {
  query: string;
  onQueryChange: (query: string) => void;
  category: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortByChange: (sortBy: string) => void;
  toolsCount: number;
  filteredCount: number;
  currentPage: number;
  allTools: Tool[];
}

export default function Sidebar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  sortBy,
  onSortByChange,
  toolsCount,
  filteredCount,
  currentPage,
  allTools
}: SidebarProps) {
  
  const featuredTools = allTools.filter(t => t.rating >= 4.7).slice(0, 3);

  return (
    <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 self-start">
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <label htmlFor="search" className="block text-sm font-medium text-slate-300">Search</label>
        <div className="mt-1 relative">
          <input
            id="search"
            type="text"
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            className="w-full bg-slate-700 border-slate-600 rounded-md shadow-sm px-3 py-2 text-slate-200 placeholder:text-slate-400 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Search tools, tags..."
          />
        </div>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <h4 className="block text-sm font-medium text-slate-300 mb-3">Categories</h4>
        <div className="space-y-1">
          {CATEGORIES.map(catName => {
            const Icon = categoryIcons[catName];
            const isActive = category === catName;
            return (
              <button
                key={catName}
                onClick={() => onCategoryChange(catName)}
                className={`w-full flex items-center gap-3 text-left rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 border-l-2 border-amber-400 py-2.5 pr-2.5 pl-2'
                    : 'text-slate-300 hover:bg-slate-700/50 p-2.5'
                }`}
              >
                {Icon && <span className={isActive ? 'text-amber-400' : 'text-slate-400'}><Icon /></span>}
                <span>{catName}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <label htmlFor="sort" className="block text-sm font-medium text-slate-300">Sort By</label>
          <select
            id="sort"
            value={sortBy}
            onChange={e => onSortByChange(e.target.value)}
            className="w-full mt-1 bg-slate-700 border-slate-600 rounded-md shadow-sm px-2 py-2 text-slate-200 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="relevance">Relevance</option>
            <option value="rating">Top Rated</option>
          </select>
      </div>
      
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <h4 className="font-semibold text-slate-200">Quick Stats</h4>
        <div className="mt-3 text-sm text-slate-400 space-y-2">
          <div className="flex justify-between"><span>Total Tools:</span> <strong className="text-slate-100">{toolsCount}</strong></div>
          <div className="flex justify-between"><span>Results Found:</span> <strong className="text-slate-100">{filteredCount}</strong></div>
          <div className="flex justify-between"><span>Current Page:</span> <strong className="text-slate-100">{currentPage}</strong></div>
        </div>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <h4 className="font-semibold text-slate-200">Featured Tools</h4>
        <ul className="mt-3 space-y-3 text-sm">
          {featuredTools.map(t => (
            <li key={t.id} className="flex items-center justify-between">
              <span className="font-medium text-slate-200">{t.name}</span>
              <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-1 rounded-full">{t.pricing}</span>
            </li>
          ))}
        </ul>
      </div>

      <AdPlaceholder id="sidebar-1" scriptSrc="//pl27776576.revenuecpmgate.com/0c/e9/65/0ce965568b32f7b8068b481b65013ec6.js" />
    </aside>
  );
}