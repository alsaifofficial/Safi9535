import React from 'react';

export default function BlogSection() {
    return (
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold text-slate-100">Latest from the Blog</h3>
            <p className="text-sm text-slate-400 mt-1">(Blog system placeholder — integrate your CMS or markdown blog)</p>
            <ul className="mt-4 space-y-3">
                <li className="text-amber-400 hover:underline cursor-pointer">10 Best AI Tools for Podcasters in 2025</li>
                <li className="text-amber-400 hover:underline cursor-pointer">How to Automate Your Social Media with AI</li>
                <li className="text-amber-400 hover:underline cursor-pointer">Stable Diffusion vs Midjourney — Updated Comparison</li>
            </ul>
        </div>
    );
}