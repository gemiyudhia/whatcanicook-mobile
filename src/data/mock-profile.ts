import type { Ionicons } from '@expo/vector-icons';

export const MOCK_USER = {
  name: 'Nisa Pratiwi',
  role: 'Koki Rumahan',
  joinedAt: 'Januari 2025',
  stats: { cooked: 24, saved: 18, pantryItems: 8 },
};

export const INITIAL_TASTE_TAGS = ['Nusantara', 'Rendah Gula', 'Pedas Sedang'];

export const COOKING_DEFAULTS = {
  servings: '2 Porsi',
  servingsNote: 'Skala bahan otomatis',
  maxTime: 'Maks. 30 Menit',
  maxTimeNote: 'Hari kerja kilat',
};

export const INITIAL_AVOIDED_INGREDIENTS = ['Udang & Seafood', 'Kacang Tanah'];

export type SettingsItem = {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
};
