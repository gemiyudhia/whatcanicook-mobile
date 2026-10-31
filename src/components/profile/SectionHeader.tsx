import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function SectionHeader({
  icon,
  title,
  actionLabel,
  onActionPress,
}: Props) {
  return (
    <View className="flex-row items-center">
      <Ionicons name={icon} size={20} color="#383831" />
      <Text className="ml-2 flex-1 font-heading-md text-xl text-ink">
        {title}
      </Text>
      {actionLabel && (
        <Pressable onPress={onActionPress} hitSlop={10}>
          <Text className="font-body-medium text-sm text-pebble">
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
