import { useState } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = Omit<TextInputProps, 'style' | 'secureTextEntry'> & {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  error?: string;
  hint?: string;
  isPassword?: boolean;
};

export function AuthTextField({
  label,
  icon,
  error,
  hint,
  isPassword = false,
  ...inputProps
}: Props) {
  const [isHidden, setIsHidden] = useState(isPassword);

  return (
    <View>
      <Text className="mb-2 font-body-semibold text-sm text-ink">{label}</Text>
      <View
        className={`h-14 flex-row items-center rounded-xl border bg-card px-4 ${error ? 'border-danger' : 'border-oatmeal'}`}
      >
        <Ionicons name={icon} size={20} color="#77766D" />
        <TextInput
          className="ml-3 flex-1 font-body text-sm text-ink"
          placeholderTextColor="#77766D"
          accessibilityLabel={label}
          secureTextEntry={isHidden}
          {...inputProps}
        />
        {isPassword && (
          <Pressable
            onPress={() => setIsHidden((value) => !value)}
            hitSlop={10}
            accessibilityLabel={
              isHidden ? 'Tampilkan kata sandi' : 'Sembunyikan kata sandi'
            }
          >
            <Ionicons
              name={isHidden ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#77766D"
            />
          </Pressable>
        )}
      </View>
      {error ? (
        <Text className="mt-1.5 font-body text-xs text-danger">{error}</Text>
      ) : hint ? (
        <Text className="mt-1.5 font-body text-xs text-pebble">{hint}</Text>
      ) : null}
    </View>
  );
}
