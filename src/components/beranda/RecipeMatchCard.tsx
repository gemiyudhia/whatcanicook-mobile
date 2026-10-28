import type { ResepCocok } from '@/data/mock-beranda';
import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from 'react-native';

type Props = {
  resep: ResepCocok;
  gambar?: ImageSourcePropType;
  onPress?: () => void;
};

export function RecipeMatchCard({ resep, gambar, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="overflow-hidden rounded-2xl border border-oatmeal bg-card"
    >
      <View className="h-44 justify-end bg-primary">
        {gambar && (
          <Image
            source={gambar}
            className="absolute h-full w-full"
            resizeMode="cover"
          />
        )}
        <View className="absolute h-full w-full bg-black/30" />

        <View className="absolute left-3 top-3 flex-row items-center rounded-full bg-card/90 px-3 py-1.5">
          <Ionicons
            name={
              resep.lengkap
                ? 'checkmark-circle-outline'
                : 'alert-circle-outline'
            }
            size={14}
            color="#34483A"
          />
          <Text className="ml-1 font-body-semibold text-xs text-primary">
            {resep.cocokTeks}
          </Text>
        </View>

        <View className="absolute right-3 top-3 h-10 w-10 items-center justify-center rounded-full bg-card/90">
          <Ionicons name="bookmark-outline" size={18} color="#383831" />
        </View>

        <View className="p-4">
          <Text className="font-body-semibold text-[10px] tracking-widest text-card/80">
            {resep.label}
          </Text>
          <Text className="font-heading text-2xl text-white">
            {resep.judul}
          </Text>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={16} color="#77766D" />
          <Text className="ml-1 mr-4 font-body-medium text-xs text-pebble">
            {resep.waktu}
          </Text>
          <Ionicons name="people-outline" size={16} color="#77766D" />
          <Text className="ml-1 flex-1 font-body-medium text-xs text-pebble">
            {resep.porsi}
          </Text>
          <View className="rounded-full bg-oatmeal px-3 py-1">
            <Text className="font-body-medium text-xs text-primary">
              {resep.tag}
            </Text>
          </View>
        </View>
        <Text className="mt-3 font-body text-xs text-ink">
          <Text className="font-body-semibold">
            {resep.lengkap ? 'Bahan: ' : 'Bahan siap: '}
          </Text>
          {resep.bahan}
        </Text>
      </View>
    </Pressable>
  );
}
