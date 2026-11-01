import { Text, View } from 'react-native';

import type { RecipeIngredient } from '@/data/mock-recipe-detail';
import { formatQuantity, scaleQuantity } from '@/lib/scale-quantity';

const STATUS_STYLE = {
  'in-pantry': {
    label: 'Di Dapur ✓',
    dot: 'bg-primary',
    badge: 'bg-primary',
    text: 'text-card',
  },
  staple: {
    label: 'Bumbu Dasar',
    dot: 'bg-sage',
    badge: 'bg-oatmeal',
    text: 'text-pebble',
  },
  missing: {
    label: 'Perlu Dibeli',
    dot: 'bg-terracotta',
    badge: 'bg-terracotta',
    text: 'text-card',
  },
} as const;

type Props = {
  ingredient: RecipeIngredient;
  baseServings: number;
  servings: number;
};

export function IngredientRow({ ingredient, baseServings, servings }: Props) {
  const style = STATUS_STYLE[ingredient.status];
  const quantityText =
    ingredient.quantity === null
      ? 'Secukupnya'
      : `${formatQuantity(scaleQuantity(ingredient.quantity, baseServings, servings))} ${ingredient.unit}`;

  return (
    <View className="flex-row items-center rounded-2xl bg-card px-4 py-3">
      <View className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
      <View className="ml-3 flex-1">
        <Text className="font-body-semibold text-sm text-ink">
          {ingredient.name}
        </Text>
        <Text className="mt-0.5 font-body text-xs text-pebble">
          {ingredient.note}
        </Text>
      </View>
      <View className="ml-3 items-end">
        <Text className="font-body-semibold text-sm text-ink">
          {quantityText}
        </Text>
        <View className={`mt-1 rounded-md px-2 py-0.5 ${style.badge}`}>
          <Text className={`font-body-medium text-[10px] ${style.text}`}>
            {style.label}
          </Text>
        </View>
      </View>
    </View>
  );
}
