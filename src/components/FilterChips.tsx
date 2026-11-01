import { Pressable, ScrollView, Text } from 'react-native';

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  options: Option<T>[];
  selected: T;
  onSelect: (value: T) => void;
};

export function FilterChips<T extends string>({
  options,
  selected,
  onSelect,
}: Props<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2"
    >
      {options.map((option) => {
        const isActive = option.value === selected;
        return (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
            className={`rounded-full border px-4 py-2.5 ${isActive ? 'border-primary bg-primary' : 'border-oatmeal bg-card'}`}
          >
            <Text
              className={`font-body-semibold text-sm ${isActive ? 'text-card' : 'text-ink'}`}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
