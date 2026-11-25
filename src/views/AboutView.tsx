import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Compass, Grid3X3, Sparkles } from 'lucide-react';
import { ArtworkBanner } from '../components/ArtworkBanner';
import { MinecraftSprite } from '../components/MinecraftSprites';
import { useStudio } from '../context/StudioContext';
import { ENCHANTMENTS } from '../data/enchantments';
import { GUIDE_CHAPTERS } from '../data/guides';
import { CRAFTING_RECIPES } from '../data/recipes';

export const AboutView: React.FC = () => {
  const { navigate } = useStudio();

  const pillars = [
    {
      icon: Sparkles,
      title: 'Verified Java 1.21+ Mechanics',
      body: 'Every enchantment cap, mutually exclusive pairing, Mace smash formula, and Trial Chamber loot rule is cross-checked against current Java Edition 1.21+ behavior.',
    },
    {
      icon: Grid3X3,
      title: 'Interactive 3×3 Crafting Blueprints',
      body: 'Each crafting recipe opens in a dedicated blueprint page with an interactive 3×3 grid, exact ingredient counts, and step-by-step instructions.',
    },
    {
      icon: BookOpen,
      title: '19-Chapter Complete Guide',
      body: 'From Day-1 survival basics and ore Y-level charts to Villager curing discounts, Potion brewing, Redstone Crafters, and End City raids.',
    },
    {
      icon: Compass,
      title: 'Fast Cross-Linked Reference',
      body: 'Search across enchantments, recipes, items, mobs, biomes, and guides simultaneously—or bookmark key entries into your personal Favorites.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      <div className="rounded-xl border border-white/10 bg-[#0F1412] overflow-hidden">
        <div className="h-56 sm:h-64 relative">
          <ArtworkBanner artworkKey="cavern" className="w-full h-full" />
        </div>
        <div className="p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-[#0B2419] border border-emerald-500/40">
              <MinecraftSprite sprite="emerald" size={32} />
            </div>
            <div>
              <div className="text-xs font-mono text-emerald-400">
                Independent Minecraft Knowledge Studio
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
                About UMAIR STUDIO
              </h1>
            </div>
          </div>

          <p className="text-base text-slate-300 leading-relaxed max-w-prose">
            UMAIR STUDIO is an independent Minecraft knowledge studio built to replace cluttered, ad-heavy wiki hunting with a fast, structured, dark obsidian encyclopedia. Designed specifically around Minecraft Java Edition 1.21+ (*Tricky Trials* & *Bundles of Bravery*), every blueprint, enchantment table rule, biome profile, and boss strategy is organized for instant readability mid-session.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-lg border border-white/10 bg-[#0B100E]">
              <div className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
                {ENCHANTMENTS.length}
              </div>
              <div className="text-xs text-slate-400 mt-1">Complete Java Enchantments</div>
            </div>
            <div className="p-4 rounded-lg border border-white/10 bg-[#0B100E]">
              <div className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
                {CRAFTING_RECIPES.length}
              </div>
              <div className="text-xs text-slate-400 mt-1">Interactive 3×3 Recipe Pages</div>
            </div>
            <div className="p-4 rounded-lg border border-white/10 bg-[#0B100E]">
              <div className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
                {GUIDE_CHAPTERS.length}
              </div>
              <div className="text-xs text-slate-400 mt-1">Structured Survival & Tech Guides</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="p-5 rounded-lg border border-white/10 bg-[#0B100E] space-y-2"
                >
                  <div className="flex items-center gap-2.5 text-emerald-400">
                    <Icon className="w-4 h-4" />
                    <h2 className="font-display text-base font-semibold text-white">
                      {p.title}
                    </h2>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>

          <div className="p-5 rounded-lg border border-emerald-500/30 bg-[#0B1D16] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Start Exploring the Encyclopedia</span>
              </div>
              <p className="text-xs text-slate-300">
                Jump straight into Java 1.21+ enchantments, 3×3 crafting recipes, or our 19-chapter guide.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                type="button"
                onClick={() => navigate('enchantments')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <span>Enchantments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => navigate('guides')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-white/15 bg-[#111715] hover:border-emerald-500/50 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <span>All Guides</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
