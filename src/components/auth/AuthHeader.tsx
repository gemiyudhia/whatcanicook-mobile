import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { goBack } from '@/lib/navigation';

export function AuthHeader({ subtitle }: { subtitle: string }) {
  return (
    <View className="flex-row items-center px-5 py-2">
      <Pressable
        onPress={goBack}
        hitSlop={10}
        accessibilityLabel="Kembali"
        className="w-10"
      >
        <Ionicons name="arrow-back" size={24} color="#383831" />
      </Pressable>
      <View className="flex-1 items-center">
        <Text className="font-heading text-xl text-primary">WhatCanICook</Text>
        <Text className="font-body-medium text-xs tracking-widest text-pebble">
          {subtitle}
        </Text>
      </View>
      <View className="w-10" />
    </View>
  );
}
