import type { PantryItem } from '../src/data/mock-pantry';
import {
  changeItemQuantity,
  countPantryItems,
  filterPantryItems,
} from '../src/lib/pantry';

const makeItem = (overrides: Partial<PantryItem>): PantryItem => ({
  id: '1',
  name: 'Bawang Putih',
  alias: 'garlic',
  location: 'Rak Bumbu',
  category: 'vegetables-spices',
  quantity: 6,
  unit: 'siung',
  step: 1,
  icon: 'leaf-outline',
  ...overrides,
});

const items = [
  makeItem({}),
  makeItem({
    id: '2',
    name: 'Telur Ayam',
    alias: 'egg',
    category: 'protein',
    quantity: 4,
  }),
  makeItem({
    id: '3',
    name: 'Kecap Manis',
    alias: 'sweet soy sauce',
    category: 'other',
    quantity: 250,
    step: 50,
  }),
];

describe('filterPantryItems', () => {
  it('matches the Indonesian or English name, ignoring case and spaces', () => {
    expect(
      filterPantryItems(items, 'all', '  GARLIC ').map((item) => item.id),
    ).toEqual(['1']);
    expect(
      filterPantryItems(items, 'all', 'telur').map((item) => item.id),
    ).toEqual(['2']);
  });

  it('filters by category', () => {
    expect(
      filterPantryItems(items, 'protein', '').map((item) => item.id),
    ).toEqual(['2']);
  });

  it('combines category and search', () => {
    expect(filterPantryItems(items, 'protein', 'garlic')).toEqual([]);
  });

  it('returns everything for an empty query', () => {
    expect(filterPantryItems(items, 'all', '')).toHaveLength(3);
  });
});

describe('countPantryItems', () => {
  it('counts all items or one category', () => {
    expect(countPantryItems(items, 'all')).toBe(3);
    expect(countPantryItems(items, 'other')).toBe(1);
  });
});

describe('changeItemQuantity', () => {
  it('changes only the target item by its step', () => {
    const result = changeItemQuantity(items, '3', 1);

    expect(result.find((item) => item.id === '3')?.quantity).toBe(300);
    expect(result.find((item) => item.id === '1')?.quantity).toBe(6);
  });

  it('never goes below one step', () => {
    const lowItems = [makeItem({ quantity: 1 })];

    expect(changeItemQuantity(lowItems, '1', -1)[0].quantity).toBe(1);
  });

  it('does not mutate the original list', () => {
    changeItemQuantity(items, '1', 1);

    expect(items[0].quantity).toBe(6);
  });
});
