import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import type { RecipeStep } from '@/data/mock-recipe-detail';

type Props = {
  number: number;
  step: RecipeStep;
  isDone: boolean;
  onToggle: () => void;
};

export function StepCard({ number, step, isDone, onToggle }: Props) {
  return (
    <View className="flex-row rounded-2xl bg-card p-4">
      <View className="h-10 w-10 items-center justify-center rounded-full bg-sage-light">
        <Text className="font-heading-md text-lg text-primary">{number}</Text>
      </View>
      <View className={`ml-3 flex-1 ${isDone ? 'opacity-60' : ''}`}>
        <Text className="font-body-semibold text-base text-ink">
          {step.title}
        </Text>
        <Text className="mt-1 font-body text-sm leading-6 text-pebble">
          {step.instruction}
        </Text>
      </View>
      <Pressable
        onPress={onToggle}
        hitSlop={10}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isDone }}
        accessibilityLabel={`Tandai langkah ${number} selesai`}
        className={`ml-2 h-8 w-8 items-center justify-center rounded-full ${isDone ? 'bg-primary' : 'bg-oatmeal'}`}
      >
        {isDone && <Ionicons name="checkmark" size={16} color="#FAF8F3" />}
      </Pressable>
    </View>
  );
}
