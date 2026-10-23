import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-orange-50 p-6">
      <Text className="text-3xl font-bold text-orange-600">WhatCanICook</Text>
      <Text className="mt-2 text-base text-gray-600">
        Cook with what you already have.
      </Text>
    </View>
  );
}
