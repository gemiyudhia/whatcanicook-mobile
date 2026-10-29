import type { BahanPantry } from '@/data/mock-bahan';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type Props = {
  item: BahanPantry;
  onUbahJumlah: (arah: 1 | -1) => void;
  onHapus: () => void;
};

export function PantryItemRow({ item, onUbahJumlah, onHapus }: Props) {
  return (
    <View className="flex-row items-center rounded-2xl border border-oatmeal bg-card p-3">
      <View className="h-12 w-12 items-center justify-center rounded-xl bg-oatmeal">
        <Ionicons name={item.ikon} size={22} color="#34483A" />
      </View>

      <View className="ml-3 flex-1">
        <Text className="font-heading-md text-base text-ink">{item.nama}</Text>
        <Text className="font-body text-xs italic text-pebble">
          {item.alias}
        </Text>
        <View className="mt-1 flex-row items-center">
          <View className="h-1.5 w-1.5 rounded-full bg-sage" />
          <Text className="ml-1.5 font-body text-xs text-pebble">
            {item.lokasi}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center rounded-xl bg-oatmeal px-1 py-1">
        <Pressable
          onPress={() => onUbahJumlah(-1)}
          hitSlop={10}
          accessibilityLabel={`Kurangi ${item.nama}`}
          className="h-7 w-7 items-center justify-center"
        >
          <Ionicons name="remove" size={16} color="#383831" />
        </Pressable>
        <Text className="w-14 text-center font-body-medium text-xs text-ink">
          {item.jumlah} {item.satuan}
        </Text>
        <Pressable
          onPress={() => onUbahJumlah(1)}
          hitSlop={10}
          accessibilityLabel={`Tambah ${item.nama}`}
          className="h-7 w-7 items-center justify-center"
        >
          <Ionicons name="add" size={16} color="#383831" />
        </Pressable>
      </View>

      <Pressable
        onPress={onHapus}
        hitSlop={10}
        accessibilityLabel={`Hapus ${item.nama}`}
        className="ml-2 h-8 w-8 items-center justify-center"
      >
        <Ionicons name="trash-outline" size={18} color="#77766D" />
      </Pressable>
    </View>
  );
}
