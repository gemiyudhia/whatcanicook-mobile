import type { SavedRecipe } from '../src/data/mock-saved';
import {
  countReadyRecipes,
  countSavedRecipes,
  filterSavedRecipes,
} from '../src/lib/saved-recipes';

const makeRecipe = (overrides: Partial<SavedRecipe>): SavedRecipe => ({
  id: '1',
  title: 'Ayam Kecap',
  category: 'daily',
  duration: '35 mnt',
  servings: '4 Porsi',
  savedAgo: 'Disimpan 2 hari lalu',
  matchedCount: 3,
  totalCount: 4,
  missing: 'Daging Ayam',
  ...overrides,
});

const recipes = [
  makeRecipe({}),
  makeRecipe({
    id: '2',
    title: 'Tumis Kangkung',
    matchedCount: 5,
    totalCount: 5,
    missing: '',
  }),
  makeRecipe({ id: '3', title: 'Tahu Telur', category: 'quick-breakfast' }),
];

const noFilters = { category: 'all', query: '', readyOnly: false } as const;

describe('filterSavedRecipes', () => {
  it('searches by title ignoring case and spaces', () => {
    const result = filterSavedRecipes(recipes, {
      ...noFilters,
      query: ' KANGKUNG ',
    });

    expect(result.map((recipe) => recipe.id)).toEqual(['2']);
  });

  it('filters by category', () => {
    const result = filterSavedRecipes(recipes, {
      ...noFilters,
      category: 'quick-breakfast',
    });

    expect(result.map((recipe) => recipe.id)).toEqual(['3']);
  });
});

describe('counting helpers', () => {
  it('counts recipes per category and ready recipes', () => {
    expect(countSavedRecipes(recipes, 'all')).toBe(3);
    expect(countSavedRecipes(recipes, 'daily')).toBe(2);
    expect(countReadyRecipes(recipes)).toBe(1);
  });
});
