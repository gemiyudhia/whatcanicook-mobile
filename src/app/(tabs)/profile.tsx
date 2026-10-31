import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';
import { SectionHeader } from '@/components/profile/SectionHeader';
import { SettingsRow } from '@/components/profile/SettingsRow';
import {
  COOKING_DEFAULTS,
  INITIAL_AVOIDED_INGREDIENTS,
  INITIAL_TASTE_TAGS,
  MOCK_USER,
  SETTINGS_ITEMS,
} from '@/data/mock-profile';
import { getInitials } from '@/lib/get-initials';

export default function ProfileScreen() {
  const [avoidedIngredients, setAvoidedIngredients] = useState(
    INITIAL_AVOIDED_INGREDIENTS,
  );
  const [isBilingualSearch, setIsBilingualSearch] = useState(true);

  const removeAvoided = (name: string) =>
    setAvoidedIngredients((prev) => prev.filter((item) => item !== name));

  const stats = [
    { value: MOCK_USER.stats.cooked, label: 'Resep Dimasak' },
    { value: MOCK_USER.stats.saved, label: 'Tersimpan' },
    { value: MOCK_USER.stats.pantryItems, label: 'Bahan di Dapur' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      <ScrollView
        contentContainerClassName="gap-6 px-5 pb-8 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <AppHeader subtitle="Profil" />

        <View className="items-center">
          <View>
            <View className="h-28 w-28 items-center justify-center rounded-full bg-primary">
              <Text className="font-heading text-5xl text-card">
                {getInitials(MOCK_USER.name)}
              </Text>
            </View>
            <View className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full border border-oatmeal bg-card">
              <Ionicons name="restaurant" size={14} color="#6A351B" />
            </View>
          </View>
          <Text className="mt-4 font-heading text-3xl text-primary">
            {MOCK_USER.name}
          </Text>
          <Text className="mt-1 font-body text-sm text-pebble">
            {MOCK_USER.role} • Bergabung sejak {MOCK_USER.joinedAt}
          </Text>
        </View>

        <View className="flex-row gap-3">
          {stats.map((stat) => (
            <View
              key={stat.label}
              className="flex-1 items-center rounded-2xl bg-card py-4"
            >
              <Text className="font-heading text-2xl text-primary">
                {stat.value}
              </Text>
              <Text className="mt-1 text-center font-body text-xs text-pebble">
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-row items-center rounded-2xl bg-sage-light p-4">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-primary">
            <Ionicons name="sparkles" size={18} color="#FAF8F3" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="font-body-semibold text-sm text-ink">
              Rekomendasi Pintar Aktif
            </Text>
            <Text className="mt-0.5 font-body text-xs text-pebble">
              Resep disaring otomatis sesuai pantangan bahan.
            </Text>
          </View>
        </View>

        <View className="gap-3">
          <SectionHeader
            icon="options-outline"
            title="Preferensi Memasak & Diet"
            actionLabel="Ubah"
          />
          <View className="rounded-2xl border border-oatmeal bg-card p-4">
            <Text className="font-body-semibold text-xs tracking-wider text-pebble">
              PREFERENSI RASA & MASAKAN
            </Text>
            <View className="mt-3 flex-row flex-wrap gap-2">
              {INITIAL_TASTE_TAGS.map((tag) => (
                <View key={tag} className="rounded-full bg-oatmeal px-3 py-2">
                  <Text className="font-body-medium text-sm text-ink">
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
            <View className="mt-4 flex-row gap-3">
              <View className="flex-1 rounded-xl bg-canvas p-3">
                <Text className="font-body text-xs text-pebble">
                  Porsi Standar
                </Text>
                <Text className="mt-1 font-heading-md text-lg text-ink">
                  {COOKING_DEFAULTS.servings}
                </Text>
                <Text className="mt-1 font-body text-xs text-pebble">
                  {COOKING_DEFAULTS.servingsNote}
                </Text>
              </View>
              <View className="flex-1 rounded-xl bg-canvas p-3">
                <Text className="font-body text-xs text-pebble">
                  Batas Memasak
                </Text>
                <Text className="mt-1 font-heading-md text-lg text-ink">
                  {COOKING_DEFAULTS.maxTime}
                </Text>
                <Text className="mt-1 font-body text-xs text-pebble">
                  {COOKING_DEFAULTS.maxTimeNote}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="gap-3">
          <SectionHeader
            icon="close-circle-outline"
            title="Bahan & Alergi"
            actionLabel={`${avoidedIngredients.length} Pantangan`}
          />
          <View className="rounded-2xl border border-oatmeal bg-card p-4">
            <View className="flex-row items-center justify-between">
              <Text className="font-body-semibold text-xs tracking-wider text-pebble">
                BAHAN DIHINDARI
              </Text>
              <Pressable className="flex-row items-center" hitSlop={10}>
                <Ionicons name="add" size={16} color="#383831" />
                <Text className="font-body-semibold text-sm text-ink">
                  Tambah
                </Text>
              </Pressable>
            </View>
            <View className="mt-3 flex-row flex-wrap gap-2">
              {avoidedIngredients.map((name) => (
                <View
                  key={name}
                  className="flex-row items-center rounded-full bg-danger-light py-2 pl-3 pr-2"
                >
                  <Text className="font-body-semibold text-sm text-danger">
                    {name}
                  </Text>
                  <Pressable
                    onPress={() => removeAvoided(name)}
                    hitSlop={10}
                    accessibilityLabel={`Hapus ${name} dari daftar pantangan`}
                    className="ml-2"
                  >
                    <Ionicons name="close" size={16} color="#BA1A1A" />
                  </Pressable>
                </View>
              ))}
            </View>
            <View className="mt-4 flex-row items-center">
              <View className="mr-4 flex-1">
                <Text className="font-body-semibold text-sm text-ink">
                  Pencarian Dwibahasa
                </Text>
                <Text className="mt-0.5 font-body text-xs text-pebble">
                  Mendukung alias Inggris (potato, garlic, chili, dsb.)
                </Text>
              </View>
              <Switch
                value={isBilingualSearch}
                onValueChange={setIsBilingualSearch}
                accessibilityLabel="Pencarian Dwibahasa"
                trackColor={{ false: '#E7DED0', true: '#34483A' }}
                thumbColor="#FAF8F3"
              />
            </View>
          </View>
        </View>

        <View className="gap-3">
          <SectionHeader icon="settings-outline" title="Pengaturan Aplikasi" />
          <View className="overflow-hidden rounded-2xl border border-oatmeal bg-card">
            {SETTINGS_ITEMS.map((item, index) => (
              <SettingsRow key={item.id} item={item} showDivider={index > 0} />
            ))}
          </View>
        </View>

        <Pressable className="flex-row items-center justify-center rounded-2xl bg-oatmeal py-4 active:opacity-80">
          <Ionicons name="log-out-outline" size={18} color="#BA1A1A" />
          <Text className="ml-2 font-body-semibold text-base text-danger">
            Keluar dari Akun
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
