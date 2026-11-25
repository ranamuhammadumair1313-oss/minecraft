import React, { useMemo, useState } from 'react';
import { ArrowRight, Grid3X3, Info } from 'lucide-react';
import { CRAFTING_INGREDIENTS } from '../data/recipes';
import { CraftingRecipe } from '../types/minecraft';
import { useStudio } from '../context/StudioContext';
import { MinecraftSprite } from './MinecraftSprites';

interface Props {
  recipe: CraftingRecipe;
  compact?: boolean;
}

export const CraftingGridInspector: React.FC<Props> = ({ recipe, compact = false }) => {
  const { navigate } = useStudio();
  const firstOccupied = useMemo(
    () => recipe.grid.find((slot) => slot !== null) ?? null,
    [recipe.grid]
  );
  const [selectedIngredientId, setSelectedIngredientId] = useState<string | null>(firstOccupied);

  const inspectedItem = selectedIngredientId
    ? CRAFTING_INGREDIENTS[selectedIngredientId]
    : null;

  return (
    <div className="rounded-xl border border-white/10 bg-[#0D1311] p-5 md:p-6 obsidian-grid-bg">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5 text-sm font-medium text-emerald-400">
          <Grid3X3 className="w-4 h-4" />
          <span>Interactive 3×3 Crafting Inspector</span>
        </div>
        <span className="text-xs font-mono text-slate-400 tabular-nums">
          {recipe.shaped ? 'Shaped Blueprint' : 'Shapeless Blueprint'} · Output ×{recipe.resultCount}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        {/* 3x3 Crafting Matrix */}
        <div
          className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-[#07090A] border border-white/10"
          role="grid"
          aria-label={`3 by 3 crafting grid for ${recipe.name}`}
        >
          {recipe.grid.map((slotItemId, idx) => {
            const item = slotItemId ? CRAFTING_INGREDIENTS[slotItemId] : null;
            const isHighlighted = slotItemId !== null && slotItemId === selectedIngredientId;
            return (
              <button
                key={idx}
                type="button"
                disabled={!item}
                onClick={() => item && setSelectedIngredientId(item.id)}
                onMouseEnter={() => item && setSelectedIngredientId(item.id)}
                aria-label={item ? `Slot ${idx + 1}: ${item.name}` : `Slot ${idx + 1}: Empty`}
                className={`relative flex items-center justify-center rounded-md border transition-all duration-150 ${
                  compact ? 'w-14 h-14' : 'w-16 h-16 sm:w-[72px] sm:h-[72px]'
                } ${
                  item
                    ? isHighlighted
                      ? 'bg-emerald-500/15 border-emerald-400 shadow-[0_0_0_1px_rgba(16,185,129,0.4)] cursor-pointer'
                      : 'bg-[#121917] border-white/10 hover:border-emerald-500/60 cursor-pointer'
                    : 'bg-[#090D0B] border-white/5 cursor-default'
                }`}
              >
                {item ? (
                  <MinecraftSprite sprite={item.sprite} size={compact ? 32 : 38} />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-white/5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center text-emerald-400">
          <ArrowRight className="w-6 h-6 rotate-90 sm:rotate-0" />
        </div>

        {/* Result Slot */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={`relative flex items-center justify-center rounded-lg border border-emerald-500/40 bg-[#0A1D16] ${
              compact ? 'w-16 h-16' : 'w-20 h-20'
            }`}
          >
            <MinecraftSprite sprite={recipe.resultSprite} size={compact ? 38 : 48} />
            {recipe.resultCount > 1 && (
              <span className="absolute bottom-1 right-1.5 text-xs font-mono font-semibold text-white bg-[#07090A]/90 px-1.5 py-0.5 rounded tabular-nums">
                {recipe.resultCount}
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-slate-300 text-center max-w-[120px]">
            {recipe.name}
          </span>
        </div>
      </div>

      {/* Interactive Slot Inspector Readout */}
      {inspectedItem && (
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md bg-[#121917] border border-white/10 shrink-0">
              <MinecraftSprite sprite={inspectedItem.sprite} size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <span>{inspectedItem.name}</span>
                <span className="text-xs font-normal text-slate-400 inline-flex items-center gap-1">
                  <Info className="w-3 h-3 text-emerald-400" /> Slot Ingredient
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                {inspectedItem.sourceNote}
              </p>
            </div>
          </div>

          {inspectedItem.linkedRecipeId && inspectedItem.linkedRecipeId !== recipe.id && (
            <button
              type="button"
              onClick={() => navigate('recipe-detail', inspectedItem.linkedRecipeId!)}
              className="px-3 py-1.5 rounded-md border border-emerald-500/40 bg-emerald-500/10 text-xs font-medium text-emerald-300 hover:bg-emerald-500/20 transition-colors whitespace-nowrap shrink-0 self-start sm:self-center cursor-pointer"
            >
              View Ingredient Recipe
            </button>
          )}
        </div>
      )}
    </div>
  );
};
