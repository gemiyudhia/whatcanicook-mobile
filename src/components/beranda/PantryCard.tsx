import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type Props = {
  items: string[];
  totalResep: number;
  onKelola?: () => void;
  onCariResep?: () => void;
};

export function PantryCard({
  items,
  totalResep,
  onKelola,
  onCariResep,
}: Props) {
  return (
    <View className="rounded-2xl border border-oatmeal bg-card p-4">
      <View className="flex-row items-center">
        <View className="h-10 w-10 items-center justify-center rounded-xl bg-oatmeal">
          <Ionicons name="file-tray-full-outline" size={20} color="#34483A" />
        </View>
        <View className="ml-3 flex-1">
          <Text className="font-heading-md text-xl text-ink">
            Pantry Tersedia
          </Text>
          <Text className="font-body text-xs text-pebble">
            {items.length} bahan aktif di wadah dapurmu
          </Text>
        </View>
        <View
          className="rounded-full bg-secondary-container px-3 py-1"
          style={{ backgroundColor: '#DAE3C8' }}
        >
          <Text className="font-body-semibold text-xs text-primary">
            Siap Pakai
          </Text>
        </View>
      </View>

      <View className="mt-4 flex-row flex-wrap gap-2">
        {items.map((item) => (
          <View
            key={item}
            className="rounded-full border border-oatmeal bg-canvas px-3 py-2"
          >
            <Text className="font-body-medium text-xs text-ink">{item}</Text>
          </View>
        ))}
      </View>

      <View className="mt-4 flex-row gap-3">
        <Pressable
          onPress={onKelola}
          className="flex-1 items-center rounded-xl bg-oatmeal py-3.5 active:opacity-80"
        >
          <Text className="font-body-semibold text-sm text-ink">
            Kelola Bahan
          </Text>
        </Pressable>
        <Pressable
          onPress={onCariResep}
          className="flex-1 flex-row items-center justify-center rounded-xl bg-primary py-3.5 active:bg-primary-dark"
        >
          <Text className="font-body-semibold text-sm text-card">
            Resep Cocok ({totalResep})
          </Text>
          <Ionicons
            name="arrow-forward"
            size={16}
            color="#FAF8F3"
            style={{ marginLeft: 6 }}
          />
        </Pressable>
      </View>
    </View>
  );
}
