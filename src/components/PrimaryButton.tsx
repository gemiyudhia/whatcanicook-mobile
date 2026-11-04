import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function PrimaryButton({ label, onPress, disabled = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      className={`h-14 flex-row items-center justify-center rounded-xl bg-primary active:bg-primary-dark ${disabled ? 'opacity-60' : ''}`}
    >
      <Text className="font-body-semibold text-base text-card">{label}</Text>
      <Ionicons
        name="arrow-forward"
        size={18}
        color="#FAF8F3"
        style={{ marginLeft: 8 }}
      />
    </Pressable>
  );
}
