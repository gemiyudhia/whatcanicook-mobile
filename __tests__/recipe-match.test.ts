import { getMatchPercent, isFullyMatched } from '../src/lib/recipe-match';

describe('recipe match helpers', () => {
  it('detects a fully matched recipe', () => {
    expect(isFullyMatched({ matchedCount: 5, totalCount: 5 })).toBe(true);
    expect(isFullyMatched({ matchedCount: 4, totalCount: 5 })).toBe(false);
  });

  it('never reports a recipe with no required ingredients as fully matched', () => {
    expect(isFullyMatched({ matchedCount: 0, totalCount: 0 })).toBe(false);
    expect(getMatchPercent({ matchedCount: 0, totalCount: 0 })).toBe(0);
  });

  it('calculates the match percentage', () => {
    expect(getMatchPercent({ matchedCount: 3, totalCount: 4 })).toBe(75);
    expect(getMatchPercent({ matchedCount: 4, totalCount: 6 })).toBe(67);
  });
});
