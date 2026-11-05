import { fireEvent, render, screen } from '@testing-library/react-native';

import SavedScreen from '../src/app/(tabs)/saved';

jest.mock('expo-router', () => ({ router: { push: jest.fn() } }));

describe('SavedScreen', () => {
  it('lists the saved recipes', async () => {
    await render(<SavedScreen />);

    expect(screen.getByText('Ayam Kecap Mentega Rumahan')).toBeOnTheScreen();
    expect(screen.getByText('Semua Bahan Tersedia (5/5)')).toBeOnTheScreen();
  });

  it('filters by category', async () => {
    await render(<SavedScreen />);

    await fireEvent.press(screen.getByText('Sarapan Kilat (1)'));

    expect(screen.getByText('Tahu Telur Bumbu Kacang Jawa')).toBeOnTheScreen();
    expect(
      screen.queryByText('Ayam Kecap Mentega Rumahan'),
    ).not.toBeOnTheScreen();
  });

  it('searches by title', async () => {
    await render(<SavedScreen />);

    await fireEvent.changeText(
      screen.getByPlaceholderText('Cari di resep tersimpan...'),
      'sambal',
    );

    expect(screen.getByText('Sambal Goreng Kentang Pedas')).toBeOnTheScreen();
    expect(
      screen.queryByText('Tumis Kangkung Tempe Gurih'),
    ).not.toBeOnTheScreen();
  });

  it('removes a recipe from saved', async () => {
    await render(<SavedScreen />);

    await fireEvent.press(
      screen.getByLabelText('Hapus Ayam Kecap Mentega Rumahan dari tersimpan'),
    );

    expect(
      screen.queryByText('Ayam Kecap Mentega Rumahan'),
    ).not.toBeOnTheScreen();
    expect(screen.getByText('Semua (3)')).toBeOnTheScreen();
  });
});
