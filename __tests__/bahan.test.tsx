import { fireEvent, render, screen } from '@testing-library/react-native';

import BahanScreen from '../src/app/(tabs)/bahan';

const PLACEHOLDER = 'Cari bahan, misalnya kentang atau potato';

describe('BahanScreen', () => {
  it('finds an ingredient by its English name', async () => {
    await render(<BahanScreen />);

    await fireEvent.changeText(
      screen.getByPlaceholderText(PLACEHOLDER),
      'garlic',
    );

    expect(screen.getByText('Bawang Putih')).toBeOnTheScreen();
    expect(screen.queryByText('Telur Ayam')).not.toBeOnTheScreen();
  });

  it('shows an empty message when nothing matches', async () => {
    await render(<BahanScreen />);

    await fireEvent.changeText(screen.getByPlaceholderText(PLACEHOLDER), 'zzz');

    expect(screen.getByText('Bahan tidak ditemukan.')).toBeOnTheScreen();
  });

  it('filters the list by category', async () => {
    await render(<BahanScreen />);

    await fireEvent.press(screen.getByText('Protein & Nabati (2)'));

    expect(screen.getByText('Tempe')).toBeOnTheScreen();
    expect(screen.queryByText('Kangkung')).not.toBeOnTheScreen();
  });

  it('changes the quantity with the plus and minus buttons', async () => {
    await render(<BahanScreen />);

    expect(screen.getByText('6 siung')).toBeOnTheScreen();

    await fireEvent.press(screen.getByLabelText('Tambah Bawang Putih'));
    expect(screen.getByText('7 siung')).toBeOnTheScreen();

    await fireEvent.press(screen.getByLabelText('Kurangi Bawang Putih'));
    await fireEvent.press(screen.getByLabelText('Kurangi Bawang Putih'));
    expect(screen.getByText('5 siung')).toBeOnTheScreen();
  });

  it('does not let the quantity drop below one step', async () => {
    await render(<BahanScreen />);

    await fireEvent.press(screen.getByLabelText('Kurangi Tempe'));

    expect(screen.getByText('1 papan')).toBeOnTheScreen();
  });

  it('removes an ingredient and updates the stock count', async () => {
    await render(<BahanScreen />);

    await fireEvent.press(screen.getByLabelText('Hapus Bawang Putih'));

    expect(screen.queryByText('Bawang Putih')).not.toBeOnTheScreen();
    expect(screen.getByText('Semua (7)')).toBeOnTheScreen();
  });
});
