import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';
import { FilterChips } from '@/components/FilterChips';
import { PantryCard } from '@/components/home/PantryCard';
import { RecipeMatchCard } from '@/components/home/RecipeMatchCard';
import {
  COOKING_CATEGORIES,
  MATCHED_RECIPES,
  PANTRY_ITEMS,
} from '@/data/mock-home';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(COOKING_CATEGORIES[0]);

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      <ScrollView
        contentContainerClassName="gap-6 px-5 pb-8 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <AppHeader subtitle="Beranda" />

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

        <PantryCard
          items={PANTRY_ITEMS}
          totalRecipes={12}
          onFindRecipes={() => router.push('/matches')}
        />

        <View>
          <View className="mb-3 flex-row items-end justify-between">
            <Text className="font-heading-md text-xl text-ink">
              Kategori Masakan
            </Text>
          </View>
          <FilterChips
            options={COOKING_CATEGORIES.map((category) => ({
              value: category,
              label: category,
            }))}
            selected={activeCategory}
            onSelect={setActiveCategory}
          />
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
          {MATCHED_RECIPES.map((recipe) => (
            <RecipeMatchCard
              key={recipe.id}
              recipe={recipe}
              onPress={() =>
                router.push({
                  pathname: '/recipe/[id]',
                  params: { id: recipe.id },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
