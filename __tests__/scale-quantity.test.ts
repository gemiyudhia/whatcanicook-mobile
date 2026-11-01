import { formatQuantity, scaleQuantity } from '../src/lib/scale-quantity';

describe('scaleQuantity', () => {
  it('scales proportionally to the servings', () => {
    expect(scaleQuantity(4, 2, 3)).toBe(6);
    expect(scaleQuantity(1, 2, 1)).toBe(0.5);
  });

  it('returns the original quantity when the base servings is invalid', () => {
    expect(scaleQuantity(4, 0, 3)).toBe(4);
  });
});

describe('formatQuantity', () => {
  it('formats whole numbers and common fractions', () => {
    expect(formatQuantity(4)).toBe('4');
    expect(formatQuantity(0.5)).toBe('1/2');
    expect(formatQuantity(1.5)).toBe('1 1/2');
    expect(formatQuantity(0.75)).toBe('3/4');
  });

  it('rounds other values to one decimal place', () => {
    expect(formatQuantity(1.3)).toBe('1.3');
    expect(formatQuantity(2.98)).toBe('3');
  });
});
