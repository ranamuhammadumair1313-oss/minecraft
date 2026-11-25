import React, { useEffect, useMemo, useState } from 'react';
import { Bookmark, Search, X } from 'lucide-react';
import { ArtworkBanner } from '../components/ArtworkBanner';
import { MinecraftSprite } from '../components/MinecraftSprites';
import { RelatedLinksPanel } from '../components/RelatedLinksPanel';
import { isVersionCompatible, useStudio } from '../context/StudioContext';
import { MINECRAFT_MOBS, MOB_DISPOSITIONS } from '../data/itemsMobsBiomes';
import { MobDisposition, MobEntry } from '../types/minecraft';

export const MobsView: React.FC = () => {
  const { version, focusedEntityId, isFavorite, toggleFavorite } = useStudio();
  const [disposition, setDisposition] = useState<'All' | MobDisposition>('All');
  const [query, setQuery] = useState('');
  const [activeMob, setActiveMob] = useState<MobEntry | null>(null);

  useEffect(() => {
    if (focusedEntityId && focusedEntityId.startsWith('mob-')) {
      const found = MINECRAFT_MOBS.find((m) => m.id === focusedEntityId);
      if (found) {
        setDisposition('All');
        setActiveMob(found);
      }
    }
  }, [focusedEntityId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MINECRAFT_MOBS.filter((m) => {
      const versionOk = isVersionCompatible(m.minVersion, version);
      const dispOk = disposition === 'All' || m.disposition === disposition;
      const queryOk =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.drops.some((d) => d.toLowerCase().includes(q));
      return versionOk && dispOk && queryOk;
    });
  }, [disposition, query, version]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="rounded-xl border border-white/10 bg-[#0D1311] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-center space-y-3">
          <div className="text-xs font-mono text-emerald-400">
            Mobs & Boss Bestiary · Java {version}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white text-balance">
            Minecraft Mobs & Bosses
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Tactical database for Overworld, Nether, End, and Trial Chamber entities—including the Ender Dragon, Wither, Warden, Elder Guardian, Breeze, Bogged, and Pale Garden Creaking.
          </p>
          <div className="pt-2 relative max-w-md">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search mobs, bosses, or drops (e.g. Breeze, Warden)..."
              aria-label="Filter mobs"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#07090A] border border-white/15 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
        <div className="h-48 lg:h-auto lg:col-span-5">
          <ArtworkBanner artworkKey="citadel" className="w-full h-full" />
        </div>
      </div>

      {/* Disposition Tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Mob dispositions">
        {MOB_DISPOSITIONS.map((d) => {
          const active = disposition === d;
          return (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setDisposition(d)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                active
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#111715] border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/40'
              }`}
            >
              {d === 'All' ? 'All Entities' : `${d} Mobs`}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((mob) => {
          const saved = isFavorite('mob', mob.id);
          return (
            <article
              key={mob.id}
              className="rounded-xl border border-white/10 bg-[#0F1412] hover:border-emerald-500/45 transition-colors p-5 flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#07090A] border border-white/10 shrink-0">
                      <MinecraftSprite sprite={mob.sprite} size={30} />
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-semibold text-white">
                        {mob.name}
                      </h2>
                      <div className="text-xs text-slate-400">
                        <span
                          className={
                            mob.disposition === 'Boss'
                              ? 'text-amber-300 font-medium'
                              : mob.disposition === 'Hostile'
                              ? 'text-red-400 font-medium'
                              : 'text-emerald-400 font-medium'
                          }
                        >
                          {mob.disposition}
                        </span>
                        <span aria-hidden="true"> · </span>
                        <span className="font-mono tabular-nums">{mob.health}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFavorite('mob', mob.id, mob.name)}
                    aria-label={saved ? `Remove ${mob.name} from favorites` : `Save ${mob.name} to favorites`}
                    className={`p-2 rounded-md border transition-colors cursor-pointer ${
                      saved
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                        : 'border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{mob.description}</p>

                <dl className="space-y-1.5 text-xs pt-2 border-t border-white/5">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-400">Attack:</dt>
                    <dd className="font-mono text-slate-200 tabular-nums text-right">{mob.attackDamage}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-400">Key Drops:</dt>
                    <dd className="text-emerald-400 text-right">{mob.drops[0]}</dd>
                  </div>
                </dl>
              </div>

              <button
                type="button"
                onClick={() => setActiveMob(mob)}
                className="w-full py-2 rounded-md border border-white/10 bg-[#141C18] hover:border-emerald-500/50 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                View Combat Strategy & Drops
              </button>
            </article>
          );
        })}
      </div>

      {activeMob && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveMob(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-white/15 bg-[#0B100E] p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={activeMob.name}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#111715] border border-emerald-500/30">
                  <MinecraftSprite sprite={activeMob.sprite} size={40} />
                </div>
                <div>
                  <div className="text-xs font-mono text-emerald-400">
                    {activeMob.disposition} · {activeMob.health} · {activeMob.minVersion}
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {activeMob.name}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveMob(null)}
                aria-label="Close mob details"
                className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {activeMob.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-lg border border-white/10 bg-[#111715]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Spawn Locations
                </h3>
                <ul className="space-y-1 text-slate-200">
                  {activeMob.spawnBiomes.map((b) => (
                    <li key={b}>· {b}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-white/10 bg-[#111715]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Loot & Drops
                </h3>
                <ul className="space-y-1 text-slate-200">
                  {activeMob.drops.map((d) => (
                    <li key={d}>· {d}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-emerald-500/25 bg-[#0D1A14] space-y-1.5 text-sm">
              <h3 className="font-semibold text-emerald-400">Combat & Survival Strategy</h3>
              <p className="text-slate-200 leading-relaxed">{activeMob.combatTips}</p>
            </div>

            <RelatedLinksPanel ids={activeMob.relatedIds} />
          </div>
        </div>
      )}
    </div>
  );
};
