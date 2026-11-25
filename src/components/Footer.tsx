import React from 'react';
import { useStudio } from '../context/StudioContext';
import { MinecraftSprite } from './MinecraftSprites';

export const Footer: React.FC = () => {
  const { navigate } = useStudio();

  return (
    <footer className="border-t border-white/10 bg-[#050708] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <MinecraftSprite sprite="emerald" size={24} />
              <span className="font-display text-lg font-bold tracking-tight text-white">
                UMAIR STUDIO
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Independent Minecraft Java 1.21+ encyclopedia and knowledge studio—built for survival players, builders, and redstone engineers seeking verified mechanics, interactive 3×3 crafting blueprints, and complete survival guides.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Encyclopedia
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button type="button" onClick={() => navigate('enchantments')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  All Enchantments
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('recipes')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Crafting Recipes
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('items')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Items & Ores
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('mobs')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Mobs & Bosses
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Knowledge Hub
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button type="button" onClick={() => navigate('biomes')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Biomes & Dimensions
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('guides')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Complete 19-Part Guide
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('guide-detail', 'guide-villager-trading')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Villager Trading Guide
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigate('about')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  About UMAIR STUDIO
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} UMAIR STUDIO. Independent Minecraft Java 1.21+ Knowledge Resource.</p>
          <p>Not an official Mojang or Microsoft product.</p>
        </div>
      </div>
    </footer>
  );
};
