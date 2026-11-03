export type MissingIngredient = { name: string; amount: string };

export type RecipeMatch = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  servings: string;
  level: string;
  matchedCount: number;
  totalCount: number;
  matchedIngredients: string[];
  missingIngredients: MissingIngredient[];
};

export const MOCK_MATCHES: RecipeMatch[] = [
  {
    id: '1',
    title: 'Tumis Kangkung Tempe Saus Tiram',
    description:
      'Aroma bawang gurih dan kerenyahan kangkung segar menyatu sempurna.',
    durationMinutes: 15,
    servings: '2–3 porsi',
    level: 'Mudah',
    matchedCount: 5,
    totalCount: 5,
    matchedIngredients: [
      'Kangkung',
      'Tempe',
      'Bawang Putih',
      'Cabai Merah',
      'Kecap Manis',
    ],
    missingIngredients: [],
  },
  {
    id: '2',
    title: 'Omelet Tahu Daun Bawang Spesial',
    description:
      'Tekstur lembut tahu sutra berpadu telur dadar wangi gurih renyah.',
    durationMinutes: 12,
    servings: '2 porsi',
    level: 'Sarapan Kilat',
    matchedCount: 4,
    totalCount: 4,
    matchedIngredients: [
      'Telur Ayam (2 btr)',
      'Tahu Putih',
      'Bawang Putih',
      'Cabai Rawit',
    ],
    missingIngredients: [],
  },
  {
    id: '3',
    title: 'Sambal Goreng Kentang Ati Gurih',
    description:
      'Balado pedas legit yang khas dan nikmat untuk makan siang keluarga.',
    durationMinutes: 25,
    servings: '3 porsi',
    level: 'Sedang',
    matchedCount: 4,
    totalCount: 5,
    matchedIngredients: ['Kentang', 'Cabai Merah', 'Bawang Putih', 'Santan'],
    missingIngredients: [{ name: 'Hati Sapi / Ampela', amount: '200g' }],
  },
  {
    id: '4',
    title: 'Ayam Goreng Mentega Wijen',
    description:
      'Saus gurih manis karamel mentega dengan taburan wijen harum menggoda.',
    durationMinutes: 30,
    servings: '4 porsi',
    level: 'Mudah',
    matchedCount: 5,
    totalCount: 6,
    matchedIngredients: [
      'Kecap Manis',
      'Mentega',
      'Bawang Putih',
      'Jeruk Nipis',
      'Wijen',
    ],
    missingIngredients: [{ name: 'Daging Ayam', amount: '500g' }],
  },
];
