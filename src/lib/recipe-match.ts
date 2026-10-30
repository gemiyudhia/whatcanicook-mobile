type Matchable = { matchedCount: number; totalCount: number };

export const isFullyMatched = (recipe: Matchable) =>
  recipe.totalCount > 0 && recipe.matchedCount === recipe.totalCount;

export const getMatchPercent = (recipe: Matchable) =>
  recipe.totalCount > 0
    ? Math.round((recipe.matchedCount / recipe.totalCount) * 100)
    : 0;
