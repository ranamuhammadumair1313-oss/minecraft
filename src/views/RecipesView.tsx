import React, { useMemo, useState } from 'react';
import { ArrowRight, Bookmark, Search } from 'lucide-react';
import { ArtworkBanner } from '../components/ArtworkBanner';
import { MinecraftSprite } from '../components/MinecraftSprites';
import { isVersionCompatible, useStudio } from '../context/StudioContext';
import { CRAFTING_INGREDIENTS, CRAFTING_RECIPES, RECIPE_CATEGORIES } from '../data/recipes';
import { RecipeCategory } from '../types/minecraft';

export const RecipesView: React.FC = () => {
  const { version, navigate, isFavorite, toggleFavorite } = useStudio();
  const [selectedCategory, setSelectedCategory] = useState<'All' | RecipeCategory>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CRAFTING_RECIPES.filter((r) => {
      const versionOk = isVersionCompatible(r.minVersion, version);
      const catOk = selectedCategory === 'All' || r.category === selectedCategory;
      const queryOk =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.exactIngredients.some((ing) =>
          CRAFTING_INGREDIENTS[ing.itemId]?.name.toLowerCase().includes(q)
        );
      return versionOk && catOk && queryOk;
    });
  }, [selectedCategory, query, version]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header Banner */}
      <div className="rounded-xl border border-white/10 bg-[#0D1311] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-center space-y-3">
          <div className="text-xs font-mono text-emerald-400">
            Interactive 3×3 Crafting Inspector · Java {version}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white text-balance">
            Minecraft Crafting Recipes
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Browse blueprints across Tools, Weapons, Armor, Food, Building Blocks, Redstone, Transportation, Decorative, Utility, Brewing, Nether, and End items. Every recipe opens into its own dedicated 3×3 inspection page.
          </p>
          <div className="pt-2 relative max-w-md">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes or ingredients (e.g. Mace, Diamond, Crafter)..."
              aria-label="Filter crafting recipes"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#07090A] border border-white/15 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
        <div className="h-48 lg:h-auto lg:col-span-5">
          <ArtworkBanner artworkKey="crafting" className="w-full h-full" />
        </div>
      </div>

      {/* 12 Category Tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Crafting recipe categories">
        {RECIPE_CATEGORIES.map((cat) => {
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

      {/* Count */}
      <div className="text-xs text-slate-400">
        Showing <strong className="text-white font-mono tabular-nums">{filtered.length}</strong> recipes compatible with Java {version}
      </div>

      {/* Recipe Cards */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#0F1412] p-12 text-center">
          <p className="text-base font-medium text-white">No crafting recipes matched your filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((recipe) => {
            const saved = isFavorite('recipe', recipe.id);
            return (
              <article
                key={recipe.id}
                className="rounded-xl border border-white/10 bg-[#0F1412] hover:border-emerald-500/50 transition-colors p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-[#07090A] border border-white/10 shrink-0">
                        <MinecraftSprite sprite={recipe.resultSprite} size={30} />
                      </div>
                      <div>
                        <h2 className="font-display text-lg font-semibold text-white">
                          {recipe.name}
                        </h2>
                        <div className="text-xs text-slate-400">
                          <span>{recipe.category}</span>
                          <span aria-hidden="true"> · </span>
                          <span className="font-mono text-emerald-400">{recipe.minVersion}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFavorite('recipe', recipe.id, recipe.name)}
                      aria-label={saved ? `Remove ${recipe.name} from favorites` : `Save ${recipe.name} to favorites`}
                      className={`p-2 rounded-md border transition-colors cursor-pointer ${
                        saved
                          ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                          : 'border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Mini 3x3 Preview */}
                  <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-[#0A0E0C] border border-white/5">
                    <div className="grid grid-cols-3 gap-1">
                      {recipe.grid.map((slot, i) => {
                        const ing = slot ? CRAFTING_INGREDIENTS[slot] : null;
                        return (
                          <div
                            key={i}
                            className="w-7 h-7 rounded bg-[#141C18] border border-white/5 flex items-center justify-center"
                          >
                            {ing && <MinecraftSprite sprite={ing.sprite} size={18} />}
                          </div>
                        );
                      })}
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-500/70" />
                    <div className="w-11 h-11 rounded-md bg-[#0E1E17] border border-emerald-500/40 flex items-center justify-center relative">
                      <MinecraftSprite sprite={recipe.resultSprite} size={26} />
                      {recipe.resultCount > 1 && (
                        <span className="absolute -bottom-1 -right-1 text-[10px] font-mono bg-[#07090A] border border-white/15 px-1 rounded text-white tabular-nums">
                          {recipe.resultCount}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('recipe-detail', recipe.id)}
                  className="w-full py-2.5 px-4 rounded-lg bg-emerald-600/15 border border-emerald-500/40 hover:bg-emerald-600 hover:text-white text-xs font-semibold text-emerald-300 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Open Dedicated Recipe Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
