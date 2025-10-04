import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-800 border-t border-slate-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-slate-400">
        <p>© {new Date().getFullYear()} AI Tool Hub. All Rights Reserved.</p>
        <p className="mt-2">This is a demo application. For production use, integrate a real database, authentication, and monitor ad scripts carefully.</p>
      </div>
    </footer>
  );
}