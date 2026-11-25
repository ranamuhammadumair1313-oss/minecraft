import React from 'react';
import { SpriteKey } from '../types/minecraft';

interface SpriteProps {
  sprite: SpriteKey;
  size?: number;
  className?: string;
}

export const MinecraftSprite: React.FC<SpriteProps> = ({
  sprite,
  size = 32,
  className = '',
}) => {
  const renderIcon = () => {
    switch (sprite) {
      case 'sword':
        return (
          <g>
            <path d="M22 4h6v6l-2 2-6-6 2-2z" fill="#34D399" />
            <path d="M16 10l6 6-8 8-6-6 8-8z" fill="#10B981" />
            <path d="M8 18l6 6-2 2-6-6 2-2z" fill="#6EE7B7" />
            <rect x="6" y="20" width="6" height="2" transform="rotate(45 9 21)" fill="#A16207" />
            <path d="M4 26l3-3 2 2-3 3H4v-2z" fill="#78350F" />
            <rect x="11" y="15" width="2" height="10" transform="rotate(45 12 20)" fill="#D97706" />
          </g>
        );
      case 'pickaxe':
        return (
          <g>
            <path d="M7 6h14l5 5v4h-4v-4l-4-4H7V6z" fill="#34D399" />
            <path d="M21 6l5 5v4h-3v-3l-4-4h2V6z" fill="#059669" />
            <path d="M18 11l2 2-12 12-2-2 12-12z" fill="#92400E" />
            <path d="M6 23l2 2-2 2-2-2 2-2z" fill="#78350F" />
          </g>
        );
      case 'axe':
        return (
          <g>
            <path d="M14 5h10v8l-4 4h-6V5z" fill="#34D399" />
            <path d="M20 5h4v8l-4 4V5z" fill="#059669" />
            <path d="M14 14l2 2-10 10-2-2 10-10z" fill="#92400E" />
          </g>
        );
      case 'shovel':
        return (
          <g>
            <path d="M20 4h8v8l-4 4-4-4V4z" fill="#34D399" />
            <path d="M19 11l2 2-12 12-2-2 12-12z" fill="#92400E" />
            <rect x="5" y="23" width="4" height="4" fill="#78350F" />
          </g>
        );
      case 'hoe':
        return (
          <g>
            <path d="M12 5h14v5h-4v4h-4v-4h-6V5z" fill="#34D399" />
            <path d="M17 10l2 2-11 11-2-2 11-11z" fill="#92400E" />
          </g>
        );
      case 'mace':
        return (
          <g>
            <rect x="13" y="4" width="12" height="10" rx="1" fill="#64748B" />
            <rect x="15" y="6" width="8" height="6" fill="#38BDF8" />
            <rect x="17" y="7" width="4" height="4" fill="#E0F2FE" />
            <path d="M14 13l3 3-9 9-3-3 9-9z" fill="#F59E0B" />
            <rect x="5" y="23" width="4" height="4" fill="#78350F" />
          </g>
        );
      case 'bow':
        return (
          <g>
            <path d="M10 4h4v3h4v4h3v10h-3v4h-4v3h-4v-3h3v-3h3V10h-3V7h-3V4z" fill="#A16207" />
            <line x1="11" y1="6" x2="11" y2="26" stroke="#E2E8F0" strokeWidth="1.5" />
          </g>
        );
      case 'crossbow':
        return (
          <g>
            <path d="M6 10h20v4H6z" fill="#78350F" />
            <path d="M14 6h4v20h-4z" fill="#94A3B8" />
            <rect x="13" y="13" width="6" height="6" fill="#10B981" />
            <line x1="6" y1="12" x2="16" y2="22" stroke="#E2E8F0" strokeWidth="1.5" />
            <line x1="26" y1="12" x2="16" y2="22" stroke="#E2E8F0" strokeWidth="1.5" />
          </g>
        );
      case 'trident':
        return (
          <g>
            <path d="M10 4h3v8h6V4h3v11h-4v13h-4V15h-4V4z" fill="#2DD4BF" />
            <rect x="14" y="3" width="4" height="8" fill="#5EEAD4" />
          </g>
        );
      case 'helmet':
        return (
          <g>
            <path d="M7 10h18v12h-5v-5h-8v5H7V10z" fill="#34D399" />
            <rect x="9" y="8" width="14" height="4" fill="#10B981" />
            <rect x="11" y="12" width="10" height="3" fill="#064E3B" />
          </g>
        );
      case 'chestplate':
        return (
          <g>
            <path d="M5 7h6v4h10V7h6v8h-4v11H9V15H5V7z" fill="#10B981" />
            <rect x="11" y="11" width="10" height="12" fill="#34D399" />
          </g>
        );
      case 'leggings':
        return (
          <g>
            <path d="M8 6h16v20h-6v-11h-4v11H8V6z" fill="#10B981" />
            <rect x="8" y="6" width="16" height="4" fill="#059669" />
          </g>
        );
      case 'boots':
        return (
          <g>
            <path d="M6 10h6v10h4v5H4v-5h2V10z" fill="#10B981" />
            <path d="M20 10h6v10h2v5H16v-5h4V10z" fill="#34D399" />
          </g>
        );
      case 'fishing_rod':
        return (
          <g>
            <path d="M6 25l14-14 2 2L8 27l-2-2z" fill="#92400E" />
            <path d="M20 11h4v2h-4z" fill="#64748B" />
            <line x1="24" y1="12" x2="24" y2="24" stroke="#E2E8F0" strokeWidth="1.5" />
            <path d="M22 23h4v3h-2v-1h-2v-2z" fill="#38BDF8" />
          </g>
        );
      case 'enchanted_book':
        return (
          <g>
            <rect x="6" y="6" width="20" height="20" rx="2" fill="#7C3AED" />
            <rect x="8" y="8" width="16" height="16" fill="#A855F7" />
            <rect x="10" y="9" width="12" height="14" fill="#FDE68A" />
            <rect x="7" y="13" width="18" height="3" fill="#EF4444" />
            <rect x="14" y="12" width="4" height="5" fill="#10B981" />
          </g>
        );
      case 'shield':
        return (
          <g>
            <rect x="8" y="5" width="16" height="22" rx="2" fill="#92400E" />
            <rect x="10" y="7" width="12" height="18" fill="#B45309" />
            <rect x="9" y="6" width="14" height="3" fill="#94A3B8" />
            <rect x="14" y="12" width="4" height="8" fill="#10B981" />
          </g>
        );
      case 'elytra':
        return (
          <g>
            <path d="M6 7h7l3 7 3-7h7l-2 16-8 4-8-4L6 7z" fill="#94A3B8" />
            <path d="M8 9h4l2 6v8l-5-3L8 9z" fill="#CBD5E1" />
            <path d="M20 9h4l-1 11-5 3v-8l2-6z" fill="#64748B" />
          </g>
        );
      case 'diamond':
        return (
          <g>
            <polygon points="16,4 26,12 22,26 10,26 6,12" fill="#22D3EE" />
            <polygon points="16,6 23,12 19,24 13,24 9,12" fill="#67E8F9" />
            <polygon points="16,9 20,13 16,21 12,13" fill="#CFFAFE" />
          </g>
        );
      case 'emerald':
        return (
          <g>
            <polygon points="16,4 25,11 25,21 16,28 7,21 7,11" fill="#059669" />
            <polygon points="16,7 22,12 22,20 16,25 10,20 10,12" fill="#10B981" />
            <polygon points="16,10 19,13 19,19 16,22 13,19 13,13" fill="#6EE7B7" />
          </g>
        );
      case 'netherite':
        return (
          <g>
            <rect x="6" y="10" width="20" height="12" rx="2" fill="#3F3A3D" />
            <rect x="8" y="12" width="16" height="8" fill="#57534E" />
            <rect x="10" y="13" width="10" height="3" fill="#78716C" />
          </g>
        );
      case 'iron_ingot':
        return (
          <g>
            <polygon points="8,11 22,11 26,19 10,21 6,17" fill="#CBD5E1" />
            <polygon points="9,12 21,12 23,16 11,17" fill="#F8FAFC" />
          </g>
        );
      case 'gold_ingot':
        return (
          <g>
            <polygon points="8,11 22,11 26,19 10,21 6,17" fill="#F59E0B" />
            <polygon points="9,12 21,12 23,16 11,17" fill="#FDE047" />
          </g>
        );
      case 'copper_ingot':
        return (
          <g>
            <polygon points="8,11 22,11 26,19 10,21 6,17" fill="#EA580C" />
            <polygon points="9,12 21,12 23,16 11,17" fill="#FB923C" />
          </g>
        );
      case 'redstone':
        return (
          <g>
            <circle cx="16" cy="18" r="7" fill="#DC2626" />
            <rect x="11" y="12" width="10" height="8" fill="#EF4444" />
            <rect x="14" y="9" width="4" height="4" fill="#FCA5A5" />
          </g>
        );
      case 'lapis':
        return (
          <g>
            <polygon points="16,5 25,13 21,26 11,26 7,13" fill="#2563EB" />
            <polygon points="16,8 21,14 18,22 13,22 11,14" fill="#60A5FA" />
          </g>
        );
      case 'coal':
        return (
          <g>
            <polygon points="12,6 22,8 25,18 18,26 8,23 7,13" fill="#1E293B" />
            <polygon points="13,9 19,10 20,16 14,21 10,16" fill="#334155" />
          </g>
        );
      case 'amethyst':
        return (
          <g>
            <polygon points="16,4 22,14 19,27 13,27 10,14" fill="#9333EA" />
            <polygon points="16,7 19,14 16,24 13,14" fill="#C084FC" />
          </g>
        );
      case 'quartz':
        return (
          <g>
            <polygon points="16,6 24,13 21,25 11,25 8,13" fill="#E2E8F0" />
            <polygon points="16,9 20,14 16,22 12,14" fill="#FFFFFF" />
          </g>
        );
      case 'stick':
        return (
          <g>
            <path d="M22 6l4 4L10 26l-4-4L22 6z" fill="#92400E" />
            <path d="M22 8l2 2L10 24l-2-2L22 8z" fill="#B45309" />
          </g>
        );
      case 'oak_planks':
        return (
          <g>
            <rect x="5" y="5" width="22" height="22" fill="#B45309" />
            <rect x="5" y="5" width="22" height="5" fill="#D97706" />
            <rect x="5" y="16" width="22" height="5" fill="#D97706" />
            <line x1="5" y1="10" x2="27" y2="10" stroke="#78350F" strokeWidth="1" />
            <line x1="5" y1="16" x2="27" y2="16" stroke="#78350F" strokeWidth="1" />
            <line x1="5" y1="21" x2="27" y2="21" stroke="#78350F" strokeWidth="1" />
          </g>
        );
      case 'cobblestone':
        return (
          <g>
            <rect x="5" y="5" width="22" height="22" fill="#64748B" />
            <rect x="6" y="6" width="9" height="8" fill="#94A3B8" />
            <rect x="17" y="7" width="8" height="7" fill="#475569" />
            <rect x="6" y="16" width="11" height="9" fill="#475569" />
            <rect x="19" y="16" width="7" height="9" fill="#94A3B8" />
          </g>
        );
      case 'obsidian':
        return (
          <g>
            <rect x="5" y="5" width="22" height="22" fill="#0F0720" />
            <rect x="7" y="7" width="6" height="6" fill="#3B0764" />
            <rect x="17" y="15" width="7" height="7" fill="#581C87" />
            <rect x="10" y="19" width="4" height="4" fill="#7E22CE" />
          </g>
        );
      case 'crafting_table':
        return (
          <g>
            <rect x="5" y="5" width="22" height="22" fill="#92400E" />
            <rect x="5" y="5" width="22" height="8" fill="#D97706" />
            <rect x="8" y="6" width="4" height="4" fill="#78350F" />
            <rect x="14" y="6" width="4" height="4" fill="#78350F" />
            <rect x="20" y="6" width="4" height="4" fill="#78350F" />
            <rect x="8" y="16" width="6" height="9" fill="#78350F" />
            <rect x="18" y="16" width="6" height="9" fill="#78350F" />
          </g>
        );
      case 'furnace':
        return (
          <g>
            <rect x="5" y="5" width="22" height="22" fill="#64748B" />
            <rect x="9" y="8" width="14" height="5" fill="#1E293B" />
            <rect x="10" y="17" width="12" height="8" fill="#0F172A" />
            <rect x="12" y="20" width="8" height="4" fill="#F97316" />
          </g>
        );
      case 'chest':
        return (
          <g>
            <rect x="5" y="7" width="22" height="19" fill="#B45309" />
            <rect x="5" y="7" width="22" height="6" fill="#D97706" />
            <line x1="5" y1="13" x2="27" y2="13" stroke="#451A03" strokeWidth="1.5" />
            <rect x="14" y="11" width="4" height="5" fill="#E2E8F0" />
          </g>
        );
      case 'anvil':
        return (
          <g>
            <rect x="6" y="7" width="20" height="6" fill="#475569" />
            <rect x="11" y="13" width="10" height="7" fill="#334155" />
            <rect x="7" y="20" width="18" height="6" fill="#475569" />
          </g>
        );
      case 'enchanting_table':
        return (
          <g>
            <rect x="5" y="14" width="22" height="12" fill="#1E1B4B" />
            <rect x="5" y="11" width="22" height="4" fill="#991B1B" />
            <rect x="7" y="11" width="4" height="3" fill="#22D3EE" />
            <rect x="21" y="11" width="4" height="3" fill="#22D3EE" />
            <rect x="11" y="6" width="10" height="6" fill="#FDE68A" />
          </g>
        );
      case 'brewing_stand':
        return (
          <g>
            <rect x="8" y="22" width="16" height="4" fill="#475569" />
            <rect x="14" y="7" width="4" height="16" fill="#F59E0B" />
            <rect x="7" y="14" width="6" height="6" fill="#FDE047" />
            <rect x="19" y="14" width="6" height="6" fill="#FDE047" />
          </g>
        );
      case 'beacon':
        return (
          <g>
            <rect x="5" y="5" width="22" height="22" fill="#A5F3FC" fillOpacity="0.4" stroke="#67E8F9" strokeWidth="1.5" />
            <rect x="8" y="21" width="16" height="5" fill="#1E1B4B" />
            <rect x="11" y="10" width="10" height="10" fill="#10B981" />
            <rect x="13" y="12" width="6" height="6" fill="#FFFFFF" />
          </g>
        );
      case 'ender_pearl':
        return (
          <g>
            <circle cx="16" cy="16" r="10" fill="#065F46" />
            <circle cx="16" cy="16" r="7" fill="#10B981" />
            <circle cx="13" cy="13" r="2.5" fill="#A7F3D0" />
          </g>
        );
      case 'ender_eye':
        return (
          <g>
            <circle cx="16" cy="16" r="10" fill="#059669" />
            <circle cx="16" cy="16" r="6" fill="#34D399" />
            <rect x="15" y="10" width="2" height="12" fill="#022C22" />
            <circle cx="16" cy="16" r="2" fill="#D9F99D" />
          </g>
        );
      case 'blaze_rod':
        return (
          <g>
            <path d="M22 6l4 4L10 26l-4-4L22 6z" fill="#F59E0B" />
            <path d="M22 8l2 2L10 24l-2-2L22 8z" fill="#FEF08A" />
          </g>
        );
      case 'breeze_rod':
        return (
          <g>
            <path d="M22 6l4 4L10 26l-4-4L22 6z" fill="#6366F1" />
            <path d="M22 8l2 2L10 24l-2-2L22 8z" fill="#A5F3FC" />
          </g>
        );
      case 'heavy_core':
        return (
          <g>
            <rect x="8" y="8" width="16" height="16" fill="#334155" />
            <rect x="10" y="10" width="12" height="12" fill="#475569" />
            <rect x="13" y="13" width="6" height="6" fill="#38BDF8" />
          </g>
        );
      case 'nether_star':
        return (
          <g>
            <polygon points="16,3 19,12 29,16 19,20 16,29 13,20 3,16 13,12" fill="#F8FAFC" />
            <circle cx="16" cy="16" r="4" fill="#BAE6FD" />
          </g>
        );
      case 'apple_gold':
        return (
          <g>
            <rect x="15" y="5" width="3" height="4" fill="#78350F" />
            <circle cx="16" cy="18" r="9" fill="#F59E0B" />
            <circle cx="13" cy="15" r="3" fill="#FEF08A" />
          </g>
        );
      case 'bread':
        return (
          <g>
            <rect x="5" y="12" width="22" height="10" rx="4" fill="#B45309" />
            <rect x="7" y="13" width="18" height="5" rx="2" fill="#F59E0B" />
          </g>
        );
      case 'cake':
        return (
          <g>
            <rect x="5" y="13" width="22" height="13" fill="#B45309" />
            <rect x="5" y="10" width="22" height="6" fill="#F8FAFC" />
            <rect x="9" y="11" width="3" height="3" fill="#EF4444" />
            <rect x="15" y="10" width="3" height="3" fill="#EF4444" />
            <rect x="21" y="11" width="3" height="3" fill="#EF4444" />
          </g>
        );
      case 'potion':
        return (
          <g>
            <rect x="13" y="5" width="6" height="4" fill="#92400E" />
            <rect x="12" y="9" width="8" height="4" fill="#BAE6FD" />
            <circle cx="16" cy="20" r="8" fill="#10B981" fillOpacity="0.85" stroke="#BAE6FD" strokeWidth="1.5" />
          </g>
        );
      case 'torch':
        return (
          <g>
            <rect x="14" y="12" width="4" height="15" fill="#92400E" />
            <rect x="13" y="7" width="6" height="6" fill="#F59E0B" />
            <rect x="14" y="5" width="4" height="4" fill="#FEF08A" />
          </g>
        );
      case 'lantern':
        return (
          <g>
            <rect x="12" y="5" width="8" height="3" fill="#334155" />
            <rect x="9" y="10" width="14" height="16" fill="#1E293B" />
            <rect x="11" y="13" width="10" height="10" fill="#F59E0B" />
            <rect x="13" y="15" width="6" height="6" fill="#FEF08A" />
          </g>
        );
      case 'bookshelf':
        return (
          <g>
            <rect x="5" y="5" width="22" height="22" fill="#B45309" />
            <rect x="7" y="8" width="4" height="7" fill="#EF4444" />
            <rect x="12" y="8" width="4" height="7" fill="#10B981" />
            <rect x="17" y="8" width="4" height="7" fill="#3B82F6" />
            <rect x="8" y="17" width="4" height="7" fill="#F59E0B" />
            <rect x="14" y="17" width="4" height="7" fill="#A855F7" />
            <rect x="19" y="17" width="4" height="7" fill="#E2E8F0" />
          </g>
        );
      case 'piston':
        return (
          <g>
            <rect x="5" y="6" width="22" height="5" fill="#D97706" />
            <rect x="5" y="11" width="22" height="16" fill="#64748B" />
            <rect x="13" y="16" width="6" height="6" fill="#EF4444" />
          </g>
        );
      case 'observer':
        return (
          <g>
            <rect x="5" y="5" width="22" height="22" fill="#475569" />
            <rect x="8" y="10" width="5" height="4" fill="#F8FAFC" />
            <rect x="19" y="10" width="5" height="4" fill="#F8FAFC" />
            <rect x="12" y="18" width="8" height="4" fill="#1E293B" />
            <rect x="14" y="6" width="4" height="2" fill="#EF4444" />
          </g>
        );
      case 'hopper':
        return (
          <g>
            <rect x="5" y="6" width="22" height="7" fill="#475569" />
            <rect x="9" y="13" width="14" height="7" fill="#334155" />
            <rect x="13" y="20" width="6" height="7" fill="#475569" />
          </g>
        );
      case 'comparator':
        return (
          <g>
            <rect x="5" y="20" width="22" height="6" fill="#94A3B8" />
            <rect x="9" y="10" width="3" height="10" fill="#EF4444" />
            <rect x="20" y="10" width="3" height="10" fill="#EF4444" />
            <rect x="14" y="12" width="4" height="8" fill="#DC2626" />
          </g>
        );
      case 'crafter':
        return (
          <g>
            <rect x="5" y="5" width="22" height="22" fill="#475569" />
            <rect x="7" y="7" width="18" height="18" fill="#64748B" />
            <rect x="10" y="10" width="12" height="6" fill="#0F172A" />
            <rect x="12" y="19" width="8" height="4" fill="#EF4444" />
          </g>
        );
      case 'tnt':
        return (
          <g>
            <rect x="5" y="5" width="22" height="22" fill="#DC2626" />
            <rect x="5" y="12" width="22" height="8" fill="#F8FAFC" />
            <rect x="9" y="14" width="14" height="4" fill="#0F172A" />
          </g>
        );
      case 'rail':
        return (
          <g>
            <rect x="9" y="5" width="3" height="22" fill="#94A3B8" />
            <rect x="20" y="5" width="3" height="22" fill="#94A3B8" />
            <rect x="7" y="8" width="18" height="3" fill="#92400E" />
            <rect x="7" y="15" width="18" height="3" fill="#92400E" />
            <rect x="7" y="22" width="18" height="3" fill="#92400E" />
          </g>
        );
      case 'minecart':
        return (
          <g>
            <path d="M5 10h22v12H5V10z" fill="#64748B" />
            <rect x="8" y="12" width="16" height="6" fill="#334155" />
          </g>
        );
      case 'boat':
        return (
          <g>
            <polygon points="4,16 28,16 24,24 8,24" fill="#B45309" />
            <rect x="9" y="13" width="14" height="4" fill="#D97706" />
          </g>
        );
      case 'bed':
        return (
          <g>
            <rect x="5" y="13" width="22" height="9" fill="#EF4444" />
            <rect x="5" y="13" width="8" height="6" fill="#F8FAFC" />
            <rect x="6" y="22" width="4" height="4" fill="#78350F" />
            <rect x="22" y="22" width="4" height="4" fill="#78350F" />
          </g>
        );
      case 'compass':
        return (
          <g>
            <circle cx="16" cy="16" r="10" fill="#94A3B8" />
            <circle cx="16" cy="16" r="7" fill="#1E293B" />
            <polygon points="16,10 18,16 14,16" fill="#EF4444" />
            <polygon points="16,22 18,16 14,16" fill="#E2E8F0" />
          </g>
        );
      case 'spyglass':
        return (
          <g>
            <path d="M20 6l6 6-14 14-6-6L20 6z" fill="#EA580C" />
            <path d="M20 6l6 6-3 3-6-6 3-3z" fill="#A855F7" />
          </g>
        );
      case 'shulker_box':
        return (
          <g>
            <rect x="5" y="5" width="22" height="22" fill="#9333EA" />
            <rect x="5" y="14" width="22" height="3" fill="#581C87" />
            <rect x="8" y="8" width="16" height="5" fill="#A855F7" />
          </g>
        );
      case 'end_crystal':
        return (
          <g>
            <polygon points="16,4 26,16 16,28 6,16" fill="#EC4899" fillOpacity="0.85" />
            <rect x="12" y="12" width="8" height="8" fill="#10B981" />
          </g>
        );
      case 'respawn_anchor':
        return (
          <g>
            <rect x="5" y="5" width="22" height="22" fill="#1E1B4B" />
            <rect x="8" y="8" width="16" height="6" fill="#A855F7" />
            <rect x="11" y="17" width="10" height="7" fill="#F59E0B" />
          </g>
        );
      case 'lodestone':
        return (
          <g>
            <rect x="5" y="5" width="22" height="22" fill="#64748B" />
            <rect x="9" y="9" width="14" height="14" fill="#334155" />
            <rect x="13" y="13" width="6" height="6" fill="#94A3B8" />
          </g>
        );
      case 'scaffolding':
        return (
          <g>
            <rect x="6" y="6" width="20" height="4" fill="#84CC16" />
            <rect x="7" y="10" width="3" height="16" fill="#D97706" />
            <rect x="22" y="10" width="3" height="16" fill="#D97706" />
            <line x1="8" y1="12" x2="23" y2="24" stroke="#F59E0B" strokeWidth="2" />
          </g>
        );
      case 'string':
        return (
          <path d="M8 24 C10 10, 22 22, 24 8" stroke="#E2E8F0" strokeWidth="2.5" fill="none" />
        );
      case 'feather':
        return (
          <path d="M24 6c-6 0-12 6-14 14l-3 5 5-3c8-2 14-8 14-14z" fill="#F8FAFC" />
        );
      case 'flint':
        return <polygon points="16,6 24,18 18,26 8,22 10,12" fill="#334155" />;
      case 'gunpowder':
        return (
          <g>
            <circle cx="16" cy="18" r="7" fill="#64748B" />
            <circle cx="13" cy="15" r="3" fill="#94A3B8" />
          </g>
        );
      case 'glass':
        return (
          <g>
            <rect x="5" y="5" width="22" height="22" fill="#BAE6FD" fillOpacity="0.25" stroke="#BAE6FD" strokeWidth="2" />
            <line x1="9" y1="14" x2="14" y2="9" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        );
      case 'paper':
        return (
          <g>
            <rect x="7" y="7" width="18" height="18" fill="#F8FAFC" />
            <line x1="10" y1="12" x2="22" y2="12" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="10" y1="17" x2="20" y2="17" stroke="#94A3B8" strokeWidth="1.5" />
          </g>
        );
      case 'leather':
        return <rect x="7" y="7" width="18" height="18" rx="4" fill="#9A3412" />;
      case 'slime_ball':
        return <circle cx="16" cy="16" r="9" fill="#84CC16" />;
      case 'prismarine':
        return <polygon points="16,5 25,13 21,26 11,26 7,13" fill="#2DD4BF" />;
      case 'glowstone':
        return <circle cx="16" cy="16" r="9" fill="#FACC15" />;
      case 'ghast_tear':
        return <path d="M16 5c4 7 7 11 7 15a7 7 0 1 1-14 0c0-4 3-8 7-15z" fill="#E0F2FE" />;
      case 'magma_cream':
        return <circle cx="16" cy="16" r="9" fill="#F97316" />;
      case 'nether_wart':
        return <circle cx="16" cy="18" r="8" fill="#B91C1C" />;
      case 'wheat':
        return <path d="M10 24L22 8M14 20l4-4M17 15l4-4" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />;
      case 'sugar':
        return <rect x="9" y="10" width="14" height="14" rx="3" fill="#F8FAFC" />;
      case 'egg':
        return <ellipse cx="16" cy="16" rx="7" ry="10" fill="#FEF3C7" />;
      case 'milk':
        return (
          <g>
            <rect x="9" y="9" width="14" height="16" fill="#94A3B8" />
            <rect x="11" y="10" width="10" height="5" fill="#FFFFFF" />
          </g>
        );
      case 'bamboo':
        return (
          <g>
            <rect x="14" y="4" width="4" height="24" fill="#65A30D" />
            <rect x="13" y="11" width="6" height="2" fill="#3F6212" />
            <rect x="13" y="19" width="6" height="2" fill="#3F6212" />
          </g>
        );
      case 'mob_hostile':
        return (
          <g>
            <rect x="6" y="6" width="20" height="20" fill="#10B981" />
            <rect x="9" y="11" width="4" height="4" fill="#07090A" />
            <rect x="19" y="11" width="4" height="4" fill="#07090A" />
            <rect x="13" y="15" width="6" height="4" fill="#07090A" />
            <rect x="11" y="17" width="3" height="6" fill="#07090A" />
            <rect x="18" y="17" width="3" height="6" fill="#07090A" />
          </g>
        );
      case 'mob_boss':
        return (
          <g>
            <rect x="6" y="7" width="20" height="18" fill="#1E1B4B" />
            <rect x="9" y="13" width="5" height="3" fill="#D946EF" />
            <rect x="18" y="13" width="5" height="3" fill="#D946EF" />
            <rect x="11" y="4" width="3" height="5" fill="#475569" />
            <rect x="18" y="4" width="3" height="5" fill="#475569" />
          </g>
        );
      case 'mob_passive':
        return (
          <g>
            <rect x="6" y="6" width="20" height="20" fill="#FCA5A5" />
            <rect x="8" y="11" width="3" height="3" fill="#07090A" />
            <rect x="21" y="11" width="3" height="3" fill="#07090A" />
            <rect x="11" y="16" width="10" height="6" fill="#F43F5E" />
          </g>
        );
      case 'mob_neutral':
        return (
          <g>
            <rect x="6" y="6" width="20" height="20" fill="#0F172A" />
            <rect x="8" y="13" width="6" height="3" fill="#A855F7" />
            <rect x="18" y="13" width="6" height="3" fill="#A855F7" />
          </g>
        );
      case 'biome_overworld':
        return (
          <g>
            <rect x="5" y="5" width="22" height="9" fill="#10B981" />
            <rect x="5" y="14" width="22" height="13" fill="#78350F" />
            <rect x="9" y="14" width="4" height="4" fill="#10B981" />
            <rect x="19" y="14" width="5" height="3" fill="#10B981" />
          </g>
        );
      case 'biome_nether':
        return (
          <g>
            <rect x="5" y="5" width="22" height="22" fill="#7F1D1D" />
            <rect x="5" y="5" width="22" height="6" fill="#DC2626" />
            <rect x="10" y="15" width="6" height="6" fill="#F59E0B" />
          </g>
        );
      case 'biome_end':
        return (
          <g>
            <rect x="5" y="5" width="22" height="22" fill="#EAB308" />
            <rect x="8" y="8" width="16" height="16" fill="#FEF08A" />
            <rect x="12" y="12" width="8" height="8" fill="#7C3AED" />
          </g>
        );
      case 'guide_scroll':
      default:
        return (
          <g>
            <rect x="7" y="5" width="18" height="22" rx="2" fill="#064E3B" />
            <rect x="9" y="7" width="14" height="18" fill="#10B981" />
            <line x1="12" y1="12" x2="20" y2="12" stroke="#ECFDF5" strokeWidth="2" />
            <line x1="12" y1="16" x2="20" y2="16" stroke="#ECFDF5" strokeWidth="2" />
            <line x1="12" y1="20" x2="17" y2="20" stroke="#ECFDF5" strokeWidth="2" />
          </g>
        );
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      {renderIcon()}
    </svg>
  );
};
