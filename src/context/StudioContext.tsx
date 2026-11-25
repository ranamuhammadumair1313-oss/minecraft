import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ENCHANTMENTS } from '../data/enchantments';
import { GUIDE_CHAPTERS } from '../data/guides';
import { MINECRAFT_BIOMES, MINECRAFT_ITEMS, MINECRAFT_MOBS } from '../data/itemsMobsBiomes';
import { CRAFTING_RECIPES } from '../data/recipes';
import {
  FavoriteRef,
  MinecraftVersion,
  NavSection,
  SpriteKey,
} from '../types/minecraft';

const VERSION_ORDER: Record<MinecraftVersion, number> = {
  '1.16+': 1,
  '1.18': 2,
  '1.19': 3,
  '1.20': 4,
  '1.21+': 5,
};

export const ALL_VERSIONS: MinecraftVersion[] = ['1.21+', '1.20', '1.19', '1.18', '1.16+'];

export function isVersionCompatible(
  entryMinVersion: MinecraftVersion,
  selectedVersion: MinecraftVersion
): boolean {
  return VERSION_ORDER[entryMinVersion] <= VERSION_ORDER[selectedVersion];
}

export interface SearchHit {
  kind: FavoriteRef['kind'];
  id: string;
  title: string;
  subtitle: string;
  sprite: SpriteKey;
  minVersion: MinecraftVersion;
}

interface StudioContextValue {
  section: NavSection;
  activeRecipeId: string | null;
  activeGuideId: string | null;
  focusedEntityId: string | null;
  version: MinecraftVersion;
  setVersion: (v: MinecraftVersion) => void;
  navigate: (section: NavSection, entityId?: string | null) => void;
  navigateByRelatedId: (id: string) => void;
  favorites: FavoriteRef[];
  toggleFavorite: (kind: FavoriteRef['kind'], id: string, label?: string) => void;
  isFavorite: (kind: FavoriteRef['kind'], id: string) => boolean;
  favoritesOpen: boolean;
  setFavoritesOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchAll: (query: string) => SearchHit[];
  toastMessage: string | null;
}

const StudioContext = createContext<StudioContextValue | undefined>(undefined);

