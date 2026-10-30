import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from 'react-native';

import { SAVED_CATEGORY_LABELS, type SavedRecipe } from '@/data/mock-saved';
import { getMatchPercent, isFullyMatched } from '@/lib/recipe-match';

type Props = {
  recipe: SavedRecipe;
  image?: ImageSourcePropType;
  onUnsave: () => void;
  onPress?: () => void;
};

export function SavedRecipeCard({ recipe, image, onUnsave, onPress }: Props) {
  const isComplete = isFullyMatched(recipe);
  const percent = getMatchPercent(recipe);

  return (
    <View className="overflow-hidden rounded-2xl border border-oatmeal bg-card">
      <View className="h-40 justify-end bg-primary">
        {image && (
          <Image
            source={image}
            className="absolute h-full w-full"
            resizeMode="cover"
          />
        )}
        <View className="absolute h-full w-full bg-black/25" />

        <View className="absolute left-3 top-3 flex-row items-center rounded-full bg-card/90 px-3 py-1.5">
          {isComplete && (
            <Ionicons
              name="checkmark-circle-outline"
              size={14}
              color="#34483A"
            />
          )}
          <Text
            className={`font-body-semibold text-xs text-primary ${isComplete ? 'ml-1' : ''}`}
          >
            {isComplete
              ? '100% Siap Masak'
              : SAVED_CATEGORY_LABELS[recipe.category]}
          </Text>
        </View>

        <Pressable
          onPress={onUnsave}
          accessibilityLabel={`Hapus ${recipe.title} dari tersimpan`}
          className="absolute right-3 top-3 h-10 w-10 items-center justify-center rounded-full bg-card/90"
        >
          <Ionicons name="bookmark" size={18} color="#34483A" />
        </Pressable>

        <View className="flex-row items-center justify-between px-4 pb-3">
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={14} color="#FFFFFF" />
            <Text className="ml-1 font-body-medium text-xs text-white">
              {recipe.duration}
            </Text>
            <Ionicons
              name="people-outline"
              size={14}
              color="#FFFFFF"
              style={{ marginLeft: 12 }}
            />
            <Text className="ml-1 font-body-medium text-xs text-white">
              {recipe.servings}
            </Text>
          </View>
          <Text className="font-body text-xs text-white/90">
            {recipe.savedAgo}
          </Text>
        </View>
      </View>

      <Pressable onPress={onPress} className="p-4">
        <View className="flex-row items-start justify-between">
          <Text className="mr-2 flex-1 font-heading-md text-xl text-ink">
            {recipe.title}
          </Text>
          <Ionicons name="ellipsis-vertical" size={18} color="#77766D" />
        </View>

        <View className="mt-3 rounded-xl bg-canvas p-3">
          <View className="flex-row items-center justify-between">
            <Text className="font-body-medium text-xs text-ink">
              {isComplete
                ? `Semua Bahan Tersedia (${recipe.matchedCount}/${recipe.totalCount})`
                : `Bahan Siap ${recipe.matchedCount}/${recipe.totalCount}`}
            </Text>
            <Text className="ml-2 font-body-medium text-xs text-pebble">
              {isComplete ? 'Siap Eksekusi' : `Kurang ${recipe.missing}`}
            </Text>
          </View>
          <View className="mt-2 h-1.5 overflow-hidden rounded-full bg-oatmeal">
            <View
              className="h-full rounded-full bg-primary"
              style={{ width: `${percent}%` }}
            />
          </View>
        </View>

        <View className="mt-3 flex-row items-center gap-2">
          <Pressable className="flex-row items-center rounded-xl bg-oatmeal px-3 py-2.5 active:opacity-80">
            <Ionicons name="calendar-outline" size={16} color="#383831" />
            <Text className="ml-1.5 font-body-medium text-xs text-ink">
              Jadwalkan
            </Text>
          </Pressable>
          <Pressable className="flex-row items-center rounded-xl bg-oatmeal px-3 py-2.5 active:opacity-80">
            <Ionicons name="share-social-outline" size={16} color="#383831" />
            <Text className="ml-1.5 font-body-medium text-xs text-ink">
              Bagikan
            </Text>
          </Pressable>
          <View className="flex-1" />
          <Pressable
            onPress={onPress}
            accessibilityLabel={`Buka ${recipe.title}`}
            className="h-11 w-11 items-center justify-center rounded-xl bg-primary active:bg-primary-dark"
          >
            <Ionicons name="arrow-forward" size={18} color="#FAF8F3" />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}
