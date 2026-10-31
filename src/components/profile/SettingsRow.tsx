import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import type { SettingsItem } from '@/data/mock-profile';

type Props = {
  item: SettingsItem;
  showDivider: boolean;
  onPress?: () => void;
};

export function SettingsRow({ item, showDivider, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      className={`flex-row items-center px-4 py-4 active:opacity-80 ${showDivider ? 'border-t border-oatmeal' : ''}`}
    >
      <View className="h-11 w-11 items-center justify-center rounded-xl bg-oatmeal">
        <Ionicons name={item.icon} size={20} color="#34483A" />
      </View>
      <View className="ml-3 flex-1">
        <Text className="font-body-semibold text-sm text-ink">
          {item.title}
        </Text>
        <Text className="mt-0.5 font-body text-xs text-pebble">
          {item.subtitle}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#77766D" />
    </Pressable>
  );
}
