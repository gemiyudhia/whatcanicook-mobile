import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PantryCard } from '@/components/beranda/PantryCard';
import { RecipeMatchCard } from '@/components/beranda/RecipeMatchCard';
import {
  KATEGORI_MASAKAN,
  PANTRY,
  POPULER,
  RESEP_COCOK,
} from '@/data/mock-beranda';

export default function BerandaScreen() {
  const [kategoriAktif, setKategoriAktif] = useState(KATEGORI_MASAKAN[0]);

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      <ScrollView
        contentContainerClassName="gap-6 px-5 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text className="mt-2 font-heading text-[28px] leading-9 text-primary">
            Apa yang ingin kamu masak hari ini?
          </Text>
          <Text className="mt-2 font-body text-base text-pebble">
            Temukan ide lezat dari bahan yang sudah tersedia rapi di dapurmu.
          </Text>
        </View>

        <View className="gap-3">
          <View className="h-14 flex-row items-center rounded-2xl border border-oatmeal bg-card px-4">
            <Ionicons name="search" size={20} color="#383831" />
            <TextInput
              className="ml-3 flex-1 font-body text-sm text-ink"
              placeholder="Cari bahan, misal kentang atau pota"
              placeholderTextColor="#77766D"
            />
            <Pressable className="h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Ionicons name="options-outline" size={18} color="#FAF8F3" />
            </Pressable>
          </View>
        </View>

        <PantryCard items={PANTRY} totalResep={12} />

        <View>
          <View className="mb-3 flex-row items-end justify-between">
            <Text className="font-heading-md text-xl text-ink">
              Kategori Masakan
            </Text>
            <Text className="font-body text-xs text-pebble">
              Geser untuk melihat
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-2"
          >
            {KATEGORI_MASAKAN.map((k) => {
              const aktif = k === kategoriAktif;
              return (
                <Pressable
                  key={k}
                  onPress={() => setKategoriAktif(k)}
                  className={`rounded-full border px-4 py-2.5 ${aktif ? 'border-primary bg-primary' : 'border-oatmeal bg-card'}`}
                >
                  <Text
                    className={`font-body-semibold text-sm ${aktif ? 'text-card' : 'text-ink'}`}
                  >
                    {k}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View className="gap-4">
          <View className="flex-row items-end justify-between">
            <View>
              <Text className="font-heading-md text-2xl text-ink">
                Resep Cocok Hari Ini
              </Text>
              <Text className="font-body text-xs text-pebble">
                Dipilih otomatis berdasarkan isi kulkasmu
              </Text>
            </View>
            <Text className="font-body-semibold text-xs text-ink">
              Lihat Semua ›
            </Text>
          </View>
          {RESEP_COCOK.map((r) => (
            <RecipeMatchCard key={r.id} resep={r} />
          ))}
        </View>

        <View>
          <Text className="font-heading-md text-2xl text-ink">
            Inspirasi Populer
          </Text>
          <Text className="mb-3 font-body text-xs text-pebble">
            Hidangan nusantara paling banyak dimasak pekan ini
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-3"
          >
            {POPULER.map((p) => (
              <View
                key={p.id}
                className="w-64 overflow-hidden rounded-2xl border border-oatmeal bg-card"
              >
                <View className="h-32 bg-primary-dark">
                  <View className="absolute bottom-2 left-2 rounded-full bg-terracotta px-3 py-1">
                    <Text className="font-body-semibold text-xs text-card">
                      {p.tag}
                    </Text>
                  </View>
                </View>
                <View className="p-4">
                  <Text className="font-heading-md text-xl text-ink">
                    {p.judul}
                  </Text>
                  <Text className="mt-1 font-body text-xs text-pebble">
                    {p.info}
                  </Text>
                  <Text className="mt-3 font-body-semibold text-xs text-primary">
                    {p.bahan}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
