import { MOCK_MATCHES, type RecipeMatch } from '../src/data/mock-matches';
import {
  countMatches,
  filterMatches,
  rankMatches,
} from '../src/lib/match-results';

const noFilters = {
  filter: 'all',
  completeOnly: false,
  quickOnly: false,
} as const;
const ids = (matches: RecipeMatch[]) => matches.map((match) => match.id);

describe('filterMatches', () => {
  it('keeps only fully matched recipes for the ready filter', () => {
    expect(
      ids(filterMatches(MOCK_MATCHES, { ...noFilters, filter: 'ready' })),
    ).toEqual(['1', '2']);
  });

  it('keeps recipes missing exactly one ingredient', () => {
    expect(
      ids(filterMatches(MOCK_MATCHES, { ...noFilters, filter: 'missing-one' })),
    ).toEqual(['3', '4']);
  });

  it('applies the complete-only switch', () => {
    expect(
      ids(filterMatches(MOCK_MATCHES, { ...noFilters, completeOnly: true })),
    ).toEqual(['1', '2']);
  });

  it('treats quick cooking as strictly under 20 minutes', () => {
    const matches = [
      { ...MOCK_MATCHES[0], id: 'a', durationMinutes: 19 },
      { ...MOCK_MATCHES[0], id: 'b', durationMinutes: 20 },
    ];

    expect(
      ids(filterMatches(matches, { ...noFilters, quickOnly: true })),
    ).toEqual(['a']);
  });
});

describe('countMatches', () => {
  it('counts per filter', () => {
    expect(countMatches(MOCK_MATCHES, 'all')).toBe(4);
    expect(countMatches(MOCK_MATCHES, 'ready')).toBe(2);
    expect(countMatches(MOCK_MATCHES, 'missing-one')).toBe(2);
  });
});

describe('rankMatches', () => {
  it('ranks by fewer missing, higher percentage, shorter time, then id', () => {
    expect(ids(rankMatches(MOCK_MATCHES))).toEqual(['2', '1', '4', '3']);
  });

  it('breaks full ties with the recipe id', () => {
    const tied = [
      { ...MOCK_MATCHES[0], id: 'b' },
      { ...MOCK_MATCHES[0], id: 'a' },
    ];

    expect(ids(rankMatches(tied))).toEqual(['a', 'b']);
  });

  it('does not mutate the original list', () => {
    const before = ids(MOCK_MATCHES);
    rankMatches(MOCK_MATCHES);

    expect(ids(MOCK_MATCHES)).toEqual(before);
  });
});
