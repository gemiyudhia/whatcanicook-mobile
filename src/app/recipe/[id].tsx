import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IngredientRow } from '@/components/recipe/IngredientRow';
import { StepCard } from '@/components/recipe/StepCard';
import { getRecipeDetail } from '@/data/mock-recipe-detail';
import { goBack } from '@/lib/navigation';

const MIN_SERVINGS = 1;
const MAX_SERVINGS = 12;

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = getRecipeDetail(id);

  const [servings, setServings] = useState(recipe?.servings ?? MIN_SERVINGS);
  const [isSaved, setIsSaved] = useState(false);
  const [doneSteps, setDoneSteps] = useState<string[]>([]);

  if (!recipe) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-canvas px-5">
        <Text className="font-body text-base text-pebble">
          Resep tidak ditemukan.
        </Text>
        <Pressable
          onPress={goBack}
          className="mt-4 rounded-xl bg-primary px-6 py-3 active:bg-primary-dark"
        >
          <Text className="font-body-semibold text-sm text-card">Kembali</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const changeServings = (delta: number) =>
    setServings((value) =>
      Math.min(MAX_SERVINGS, Math.max(MIN_SERVINGS, value + delta)),
    );

  const toggleStep = (stepId: string) =>
    setDoneSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((item) => item !== stepId)
        : [...prev, stepId],
    );

  const missingCount = recipe.ingredients.filter(
    (item) => item.status === 'missing',
  ).length;

  const infoItems = [
    { icon: 'time-outline', label: 'Waktu', value: recipe.duration },
    {
      icon: 'people-outline',
      label: 'Porsi',
      value: `${recipe.servings} Porsi`,
    },
    {
      icon: 'flame-outline',
      label: 'Energi',
      value: `~${recipe.calories} kkal`,
    },
    { icon: 'speedometer-outline', label: 'Tingkat', value: recipe.difficulty },
  ] as const;

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      <View className="flex-1">
        <View className="flex-row items-center px-5 py-2">
          <Pressable onPress={goBack} hitSlop={10} accessibilityLabel="Kembali">
            <Ionicons name="arrow-back" size={24} color="#383831" />
          </Pressable>
          <View className="ml-4 flex-1">
            <Text className="font-heading text-xl text-ink">Detail Resep</Text>
            <Text className="font-body text-xs text-pebble">WhatCanICook</Text>
          </View>
          <Ionicons name="share-social-outline" size={22} color="#383831" />
          <Pressable
            onPress={() => setIsSaved((value) => !value)}
            hitSlop={10}
            accessibilityLabel={
              isSaved ? 'Hapus dari tersimpan' : 'Simpan resep'
            }
            className="ml-5"
          >
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color="#383831"
            />
          </Pressable>
        </View>

        <ScrollView
          contentContainerClassName="gap-6 px-5 pb-32 pt-2"
          showsVerticalScrollIndicator={false}
        >
          <View className="h-64 justify-end overflow-hidden rounded-2xl bg-primary p-3">
            <View className="flex-row items-center gap-2">
              <View className="flex-1 flex-row items-center rounded-full bg-sage-light px-3 py-2.5">
                <Ionicons name="checkmark-circle" size={20} color="#34483A" />
                <Text className="ml-2 flex-1 font-body-semibold text-sm text-primary">
                  {recipe.matchText}
                </Text>
              </View>
              <View className="flex-row items-center rounded-full bg-card px-3 py-2.5">
                <Ionicons name="flame-outline" size={14} color="#6A351B" />
                <Text className="ml-1 font-body-medium text-xs text-ink">
                  {recipe.calories} kkal
                </Text>
              </View>
            </View>
          </View>

          <View>
            <View className="flex-row items-center">
              <Ionicons name="restaurant-outline" size={14} color="#77766D" />
              <Text className="ml-1.5 font-body-medium text-xs tracking-wider text-pebble">
                {recipe.category}
              </Text>
            </View>
            <Text className="mt-2 font-heading text-[28px] leading-9 text-primary">
              {recipe.title}
            </Text>
            <Text className="mt-3 font-body text-base leading-6 text-pebble">
              {recipe.description}
            </Text>
          </View>

          <View className="flex-row gap-2 rounded-2xl bg-oatmeal/60 p-2">
            {infoItems.map((item) => (
              <View
                key={item.label}
                className="flex-1 items-center rounded-xl bg-card py-3"
              >
                <Ionicons name={item.icon} size={20} color="#34483A" />
                <Text className="mt-1 font-body text-xs text-pebble">
                  {item.label}
                </Text>
                <Text className="font-body-semibold text-sm text-ink">
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          <View className="flex-row items-center rounded-2xl bg-card p-4">
            <View className="mr-3 flex-1">
              <Text className="font-body-semibold text-sm text-ink">
                Atur Takaran Porsi
              </Text>
              <Text className="mt-1 font-body text-xs text-pebble">
                Kebutuhan bahan otomatis disesuaikan
              </Text>
            </View>
            <View className="flex-row items-center rounded-full bg-oatmeal p-1">
              <Pressable
                onPress={() => changeServings(-1)}
                accessibilityLabel="Kurangi porsi"
                className="h-10 w-10 items-center justify-center rounded-full bg-card"
              >
                <Ionicons name="remove" size={18} color="#383831" />
              </Pressable>
              <Text className="w-16 text-center font-body-semibold text-sm text-ink">
                {servings} Orang
              </Text>
              <Pressable
                onPress={() => changeServings(1)}
                accessibilityLabel="Tambah porsi"
                className="h-10 w-10 items-center justify-center rounded-full bg-card"
              >
                <Ionicons name="add" size={18} color="#383831" />
              </Pressable>
            </View>
          </View>

          <View className="gap-3">
            <View className="flex-row items-center">
              <Ionicons
                name="file-tray-full-outline"
                size={20}
                color="#383831"
              />
              <Text className="ml-2 flex-1 font-heading-md text-xl text-ink">
                Daftar Bahan
              </Text>
              <View className="rounded-full bg-sage-light px-3 py-1">
                <Text className="font-body-semibold text-xs text-primary">
                  {missingCount === 0
                    ? 'Semua Siap'
                    : `Kurang ${missingCount} Bahan`}
                </Text>
              </View>
            </View>
            {recipe.ingredients.map((ingredient) => (
              <IngredientRow
                key={ingredient.id}
                ingredient={ingredient}
                baseServings={recipe.servings}
                servings={servings}
              />
            ))}
          </View>

          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="restaurant-outline" size={20} color="#383831" />
                <Text className="ml-2 font-heading-md text-xl text-ink">
                  Langkah Memasak
                </Text>
              </View>
              <Text className="font-body text-xs text-pebble">
                {recipe.steps.length} Langkah Cepat
              </Text>
            </View>
            {recipe.steps.map((step, index) => (
              <StepCard
                key={step.id}
                number={index + 1}
                step={step}
                isDone={doneSteps.includes(step.id)}
                onToggle={() => toggleStep(step.id)}
              />
            ))}
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <Pressable className="flex-row items-center rounded-2xl bg-primary px-4 py-4 active:bg-primary-dark">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-dark">
              <Ionicons name="timer-outline" size={20} color="#B5CCBA" />
            </View>
            <View className="ml-3 flex-1">
              <Text className="font-body-semibold text-sm text-card">
                Mulai Mode Memasak
              </Text>
              <Text className="font-body text-xs text-card/70">
                Panduan Langkah Demi Langkah
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#FAF8F3" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
