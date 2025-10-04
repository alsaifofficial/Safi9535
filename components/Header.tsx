import React from 'react';

export default function Header() {
  return (
    <header className="bg-slate-900/80 border-b border-slate-700 sticky top-0 z-10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">AI Tool Hub</h1>
          <p className="text-sm text-slate-400">The Ultimate Directory for AI Tools</p>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#submit" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition">Submit Tool</a>
          <a href="#blog" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition">Blog</a>
          <a href="#admin" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition">Admin Panel</a>
        </nav>
      </div>
    </header>
  );
}