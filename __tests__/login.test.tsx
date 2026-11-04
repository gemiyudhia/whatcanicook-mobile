import { fireEvent, render, screen } from '@testing-library/react-native';
import { router } from 'expo-router';

import LoginScreen from '../src/app/login';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn(() => true),
  },
}));

describe('LoginScreen', () => {
  it('shows validation errors when submitting an empty form', async () => {
    await render(<LoginScreen />);

    await fireEvent.press(screen.getByText('Masuk ke Dapur Saya'));

    expect(await screen.findByText('Email wajib diisi')).toBeOnTheScreen();
    expect(screen.getByText('Kata sandi wajib diisi')).toBeOnTheScreen();
  });

  it('rejects an invalid email format', async () => {
    await render(<LoginScreen />);

    await fireEvent.changeText(screen.getByLabelText('Email'), 'nisa@');
    await fireEvent.changeText(
      screen.getByLabelText('Kata Sandi'),
      'rahasia123',
    );
    await fireEvent.press(screen.getByText('Masuk ke Dapur Saya'));

    expect(
      await screen.findByText('Format email tidak valid'),
    ).toBeOnTheScreen();
  });

  it('toggles password visibility', async () => {
    await render(<LoginScreen />);

    await fireEvent.press(screen.getByLabelText('Tampilkan kata sandi'));

    expect(screen.getByLabelText('Sembunyikan kata sandi')).toBeOnTheScreen();
  });

  it('switches to the register screen', async () => {
    await render(<LoginScreen />);

    await fireEvent.press(screen.getByText('Daftar Akun Sekarang'));

    expect(router.replace).toHaveBeenCalledWith('/register');
  });
});
