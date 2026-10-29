import type { Ionicons } from '@expo/vector-icons';

export type KategoriPantry = 'Sayuran & Bumbu' | 'Protein & Nabati' | 'Lainnya';

export type BahanPantry = {
  id: string;
  nama: string;
  alias: string;
  lokasi: string;
  kategori: KategoriPantry;
  jumlah: number;
  satuan: string;
  langkah: number;
  ikon: keyof typeof Ionicons.glyphMap;
};

export const KATEGORI_PANTRY: KategoriPantry[] = [
  'Sayuran & Bumbu',
  'Protein & Nabati',
  'Lainnya',
];

export const BAHAN_AWAL: BahanPantry[] = [
  {
    id: '1',
    nama: 'Bawang Putih',
    alias: 'garlic',
    lokasi: 'Rak Bumbu',
    kategori: 'Sayuran & Bumbu',
    jumlah: 6,
    satuan: 'siung',
    langkah: 1,
    ikon: 'leaf-outline',
  },
  {
    id: '2',
    nama: 'Telur Ayam',
    alias: 'egg',
    lokasi: 'Segar di Kulkas',
    kategori: 'Protein & Nabati',
    jumlah: 4,
    satuan: 'butir',
    langkah: 1,
    ikon: 'egg-outline',
  },
  {
    id: '3',
    nama: 'Tempe',
    alias: 'tempeh',
    lokasi: 'Segar di Kulkas',
    kategori: 'Protein & Nabati',
    jumlah: 1,
    satuan: 'papan',
    langkah: 1,
    ikon: 'grid-outline',
  },
  {
    id: '4',
    nama: 'Kangkung',
    alias: 'water spinach',
    lokasi: 'Segar di Kulkas',
    kategori: 'Sayuran & Bumbu',
    jumlah: 2,
    satuan: 'ikat',
    langkah: 1,
    ikon: 'leaf',
  },
  {
    id: '5',
    nama: 'Cabai Merah',
    alias: 'red chili',
    lokasi: 'Laci Sayur',
    kategori: 'Sayuran & Bumbu',
    jumlah: 8,
    satuan: 'buah',
    langkah: 1,
    ikon: 'flame-outline',
  },
  {
    id: '6',
    nama: 'Kentang',
    alias: 'potato',
    lokasi: 'Keranjang Kering',
    kategori: 'Sayuran & Bumbu',
    jumlah: 3,
    satuan: 'buah',
    langkah: 1,
    ikon: 'nutrition-outline',
  },
  {
    id: '7',
    nama: 'Kecap Manis',
    alias: 'sweet soy sauce',
    lokasi: 'Lemari Saus',
    kategori: 'Lainnya',
    jumlah: 250,
    satuan: 'ml',
    langkah: 50,
    ikon: 'wine-outline',
  },
  {
    id: '8',
    nama: 'Tepung Terigu',
    alias: 'wheat flour',
    lokasi: 'Toples Kering',
    kategori: 'Lainnya',
    jumlah: 500,
    satuan: 'gr',
    langkah: 100,
    ikon: 'cube-outline',
  },
];
