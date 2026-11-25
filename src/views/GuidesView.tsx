import React, { useMemo, useState } from 'react';
import { ArrowRight, Bookmark, BookOpen, Search } from 'lucide-react';
import { ArtworkBanner } from '../components/ArtworkBanner';
import { useStudio } from '../context/StudioContext';
import { GUIDE_CATEGORIES, GUIDE_CHAPTERS } from '../data/guides';
import { GuideChapter } from '../types/minecraft';

export const GuidesView: React.FC = () => {
  const { navigate, isFavorite, toggleFavorite } = useStudio();
  const [selectedCategory, setSelectedCategory] = useState<'All' | GuideChapter['category']>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GUIDE_CHAPTERS.filter((g) => {
      const catOk = selectedCategory === 'All' || g.category === selectedCategory;
      const queryOk =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.summary.toLowerCase().includes(q);
      return catOk && queryOk;
    });
  }, [selectedCategory, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="rounded-xl border border-white/10 bg-[#0D1311] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-mono text-emerald-400">
            Minecraft Complete Guide · 19 Chapters
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white text-balance">
            The Complete Minecraft Knowledge Library
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Every survival discipline from Day-1 basics, ores, villager trading, potions, brewing, and redstone engineering to Nether highways, End raids, commands, and hidden secrets.
          </p>
        </div>
        <div className="relative w-full lg:w-80 shrink-0">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 19 guide topics..."
            aria-label="Filter guide chapters"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#07090A] border border-white/15 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Guide categories">
        {GUIDE_CATEGORIES.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#111715] border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((guide) => {
          const saved = isFavorite('guide', guide.id);
          return (
            <article
              key={guide.id}
              className="group rounded-xl border border-white/10 bg-[#0F1412] overflow-hidden flex flex-col hover:border-emerald-500/50 transition-colors"
            >
              <div className="h-36 relative">
                <ArtworkBanner artworkKey={guide.heroImage} className="w-full h-full" />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#07090A]/80 border border-white/10 font-mono text-xs text-emerald-400 tabular-nums">
                  {String(guide.order).padStart(2, '0')}
                </div>
                <button
                  type="button"
                  onClick={() => toggleFavorite('guide', guide.id, guide.title)}
                  aria-label={saved ? `Remove ${guide.title} from favorites` : `Save ${guide.title} to favorites`}
                  className={`absolute top-3 right-3 p-2 rounded-md border backdrop-blur-sm transition-colors cursor-pointer ${
                    saved
                      ? 'bg-emerald-600 border-emerald-400 text-white'
                      : 'bg-[#07090A]/75 border-white/15 text-slate-300 hover:text-white'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400 mb-1.5">
                    <span>{guide.category}</span>
                    <span aria-hidden="true"> · </span>
                    <span className="font-mono tabular-nums">{guide.readTime}</span>
                  </div>
                  <h2 className="font-display text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                    {guide.summary}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('guide-detail', guide.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 self-start cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
