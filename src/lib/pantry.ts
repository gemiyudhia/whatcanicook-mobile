import type { PantryCategory, PantryItem } from '@/data/mock-pantry';

export type PantryCategoryFilter = 'all' | PantryCategory;

export function filterPantryItems(
  items: PantryItem[],
  category: PantryCategoryFilter,
  query: string,
) {
  const normalizedQuery = query.trim().toLowerCase();
  return items.filter(
    (item) =>
      (category === 'all' || item.category === category) &&
      `${item.name} ${item.alias}`.toLowerCase().includes(normalizedQuery),
  );
}

export function countPantryItems(
  items: PantryItem[],
  category: PantryCategoryFilter,
) {
  return category === 'all'
    ? items.length
    : items.filter((item) => item.category === category).length;
}

export function changeItemQuantity(
  items: PantryItem[],
  id: string,
  direction: 1 | -1,
) {
  return items.map((item) =>
    item.id === id
      ? {
          ...item,
          quantity: Math.max(item.step, item.quantity + direction * item.step),
        }
      : item,
  );
}
