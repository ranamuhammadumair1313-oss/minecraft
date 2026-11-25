import React, { useEffect, useMemo, useState } from 'react';
import { Bookmark, Search, X } from 'lucide-react';
import { ArtworkBanner } from '../components/ArtworkBanner';
import { MinecraftSprite } from '../components/MinecraftSprites';
import { RelatedLinksPanel } from '../components/RelatedLinksPanel';
import { isVersionCompatible, useStudio } from '../context/StudioContext';
import { BIOME_DIMENSIONS, MINECRAFT_BIOMES } from '../data/itemsMobsBiomes';
import { BiomeEntry, DimensionType } from '../types/minecraft';

export const BiomesView: React.FC = () => {
  const { version, focusedEntityId, isFavorite, toggleFavorite } = useStudio();
  const [dimension, setDimension] = useState<'All' | DimensionType>('All');
  const [query, setQuery] = useState('');
  const [activeBiome, setActiveBiome] = useState<BiomeEntry | null>(null);

  useEffect(() => {
    if (focusedEntityId && focusedEntityId.startsWith('biome-')) {
      const found = MINECRAFT_BIOMES.find((b) => b.id === focusedEntityId);
      if (found) {
        setDimension('All');
        setActiveBiome(found);
      }
    }
  }, [focusedEntityId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MINECRAFT_BIOMES.filter((b) => {
      const versionOk = isVersionCompatible(b.minVersion, version);
      const dimOk = dimension === 'All' || b.dimension === dimension;
      const queryOk =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.keyResources.some((r) => r.toLowerCase().includes(q));
      return versionOk && dimOk && queryOk;
    });
  }, [dimension, query, version]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="rounded-xl border border-white/10 bg-[#0D1311] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-center space-y-3">
          <div className="text-xs font-mono text-emerald-400">
            World Generation Atlas · Java {version}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white text-balance">
            Minecraft Biomes & Dimensions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Explore Overworld surface and deep subterranean biomes alongside the Nether and End Highlands—complete with generated structures, exclusive mobs, and resource guides.
          </p>
          <div className="pt-2 relative max-w-md">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search biomes or resources (e.g. Deep Dark, Cherry, Sculk)..."
              aria-label="Filter biomes"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#07090A] border border-white/15 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
        <div className="h-48 lg:h-auto lg:col-span-5">
          <ArtworkBanner artworkKey="biomes" className="w-full h-full" />
        </div>
      </div>

      {/* Dimension Filter */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Minecraft dimensions">
        {BIOME_DIMENSIONS.map((d) => {
          const active = dimension === d;
          return (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setDimension(d)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#111715] border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40'
              }`}
            >
              {d === 'All' ? 'All Dimensions' : d}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((biome) => {
          const saved = isFavorite('biome', biome.id);
          return (
            <article
              key={biome.id}
              className="rounded-xl border border-white/10 bg-[#0F1412] hover:border-emerald-500/45 transition-colors p-5 flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#07090A] border border-white/10 shrink-0">
                      <MinecraftSprite sprite={biome.sprite} size={30} />
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-semibold text-white">
                        {biome.name}
                      </h2>
                      <div className="text-xs text-slate-400">
                        <span className="text-emerald-400 font-medium">{biome.dimension}</span>
                        <span aria-hidden="true"> · </span>
                        <span className="font-mono">{biome.minVersion}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFavorite('biome', biome.id, biome.name)}
                    aria-label={saved ? `Remove ${biome.name} from favorites` : `Save ${biome.name} to favorites`}
                    className={`p-2 rounded-md border transition-colors cursor-pointer ${
                      saved
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                        : 'border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{biome.description}</p>

                <dl className="space-y-1.5 text-xs pt-2 border-t border-white/5">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-400">Structures:</dt>
                    <dd className="text-slate-200 text-right">{biome.structures.slice(0, 2).join(', ')}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-400">Resources:</dt>
                    <dd className="text-emerald-400 text-right">{biome.keyResources.slice(0, 2).join(', ')}</dd>
                  </div>
                </dl>
              </div>

              <button
                type="button"
                onClick={() => setActiveBiome(biome)}
                className="w-full py-2 rounded-md border border-white/10 bg-[#141C18] hover:border-emerald-500/50 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Explore Biome Guide
              </button>
            </article>
          );
        })}
      </div>

      {activeBiome && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveBiome(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-white/15 bg-[#0B100E] p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={activeBiome.name}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#111715] border border-emerald-500/30">
                  <MinecraftSprite sprite={activeBiome.sprite} size={40} />
                </div>
                <div>
                  <div className="text-xs font-mono text-emerald-400">
                    {activeBiome.dimension} · {activeBiome.climate}
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {activeBiome.name}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveBiome(null)}
                aria-label="Close biome details"
                className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {activeBiome.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-lg border border-white/10 bg-[#111715]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Structures & Exclusive Mobs
                </h3>
                <ul className="space-y-1 text-slate-200">
                  {activeBiome.structures.map((s) => (
                    <li key={s}>· Structure: {s}</li>
                  ))}
                  {activeBiome.exclusiveMobs.map((m) => (
                    <li key={m}>· Mob: {m}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-white/10 bg-[#111715]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Key Resources
                </h3>
                <ul className="space-y-1 text-slate-200">
                  {activeBiome.keyResources.map((r) => (
                    <li key={r}>· {r}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-emerald-500/25 bg-[#0D1A14] space-y-1.5 text-sm">
              <h3 className="font-semibold text-emerald-400">Exploration & Survival Tips</h3>
              <p className="text-slate-200 leading-relaxed">{activeBiome.survivalTips}</p>
            </div>

            <RelatedLinksPanel ids={activeBiome.relatedIds} />
          </div>
        </div>
      )}
    </div>
  );
};
