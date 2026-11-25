import React from 'react';
import { ArrowLeft, Bookmark, CheckCircle2 } from 'lucide-react';
import { CraftingGridInspector } from '../components/CraftingGridInspector';
import { MinecraftSprite } from '../components/MinecraftSprites';
import { RelatedLinksPanel } from '../components/RelatedLinksPanel';
import { useStudio } from '../context/StudioContext';
import { CRAFTING_INGREDIENTS, CRAFTING_RECIPES } from '../data/recipes';

export const RecipeDetailView: React.FC = () => {
  const { activeRecipeId, navigate, isFavorite, toggleFavorite } = useStudio();
  const recipe = CRAFTING_RECIPES.find((r) => r.id === activeRecipeId) ?? CRAFTING_RECIPES[0];
  const saved = isFavorite('recipe', recipe.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Breadcrumb & Back */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('recipes')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Crafting Recipes</span>
        </button>
        <div className="text-xs font-mono text-slate-400">
          Crafting Recipes / {recipe.category} / {recipe.name}
        </div>
      </div>

      {/* Title Header */}
      <div className="rounded-xl border border-white/10 bg-[#0F1412] p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-[#07090A] border border-emerald-500/35 shrink-0">
              <MinecraftSprite sprite={recipe.resultSprite} size={44} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-1">
                <span>{recipe.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-emerald-400">{recipe.versionNote}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">Yields ×{recipe.resultCount}</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
                {recipe.name}
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => toggleFavorite('recipe', recipe.id, recipe.name)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
              saved
                ? 'bg-emerald-600 border-emerald-400 text-white'
                : 'bg-[#141C18] border-white/10 text-slate-200 hover:border-emerald-500/50'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{saved ? 'Saved in Favorites' : 'Save Recipe'}</span>
          </button>
        </div>

        <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
          {recipe.description}
        </p>

        {/* Interactive 3x3 Grid & Exact Ingredients */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          <div className="lg:col-span-7">
            <CraftingGridInspector recipe={recipe} />
          </div>

          <div className="lg:col-span-5 rounded-xl border border-white/10 bg-[#0B100E] p-5 flex flex-col justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-semibold text-white mb-3">
                Exact Ingredients Required
              </h2>
              <ul className="space-y-2.5">
                {recipe.exactIngredients.map(({ itemId, count }) => {
                  const item = CRAFTING_INGREDIENTS[itemId];
                  if (!item) return null;
                  return (
                    <li
                      key={itemId}
                      className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-[#111715] border border-white/5"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <MinecraftSprite sprite={item.sprite} size={24} />
                        <span className="text-sm font-medium text-white truncate">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-semibold text-emerald-400 tabular-nums shrink-0">
                        ×{count}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-slate-400 space-y-1">
              <div>
                Resulting Item: <strong className="text-white">{recipe.name}</strong> (×{recipe.resultCount})
              </div>
              <div>
                Recipe Type: <strong className="text-white">{recipe.shaped ? 'Shaped 3×3 Pattern' : 'Shapeless (Any Grid Order)'}</strong>
              </div>
              <div>
                Compatibility: <strong className="text-emerald-400 font-mono">{recipe.versionNote}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Crafting Instructions */}
        <div className="pt-4 border-t border-white/10">
          <h2 className="font-display text-xl font-semibold text-white mb-4">
            Step-by-Step Crafting Instructions
          </h2>
          <ol className="space-y-3">
            {recipe.steps.map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-3.5 p-3.5 rounded-lg border border-white/10 bg-[#0B100E]"
              >
                <span className="w-6 h-6 rounded-md bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                  {index + 1}
                </span>
                <p className="text-sm text-slate-200 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Tip: Click any item inside the 3×3 crafting grid above to inspect where to obtain it.</span>
        </div>

        <RelatedLinksPanel ids={recipe.relatedIds} title="Related Enchantments, Mobs & Guides" />
      </div>
    </div>
  );
};
