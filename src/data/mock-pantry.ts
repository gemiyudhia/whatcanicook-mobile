import type { Ionicons } from '@expo/vector-icons';

export type PantryCategory = 'vegetables-spices' | 'protein' | 'other';

export const CATEGORY_LABELS: Record<PantryCategory, string> = {
  'vegetables-spices': 'Sayuran & Bumbu',
  protein: 'Protein & Nabati',
  other: 'Lainnya',
};

export const PANTRY_CATEGORIES: PantryCategory[] = [
  'vegetables-spices',
  'protein',
  'other',
];

export type PantryItem = {
  id: string;
  name: string;
  alias: string;
  location: string;
  category: PantryCategory;
  quantity: number;
  unit: string;
  step: number;
  icon: keyof typeof Ionicons.glyphMap;
};

export const INITIAL_PANTRY_ITEMS: PantryItem[] = [
  {
    id: '1',
    name: 'Bawang Putih',
    alias: 'garlic',
    location: 'Rak Bumbu',
    category: 'vegetables-spices',
    quantity: 6,
    unit: 'siung',
    step: 1,
    icon: 'leaf-outline',
  },
  {
    id: '2',
    name: 'Telur Ayam',
    alias: 'egg',
    location: 'Segar di Kulkas',
    category: 'protein',
    quantity: 4,
    unit: 'butir',
    step: 1,
    icon: 'egg-outline',
  },
  {
    id: '3',
    name: 'Tempe',
    alias: 'tempeh',
    location: 'Segar di Kulkas',
    category: 'protein',
    quantity: 1,
    unit: 'papan',
    step: 1,
    icon: 'grid-outline',
  },
  {
    id: '4',
    name: 'Kangkung',
    alias: 'water spinach',
    location: 'Segar di Kulkas',
    category: 'vegetables-spices',
    quantity: 2,
    unit: 'ikat',
    step: 1,
    icon: 'leaf',
  },
  {
    id: '5',
    name: 'Cabai Merah',
    alias: 'red chili',
    location: 'Laci Sayur',
    category: 'vegetables-spices',
    quantity: 8,
    unit: 'buah',
    step: 1,
    icon: 'flame-outline',
  },
  {
    id: '6',
    name: 'Kentang',
    alias: 'potato',
    location: 'Keranjang Kering',
    category: 'vegetables-spices',
    quantity: 3,
    unit: 'buah',
    step: 1,
    icon: 'nutrition-outline',
  },
  {
    id: '7',
    name: 'Kecap Manis',
    alias: 'sweet soy sauce',
    location: 'Lemari Saus',
    category: 'other',
    quantity: 250,
    unit: 'ml',
    step: 50,
    icon: 'wine-outline',
  },
  {
    id: '8',
    name: 'Tepung Terigu',
    alias: 'wheat flour',
    location: 'Toples Kering',
    category: 'other',
    quantity: 500,
    unit: 'gr',
    step: 100,
    icon: 'cube-outline',
  },
];
