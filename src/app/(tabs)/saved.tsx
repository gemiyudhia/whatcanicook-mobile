import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';
import { FilterChips } from '@/components/FilterChips';
import { SavedRecipeCard } from '@/components/saved/SavedRecipeCard';
import {
  INITIAL_SAVED_RECIPES,
  SAVED_CATEGORIES,
  SAVED_CATEGORY_LABELS,
} from '@/data/mock-saved';
import {
  countReadyRecipes,
  countSavedRecipes,
  filterSavedRecipes,
  SavedCategoryFilter,
} from '@/lib/saved-recipes';
import { router } from 'expo-router';

export default function SavedScreen() {
  const [recipes, setRecipes] = useState(INITIAL_SAVED_RECIPES);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<SavedCategoryFilter>('all');
  const [readyOnly, setReadyOnly] = useState(false);

  const visibleRecipes = filterSavedRecipes(recipes, {
    category: filter,
    query: searchQuery,
    readyOnly,
  });
  const readyCount = countReadyRecipes(recipes);
  const unsave = (id: string) =>
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));

  const filterOptions = (
    ['all', ...SAVED_CATEGORIES] as SavedCategoryFilter[]
  ).map((value) => ({
    value,
    label: `${value === 'all' ? 'Semua' : SAVED_CATEGORY_LABELS[value]} (${countSavedRecipes(recipes, value)})`,
  }));

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      <ScrollView
        contentContainerClassName="gap-5 px-5 pb-8 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <AppHeader subtitle="Resep Tersimpan" />

        <View className="flex-row items-start justify-between">
          <View className="mr-3 flex-1">
            <Text className="font-heading text-[28px] text-primary">
              Resep Tersimpan
            </Text>
            <Text className="mt-2 font-body text-base text-pebble">
              Kumpulan hidangan favorit yang siap dimasak kapan saja.
            </Text>
          </View>
          <Pressable className="h-11 w-11 items-center justify-center rounded-xl bg-oatmeal">
            <Ionicons name="folder-open-outline" size={20} color="#34483A" />
          </Pressable>
        </View>

        <View className="h-14 flex-row items-center rounded-2xl border border-oatmeal bg-card px-4">
          <Ionicons name="search" size={20} color="#383831" />
          <TextInput
            className="ml-3 flex-1 font-body text-sm text-ink"
            placeholder="Cari di resep tersimpan..."
            placeholderTextColor="#77766D"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="options-outline" size={20} color="#383831" />
        </View>

        <FilterChips
          options={filterOptions}
          selected={filter}
          onSelect={setFilter}
        />

        <View className="rounded-2xl bg-sage-light p-4">
          <View className="flex-row items-start">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Ionicons name="sparkles" size={18} color="#FAF8F3" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="font-body-semibold text-xs tracking-wide text-ink">
                KECOCOKAN DAPUR
              </Text>
              <Text className="mt-1 font-body text-sm text-ink">
                {readyCount} dari {recipes.length} resep tersimpan bisa langsung
                kamu masak dengan bahan di dapur saat ini!
              </Text>
            </View>
          </View>
          <View className="mt-3 flex-row items-center">
            <Pressable
              onPress={() => setReadyOnly((value) => !value)}
              className="flex-1 flex-row items-center justify-center rounded-xl bg-primary py-3.5 active:bg-primary-dark"
            >
              <Ionicons name="restaurant" size={16} color="#FAF8F3" />
              <Text className="ml-2 font-body-semibold text-sm text-card">
                {readyOnly ? 'Tampilkan Semua' : 'Tampilkan yang Siap Masak'}
              </Text>
            </Pressable>
            <Text className="ml-3 w-24 font-body text-xs text-pebble">
              Sinkronisasi 5m lalu
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View>
            <Text className="font-heading-md text-lg text-ink">
              Daftar Pilihan
            </Text>
            <Text className="font-body text-xs text-pebble">
              Menampilkan {visibleRecipes.length} Resep Unggulan
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="font-body-medium text-xs text-ink">
              Urutkan: Terbaru
            </Text>
            <Ionicons
              name="chevron-down"
              size={14}
              color="#383831"
              style={{ marginLeft: 4 }}
            />
          </View>
        </View>

        <View className="gap-4">
          {visibleRecipes.length === 0 ? (
            <Text className="py-8 text-center font-body text-sm text-pebble">
              Resep tidak ditemukan.
            </Text>
          ) : (
            visibleRecipes.map((recipe) => (
              <SavedRecipeCard
                key={recipe.id}
                recipe={recipe}
                onUnsave={() => unsave(recipe.id)}
                onPress={() =>
                  router.push({
                    pathname: '/recipe/[id]',
                    params: { id: recipe.id },
                  })
                }
              />
            ))
          )}
        </View>

        <Pressable className="flex-row items-center rounded-2xl bg-card p-4 active:opacity-80">
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-oatmeal">
            <Ionicons name="document-text-outline" size={18} color="#34483A" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="font-heading-md text-base text-ink">
              Tambah Catatan atau Koleksi Baru
            </Text>
            <Text className="font-body text-xs text-pebble">
              Atur daftar resep sesuai acara atau rencana mingguan
            </Text>
          </View>
          <Ionicons name="add" size={20} color="#383831" />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
