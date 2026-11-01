import { fireEvent, render, screen } from '@testing-library/react-native';
import { useLocalSearchParams } from 'expo-router';

import RecipeDetailScreen from '../src/app/recipe/[id]';

jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
    canGoBack: jest.fn(() => true),
    replace: jest.fn(),
  },
  useLocalSearchParams: jest.fn(),
}));

const mockedParams = jest.mocked(useLocalSearchParams);

describe('RecipeDetailScreen', () => {
  beforeEach(() => {
    mockedParams.mockReturnValue({ id: '1' });
  });

  it('shows the recipe, its ingredients and steps', async () => {
    await render(<RecipeDetailScreen />);

    expect(
      screen.getByText('Tumis Kangkung Tempe Gurih Pedas'),
    ).toBeOnTheScreen();
    expect(screen.getByText('Bawang Putih')).toBeOnTheScreen();
    expect(screen.getByText('Tumis Bumbu Aromatik')).toBeOnTheScreen();
    expect(screen.getByText('Semua Siap')).toBeOnTheScreen();
  });

  it('scales ingredient quantities when servings change', async () => {
    await render(<RecipeDetailScreen />);

    expect(screen.getByText('4 siung')).toBeOnTheScreen();

    await fireEvent.press(screen.getByLabelText('Tambah porsi'));

    expect(screen.getByText('3 Orang')).toBeOnTheScreen();
    expect(screen.getByText('6 siung')).toBeOnTheScreen();
    expect(screen.getByText('1 1/2 ikat')).toBeOnTheScreen();
  });

  it('does not go below one serving', async () => {
    await render(<RecipeDetailScreen />);

    await fireEvent.press(screen.getByLabelText('Kurangi porsi'));
    await fireEvent.press(screen.getByLabelText('Kurangi porsi'));

    expect(screen.getByText('1 Orang')).toBeOnTheScreen();
  });

  it('marks a step as done', async () => {
    await render(<RecipeDetailScreen />);

    const checkbox = screen.getByLabelText('Tandai langkah 1 selesai');
    expect(checkbox).not.toBeChecked();

    await fireEvent.press(checkbox);

    expect(screen.getByLabelText('Tandai langkah 1 selesai')).toBeChecked();
  });

  it('shows a not found message for an unknown recipe', async () => {
    mockedParams.mockReturnValue({ id: 'unknown' });

    await render(<RecipeDetailScreen />);

    expect(screen.getByText('Resep tidak ditemukan.')).toBeOnTheScreen();
  });
});
