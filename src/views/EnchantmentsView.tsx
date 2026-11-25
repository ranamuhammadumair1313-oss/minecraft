import React, { useEffect, useMemo, useState } from 'react';
import { Bookmark, Search, X } from 'lucide-react';
import { ArtworkBanner } from '../components/ArtworkBanner';
import { MinecraftSprite } from '../components/MinecraftSprites';
import { RelatedLinksPanel } from '../components/RelatedLinksPanel';
import { isVersionCompatible, useStudio } from '../context/StudioContext';
import { ENCHANTMENT_CATEGORIES, ENCHANTMENTS } from '../data/enchantments';
import { Enchantment, EnchantmentCategory } from '../types/minecraft';

export const EnchantmentsView: React.FC = () => {
  const { version, focusedEntityId, isFavorite, toggleFavorite } = useStudio();
  const [selectedCategory, setSelectedCategory] = useState<'All' | EnchantmentCategory>('All');
  const [query, setQuery] = useState('');
  const [activeEnchantment, setActiveEnchantment] = useState<Enchantment | null>(null);

  useEffect(() => {
    if (focusedEntityId && focusedEntityId.startsWith('ench-')) {
      const found = ENCHANTMENTS.find((e) => e.id === focusedEntityId);
      if (found) {
        setSelectedCategory('All');
        setActiveEnchantment(found);
      }
    }
  }, [focusedEntityId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ENCHANTMENTS.filter((e) => {
      const versionOk = isVersionCompatible(e.minVersion, version);
      const categoryOk =
        selectedCategory === 'All' ||
        e.category === selectedCategory ||
        e.secondaryCategories?.includes(selectedCategory);
      const queryOk =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.compatibleItems.some((item) => item.toLowerCase().includes(q));
      return versionOk && categoryOk && queryOk;
    });
  }, [selectedCategory, query, version]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header Banner */}
      <div className="rounded-xl border border-white/10 bg-[#0D1311] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-center space-y-3">
          <div className="text-xs font-mono text-emerald-400">
            Enchantments Registry · Java {version}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white text-balance">
            All Minecraft Enchantments
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Complete reference for Swords, Maces, Pickaxes, Axes, Shovels, Hoes, Bows, Crossbows, Tridents, Armor pieces, Fishing Rods, and Curses—showing max levels, obtainment sources, and incompatible pairings.
          </p>
          <div className="pt-2 relative max-w-md">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter enchantments by name or item (e.g. Mace, Trident)..."
              aria-label="Filter enchantments"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#07090A] border border-white/15 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
        <div className="h-48 lg:h-auto lg:col-span-5">
          <ArtworkBanner artworkKey="enchanting" className="w-full h-full" />
        </div>
      </div>

      {/* Equipment Category Filters */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Enchantment equipment categories">
        {ENCHANTMENT_CATEGORIES.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          Showing <strong className="text-white font-mono tabular-nums">{filtered.length}</strong> enchantments compatible with Java {version}
        </span>
        {selectedCategory !== 'All' && (
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className="text-emerald-400 hover:text-emerald-300 cursor-pointer"
          >
            Reset Category Filter
          </button>
        )}
      </div>

      {/* Enchantments Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#0F1412] p-12 text-center">
          <p className="text-base font-medium text-white">No enchantments match your filter.</p>
          <p className="text-sm text-slate-400 mt-1">
            Try switching to Java 1.21+ or clearing your search query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((ench) => {
            const saved = isFavorite('enchantment', ench.id);
            const isSelected = activeEnchantment?.id === ench.id;
            return (
              <article
                key={ench.id}
                className={`rounded-xl border p-5 flex flex-col justify-between gap-4 transition-colors ${
                  isSelected
                    ? 'border-emerald-400 bg-[#0E1B16]'
                    : 'border-white/10 bg-[#0F1412] hover:border-emerald-500/45'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-[#07090A] border border-white/10 shrink-0">
                        <MinecraftSprite sprite={ench.sprite} size={30} />
                      </div>
                      <div>
                        <h2 className="font-display text-lg font-semibold text-white">
                          {ench.name}
                        </h2>
                        <div className="text-xs text-slate-400 mt-0.5">
                          <span>{ench.category}</span>
                          <span aria-hidden="true"> · </span>
                          <span className="font-mono text-emerald-400 tabular-nums">
                            Max Level {ench.maxLevelRoman} ({ench.maxLevel})
                          </span>
                          {ench.isCurse && (
                            <>
                              <span aria-hidden="true"> · </span>
                              <span className="text-red-400 font-medium">Curse</span>
                            </>
                          )}
                          {ench.isTreasure && !ench.isCurse && (
                            <>
                              <span aria-hidden="true"> · </span>
                              <span className="text-amber-300 font-medium">Treasure</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFavorite('enchantment', ench.id, ench.name)}
                      aria-label={saved ? `Remove ${ench.name} from favorites` : `Save ${ench.name} to favorites`}
                      className={`p-2 rounded-md border transition-colors cursor-pointer ${
                        saved
                          ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                          : 'border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {ench.description}
                  </p>

                  <dl className="space-y-1.5 text-xs pt-2 border-t border-white/5">
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-400 shrink-0">Compatible:</dt>
                      <dd className="text-slate-200 text-right">{ench.compatibleItems.join(', ')}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-400 shrink-0">Obtain via:</dt>
                      <dd className="text-slate-200 text-right">{ench.howToObtain.slice(0, 2).join(', ')}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-400 shrink-0">Version:</dt>
                      <dd className="text-emerald-400 font-mono text-right">{ench.versionNote}</dd>
                    </div>
                  </dl>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveEnchantment(ench)}
                  className="w-full py-2 rounded-md border border-white/10 bg-[#141C18] hover:border-emerald-500/50 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  View Full Enchantment Guide
                </button>
              </article>
            );
          })}
        </div>
      )}

      {/* Enchantment Detail Modal */}
      {activeEnchantment && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveEnchantment(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-white/15 bg-[#0B100E] p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={activeEnchantment.name}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#111715] border border-emerald-500/30">
                  <MinecraftSprite sprite={activeEnchantment.sprite} size={40} />
                </div>
                <div>
                  <div className="text-xs font-mono text-emerald-400">
                    {activeEnchantment.category} · Max Level {activeEnchantment.maxLevelRoman}
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">
                    {activeEnchantment.name}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveEnchantment(null)}
                aria-label="Close enchantment details"
                className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {activeEnchantment.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-lg border border-white/10 bg-[#111715]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Compatible Items
                </h3>
                <ul className="space-y-1 text-slate-200">
                  {activeEnchantment.compatibleItems.map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-white/10 bg-[#111715]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  How to Obtain
                </h3>
                <ul className="space-y-1 text-slate-200">
                  {activeEnchantment.howToObtain.map((src) => (
                    <li key={src}>· {src}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-emerald-500/25 bg-[#0D1A14] space-y-2 text-sm">
              <h3 className="font-semibold text-emerald-400">Useful Information & Rules</h3>
              <p className="text-slate-200 leading-relaxed">{activeEnchantment.usefulInfo}</p>
              {activeEnchantment.incompatibleWith && activeEnchantment.incompatibleWith.length > 0 && (
                <p className="text-xs text-amber-300 pt-1">
                  Mutually Exclusive With: {activeEnchantment.incompatibleWith.join(', ')}
                </p>
              )}
              <p className="text-xs font-mono text-slate-400 pt-1">
                Compatibility: {activeEnchantment.versionNote}
              </p>
            </div>

            <RelatedLinksPanel ids={activeEnchantment.relatedIds} />
          </div>
        </div>
      )}
    </div>
  );
};