const FAVORITES_STORAGE_KEY = 'umair_studio_favorites_v1';

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [section, setSection] = useState<NavSection>('home');
  const [activeRecipeId, setActiveRecipeId] = useState<string | null>(null);
  const [activeGuideId, setActiveGuideId] = useState<string | null>(null);
  const [focusedEntityId, setFocusedEntityId] = useState<string | null>(null);
  const [version, setVersion] = useState<MinecraftVersion>('1.21+');
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [favorites, setFavorites] = useState<FavoriteRef[]>(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return [
      { kind: 'enchantment', id: 'ench-wind-burst' },
      { kind: 'recipe', id: 'recipe-mace' },
      { kind: 'guide', id: 'guide-villager-trading' },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore storage errors
    }
  }, [favorites]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const applyHash = useCallback((rawHash: string) => {
    const clean = rawHash.replace(/^#\/?/, '').trim();
    if (!clean || clean === 'home') {
      setSection('home');
      setActiveRecipeId(null);
      setActiveGuideId(null);
      return;
    }
    if (clean.startsWith('recipe/')) {
      const id = clean.slice('recipe/'.length);
      if (CRAFTING_RECIPES.some((r) => r.id === id)) {
        setActiveRecipeId(id);
        setSection('recipe-detail');
        return;
      }
    }
    if (clean.startsWith('guide/')) {
      const id = clean.slice('guide/'.length);
      if (GUIDE_CHAPTERS.some((g) => g.id === id)) {
        setActiveGuideId(id);
        setSection('guide-detail');
        return;
      }
    }
    const simpleSections: NavSection[] = [
      'enchantments',
      'recipes',
      'items',
      'mobs',
      'biomes',
      'guides',
      'about',
    ];
    if (simpleSections.includes(clean as NavSection)) {
      setSection(clean as NavSection);
    }
  }, []);

  useEffect(() => {
    applyHash(window.location.hash);
    const onHashChange = () => applyHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [applyHash]);

  const navigate = useCallback((nextSection: NavSection, entityId: string | null = null) => {
    setSearchOpen(false);
    setFavoritesOpen(false);

    if (nextSection === 'recipe-detail' && entityId) {
      setActiveRecipeId(entityId);
      setSection('recipe-detail');
      setFocusedEntityId(null);
      window.location.hash = `recipe/${entityId}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (nextSection === 'guide-detail' && entityId) {
      setActiveGuideId(entityId);
      setSection('guide-detail');
      setFocusedEntityId(null);
      window.location.hash = `guide/${entityId}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSection(nextSection);
    setFocusedEntityId(entityId);
    window.location.hash = nextSection;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateByRelatedId = useCallback(
    (id: string) => {
      if (id.startsWith('recipe-')) {
        navigate('recipe-detail', id);
      } else if (id.startsWith('guide-')) {
        navigate('guide-detail', id);
      } else if (id.startsWith('ench-')) {
        navigate('enchantments', id);
      } else if (id.startsWith('item-')) {
        navigate('items', id);
      } else if (id.startsWith('mob-')) {
        navigate('mobs', id);
      } else if (id.startsWith('biome-')) {
        navigate('biomes', id);
      }
    },
    [navigate]
  );

  const toggleFavorite = useCallback(
    (kind: FavoriteRef['kind'], id: string, label?: string) => {
      setFavorites((prev) => {
        const exists = prev.some((f) => f.kind === kind && f.id === id);
        if (exists) {
          showToast(label ? `Removed ${label} from Favorites` : 'Removed from Favorites');
          return prev.filter((f) => !(f.kind === kind && f.id === id));
        }
        showToast(label ? `Saved ${label} to Favorites` : 'Saved to Favorites');
        return [{ kind, id }, ...prev];
      });
    },
    [showToast]
  );

  const isFavorite = useCallback(
    (kind: FavoriteRef['kind'], id: string) =>
      favorites.some((f) => f.kind === kind && f.id === id),
    [favorites]
  );

  const searchIndex = useMemo<SearchHit[]>(() => {
    const hits: SearchHit[] = [];

    for (const e of ENCHANTMENTS) {
      hits.push({
        kind: 'enchantment',
        id: e.id,
        title: e.name,
        subtitle: `Enchantment · ${e.category} · Max ${e.maxLevelRoman}`,
        sprite: e.sprite,
        minVersion: e.minVersion,
      });
    }
    for (const r of CRAFTING_RECIPES) {
      hits.push({
        kind: 'recipe',
        id: r.id,
        title: r.name,
        subtitle: `Crafting Recipe · ${r.category}`,
        sprite: r.resultSprite,
        minVersion: r.minVersion,
      });
    }
    for (const i of MINECRAFT_ITEMS) {
      hits.push({
        kind: 'item',
        id: i.id,
        title: i.name,
        subtitle: `Item · ${i.category}`,
        sprite: i.sprite,
        minVersion: i.minVersion,
      });
    }
    for (const m of MINECRAFT_MOBS) {
      hits.push({
        kind: 'mob',
        id: m.id,
        title: m.name,
        subtitle: `Mob · ${m.disposition} · ${m.health}`,
        sprite: m.sprite,
        minVersion: m.minVersion,
      });
    }
    for (const b of MINECRAFT_BIOMES) {
      hits.push({
        kind: 'biome',
        id: b.id,
        title: b.name,
        subtitle: `Biome · ${b.dimension}`,
        sprite: b.sprite,
        minVersion: b.minVersion,
      });
    }
    for (const g of GUIDE_CHAPTERS) {
      hits.push({
        kind: 'guide',
        id: g.id,
        title: g.title,
        subtitle: `Guide · ${g.category} · ${g.readTime}`,
        sprite: 'guide_scroll',
        minVersion: g.minVersion,
      });
    }
    return hits;
  }, []);

  const searchAll = useCallback(
    (query: string): SearchHit[] => {
      const q = query.trim().toLowerCase();
      if (!q) return [];
      const scored: { hit: SearchHit; score: number }[] = [];

      for (const hit of searchIndex) {
        const titleLower = hit.title.toLowerCase();
        const subLower = hit.subtitle.toLowerCase();
        if (titleLower === q) {
          scored.push({ hit, score: 100 });
        } else if (titleLower.startsWith(q)) {
          scored.push({ hit, score: 80 });
        } else if (titleLower.includes(q)) {
          scored.push({ hit, score: 60 });
        } else if (subLower.includes(q)) {
          scored.push({ hit, score: 35 });
        }
      }

      // Also search inside enchantment descriptions / recipe ingredients / guide summaries
      if (scored.length < 15) {
        for (const e of ENCHANTMENTS) {
          if (
            !scored.some((s) => s.hit.id === e.id) &&
            (e.description.toLowerCase().includes(q) ||
              e.compatibleItems.some((c) => c.toLowerCase().includes(q)))
          ) {
            const hit = searchIndex.find((h) => h.id === e.id);
            if (hit) scored.push({ hit, score: 25 });
          }
        }
        for (const g of GUIDE_CHAPTERS) {
          if (
            !scored.some((s) => s.hit.id === g.id) &&
            g.summary.toLowerCase().includes(q)
          ) {
            const hit = searchIndex.find((h) => h.id === g.id);
            if (hit) scored.push({ hit, score: 22 });
          }
        }
      }

      return scored
        .sort((a, b) => b.score - a.score || a.hit.title.localeCompare(b.hit.title))
        .slice(0, 18)
        .map((s) => s.hit);
    },
    [searchIndex]
  );

  return (
    <StudioContext.Provider
      value={{
        section,
        activeRecipeId,
        activeGuideId,
        focusedEntityId,
        version,
        setVersion,
        navigate,
        navigateByRelatedId,
        favorites,
        toggleFavorite,
        isFavorite,
        favoritesOpen,
        setFavoritesOpen,
        searchOpen,
        setSearchOpen,
        searchAll,
        toastMessage,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export function useStudio() {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error('useStudio must be used inside StudioProvider');
  return ctx;
}
