export type MinecraftVersion = '1.21+' | '1.20' | '1.19' | '1.18' | '1.16+';

export type NavSection =
  | 'home'
  | 'enchantments'
  | 'recipes'
  | 'recipe-detail'
  | 'items'
  | 'mobs'
  | 'biomes'
  | 'guides'
  | 'guide-detail'
  | 'about';

export type SpriteKey =
  | 'sword'
  | 'pickaxe'
  | 'axe'
  | 'shovel'
  | 'hoe'
  | 'bow'
  | 'crossbow'
  | 'trident'
  | 'mace'
  | 'helmet'
  | 'chestplate'
  | 'leggings'
  | 'boots'
  | 'fishing_rod'
  | 'enchanted_book'
  | 'shield'
  | 'elytra'
  | 'diamond'
  | 'emerald'
  | 'netherite'
  | 'iron_ingot'
  | 'gold_ingot'
  | 'copper_ingot'
  | 'redstone'
  | 'lapis'
  | 'coal'
  | 'amethyst'
  | 'quartz'
  | 'stick'
  | 'oak_planks'
  | 'cobblestone'
  | 'obsidian'
  | 'crafting_table'
  | 'furnace'
  | 'chest'
  | 'anvil'
  | 'enchanting_table'
  | 'brewing_stand'
  | 'beacon'
  | 'ender_pearl'
  | 'ender_eye'
  | 'blaze_rod'
  | 'breeze_rod'
  | 'heavy_core'
  | 'nether_star'
  | 'apple_gold'
  | 'bread'
  | 'cake'
  | 'potion'
  | 'torch'
  | 'lantern'
  | 'bookshelf'
  | 'piston'
  | 'observer'
  | 'hopper'
  | 'comparator'
  | 'crafter'
  | 'tnt'
  | 'rail'
  | 'minecart'
  | 'boat'
  | 'bed'
  | 'compass'
  | 'spyglass'
  | 'shulker_box'
  | 'end_crystal'
  | 'respawn_anchor'
  | 'lodestone'
  | 'scaffolding'
  | 'string'
  | 'feather'
  | 'flint'
  | 'gunpowder'
  | 'glass'
  | 'paper'
  | 'leather'
  | 'slime_ball'
  | 'prismarine'
  | 'glowstone'
  | 'ghast_tear'
  | 'magma_cream'
  | 'nether_wart'
  | 'wheat'
  | 'sugar'
  | 'egg'
  | 'milk'
  | 'bamboo'
  | 'mob_hostile'
  | 'mob_boss'
  | 'mob_passive'
  | 'mob_neutral'
  | 'biome_overworld'
  | 'biome_nether'
  | 'biome_end'
  | 'guide_scroll';

export type EnchantmentCategory =
  | 'Swords'
  | 'Maces'
  | 'Pickaxes'
  | 'Axes'
  | 'Shovels'
  | 'Hoes'
  | 'Bows'
  | 'Crossbows'
  | 'Tridents'
  | 'Armor'
  | 'Helmets'
  | 'Chestplates'
  | 'Leggings'
  | 'Boots'
  | 'Fishing Rods'
  | 'Other & Curses';

export interface Enchantment {
  id: string;
  name: string;
  category: EnchantmentCategory;
  secondaryCategories?: EnchantmentCategory[];
  maxLevel: number;
  maxLevelRoman: string;
  description: string;
  compatibleItems: string[];
  howToObtain: string[];
  usefulInfo: string;
  incompatibleWith?: string[];
  minVersion: MinecraftVersion;
  versionNote: string;
  isCurse?: boolean;
  isTreasure?: boolean;
  popular?: boolean;
  sprite: SpriteKey;
  relatedIds?: string[];
}

export type RecipeCategory =
  | 'Tools'
  | 'Weapons'
  | 'Armor'
  | 'Food'
  | 'Building Blocks'
  | 'Redstone Items'
  | 'Transportation'
  | 'Decorative Items'
  | 'Utility Items'
  | 'Brewing Items'
  | 'Nether Items'
  | 'End Items';

export interface CraftingSlotItem {
  id: string;
  name: string;
  sprite: SpriteKey;
  sourceNote: string;
  linkedRecipeId?: string;
}

export interface CraftingRecipe {
  id: string;
  name: string;
  category: RecipeCategory;
  resultCount: number;
  shaped: boolean;
  /** 9-element array representing 3x3 crafting grid (top-left to bottom-right), null for empty slot */
  grid: (string | null)[];
  exactIngredients: { itemId: string; count: number }[];
  steps: string[];
  description: string;
  minVersion: MinecraftVersion;
  versionNote: string;
  resultSprite: SpriteKey;
  popular?: boolean;
  relatedIds?: string[];
}

export type ItemCategory =
  | 'Ores & Minerals'
  | 'Building Blocks'
  | 'Tools & Weapons'
  | 'Armor & Gear'
  | 'Food & Farming'
  | 'Redstone & Tech'
  | 'Brewing & Potions'
  | 'Artifacts & Rare';

export interface MinecraftItem {
  id: string;
  name: string;
  category: ItemCategory;
  stackSize: number;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic';
  description: string;
  obtainment: string;
  uses: string[];
  stats?: string;
  minVersion: MinecraftVersion;
  sprite: SpriteKey;
  linkedRecipeId?: string;
  relatedIds?: string[];
}

export type MobDisposition = 'Passive' | 'Neutral' | 'Hostile' | 'Boss';

export interface MobEntry {
  id: string;
  name: string;
  disposition: MobDisposition;
  health: string;
  attackDamage: string;
  spawnBiomes: string[];
  drops: string[];
  description: string;
  combatTips: string;
  minVersion: MinecraftVersion;
  sprite: SpriteKey;
  relatedIds?: string[];
}

export type DimensionType = 'Overworld' | 'Nether' | 'The End';

export interface BiomeEntry {
  id: string;
  name: string;
  dimension: DimensionType;
  climate: string;
  structures: string[];
  exclusiveMobs: string[];
  keyResources: string[];
  description: string;
  survivalTips: string;
  minVersion: MinecraftVersion;
  sprite: SpriteKey;
  relatedIds?: string[];
}

export interface GuideSectionBlock {
  heading: string;
  content: string;
  bullets?: string[];
  codeOrCommand?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface GuideChapter {
  id: string;
  order: number;
  title: string;
  category: 'Core Foundations' | 'World & Entities' | 'Mechanics & Technical' | 'Mastery & Secrets';
  readTime: string;
  summary: string;
  heroImage: 'cavern' | 'enchanting' | 'crafting' | 'biomes' | 'citadel';
  featured?: boolean;
  minVersion: MinecraftVersion;
  sections: GuideSectionBlock[];
  relatedIds: string[];
}

export interface TipItem {
  id: string;
  title: string;
  category: string;
  tip: string;
  versionTag: string;
  targetSection: NavSection;
  targetId?: string;
}

export interface FavoriteRef {
  kind: 'enchantment' | 'recipe' | 'item' | 'mob' | 'biome' | 'guide';
  id: string;
}
