import React from 'react';
import type { Tool } from '../types';

interface AdminPanelProps {
  tools: Tool[];
  onApprove: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function AdminPanel({ tools, onApprove, onDelete }: AdminPanelProps) {
  const pendingTools = tools.filter(t => !t.approved).slice(0, 5);
  
  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <h3 className="text-xl font-bold text-slate-100">Admin Panel (Mock)</h3>
      <p className="text-sm text-slate-400 mt-1">Approve or remove tool listings. Connect to real auth for production.</p>
      
      {pendingTools.length > 0 ? (
        <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-slate-200">Pending Approval ({pendingTools.length})</h4>
          {pendingTools.map(t => (
            <div key={t.id} className="flex items-center justify-between border border-slate-700 p-3 rounded-md bg-slate-700/50">
              <div>
                <div className="font-medium text-slate-200">{t.name}</div>
                <div className="text-xs text-slate-400">{t.category} • {t.pricing}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onApprove(t.id)} className="px-3 py-1 text-sm bg-green-500/10 text-green-400 rounded-md hover:bg-green-500/20 transition">Approve</button>
                <button onClick={() => onDelete(t.id)} className="px-3 py-1 text-sm bg-red-500/10 text-red-400 rounded-md hover:bg-red-500/20 transition">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
          <div className="mt-4 text-center py-8 border-2 border-dashed border-slate-700 rounded-md">
              <p className="text-slate-400">No tools pending approval.</p>
          </div>
      )}
    </div>
  );
}