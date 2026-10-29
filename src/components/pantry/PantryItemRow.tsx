import type { PantryItem } from '@/data/mock-pantry';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type Props = {
  item: PantryItem;
  onChangeQuantity: (direction: 1 | -1) => void;
  onRemove: () => void;
};

export function PantryItemRow({ item, onChangeQuantity, onRemove }: Props) {
  return (
    <View className="flex-row items-center rounded-2xl border border-oatmeal bg-card p-3">
      <View className="h-12 w-12 items-center justify-center rounded-xl bg-oatmeal">
        <Ionicons name={item.icon} size={22} color="#34483A" />
      </View>

      <View className="ml-3 flex-1">
        <Text className="font-heading-md text-base text-ink">{item.name}</Text>
        <Text className="font-body text-xs italic text-pebble">
          {item.alias}
        </Text>
        <View className="mt-1 flex-row items-center">
          <View className="h-1.5 w-1.5 rounded-full bg-sage" />
          <Text className="ml-1.5 font-body text-xs text-pebble">
            {item.location}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center rounded-xl bg-oatmeal px-1 py-1">
        <Pressable
          onPress={() => onChangeQuantity(-1)}
          hitSlop={10}
          accessibilityLabel={`Kurangi ${item.name}`}
          className="h-7 w-7 items-center justify-center"
        >
          <Ionicons name="remove" size={16} color="#383831" />
        </Pressable>
        <Text className="w-14 text-center font-body-medium text-xs text-ink">
          {item.quantity} {item.unit}
        </Text>
        <Pressable
          onPress={() => onChangeQuantity(1)}
          hitSlop={10}
          accessibilityLabel={`Tambah ${item.name}`}
          className="h-7 w-7 items-center justify-center"
        >
          <Ionicons name="add" size={16} color="#383831" />
        </Pressable>
      </View>

      <Pressable
        onPress={onRemove}
        hitSlop={10}
        accessibilityLabel={`Hapus ${item.name}`}
        className="ml-2 h-8 w-8 items-center justify-center"
      >
        <Ionicons name="trash-outline" size={18} color="#77766D" />
      </Pressable>
    </View>
  );
}
