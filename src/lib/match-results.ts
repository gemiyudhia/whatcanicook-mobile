import type { RecipeMatch } from '@/data/mock-matches';
import { getMatchPercent, isFullyMatched } from '@/lib/recipe-match';

export type MatchFilter = 'all' | 'ready' | 'missing-one';

export const QUICK_COOK_LIMIT_MINUTES = 20;

const getMissingCount = (match: RecipeMatch) =>
  match.totalCount - match.matchedCount;

const matchesFilter = (match: RecipeMatch, filter: MatchFilter) => {
  if (filter === 'ready') return isFullyMatched(match);
  if (filter === 'missing-one') return getMissingCount(match) === 1;
  return true;
};

type Options = {
  filter: MatchFilter;
  completeOnly: boolean;
  quickOnly: boolean;
};

export function filterMatches(
  matches: RecipeMatch[],
  { filter, completeOnly, quickOnly }: Options,
) {
  return matches.filter(
    (match) =>
      matchesFilter(match, filter) &&
      (!completeOnly || isFullyMatched(match)) &&
      (!quickOnly || match.durationMinutes < QUICK_COOK_LIMIT_MINUTES),
  );
}

export const countMatches = (matches: RecipeMatch[], filter: MatchFilter) =>
  matches.filter((match) => matchesFilter(match, filter)).length;

export function rankMatches(matches: RecipeMatch[]) {
  return [...matches].sort(
    (a, b) =>
      getMissingCount(a) - getMissingCount(b) ||
      getMatchPercent(b) - getMatchPercent(a) ||
      a.durationMinutes - b.durationMinutes ||
      a.id.localeCompare(b.id),
  );
}
