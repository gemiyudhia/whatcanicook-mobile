import { fireEvent, render, screen } from '@testing-library/react-native';

import { FilterChips } from '../src/components/FilterChips';

const options = [
  { value: 'all', label: 'Semua (3)' },
  { value: 'daily', label: 'Harian (2)' },
];

describe('FilterChips', () => {
  it('renders every option', async () => {
    await render(
      <FilterChips options={options} selected="all" onSelect={jest.fn()} />,
    );

    expect(screen.getByText('Semua (3)')).toBeOnTheScreen();
    expect(screen.getByText('Harian (2)')).toBeOnTheScreen();
  });

  it('calls onSelect with the pressed option value', async () => {
    const onSelect = jest.fn();
    await render(
      <FilterChips options={options} selected="all" onSelect={onSelect} />,
    );

    await fireEvent.press(screen.getByText('Harian (2)'));

    expect(onSelect).toHaveBeenCalledWith('daily');
  });
});
