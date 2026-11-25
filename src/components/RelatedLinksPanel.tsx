import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ENCHANTMENTS } from '../data/enchantments';
import { GUIDE_CHAPTERS } from '../data/guides';
import { MINECRAFT_BIOMES, MINECRAFT_ITEMS, MINECRAFT_MOBS } from '../data/itemsMobsBiomes';
import { CRAFTING_RECIPES } from '../data/recipes';
import { useStudio } from '../context/StudioContext';
import { SpriteKey } from '../types/minecraft';
import { MinecraftSprite } from './MinecraftSprites';

interface ResolvedLink {
  id: string;
  title: string;
  label: string;
  sprite: SpriteKey;
}

function resolveLink(id: string): ResolvedLink | null {
  const ench = ENCHANTMENTS.find((e) => e.id === id);
  if (ench) return { id, title: ench.name, label: `Enchantment · ${ench.category}`, sprite: ench.sprite };

  const rec = CRAFTING_RECIPES.find((r) => r.id === id);
  if (rec) return { id, title: rec.name, label: `Recipe · ${rec.category}`, sprite: rec.resultSprite };

  const item = MINECRAFT_ITEMS.find((i) => i.id === id);
  if (item) return { id, title: item.name, label: `Item · ${item.category}`, sprite: item.sprite };

  const mob = MINECRAFT_MOBS.find((m) => m.id === id);
  if (mob) return { id, title: mob.name, label: `Mob · ${mob.disposition}`, sprite: mob.sprite };

  const biome = MINECRAFT_BIOMES.find((b) => b.id === id);
  if (biome) return { id, title: biome.name, label: `Biome · ${biome.dimension}`, sprite: biome.sprite };

  const guide = GUIDE_CHAPTERS.find((g) => g.id === id);
  if (guide) return { id, title: guide.title, label: `Guide · ${guide.readTime}`, sprite: 'guide_scroll' };

  return null;
}

export const RelatedLinksPanel: React.FC<{ ids?: string[]; title?: string }> = ({
  ids,
  title = 'Related Encyclopedia Entries',
}) => {
  const { navigateByRelatedId } = useStudio();
  if (!ids || ids.length === 0) return null;

  const resolved = ids.map(resolveLink).filter((x): x is ResolvedLink => x !== null);
  if (resolved.length === 0) return null;

  return (
    <div className="pt-6 border-t border-white/10">
      <h3 className="text-sm font-semibold text-white mb-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {resolved.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => navigateByRelatedId(entry.id)}
            className="flex items-center justify-between gap-3 p-3 rounded-lg border border-white/10 bg-[#111715] hover:border-emerald-500/50 transition-colors text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-1.5 rounded bg-[#0A0E0C] border border-white/10 shrink-0">
                <MinecraftSprite sprite={entry.sprite} size={22} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors truncate">
                  {entry.title}
                </div>
                <div className="text-xs text-slate-400 truncate">{entry.label}</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};
