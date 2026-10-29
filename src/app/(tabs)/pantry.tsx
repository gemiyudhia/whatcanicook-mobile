import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PantryItemRow } from '@/components/pantry/PantryItemRow';
import {
  CATEGORY_LABELS,
  INITIAL_PANTRY_ITEMS,
  PANTRY_CATEGORIES,
  type PantryCategory,
} from '@/data/mock-pantry';

type CategoryFilter = 'all' | PantryCategory;

export default function PantryScreen() {
  const [items, setItems] = useState(INITIAL_PANTRY_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleItems = items.filter(
    (item) =>
      (filter === 'all' || item.category === filter) &&
      `${item.name} ${item.alias}`.toLowerCase().includes(normalizedQuery),
  );

  const changeQuantity = (id: string, direction: 1 | -1) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                item.step,
                item.quantity + direction * item.step,
              ),
            }
          : item,
      ),
    );

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const totalRecipes = 14;

  const filters: CategoryFilter[] = ['all', ...PANTRY_CATEGORIES];
  const labelFor = (f: CategoryFilter) =>
    f === 'all' ? 'Semua' : CATEGORY_LABELS[f];
  const countFor = (f: CategoryFilter) =>
    f === 'all'
      ? items.length
      : items.filter((item) => item.category === f).length;

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      <View className="flex-1">
        <ScrollView
          contentContainerClassName="gap-5 px-5 pb-48 pt-2"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row items-center">
            <View className="h-10 w-10 items-center justify-center rounded-lg border border-oatmeal bg-card">
              <Text className="text-lg">🍳</Text>
            </View>
            <View className="ml-3 flex-1">
              <Text className="font-heading text-xl text-ink">
                WhatCanICook
              </Text>
              <Text className="font-body text-xs text-pebble">Bahan Saya</Text>
            </View>
            <Ionicons name="search" size={22} color="#383831" />
            <Ionicons
              name="notifications-outline"
              size={22}
              color="#383831"
              style={{ marginLeft: 20 }}
            />
          </View>

          <View>
            <View className="flex-row items-center justify-between">
              <Text className="font-heading text-[28px] text-primary">
                Bahan Saya
              </Text>
              <View
                className="rounded-full px-3 py-1"
                style={{ backgroundColor: '#DAE3C8' }}
              >
                <Text className="font-body-semibold text-xs text-primary">
                  ● Sinkron Dapur Aktif
                </Text>
              </View>
            </View>
            <Text className="mt-2 font-body text-base text-pebble">
              Kelola stok bahan dapurmu untuk rekomendasi resep paling akurat.
            </Text>
          </View>

          {/* Ringkasan */}
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
            <View
              className="flex-1 rounded-2xl p-4"
              style={{ backgroundColor: '#DAE3C8' }}
            >
              <View className="flex-row items-center justify-between">
                <Text className="font-body-medium text-sm text-ink">
                  Potensi Menu
                </Text>
                <Ionicons name="book-outline" size={18} color="#34483A" />
              </View>
              <Text className="mt-2 font-body text-xs text-pebble">
                <Text className="font-heading text-3xl text-ink">
                  {totalRecipes}{' '}
                </Text>
                siap masak
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

          <View className="flex-row items-center justify-between">
            <Text className="mr-3 flex-1 font-body text-xs text-pebble">
              💡 Ketik nama bahan dalam Bahasa Indonesia atau Inggris (contoh:
              garlic, potato, egg, cabe).
            </Text>
            <Pressable className="flex-row items-center active:opacity-70">
              <Ionicons name="add-circle-outline" size={18} color="#383831" />
              <Text className="ml-1 font-body-semibold text-sm text-ink">
                Tambah
              </Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="gap-2"
          >
            {filters.map((f) => {
              const isActive = f === filter;
              return (
                <Pressable
                  key={f}
                  onPress={() => setFilter(f)}
                  className={`rounded-full border px-4 py-2.5 ${isActive ? 'border-primary bg-primary' : 'border-oatmeal bg-card'}`}
                >
                  <Text
                    className={`font-body-semibold text-sm ${isActive ? 'text-card' : 'text-ink'}`}
                  >
                    {labelFor(f)} ({countFor(f)})
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

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
                    changeQuantity(item.id, direction)
                  }
                  onRemove={() => removeItem(item.id)}
                />
              ))
            )}
          </View>

          <View className="flex-row rounded-2xl bg-card p-4">
            <View
              className="h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: '#DAE3C8' }}
            >
              <Ionicons name="bulb-outline" size={18} color="#34483A" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="font-heading-md text-base text-ink">
                Tips Dapur Pintar
              </Text>
              <Text className="mt-1 font-body text-xs leading-5 text-pebble">
                Kombinasi{' '}
                <Text className="font-body-semibold text-ink">
                  kangkung, tempe, bawang putih,
                </Text>{' '}
                dan{' '}
                <Text className="font-body-semibold text-ink">cabai merah</Text>{' '}
                dapat diolah menjadi hidangan klasik Tumis Kangkung Tempe Gurih
                dalam 15 menit.
              </Text>
            </View>
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
          <Pressable className="flex-row items-center justify-center rounded-xl bg-primary py-4 active:bg-primary-dark">
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
