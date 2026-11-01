export type IngredientStatus = 'in-pantry' | 'staple' | 'missing';

export type RecipeIngredient = {
  id: string;
  name: string;
  note: string;
  quantity: number | null;
  unit: string;
  status: IngredientStatus;
};

export type RecipeStep = {
  id: string;
  title: string;
  instruction: string;
};

export type RecipeDetail = {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  servings: number;
  calories: number;
  difficulty: string;
  matchText: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tip: { title: string; body: string };
};

const RECIPE_DETAILS: Record<string, RecipeDetail> = {
  '1': {
    id: '1',
    title: 'Tumis Kangkung Tempe Gurih Pedas',
    category: 'RESEP NUSANTARA KLASIK',
    description:
      'Hidangan rumahan khas nusantara yang praktis, kaya serat, dan lezat dengan perpaduan tempe renyah serta gurihnya balutan saus kecap bawang beraroma wajan hangat.',
    duration: '15 Mnt',
    servings: 2,
    calories: 185,
    difficulty: 'Praktis',
    matchText: '100% Bahan Tersedia di Dapurmu',
    ingredients: [
      {
        id: 'i1',
        name: 'Kangkung Segar',
        note: 'Petik daun dan potong batang muda',
        quantity: 1,
        unit: 'ikat',
        status: 'in-pantry',
      },
      {
        id: 'i2',
        name: 'Tempe Kedelai',
        note: 'Potong dadu kecil, goreng setengah matang',
        quantity: 0.5,
        unit: 'papan',
        status: 'in-pantry',
      },
      {
        id: 'i3',
        name: 'Bawang Putih',
        note: 'Kupas lalu iris tipis aromatik',
        quantity: 4,
        unit: 'siung',
        status: 'in-pantry',
      },
      {
        id: 'i4',
        name: 'Cabai Merah Keriting',
        note: 'Iris serong pemanis rasa pedas gurih',
        quantity: 5,
        unit: 'buah',
        status: 'in-pantry',
      },
      {
        id: 'i5',
        name: 'Kecap Manis Nusantara',
        note: 'Memberi warna karamel gurih',
        quantity: 2,
        unit: 'sdm',
        status: 'in-pantry',
      },
      {
        id: 'i6',
        name: 'Saus Tiram',
        note: 'Penguat citarasa umami khas restoran',
        quantity: 1,
        unit: 'sdm',
        status: 'in-pantry',
      },
      {
        id: 'i7',
        name: 'Minyak Goreng',
        note: 'Untuk menumis bumbu halus',
        quantity: 2,
        unit: 'sdm',
        status: 'in-pantry',
      },
      {
        id: 'i8',
        name: 'Garam & Gula Pasir',
        note: 'Penyeimbang rasa sesuai selera',
        quantity: null,
        unit: '',
        status: 'staple',
      },
    ],
    steps: [
      {
        id: 's1',
        title: 'Tumis Bumbu Aromatik',
        instruction:
          'Panaskan 2 sdm minyak di wajan. Tumis irisan bawang putih dan cabai merah hingga harum serta mulai layu keemasan.',
      },
      {
        id: 's2',
        title: 'Padukan Tempe Gurih',
        instruction:
          'Masukkan potongan tempe yang sudah digoreng setengah matang, aduk rata bersama bumbu tumis agar minyak wangi meresap ke dalam pori-pori tempe.',
      },
      {
        id: 's3',
        title: 'Bumbu dan Beri Sedikit Air',
        instruction:
          'Masukkan kangkung segar, beri sedikit percikan air (sekitar 30–50ml), lalu tambahkan kecap manis, saus tiram, sejumput garam, dan gula pasir.',
      },
      {
        id: 's4',
        title: 'Tumis Cepat Api Besar & Sajikan',
        instruction:
          'Masak dengan api besar selama 2–3 menit hingga kangkung layu namun tetap berwarna hijau terang dan bertekstur renyah. Angkat segera dan sajikan selagi panas.',
      },
    ],
    tip: {
      title: 'Kunci Kerenyahan Kangkung',
      body: 'Kunci kangkung tetap hijau cerah dan bertekstur renyah adalah menumis dengan api besar dalam durasi sangat singkat (maksimal 3 menit). Jangan biarkan terlalu lama di atas wajan panas setelah api dimatikan.',
    },
  },
};

export const getRecipeDetail = (id: string | undefined) =>
  id ? RECIPE_DETAILS[id] : undefined;
