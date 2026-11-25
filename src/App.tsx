import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BackToTop } from './components/BackToTop';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { Footer } from './components/Footer';
import { MinecraftSprite } from './components/MinecraftSprites';
import { Navbar } from './components/Navbar';
import { SearchOverlay } from './components/SearchOverlay';
import { StudioProvider, useStudio } from './context/StudioContext';
import { AboutView } from './views/AboutView';
import { BiomesView } from './views/BiomesView';
import { EnchantmentsView } from './views/EnchantmentsView';
import { GuideDetailView } from './views/GuideDetailView';
import { GuidesView } from './views/GuidesView';
import { HomeView } from './views/HomeView';
import { ItemsView } from './views/ItemsView';
import { MobsView } from './views/MobsView';
import { RecipeDetailView } from './views/RecipeDetailView';
import { RecipesView } from './views/RecipesView';

const StudioShell: React.FC = () => {
  const { section, activeRecipeId, activeGuideId, toastMessage } = useStudio();
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIntroDone(true);
      return;
    }
    const timer = window.setTimeout(() => setIntroDone(true), 520);
    return () => window.clearTimeout(timer);
  }, []);

  const renderView = () => {
    switch (section) {
      case 'home':
        return <HomeView />;
      case 'enchantments':
        return <EnchantmentsView />;
      case 'recipes':
        return <RecipesView />;
      case 'recipe-detail':
        return <RecipeDetailView />;
      case 'items':
        return <ItemsView />;
      case 'mobs':
        return <MobsView />;
      case 'biomes':
        return <BiomesView />;
      case 'guides':
        return <GuidesView />;
      case 'guide-detail':
        return <GuideDetailView />;
      case 'about':
        return <AboutView />;
      default:
        return <HomeView />;
    }
  };

  const viewKey = `${section}-${activeRecipeId ?? ''}-${activeGuideId ?? ''}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#07090A] text-[#F8FAFC]">
      {/* Brief themed loading reveal */}
      <AnimatePresence>
        {!introDone && (
          <motion.div
            key="studio-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
            className="fixed inset-0 z-50 bg-[#07090A] flex flex-col items-center justify-center gap-4 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="p-4 rounded-2xl bg-[#0B2419] border border-emerald-500/40 shadow-2xl shadow-emerald-950/60"
            >
              <MinecraftSprite sprite="emerald" size={44} />
            </motion.div>
            <div className="font-display text-sm font-semibold tracking-widest uppercase text-emerald-400">
              UMAIR STUDIO
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewKey}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <BackToTop />
      <SearchOverlay />
      <FavoritesDrawer />

      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.16 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-lg bg-[#0D1F18] border border-emerald-500/50 text-xs font-medium text-emerald-200 shadow-xl"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <StudioProvider>
      <StudioShell />
    </StudioProvider>
  );
}
