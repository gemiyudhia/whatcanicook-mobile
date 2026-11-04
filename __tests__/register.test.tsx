import { fireEvent, render, screen } from '@testing-library/react-native';
import { router } from 'expo-router';

import RegisterScreen from '../src/app/register';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn(() => true),
  },
}));

describe('RegisterScreen', () => {
  it('shows validation errors when submitting an empty form', async () => {
    await render(<RegisterScreen />);

    await fireEvent.press(screen.getByText('Daftar & Mulai Masak'));

    expect(
      await screen.findByText('Nama minimal 2 karakter'),
    ).toBeOnTheScreen();
    expect(screen.getByText('Email wajib diisi')).toBeOnTheScreen();
    expect(screen.getByText('Kata sandi minimal 8 karakter')).toBeOnTheScreen();
  });

  it('requires a digit in the password', async () => {
    await render(<RegisterScreen />);

    await fireEvent.changeText(
      screen.getByLabelText('Nama Lengkap'),
      'Nisa Pratiwi',
    );
    await fireEvent.changeText(
      screen.getByLabelText('Alamat Email'),
      'nisa@email.com',
    );
    await fireEvent.changeText(
      screen.getByLabelText('Kata Sandi'),
      'abcdefghi',
    );
    await fireEvent.press(screen.getByText('Daftar & Mulai Masak'));

    expect(
      await screen.findByText('Kata sandi harus mengandung angka'),
    ).toBeOnTheScreen();
  });

  it('switches to the login screen', async () => {
    await render(<RegisterScreen />);

    await fireEvent.press(screen.getByText('Masuk di Sini'));

    expect(router.replace).toHaveBeenCalledWith('/login');
  });
});
