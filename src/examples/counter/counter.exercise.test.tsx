// @vitest-environment happy-dom

import { screen } from '@testing-library/react';
import Counter from '.';
import { render } from 'test/utilities';

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  render(<Counter initialCount={2024} />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount).toHaveTextContent('2024');
});

test('it should reset the count when the "Reset" button is pressed', async () => {
  const { user } = render(<Counter initialCount={666} />);

  const currentCount = screen.getByTestId('current-count');
  const resetBtn = screen.getByRole('button', { name: 'Reset' });
  const incrementButton = screen.getByRole('button', { name: /increment/i });

  await user.click(incrementButton);
  await user.click(incrementButton);
  await user.click(incrementButton);

  await user.click(resetBtn);

  expect(currentCount).toHaveTextContent('0');
});
