import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';
import { FilterChips } from '@/components/FilterChips';
import { PantryItemRow } from '@/components/pantry/PantryItemRow';
import {
  CATEGORY_LABELS,
  INITIAL_PANTRY_ITEMS,
  PANTRY_CATEGORIES,
} from '@/data/mock-pantry';
import {
  changeItemQuantity,
  countPantryItems,
  filterPantryItems,
  PantryCategoryFilter,
} from '@/lib/pantry';
import { router } from 'expo-router';

export default function PantryScreen() {
  const [items, setItems] = useState(INITIAL_PANTRY_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<PantryCategoryFilter>('all');

  const visibleItems = filterPantryItems(items, filter, searchQuery);
  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const totalRecipes = 14;

  const filterOptions = (
    ['all', ...PANTRY_CATEGORIES] as PantryCategoryFilter[]
  ).map((value) => ({
    value,
    label: `${value === 'all' ? 'Semua' : CATEGORY_LABELS[value]} (${countPantryItems(items, value)})`,
  }));

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      <View className="flex-1">
        <ScrollView
          contentContainerClassName="gap-5 px-5 pb-48 pt-2"
          showsVerticalScrollIndicator={false}
        >
          <AppHeader subtitle="Bahan Saya" />

          <View>
            <View className="flex-row items-center justify-between">
              <Text className="font-heading text-[28px] text-primary">
                Bahan Saya
              </Text>
            </View>
            <Text className="mt-2 font-body text-base text-pebble">
              Kelola stok bahan dapurmu untuk rekomendasi resep paling akurat.
            </Text>
          </View>

          <View className="flex-row gap-3">
            <View className="flex-1 rounded-2xl bg-card p-4">
              <View className="flex-row items-center justify-between">
                <Text className="font-body-medium text-sm text-ink">
                  Stok Bahan
                </Text>
                <Ionicons
                  name="file-tray-full-outline"
                  size={18}
                  color="#77766D"
                />
              </View>
              <Text className="mt-2 font-body text-xs text-pebble">
                <Text className="font-heading text-3xl text-ink">
                  {items.length}{' '}
                </Text>
                bahan tersedia
              </Text>
            </View>
          </View>

          <View className="h-14 flex-row items-center rounded-2xl border border-oatmeal bg-card px-4">
            <Ionicons name="search" size={20} color="#383831" />
            <TextInput
              className="ml-3 flex-1 font-body text-sm text-ink"
              placeholder="Cari bahan, misalnya kentang atau potato"
              placeholderTextColor="#77766D"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View className="flex-row items-center justify-end">
            <Pressable className="flex-row items-center active:opacity-70">
              <Ionicons name="add-circle-outline" size={18} color="#383831" />
              <Text className="ml-1 font-body-semibold text-sm text-ink">
                Tambah
              </Text>
            </Pressable>
          </View>

          <FilterChips
            options={filterOptions}
            selected={filter}
            onSelect={setFilter}
          />

          <View className="gap-3">
            {visibleItems.length === 0 ? (
              <Text className="py-8 text-center font-body text-sm text-pebble">
                Bahan tidak ditemukan.
              </Text>
            ) : (
              visibleItems.map((item) => (
                <PantryItemRow
                  key={item.id}
                  item={item}
                  onChangeQuantity={(direction) =>
                    setItems((prev) =>
                      changeItemQuantity(prev, item.id, direction),
                    )
                  }
                  onRemove={() => removeItem(item.id)}
                />
              ))
            )}
          </View>
        </ScrollView>

        <View
          className="absolute bottom-0 left-0 right-0 mx-5 mb-3 rounded-2xl border border-oatmeal bg-card p-3"
          style={{
            shadowColor: '#34483A',
            shadowOpacity: 0.12,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: -4 },
            elevation: 6,
          }}
        >
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="flex-1 font-body text-xs text-ink">
              <Text className="font-body-semibold">
                {items.length} bahan terpilih{' '}
              </Text>
              menghasilkan{' '}
              <Text className="font-body-semibold">
                {totalRecipes} resep cocok
              </Text>
            </Text>
            <Text className="ml-3 font-body text-xs text-pebble">
              100% Siap
            </Text>
          </View>
          <Pressable
            onPress={() => router.push('/matches')}
            className="flex-row items-center justify-center rounded-xl bg-primary py-4 active:bg-primary-dark"
          >
            <Text className="font-body-semibold text-sm text-card">
              Lihat Resep yang Cocok ({totalRecipes})
            </Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color="#FAF8F3"
              style={{ marginLeft: 8 }}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
