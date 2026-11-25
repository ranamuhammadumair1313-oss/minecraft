import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { SearchHit, useStudio } from '../context/StudioContext';
import { MinecraftSprite } from './MinecraftSprites';

export const GlobalSearchBar: React.FC<{ placeholder?: string; className?: string }> = ({
  placeholder = 'Search any enchantment, crafting recipe, item, mob, biome, or guide...',
  className = '',
}) => {
  const { searchAll, navigateByRelatedId } = useStudio();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const hits = useMemo(() => searchAll(query), [query, searchAll]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleSelect = (hit: SearchHit) => {
    setOpen(false);
    setQuery('');
    navigateByRelatedId(hit.id);
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <div className="relative flex items-center">
        <Search className="w-5 h-5 text-emerald-400 absolute left-4 pointer-events-none" />
        <input
          type="search"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder={placeholder}
          aria-label="Search UMAIR STUDIO Minecraft encyclopedia"
          className="w-full pl-12 pr-11 py-3.5 rounded-lg bg-[#0D1411]/95 border border-emerald-500/35 text-sm sm:text-base text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400 shadow-lg shadow-black/40"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search query"
            className="absolute right-3 p-1.5 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {open && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 mt-2 rounded-xl border border-white/15 bg-[#0D1311] shadow-2xl z-30 max-h-96 overflow-y-auto divide-y divide-white/5">
          {hits.length === 0 ? (
            <div className="p-5 text-sm text-slate-400 text-center">
              No matching Minecraft entries found for “{query}”. Try “Mace”, “Wind Burst”, “Warden”, or “Redstone”.
            </div>
          ) : (
            hits.map((hit) => (
              <button
                key={`${hit.kind}-${hit.id}`}
                type="button"
                onClick={() => handleSelect(hit)}
                className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-emerald-500/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-1.5 rounded-md bg-[#141D1A] border border-white/10 shrink-0">
                    <MinecraftSprite sprite={hit.sprite} size={24} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">
                      {hit.title}
                    </div>
                    <div className="text-xs text-slate-400 truncate">
                      {hit.subtitle}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export const SearchOverlay: React.FC = () => {
  const { searchOpen, setSearchOpen, searchAll, navigateByRelatedId } = useStudio();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const hits = useMemo(() => searchAll(query), [query, searchAll]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [searchOpen, setSearchOpen]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  if (!searchOpen) return null;

  const quickQueries = ['Mace', 'Wind Burst', 'Mending', 'Warden', 'Crafter', 'Villager Trading'];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4"
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl rounded-xl border border-white/15 bg-[#0B100E] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Global Minecraft Search"
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search enchantments, crafting recipes, items, mobs, biomes, guides..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {!query.trim() ? (
            <div className="p-5">
              <p className="text-xs font-medium text-slate-400 mb-3">
                Popular Encyclopedia Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {quickQueries.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-md border border-white/10 bg-[#121917] hover:border-emerald-500/50 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : hits.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400">
              No matching entries for “{query}”.
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {hits.map((hit) => (
                <button
                  key={`${hit.kind}-${hit.id}`}
                  type="button"
                  onClick={() => navigateByRelatedId(hit.id)}
                  className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-emerald-500/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-md bg-[#121917] border border-white/10 shrink-0">
                      <MinecraftSprite sprite={hit.sprite} size={24} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">
                        {hit.title}
                      </div>
                      <div className="text-xs text-slate-400 truncate">
                        {hit.subtitle}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 shrink-0">
                    {hit.minVersion}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
