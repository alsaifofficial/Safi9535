import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import type { Tool } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateToolDescription } from '../services/geminiService';
import SparkleIcon from './icons/SparkleIcon';

interface SubmitFormProps {
  onSubmit: (form: Omit<Tool, 'id' | 'rating' | 'approved' | 'affiliate'>) => void;
}

type FormState = Omit<Tool, 'id' | 'rating' | 'approved' | 'affiliate' | 'tags'> & { tags: string };

const initialFormState: FormState = {
    name: '',
    url: '',
    category: '',
    subcategory: '',
    description: '',
    pricing: '',
    tags: ''
};

export default function SubmitForm({ onSubmit }: SubmitFormProps) {
  const [form, setForm] = useLocalStorage<FormState>('tool_draft', initialFormState);
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationMessage, setGenerationMessage] = useState<{ text: string; type: 'error' | 'info' } | null>(null);

  const updateField = <K extends keyof FormState,>(key: K, value: FormState[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };
  
  const handleGenerateDescription = async () => {
    setGenerationMessage(null);
    if (!form.name || !form.subcategory) {
        setGenerationMessage({ text: "Tool Name and Subcategory required.", type: 'info' });
        setTimeout(() => setGenerationMessage(null), 3000);
        return;
    }
    setIsGenerating(true);
    try {
        const description = await generateToolDescription(form.name, form.subcategory);
        updateField('description', description);
    } catch (error) {
        console.error("Description generation failed:", error);
        setGenerationMessage({ text: "Generation failed. Please try again.", type: 'error' });
        setTimeout(() => setGenerationMessage(null), 3000);
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.url || !form.category) {
      alert('Please fill all required fields: Tool Name, URL, and Category.');
      return;
    }
    setLoading(true);
    
    setTimeout(() => { // Simulate network request
        const submissionData = {
            ...form,
            tags: form.tags.split(',').map(s => s.trim()).filter(Boolean)
        };
        onSubmit(submissionData);
        setForm(initialFormState); 
        localStorage.removeItem('tool_draft');
        setLoading(false);
    }, 500);
  };
  
  const handleClear = () => {
      setForm(initialFormState);
      localStorage.removeItem('tool_draft');
  }

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <h3 className="text-xl font-bold text-slate-100">Submit a Tool</h3>
      <p className="text-sm text-slate-400 mt-1">Submit your tool for review. It will be listed after admin approval.</p>
      <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4" onSubmit={handleSubmit}>
        <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-slate-300">Tool Name*</label>
            <input required id="name" value={form.name} onChange={e => updateField('name', e.target.value)} placeholder="e.g., ImageForge AI" className="mt-1 w-full bg-slate-700 border-slate-600 rounded-md text-slate-200 focus:ring-amber-500 focus:border-amber-500" />
        </div>
        <div className="md:col-span-2">
            <label htmlFor="url" className="block text-sm font-medium text-slate-300">URL*</label>
            <input required type="url" id="url" value={form.url} onChange={e => updateField('url', e.target.value)} placeholder="https://example.com" className="mt-1 w-full bg-slate-700 border-slate-600 rounded-md text-slate-200 focus:ring-amber-500 focus:border-amber-500" />
        </div>
         <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-300">Category*</label>
            <select required id="category" value={form.category} onChange={e => updateField('category', e.target.value)} className="mt-1 w-full bg-slate-700 border-slate-600 rounded-md text-slate-200 focus:ring-amber-500 focus:border-amber-500">
              <option value="">Select category</option>
              {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>
        <div>
            <label htmlFor="subcategory" className="block text-sm font-medium text-slate-300">Subcategory</label>
            <input id="subcategory" value={form.subcategory} onChange={e => updateField('subcategory', e.target.value)} placeholder="e.g., Text-to-Image" className="mt-1 w-full bg-slate-700 border-slate-600 rounded-md text-slate-200 focus:ring-amber-500 focus:border-amber-500" />
        </div>
        <div className="md:col-span-2 relative">
            <div className="flex justify-between items-baseline mb-1">
              <label htmlFor="description" className="block text-sm font-medium text-slate-300">Description</label>
              {generationMessage && (
                  <span className={`text-xs transition-opacity duration-300 ${generationMessage.type === 'error' ? 'text-red-400' : 'text-amber-400'}`}>
                      {generationMessage.text}
                  </span>
              )}
            </div>
            <textarea id="description" value={form.description} onChange={e => updateField('description', e.target.value)} placeholder="A short, catchy description of the tool." rows={3} className="w-full bg-slate-700 border-slate-600 rounded-md text-slate-200 focus:ring-amber-500 focus:border-amber-500" />
            <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2 py-1 text-xs bg-amber-500/10 text-amber-400 rounded-md hover:bg-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
                <SparkleIcon />
                {isGenerating ? 'Generating...' : 'Auto-generate'}
            </button>
        </div>
        <div>
            <label htmlFor="pricing" className="block text-sm font-medium text-slate-300">Pricing</label>
            <input id="pricing" value={form.pricing} onChange={e => updateField('pricing', e.target.value)} placeholder="Free / Freemium / Paid" className="mt-1 w-full bg-slate-700 border-slate-600 rounded-md text-slate-200 focus:ring-amber-500 focus:border-amber-500" />
        </div>
        <div>
            <label htmlFor="tags" className="block text-sm font-medium text-slate-300">Tags</label>
            <input id="tags" value={form.tags} onChange={e => updateField('tags', e.target.value)} placeholder="comma, separated, tags" className="mt-1 w-full bg-slate-700 border-slate-600 rounded-md text-slate-200 focus:ring-amber-500 focus:border-amber-500" />
        </div>
        <div className="md:col-span-2 flex items-center gap-4 mt-2">
          <button disabled={loading} type="submit" className="px-6 py-2 bg-gradient-to-br from-amber-400 to-amber-500 text-slate-900 rounded-md hover:from-amber-500 hover:to-amber-600 font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Submitting...' : 'Submit Tool'}
          </button>
          <button type="button" onClick={handleClear} className="px-4 py-2 bg-slate-700 text-slate-200 rounded-md hover:bg-slate-600 font-medium transition">
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}