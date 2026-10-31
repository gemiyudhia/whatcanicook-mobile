import { getInitials } from '../src/lib/get-initials';

describe('getInitials', () => {
  it('uses the first letter of the first two words', () => {
    expect(getInitials('Nisa Pratiwi')).toBe('NP');
    expect(getInitials('Nisa Ayu Pratiwi')).toBe('NA');
  });

  it('handles a single word, extra spaces and empty input', () => {
    expect(getInitials('nisa')).toBe('N');
    expect(getInitials('  Nisa   Pratiwi ')).toBe('NP');
    expect(getInitials('')).toBe('');
  });
});
