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

export const SETTINGS_ITEMS: SettingsItem[] = [
  {
    id: 'pantry-notifications',
    icon: 'file-tray-outline',
    title: 'Wadah Dapur & Notifikasi Kedaluwarsa',
    subtitle: 'Peringatan 2 hari sebelum bahan basi',
  },
  {
    id: 'shopping-list',
    icon: 'checkbox-outline',
    title: 'Daftar Belanjaan Otomatis',
    subtitle: 'Kumpulkan bumbu yang belum tersedia',
  },
  {
    id: 'help-center',
    icon: 'book-outline',
    title: 'Pusat Bantuan & Panduan Memasak',
    subtitle: 'Tips substitusi bumbu & takaran',
  },
  {
    id: 'about',
    icon: 'information-circle-outline',
    title: 'Tentang WhatCanICook',
    subtitle: 'Versi 2.4.0 (Build Stabil)',
  },
];
