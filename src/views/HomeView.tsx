import React from 'react';
import { ArrowRight, Bookmark, BookOpen, Grid3X3, Sparkles } from 'lucide-react';
import { ArtworkBanner } from '../components/ArtworkBanner';
import { MinecraftSprite } from '../components/MinecraftSprites';
import { GlobalSearchBar } from '../components/SearchOverlay';
import { useStudio } from '../context/StudioContext';
import { ENCHANTMENTS } from '../data/enchantments';
import { GUIDE_CHAPTERS, LATEST_TIPS } from '../data/guides';
import { CRAFTING_RECIPES } from '../data/recipes';

export const HomeView: React.FC = () => {
  const { navigate, isFavorite, toggleFavorite } = useStudio();

  const featuredGuides = GUIDE_CHAPTERS.filter((g) => g.featured).slice(0, 6);
  const popularEnchantments = ENCHANTMENTS.filter((e) => e.popular).slice(0, 6);
  const popularRecipes = CRAFTING_RECIPES.filter((r) => r.popular).slice(0, 6);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0">
          <ArtworkBanner artworkKey="cavern" className="w-full h-full" overlayScrim={false} />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#07090A]/80 via-[#07090A]/70 to-[#07090A]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#07090A]/90 via-[#07090A]/55 to-transparent"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-20 lg:pt-20 lg:pb-24">
          <div className="max-w-3xl space-y-6">
            {/* Large UMAIR STUDIO Emblem Lockup */}
            <div className="inline-flex items-center gap-3.5 pr-4 py-1.5">
              <div className="w-12 h-12 rounded-xl bg-[#0B2419]/90 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-950/50">
                <MinecraftSprite sprite="emerald" size={32} />
              </div>
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                  UMAIR STUDIO
                </div>
                <div className="text-xs font-mono text-emerald-400">
                  Java Edition 1.21+ Encyclopedia
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance">
                WELCOME TO UMAIR STUDIO
              </h1>
              <p className="text-lg sm:text-xl font-medium text-emerald-400">
                Your Ultimate Minecraft Guide
              </p>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Explore every Java 1.21+ enchantment, inspect interactive 3×3 crafting blueprints, study mob and boss tactics, chart every biome, and master survival engineering in one unified encyclopedia.
              </p>
            </div>

            {/* Instant Encyclopedia Search Bar */}
            <div className="pt-2 max-w-2xl">
              <GlobalSearchBar />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-400">
                <span>Try searching:</span>
                <button
                  type="button"
                  onClick={() => navigate('recipe-detail', 'recipe-mace')}
                  className="text-slate-200 hover:text-emerald-400 underline underline-offset-4 cursor-pointer"
                >
                  Mace Recipe
                </button>
                <button
                  type="button"
                  onClick={() => navigate('enchantments', 'ench-wind-burst')}
                  className="text-slate-200 hover:text-emerald-400 underline underline-offset-4 cursor-pointer"
                >
                  Wind Burst
                </button>
                <button
                  type="button"
                  onClick={() => navigate('mobs', 'mob-warden')}
                  className="text-slate-200 hover:text-emerald-400 underline underline-offset-4 cursor-pointer"
                >
                  Warden Boss
                </button>
                <button
                  type="button"
                  onClick={() => navigate('guide-detail', 'guide-villager-trading')}
                  className="text-slate-200 hover:text-emerald-400 underline underline-offset-4 cursor-pointer"
                >
                  Villager Trading
                </button>
              </div>
            </div>

            {/* Primary Exploration Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('recipes')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Grid3X3 className="w-4 h-4" />
                Explore 3×3 Recipes
              </button>
              <button
                type="button"
                onClick={() => navigate('enchantments')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 bg-[#111715]/90 hover:border-emerald-500/50 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Browse All Enchantments
              </button>
            </div>
          </div>

          {/* Clean Encyclopedia Metric Strip */}
          <div className="mt-12 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl">
            <div>
              <div className="font-mono text-2xl font-bold text-white tabular-nums">
                {ENCHANTMENTS.length}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Verified Enchantments</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold text-white tabular-nums">
                {CRAFTING_RECIPES.length}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Interactive 3×3 Recipes</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold text-white tabular-nums">
                {GUIDE_CHAPTERS.length}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Complete Survival Guides</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
                1.21+
              </div>
              <div className="text-xs text-slate-400 mt-0.5">Java Edition Focus</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Minecraft Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Featured Minecraft Guides
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Essential manuals covering mining math, villager trading, redstone automation, and boss mastery.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('guides')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>View All 19 Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredGuides.map((guide) => {
            const saved = isFavorite('guide', guide.id);
            return (
              <article
                key={guide.id}
                className="group rounded-xl border border-white/10 bg-[#0F1412] overflow-hidden flex flex-col hover:border-emerald-500/45 transition-colors"
              >
                <div className="h-40 relative">
                  <ArtworkBanner artworkKey={guide.heroImage} className="w-full h-full" />
                  <button
                    type="button"
                    onClick={() => toggleFavorite('guide', guide.id, guide.title)}
                    aria-label={saved ? `Remove ${guide.title} from favorites` : `Save ${guide.title} to favorites`}
                    className={`absolute top-3 right-3 p-2 rounded-md border backdrop-blur-sm transition-colors cursor-pointer ${
                      saved
                        ? 'bg-emerald-600 border-emerald-400 text-white'
                        : 'bg-[#07090A]/75 border-white/15 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span>{guide.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{guide.readTime}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {guide.summary}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('guide-detail', guide.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 self-start cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Complete Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Popular Enchantments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Popular Enchantments
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Top survival and Java 1.21+ combat enchantments with max levels and obtainment rules.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('enchantments')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>All {ENCHANTMENTS.length} Enchantments</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularEnchantments.map((ench) => {
            const saved = isFavorite('enchantment', ench.id);
            return (
              <div
                key={ench.id}
                className="rounded-xl border border-white/10 bg-[#0F1412] p-5 flex flex-col justify-between gap-4 hover:border-emerald-500/45 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-[#0A0E0C] border border-white/10 shrink-0">
                        <MinecraftSprite sprite={ench.sprite} size={28} />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-semibold text-white">
                          {ench.name}
                        </h3>
                        <div className="text-xs text-slate-400 mt-0.5">
                          <span>{ench.category}</span>
                          <span aria-hidden="true"> · </span>
                          <span className="font-mono text-emerald-400 tabular-nums">
                            Max {ench.maxLevelRoman}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFavorite('enchantment', ench.id, ench.name)}
                      aria-label={saved ? `Remove ${ench.name} from favorites` : `Save ${ench.name} to favorites`}
                      className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                        saved
                          ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                          : 'border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                    {ench.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                  <span className="text-slate-400 truncate">{ench.versionNote}</span>
                  <button
                    type="button"
                    onClick={() => navigate('enchantments', ench.id)}
                    className="text-emerald-400 hover:text-emerald-300 font-medium whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Inspect Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Popular Crafting Recipes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Popular Crafting Recipes
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Click any recipe to open its dedicated Interactive 3×3 Crafting Grid and step-by-step instructions.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('recipes')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>All Crafting Recipes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularRecipes.map((recipe) => (
            <button
              key={recipe.id}
              type="button"
              onClick={() => navigate('recipe-detail', recipe.id)}
              className="group text-left rounded-xl border border-white/10 bg-[#0F1412] p-5 hover:border-emerald-500/50 transition-colors flex flex-col justify-between gap-4 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#0A0E0C] border border-white/10">
                      <MinecraftSprite sprite={recipe.resultSprite} size={28} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {recipe.name}
                      </h3>
                      <div className="text-xs text-slate-400">
                        {recipe.category} · {recipe.minVersion}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
                </div>
                <p className="text-sm text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                  {recipe.description}
                </p>
              </div>
              <div className="text-xs font-mono text-emerald-400 pt-2 border-t border-white/10">
                Open 3×3 Recipe Blueprint
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Latest Minecraft Tips & Tricks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-xl border border-white/10 bg-[#0D1311] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">
                Latest Minecraft Tips and Tricks
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Verified Java 1.21+ tactics for Trial Chambers, automated Crafters, and Villager discounts.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('guide-detail', 'guide-survival-tips')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 cursor-pointer"
            >
              Read Survival Tips Guide
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LATEST_TIPS.map((tip, idx) => (
              <div
                key={tip.id}
                className="p-4 rounded-lg border border-white/10 bg-[#111715] flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-1.5">
                    <span className="font-mono text-emerald-400">
                      0{idx + 1}. {tip.category}
                    </span>
                    <span className="font-mono">{tip.versionTag}</span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-white">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                    {tip.tip}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(tip.targetSection, tip.targetId ?? null)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 self-start cursor-pointer"
                >
                  <span>Explore Related Entry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
