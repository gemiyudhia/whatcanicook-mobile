const FRACTIONS: [number, string][] = [
  [0.25, '1/4'],
  [1 / 3, '1/3'],
  [0.5, '1/2'],
  [2 / 3, '2/3'],
  [0.75, '3/4'],
];

export const scaleQuantity = (
  quantity: number,
  baseServings: number,
  servings: number,
) => (baseServings > 0 ? (quantity * servings) / baseServings : quantity);

export function formatQuantity(value: number) {
  const whole = Math.floor(value);
  const rest = value - whole;
  if (rest < 0.05) return String(whole);

  const match = FRACTIONS.find(
    ([fraction]) => Math.abs(fraction - rest) < 0.02,
  );
  if (match) return whole > 0 ? `${whole} ${match[1]}` : match[1];

  return String(Math.round(value * 10) / 10);
}
