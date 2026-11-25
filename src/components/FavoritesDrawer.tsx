import React from 'react';
import { ArrowRight, Bookmark, Trash2, X } from 'lucide-react';
import { ENCHANTMENTS } from '../data/enchantments';
import { GUIDE_CHAPTERS } from '../data/guides';
import { MINECRAFT_BIOMES, MINECRAFT_ITEMS, MINECRAFT_MOBS } from '../data/itemsMobsBiomes';
import { CRAFTING_RECIPES } from '../data/recipes';
import { useStudio } from '../context/StudioContext';
import { FavoriteRef, SpriteKey } from '../types/minecraft';
import { MinecraftSprite } from './MinecraftSprites';

function resolveFavoriteMeta(fav: FavoriteRef): {
  title: string;
  subtitle: string;
  sprite: SpriteKey;
} | null {
  switch (fav.kind) {
    case 'enchantment': {
      const e = ENCHANTMENTS.find((x) => x.id === fav.id);
      return e ? { title: e.name, subtitle: `Enchantment · ${e.category}`, sprite: e.sprite } : null;
    }
    case 'recipe': {
      const r = CRAFTING_RECIPES.find((x) => x.id === fav.id);
      return r ? { title: r.name, subtitle: `Recipe · ${r.category}`, sprite: r.resultSprite } : null;
    }
    case 'item': {
      const i = MINECRAFT_ITEMS.find((x) => x.id === fav.id);
      return i ? { title: i.name, subtitle: `Item · ${i.category}`, sprite: i.sprite } : null;
    }
    case 'mob': {
      const m = MINECRAFT_MOBS.find((x) => x.id === fav.id);
      return m ? { title: m.name, subtitle: `Mob · ${m.disposition}`, sprite: m.sprite } : null;
    }
    case 'biome': {
      const b = MINECRAFT_BIOMES.find((x) => x.id === fav.id);
      return b ? { title: b.name, subtitle: `Biome · ${b.dimension}`, sprite: b.sprite } : null;
    }
    case 'guide': {
      const g = GUIDE_CHAPTERS.find((x) => x.id === fav.id);
      return g ? { title: g.title, subtitle: `Guide · ${g.readTime}`, sprite: 'guide_scroll' } : null;
    }
  }
}

export const FavoritesDrawer: React.FC = () => {
  const {
    favorites,
    favoritesOpen,
    setFavoritesOpen,
    toggleFavorite,
    navigateByRelatedId,
  } = useStudio();

  if (!favoritesOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end"
      onClick={() => setFavoritesOpen(false)}
    >
      <aside
        className="w-full max-w-md h-full bg-[#0A0E0C] border-l border-white/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        aria-label="Saved Favorites"
      >
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-4 h-4 text-emerald-400" />
            <h2 className="font-display text-lg font-semibold text-white">
              Saved Favorites
            </h2>
            <span className="text-xs font-mono text-slate-400 tabular-nums">
              ({favorites.length})
            </span>
          </div>
          <button
            type="button"
            onClick={() => setFavoritesOpen(false)}
            aria-label="Close favorites drawer"
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {favorites.length === 0 ? (
            <div className="py-16 text-center px-4">
              <p className="text-sm font-medium text-slate-300">
                No favorites saved yet.
              </p>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Click the bookmark icon on any enchantment, recipe, item, mob, biome, or guide to save it here for quick survival reference.
              </p>
            </div>
          ) : (
            favorites.map((fav) => {
              const meta = resolveFavoriteMeta(fav);
              if (!meta) return null;
              return (
                <div
                  key={`${fav.kind}-${fav.id}`}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg border border-white/10 bg-[#111715]"
                >
                  <button
                    type="button"
                    onClick={() => navigateByRelatedId(fav.id)}
                    className="flex items-center gap-3 min-w-0 flex-1 text-left cursor-pointer group"
                  >
                    <div className="p-2 rounded-md bg-[#0A0E0C] border border-white/10 shrink-0">
                      <MinecraftSprite sprite={meta.sprite} size={24} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
                        {meta.title}
                      </div>
                      <div className="text-xs text-slate-400 truncate">
                        {meta.subtitle}
                      </div>
                    </div>
                  </button>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => navigateByRelatedId(fav.id)}
                      aria-label={`Open ${meta.title}`}
                      className="p-1.5 rounded text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(fav.kind, fav.id, meta.title)}
                      aria-label={`Remove ${meta.title} from favorites`}
                      className="p-1.5 rounded text-slate-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>
    </div>
  );
};
