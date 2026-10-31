import { fireEvent, render, screen } from '@testing-library/react-native';

import ProfileScreen from '../src/app/(tabs)/profile';

describe('ProfileScreen', () => {
  it('shows the user and their stats', async () => {
    await render(<ProfileScreen />);

    expect(screen.getByText('Nisa Pratiwi')).toBeOnTheScreen();
    expect(screen.getByText('NP')).toBeOnTheScreen();
    expect(screen.getByText('24')).toBeOnTheScreen();
    expect(screen.getByText('Resep Dimasak')).toBeOnTheScreen();
  });

  it('removes an avoided ingredient and updates the count', async () => {
    await render(<ProfileScreen />);

    expect(screen.getByText('2 Pantangan')).toBeOnTheScreen();

    await fireEvent.press(
      screen.getByLabelText('Hapus Kacang Tanah dari daftar pantangan'),
    );

    expect(screen.queryByText('Kacang Tanah')).not.toBeOnTheScreen();
    expect(screen.getByText('1 Pantangan')).toBeOnTheScreen();
  });

  it('lists the app settings', async () => {
    await render(<ProfileScreen />);

    expect(screen.getByText('Daftar Belanjaan Otomatis')).toBeOnTheScreen();
    expect(screen.getByText('Tentang WhatCanICook')).toBeOnTheScreen();
  });
});
