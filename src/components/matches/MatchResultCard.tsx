import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from 'react-native';

import type { RecipeMatch } from '@/data/mock-matches';
import { getMatchPercent, isFullyMatched } from '@/lib/recipe-match';

type Props = {
  match: RecipeMatch;
  image?: ImageSourcePropType;
  isSaved: boolean;
  onToggleSave: () => void;
  onOpen: () => void;
};

export function MatchResultCard({
  match,
  image,
  isSaved,
  onToggleSave,
  onOpen,
}: Props) {
  const isComplete = isFullyMatched(match);
  const missingCount = match.totalCount - match.matchedCount;

  return (
    <View className="overflow-hidden rounded-2xl border border-oatmeal bg-card">
      <View className="h-44 justify-end bg-primary">
        {image && (
          <Image
            source={image}
            className="absolute h-full w-full"
            resizeMode="cover"
          />
        )}
        <View className="absolute h-full w-full bg-black/25" />

        <Pressable
          onPress={onToggleSave}
          accessibilityLabel={
            isSaved
              ? `Hapus ${match.title} dari tersimpan`
              : `Simpan ${match.title}`
          }
          className="absolute right-3 top-3 h-10 w-10 items-center justify-center rounded-full bg-card/90"
        >
          <Ionicons
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color="#383831"
          />
        </Pressable>

        <View className="flex-row items-center gap-2 px-3 pb-3">
          <View className="flex-row items-center rounded-full bg-black/40 px-2.5 py-1">
            <Ionicons name="time-outline" size={12} color="#FFFFFF" />
            <Text className="ml-1 font-body-medium text-xs text-white">
              {match.durationMinutes} mnt
            </Text>
          </View>
          <View className="flex-row items-center rounded-full bg-black/40 px-2.5 py-1">
            <Ionicons name="restaurant-outline" size={12} color="#FFFFFF" />
            <Text className="ml-1 font-body-medium text-xs text-white">
              {match.servings}
            </Text>
          </View>
          <View className="rounded-full bg-black/40 px-2.5 py-1">
            <Text className="font-body-medium text-xs text-white">
              {match.level}
            </Text>
          </View>
        </View>
      </View>

      <View className="p-4">
        <Text className="font-heading-md text-2xl text-ink">{match.title}</Text>
        <Text className="mt-1 font-body text-sm text-pebble">
          {match.description}
        </Text>

        <View className="mt-3 rounded-xl bg-canvas p-3">
          <View className="flex-row items-center justify-between">
            <Text className="flex-1 font-body-semibold text-[11px] tracking-wider text-pebble">
              {isComplete
                ? `BAHAN TERPAKAI (${match.matchedCount}/${match.totalCount}):`
                : `STATUS BAHAN (${match.matchedCount} ADA • ${missingCount} KURANG):`}
            </Text>
            <Text className="ml-2 font-body-semibold text-xs text-ink">
              {isComplete ? 'Lengkap' : `${getMatchPercent(match)}% Siap`}
            </Text>
          </View>

          <View className="mt-2 flex-row flex-wrap gap-2">
            {match.matchedIngredients.map((name) => (
              <View
                key={name}
                className="flex-row items-center rounded-full bg-card px-3 py-1.5"
              >
                <Ionicons name="checkmark" size={12} color="#34483A" />
                <Text className="ml-1 font-body-medium text-xs text-ink">
                  {name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-3 flex-row items-center gap-2">
          {isComplete ? (
            <>
              <Pressable
                onPress={onOpen}
                className="h-12 flex-1 flex-row items-center justify-center rounded-xl bg-primary active:bg-primary-dark"
              >
                <Ionicons name="play" size={14} color="#FAF8F3" />
                <Text className="ml-2 font-body-semibold text-sm text-card">
                  Mulai Masak
                </Text>
              </Pressable>
              <Pressable
                onPress={onOpen}
                accessibilityLabel={`Lihat rincian ${match.title}`}
                className="h-12 w-12 items-center justify-center rounded-xl bg-oatmeal active:opacity-80"
              >
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color="#383831"
                />
              </Pressable>
            </>
          ) : (
            <>
              <Pressable
                onPress={onOpen}
                className="h-12 flex-row items-center justify-center rounded-xl bg-oatmeal px-4 active:opacity-80"
              >
                <Text className="font-body-medium text-sm text-ink">
                  Rincian
                </Text>
                <Ionicons name="chevron-forward" size={14} color="#383831" />
              </Pressable>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
