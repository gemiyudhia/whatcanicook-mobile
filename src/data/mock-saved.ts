export type SavedCategory = 'daily' | 'quick-breakfast' | 'weekend-special';

export const SAVED_CATEGORY_LABELS: Record<SavedCategory, string> = {
  daily: 'Menu Sehari-hari',
  'quick-breakfast': 'Sarapan Kilat',
  'weekend-special': 'Spesial Akhir Pekan',
};

export const SAVED_CATEGORIES: SavedCategory[] = [
  'daily',
  'quick-breakfast',
  'weekend-special',
];

export type SavedRecipe = {
  id: string;
  title: string;
  category: SavedCategory;
  duration: string;
  servings: string;
  savedAgo: string;
  matchedCount: number;
  totalCount: number;
  missing: string;
};

export const INITIAL_SAVED_RECIPES: SavedRecipe[] = [
  {
    id: '1',
    title: 'Ayam Kecap Mentega Rumahan',
    category: 'daily',
    duration: '35 mnt',
    servings: '4 Porsi',
    savedAgo: 'Disimpan 2 hari lalu',
    matchedCount: 3,
    totalCount: 4,
    missing: 'Daging Ayam',
  },
  {
    id: '2',
    title: 'Tumis Kangkung Tempe Gurih',
    category: 'daily',
    duration: '15 mnt',
    servings: '2-3 Porsi',
    savedAgo: 'Disimpan 5 hari lalu',
    matchedCount: 5,
    totalCount: 5,
    missing: '',
  },
  {
    id: '3',
    title: 'Sambal Goreng Kentang Pedas',
    category: 'weekend-special',
    duration: '30 mnt',
    servings: '4 Porsi',
    savedAgo: 'Disimpan 1 mgg lalu',
    matchedCount: 4,
    totalCount: 6,
    missing: 'Santan & Serai',
  },
  {
    id: '4',
    title: 'Tahu Telur Bumbu Kacang Jawa',
    category: 'quick-breakfast',
    duration: '20 mnt',
    servings: '2 Porsi',
    savedAgo: 'Disimpan 2 mgg lalu',
    matchedCount: 3,
    totalCount: 5,
    missing: 'Toge Segar & Petis',
  },
];
