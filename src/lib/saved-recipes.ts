import type { SavedCategory, SavedRecipe } from '@/data/mock-saved';
import { isFullyMatched } from '@/lib/recipe-match';

export type SavedCategoryFilter = 'all' | SavedCategory;

type Filters = {
  category: SavedCategoryFilter;
  query: string;
  readyOnly: boolean;
};

export function filterSavedRecipes(
  recipes: SavedRecipe[],
  { category, query, readyOnly }: Filters,
) {
  const normalizedQuery = query.trim().toLowerCase();
  return recipes.filter(
    (recipe) =>
      (category === 'all' || recipe.category === category) &&
      (!readyOnly || isFullyMatched(recipe)) &&
      recipe.title.toLowerCase().includes(normalizedQuery),
  );
}

export function countSavedRecipes(
  recipes: SavedRecipe[],
  category: SavedCategoryFilter,
) {
  return category === 'all'
    ? recipes.length
    : recipes.filter((recipe) => recipe.category === category).length;
}

export const countReadyRecipes = (recipes: SavedRecipe[]) =>
  recipes.filter(isFullyMatched).length;
