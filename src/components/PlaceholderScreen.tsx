import { Text, View } from 'react-native';

export function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View className="flex-1 items-center justify-center bg-canvas">
      <Text className="font-heading text-2xl text-ink">{title}</Text>
      <Text className="mt-2 font-body text-pebble">Segera hadir</Text>
    </View>
  );
}
