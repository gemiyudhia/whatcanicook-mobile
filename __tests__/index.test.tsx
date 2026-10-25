import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';

import HomeScreen from '../src/app/index';
import { getHealth } from '../src/lib/api';

jest.mock('../src/lib/api');

const mockedGetHealth = jest.mocked(getHealth);

async function renderHome() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  await render(
    <QueryClientProvider client={client}>
      <HomeScreen />
    </QueryClientProvider>,
  );
}

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('shows the title, tagline and a loading state while connecting', async () => {
    mockedGetHealth.mockReturnValue(new Promise(() => {}));

    await renderHome();

    expect(screen.getByText('WhatCanICook')).toBeOnTheScreen();
    expect(
      screen.getByText('Cook with what you already have.'),
    ).toBeOnTheScreen();
    expect(screen.getByText('Connecting to API...')).toBeOnTheScreen();
  });

  it('shows a success message when the API responds', async () => {
    mockedGetHealth.mockResolvedValue({ status: 'ok' });

    await renderHome();

    expect(await screen.findByText('API connected')).toBeOnTheScreen();
  });

  it('shows an error and a retry button when the API is unreachable', async () => {
    mockedGetHealth.mockRejectedValue(new Error('Cannot reach the server.'));

    await renderHome();

    expect(await screen.findByText('Cannot connect to API')).toBeOnTheScreen();
    expect(screen.getByText('Cannot reach the server.')).toBeOnTheScreen();
    expect(screen.getByText('Try again')).toBeOnTheScreen();
  });

  it('recovers when the user retries', async () => {
    mockedGetHealth
      .mockRejectedValueOnce(new Error('Cannot reach the server.'))
      .mockResolvedValueOnce({ status: 'ok' });

    await renderHome();
    await screen.findByText('Cannot connect to API');

    await fireEvent.press(screen.getByText('Try again'));

    expect(await screen.findByText('API connected')).toBeOnTheScreen();
  });
});
