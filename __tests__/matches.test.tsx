import { fireEvent, render, screen } from '@testing-library/react-native';

import MatchesScreen from '../src/app/(tabs)/matches';

jest.mock('expo-router', () => ({ router: { push: jest.fn() } }));

describe('MatchesScreen', () => {
  it('lists the matched recipes', async () => {
    await render(<MatchesScreen />);

    expect(
      screen.getByText('Tumis Kangkung Tempe Saus Tiram'),
    ).toBeOnTheScreen();
    expect(
      screen.getByText('Sambal Goreng Kentang Ati Gurih'),
    ).toBeOnTheScreen();
  });

  it('filters to ready-to-cook recipes', async () => {
    await render(<MatchesScreen />);

    await fireEvent.press(screen.getByText('100% Siap Masak (2)'));

    expect(
      screen.getByText('Omelet Tahu Daun Bawang Spesial'),
    ).toBeOnTheScreen();
    expect(
      screen.queryByText('Sambal Goreng Kentang Ati Gurih'),
    ).not.toBeOnTheScreen();
  });

  it('filters to recipes missing one ingredient', async () => {
    await render(<MatchesScreen />);

    await fireEvent.press(screen.getByText('Kurang 1 Bahan (2)'));

    expect(screen.getByText('Ayam Goreng Mentega Wijen')).toBeOnTheScreen();
    expect(
      screen.queryByText('Omelet Tahu Daun Bawang Spesial'),
    ).not.toBeOnTheScreen();
  });

  it('toggles a recipe as saved', async () => {
    await render(<MatchesScreen />);

    await fireEvent.press(
      screen.getByLabelText('Simpan Ayam Goreng Mentega Wijen'),
    );

    expect(
      screen.getByLabelText('Hapus Ayam Goreng Mentega Wijen dari tersimpan'),
    ).toBeOnTheScreen();
  });
});
