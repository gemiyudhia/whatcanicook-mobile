import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export function AppHeader({ subtitle }: { subtitle: string }) {
  return (
    <View className="flex-row items-center">
      <View className="h-10 w-10 items-center justify-center rounded-lg border border-oatmeal bg-card">
        <Text className="text-lg">🍳</Text>
      </View>
      <View className="ml-3 flex-1">
        <Text className="font-heading text-xl text-ink">WhatCanICook</Text>
        <Text className="font-body text-xs text-pebble">{subtitle}</Text>
      </View>
      <Ionicons name="search" size={22} color="#383831" />
      <Ionicons
        name="notifications-outline"
        size={22}
        color="#383831"
        style={{ marginLeft: 20 }}
      />
    </View>
  );
}
