import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_TOOLS } from './constants';
import type { Tool } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import ToolCard from './components/ToolCard';
import ToolModal from './components/ToolModal';
import SubmitForm from './components/SubmitForm';
import AdminPanel from './components/AdminPanel';
import BlogSection from './components/BlogSection';
import AdPlaceholder from './components/AdPlaceholder';
import { useLocalStorage } from './hooks/useLocalStorage';

const PER_PAGE = 12;

export default function App() {
  const [tools, setTools] = useState<Tool[]>(MOCK_TOOLS);
  const [query, setQuery] = useLocalStorage<string>('aihub_query', '');
  const [category, setCategory] = useLocalStorage<string>('aihub_category', 'All');
  const [sortBy, setSortBy] = useLocalStorage<string>('aihub_sortBy', 'relevance');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

  useEffect(() => {
    // In a real app, you would fetch tools from an API here.
    // e.g., fetch('/api/tools').then(r => r.json()).then(data => setTools(data));
  }, []);

  const filteredTools = useMemo(() => {
    let list = [...tools];
    if (category !== 'All') {
      list = list.filter(t => t.category === category);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(t => 
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.subcategory.toLowerCase().includes(q) ||
        t.tags.join(' ').toLowerCase().includes(q)
      );
    }
    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [tools, category, query, sortBy]);

  const paginatedTools = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filteredTools.slice(start, start + PER_PAGE);
  }, [filteredTools, page]);

  const handleOpenTool = (tool: Tool) => setSelectedTool(tool);
  const handleCloseTool = () => setSelectedTool(null);

  const handleSearchChange = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setPage(1);
  };
  
  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setPage(1);
  }

  const handleToolSubmit = (form: Omit<Tool, 'id' | 'rating' | 'approved' | 'affiliate'>) => {
    const newTool: Tool = {
      ...form,
      id: `t_${Date.now()}`,
      rating: 0,
      tags: Array.isArray(form.tags) ? form.tags : (form.tags as string).split(',').map(s => s.trim()).filter(Boolean),
      approved: false,
      affiliate: false,
    };
    setTools(prev => [newTool, ...prev]);
    alert('Tool submitted — it will appear once approved by admin (mocked).');
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const approveTool = (id: string) => {
    setTools(prev => prev.map(t => t.id === id ? { ...t, approved: true } : t));
  };

  const deleteTool = (id: string) => {
    setTools(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Sidebar
            query={query}
            onQueryChange={handleSearchChange}
            category={category}
            onCategoryChange={handleCategoryChange}
            sortBy={sortBy}
            onSortByChange={handleSortChange}
            toolsCount={tools.length}
            filteredCount={filteredTools.length}
            currentPage={page}
            allTools={tools}
          />

          <section className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-100">Discover AI Tools</h2>
              <div className="text-sm text-slate-400">Showing {filteredTools.length} results</div>
            </div>

            {paginatedTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedTools.map(tool => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onOpen={handleOpenTool}
                    isFavorite={favorites.includes(tool.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
                <div className="text-center py-16 bg-slate-800 rounded-lg border border-slate-700">
                    <h3 className="text-xl font-semibold text-slate-100">No tools found</h3>
                    <p className="text-slate-400 mt-2">Try adjusting your search or filter criteria.</p>
                </div>
            )}
            
            {filteredTools.length > PER_PAGE && (
              <div className="flex items-center justify-between mt-8">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))} 
                  disabled={page === 1}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-md hover:bg-amber-500/10 hover:border-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                <div className="text-sm text-slate-400">Page {page} of {Math.ceil(filteredTools.length / PER_PAGE)}</div>
                <button 
                  onClick={() => setPage(p => p + 1)} 
                  disabled={page * PER_PAGE >= filteredTools.length}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-md hover:bg-amber-500/10 hover:border-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}

            <div className="pt-4">
              <AdPlaceholder id="inline-1" style={{ height: 100 }} scriptSrc="//pl27776590.revenuecpmgate.com/c6/20/db/c620db0623743677438c0ad2b442084e.js" />
            </div>

            <div id="submit" className="scroll-mt-20">
              <SubmitForm onSubmit={handleToolSubmit} />
            </div>
            
            <div id="blog" className="scroll-mt-20">
                <BlogSection />
            </div>

            <div id="admin" className="scroll-mt-20">
              <AdminPanel tools={tools} onApprove={approveTool} onDelete={deleteTool} />
            </div>
          </section>
        </section>
      </main>
      <Footer />
      {selectedTool && <ToolModal tool={selectedTool} onClose={handleCloseTool} />}
    </div>
  );
}