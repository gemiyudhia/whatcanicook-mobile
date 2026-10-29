import type { MatchedRecipe } from '@/data/mock-home';
import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from 'react-native';

type Props = {
  recipe: MatchedRecipe;
  image?: ImageSourcePropType;
  onPress?: () => void;
};

export function RecipeMatchCard({ recipe, image, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="overflow-hidden rounded-2xl border border-oatmeal bg-card"
    >
      <View className="h-44 justify-end bg-primary">
        {image && (
          <Image
            source={image}
            className="absolute h-full w-full"
            resizeMode="cover"
          />
        )}
        <View className="absolute h-full w-full bg-black/30" />

        <View className="absolute left-3 top-3 flex-row items-center rounded-full bg-card/90 px-3 py-1.5">
          <Ionicons
            name={
              recipe.isComplete
                ? 'checkmark-circle-outline'
                : 'alert-circle-outline'
            }
            size={14}
            color="#34483A"
          />
          <Text className="ml-1 font-body-semibold text-xs text-primary">
            {recipe.matchText}
          </Text>
        </View>

        <View className="absolute right-3 top-3 h-10 w-10 items-center justify-center rounded-full bg-card/90">
          <Ionicons name="bookmark-outline" size={18} color="#383831" />
        </View>

        <View className="p-4">
          <Text className="font-body-semibold text-[10px] tracking-widest text-card/80">
            {recipe.label}
          </Text>
          <Text className="font-heading text-2xl text-white">
            {recipe.title}
          </Text>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={16} color="#77766D" />
          <Text className="ml-1 mr-4 font-body-medium text-xs text-pebble">
            {recipe.duration}
          </Text>
          <Ionicons name="people-outline" size={16} color="#77766D" />
          <Text className="ml-1 flex-1 font-body-medium text-xs text-pebble">
            {recipe.servings}
          </Text>
          <View className="rounded-full bg-oatmeal px-3 py-1">
            <Text className="font-body-medium text-xs text-primary">
              {recipe.tag}
            </Text>
          </View>
        </View>
        <Text className="mt-3 font-body text-xs text-ink">
          <Text className="font-body-semibold">
            {recipe.isComplete ? 'Bahan: ' : 'Bahan siap: '}
          </Text>
          {recipe.ingredients}
        </Text>
      </View>
    </Pressable>
  );
}
