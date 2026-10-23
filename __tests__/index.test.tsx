import { render, screen } from '@testing-library/react-native';

import HomeScreen from '../src/app/index';

describe('HomeScreen', () => {
  it('renders the app title and tagline', async () => {
    await render(<HomeScreen />);

    expect(screen.getByText('WhatCanICook')).toBeOnTheScreen();
    expect(
      screen.getByText('Cook with what you already have.'),
    ).toBeOnTheScreen();
  });
});
