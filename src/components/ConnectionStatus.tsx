import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { getHealth } from '../lib/api';

export function ConnectionStatus() {
  const health = useQuery({ queryKey: ['health'], queryFn: getHealth });

  if (health.isPending) {
    return (
      <View className="items-center">
        <ActivityIndicator />
        <Text className="mt-2 text-sm text-gray-500">Connecting to API...</Text>
      </View>
    );
  }

  if (health.isError) {
    return (
      <View className="items-center">
        <Text className="text-base font-semibold text-red-600">
          Cannot connect to API
        </Text>
        <Text className="mt-1 text-center text-sm text-gray-600">
          {health.error.message}
        </Text>
        <Pressable
          accessibilityRole="button"
          className="mt-4 rounded-full bg-orange-600 px-5 py-2"
          disabled={health.isFetching}
          onPress={() => health.refetch()}
        >
          <Text className="font-semibold text-white">
            {health.isFetching ? 'Trying...' : 'Try again'}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <Text className="text-base font-semibold text-green-600">
      API connected
    </Text>
  );
}
