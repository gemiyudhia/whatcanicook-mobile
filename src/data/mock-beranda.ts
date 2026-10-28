export const PANTRY = [
  'Telur (4 butir)',
  'Tempe (1 papan)',
  'Bawang Putih (5 siung)',
  'Cabai Merah (6 buah)',
  'Kangkung (1 ikat)',
  'Kecap Manis',
];

export const KATEGORI_MASAKAN = [
  'Semua Resep',
  'Kilat < 20 mnt',
  'Bahan Hemat',
];

export type ResepCocok = {
  id: string;
  judul: string;
  label: string;
  cocokTeks: string;
  lengkap: boolean;
  waktu: string;
  porsi: string;
  tag: string;
  bahan: string;
};

export const RESEP_COCOK: ResepCocok[] = [
  {
    id: '1',
    judul: 'Tumis Kangkung Tempe Gurih',
    label: 'RESEP KILAT',
    cocokTeks: '100% Cocok (Semua bahan ada)',
    lengkap: true,
    waktu: '15 mnt',
    porsi: '2 porsi',
    tag: 'Praktis',
    bahan: 'Kangkung, Tempe, Bawang Putih, Cabai Merah.',
  },
  {
    id: '2',
    judul: 'Omelet Tahu Daun Bawang',
    label: 'SARAPAN KILAT',
    cocokTeks: '80% Cocok (Kurang 1 bahan: Daun bawang)',
    lengkap: false,
    waktu: '10 mnt',
    porsi: '1 porsi',
    tag: 'Bujet Hemat',
    bahan: 'Telur, Bawang Putih, Cabai Merah.',
  },
  {
    id: '3',
    judul: 'Ayam Kecap Mentega Rumahan',
    label: 'FAVORIT KELUARGA',
    cocokTeks: '75% Cocok (Kurang 2 bahan: Ayam, Mentega)',
    lengkap: false,
    waktu: '30 mnt',
    porsi: '3 porsi',
    tag: 'Spesial',
    bahan: 'Kecap Manis, Bawang Putih, Cabai.',
  },
];

export const POPULER = [
  {
    id: 'p1',
    judul: 'Sambal Goreng Kentang',
    tag: 'Populer',
    info: '35 mnt • Rasa pedas gurih legit',
    bahan: '4/6 Bahan cocok',
  },
  {
    id: 'p2',
    judul: 'Tahu Telur Bumbu Kacang',
    tag: 'Tradisional',
    info: '20 mnt • Khas Jawa',
    bahan: '3/5 Bahan cocok',
  },
];
