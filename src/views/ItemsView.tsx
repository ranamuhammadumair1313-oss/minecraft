import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Bookmark, Search, X } from 'lucide-react';
import { ArtworkBanner } from '../components/ArtworkBanner';
import { MinecraftSprite } from '../components/MinecraftSprites';
import { RelatedLinksPanel } from '../components/RelatedLinksPanel';
import { isVersionCompatible, useStudio } from '../context/StudioContext';
import { ITEM_CATEGORIES, MINECRAFT_ITEMS } from '../data/itemsMobsBiomes';
import { ItemCategory, MinecraftItem } from '../types/minecraft';

export const ItemsView: React.FC = () => {
  const { version, focusedEntityId, navigate, isFavorite, toggleFavorite } = useStudio();
  const [selectedCategory, setSelectedCategory] = useState<'All' | ItemCategory>('All');
  const [query, setQuery] = useState('');
  const [activeItem, setActiveItem] = useState<MinecraftItem | null>(null);

  useEffect(() => {
    if (focusedEntityId && focusedEntityId.startsWith('item-')) {
      const found = MINECRAFT_ITEMS.find((i) => i.id === focusedEntityId);
      if (found) {
        setSelectedCategory('All');
        setActiveItem(found);
      }
    }
  }, [focusedEntityId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MINECRAFT_ITEMS.filter((item) => {
      const versionOk = isVersionCompatible(item.minVersion, version);
      const catOk = selectedCategory === 'All' || item.category === selectedCategory;
      const queryOk =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.obtainment.toLowerCase().includes(q);
      return versionOk && catOk && queryOk;
    });
  }, [selectedCategory, query, version]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="rounded-xl border border-white/10 bg-[#0D1311] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-center space-y-3">
          <div className="text-xs font-mono text-emerald-400">
            Items, Ores & Artifacts · Java {version}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white text-balance">
            Minecraft Items & Ores Catalog
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Detailed profiles for key ores, building blocks, Java 1.21+ Trial Chamber artifacts like Heavy Cores and Breeze Rods, Elytra, and combat consumables.
          </p>
          <div className="pt-2 relative max-w-md">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search items, ores, or obtainment methods..."
              aria-label="Filter items"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#07090A] border border-white/15 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
        <div className="h-48 lg:h-auto lg:col-span-5">
          <ArtworkBanner artworkKey="crafting" className="w-full h-full" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Item categories">
        {ITEM_CATEGORIES.map((cat) => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => {
          const saved = isFavorite('item', item.id);
          return (
            <article
              key={item.id}
              className="rounded-xl border border-white/10 bg-[#0F1412] hover:border-emerald-500/45 transition-colors p-5 flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#07090A] border border-white/10 shrink-0">
                      <MinecraftSprite sprite={item.sprite} size={30} />
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-semibold text-white">
                        {item.name}
                      </h2>
                      <div className="text-xs text-slate-400">
                        <span>{item.category}</span>
                        <span aria-hidden="true"> · </span>
                        <span className="font-mono text-emerald-400">{item.rarity}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFavorite('item', item.id, item.name)}
                    aria-label={saved ? `Remove ${item.name} from favorites` : `Save ${item.name} to favorites`}
                    className={`p-2 rounded-md border transition-colors cursor-pointer ${
                      saved
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                        : 'border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>

                {item.stats && (
                  <div className="text-xs font-mono text-emerald-300 pt-2 border-t border-white/5 tabular-nums">
                    {item.stats}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveItem(item)}
                  className="flex-1 py-2 rounded-md border border-white/10 bg-[#141C18] hover:border-emerald-500/50 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Inspect Item
                </button>
                {item.linkedRecipeId && (
                  <button
                    type="button"
                    onClick={() => navigate('recipe-detail', item.linkedRecipeId!)}
                    className="px-3 py-2 rounded-md bg-emerald-600/15 border border-emerald-500/40 hover:bg-emerald-600 hover:text-white text-xs font-semibold text-emerald-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Recipe
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-white/15 bg-[#0B100E] p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.name}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#111715] border border-emerald-500/30">
                  <MinecraftSprite sprite={activeItem.sprite} size={40} />
                </div>
                <div>
                  <div className="text-xs font-mono text-emerald-400">
                    {activeItem.category} · Stack Size {activeItem.stackSize} · {activeItem.minVersion}
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {activeItem.name}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                aria-label="Close item modal"
                className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {activeItem.description}
            </p>

            <div className="p-4 rounded-lg border border-white/10 bg-[#111715] space-y-1.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                How to Obtain
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">{activeItem.obtainment}</p>
            </div>

            <div className="p-4 rounded-lg border border-white/10 bg-[#111715] space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Primary Uses
              </h3>
              <ul className="space-y-1 text-sm text-slate-200">
                {activeItem.uses.map((u) => (
                  <li key={u}>· {u}</li>
                ))}
              </ul>
            </div>

            {activeItem.linkedRecipeId && (
              <button
                type="button"
                onClick={() => {
                  const id = activeItem.linkedRecipeId!;
                  setActiveItem(null);
                  navigate('recipe-detail', id);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <span>Open 3×3 Crafting Recipe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <RelatedLinksPanel ids={activeItem.relatedIds} />
          </div>
        </div>
      )}
    </div>
  );
};
