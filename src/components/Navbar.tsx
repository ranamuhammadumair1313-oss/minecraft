import React, { useState } from 'react';
import { Bookmark, Menu, Search, X } from 'lucide-react';
import { ALL_VERSIONS, useStudio } from '../context/StudioContext';
import { MinecraftVersion, NavSection } from '../types/minecraft';
import { MinecraftSprite } from './MinecraftSprites';

const NAV_ITEMS: { label: string; section: NavSection }[] = [
  { label: 'Home', section: 'home' },
  { label: 'Enchantments', section: 'enchantments' },
  { label: 'Crafting Recipes', section: 'recipes' },
  { label: 'Items', section: 'items' },
  { label: 'Mobs', section: 'mobs' },
  { label: 'Biomes', section: 'biomes' },
  { label: 'Guides', section: 'guides' },
  { label: 'About Us', section: 'about' },
];

export const Navbar: React.FC = () => {
  const {
    section,
    navigate,
    favorites,
    setFavoritesOpen,
    setSearchOpen,
    version,
    setVersion,
  } = useStudio();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isNavActive = (itemSection: NavSection) => {
    if (itemSection === 'recipes' && section === 'recipe-detail') return true;
    if (itemSection === 'guides' && section === 'guide-detail') return true;
    return section === itemSection;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07090A]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 lg:gap-6">
        {/* Brand Wordmark */}
        <button
          type="button"
          onClick={() => {
            setMobileOpen(false);
            navigate('home');
          }}
          className="flex items-center gap-2.5 text-left group cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-1"
        >
          <MinecraftSprite sprite="emerald" size={26} />
          <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
            UMAIR STUDIO
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-300"
        >
          {NAV_ITEMS.map((item) => {
            const active = isNavActive(item.section);
            return (
              <button
                key={item.section}
                type="button"
                onClick={() => navigate(item.section)}
                className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded ${
                  active
                    ? 'text-emerald-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-emerald-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions: Version Selector, Search, Favorites */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <label className="hidden md:flex items-center gap-1.5 text-xs text-slate-400">
            <span className="sr-only">Minecraft Version</span>
            <select
              aria-label="Minecraft Version"
              value={version}
              onChange={(e) => setVersion(e.target.value as MinecraftVersion)}
              className="bg-[#111715] border border-white/10 text-slate-200 text-xs font-mono rounded-md px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {ALL_VERSIONS.map((v) => (
                <option key={v} value={v}>
                  Java {v}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Open encyclopedia search"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-white/10 bg-[#111715] hover:border-emerald-500/60 text-xs font-medium text-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Search</span>
          </button>

          <button
            type="button"
            onClick={() => setFavoritesOpen(true)}
            aria-label={`Open favorites (${favorites.length} saved)`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Favorites</span>
            <span className="font-mono tabular-nums text-[11px] bg-black/25 px-1.5 py-0.5 rounded">
              {favorites.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="xl:hidden p-2 rounded-md border border-white/10 bg-[#111715] text-slate-200 hover:text-white cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile / Tablet Navigation Drawer */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-white/10 bg-[#0A0E0C] px-4 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(item.section);
              return (
                <button
                  key={item.section}
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate(item.section);
                  }}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium text-left transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40'
                      : 'bg-[#111715] text-slate-300 border border-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span className="text-xs text-slate-400">Active Edition Filter</span>
            <select
              aria-label="Mobile Minecraft Version"
              value={version}
              onChange={(e) => setVersion(e.target.value as MinecraftVersion)}
              className="bg-[#111715] border border-white/10 text-slate-200 text-xs font-mono rounded-md px-2.5 py-1.5"
            >
              {ALL_VERSIONS.map((v) => (
                <option key={v} value={v}>
                  Java {v}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
};
