import { render, screen } from '@testing-library/react-native';

import HomeScreen from '../src/app/(tabs)/index';

describe('HomeScreen', () => {
  it('shows the greeting and the tagline', async () => {
    await render(<HomeScreen />);

    expect(
      screen.getByText('Apa yang ingin kamu masak hari ini?'),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(
        'Temukan ide lezat dari bahan yang sudah tersedia rapi di dapurmu.',
      ),
    ).toBeOnTheScreen();
  });

  it('shows the pantry card with its ingredients', async () => {
    await render(<HomeScreen />);

    expect(screen.getByText('Pantry Tersedia')).toBeOnTheScreen();
    expect(screen.getByText('Telur (4 butir)')).toBeOnTheScreen();
    expect(screen.getByText('Resep Cocok (12)')).toBeOnTheScreen();
  });

  it('lists the recommended recipes', async () => {
    await render(<HomeScreen />);

    expect(screen.getByText('Tumis Kangkung Tempe Gurih')).toBeOnTheScreen();
    expect(screen.getByText('100% Cocok (Semua bahan ada)')).toBeOnTheScreen();
  });
});
