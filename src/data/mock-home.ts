export const PANTRY_ITEMS = [
  'Telur (4 butir)',
  'Tempe (1 papan)',
  'Bawang Putih (5 siung)',
  'Cabai Merah (6 buah)',
  'Kangkung (1 ikat)',
  'Kecap Manis',
];

export const COOKING_CATEGORIES = [
  'Semua Resep',
  'Kilat < 20 mnt',
  'Bahan Hemat',
];

export type MatchedRecipe = {
  id: string;
  title: string;
  label: string;
  matchText: string;
  isComplete: boolean;
  duration: string;
  servings: string;
  tag: string;
  ingredients: string;
};

export const MATCHED_RECIPES: MatchedRecipe[] = [
  {
    id: '1',
    title: 'Tumis Kangkung Tempe Gurih',
    label: 'RESEP KILAT',
    matchText: '100% Cocok (Semua bahan ada)',
    isComplete: true,
    duration: '15 mnt',
    servings: '2 porsi',
    tag: 'Praktis',
    ingredients: 'Kangkung, Tempe, Bawang Putih, Cabai Merah.',
  },
  {
    id: '2',
    title: 'Omelet Tahu Daun Bawang',
    label: 'SARAPAN KILAT',
    matchText: '80% Cocok (Kurang 1 bahan: Daun bawang)',
    isComplete: false,
    duration: '10 mnt',
    servings: '1 porsi',
    tag: 'Bujet Hemat',
    ingredients: 'Telur, Bawang Putih, Cabai Merah.',
  },
  {
    id: '3',
    title: 'Ayam Kecap Mentega Rumahan',
    label: 'FAVORIT KELUARGA',
    matchText: '75% Cocok (Kurang 2 bahan: Ayam, Mentega)',
    isComplete: false,
    duration: '30 mnt',
    servings: '3 porsi',
    tag: 'Spesial',
    ingredients: 'Kecap Manis, Bawang Putih, Cabai.',
  },
];

export type PopularRecipe = {
  id: string;
  title: string;
  tag: string;
  info: string;
  ingredientMatch: string;
};

export const POPULAR_RECIPES: PopularRecipe[] = [
  {
    id: 'p1',
    title: 'Sambal Goreng Kentang',
    tag: 'Populer',
    info: '35 mnt • Rasa pedas gurih legit',
    ingredientMatch: '4/6 Bahan cocok',
  },
  {
    id: 'p2',
    title: 'Tahu Telur Bumbu Kacang',
    tag: 'Tradisional',
    info: '20 mnt • Khas Jawa',
    ingredientMatch: '3/5 Bahan cocok',
  },
];
