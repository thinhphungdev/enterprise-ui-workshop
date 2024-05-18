// @vitest-environment happy-dom

import { screen } from '@testing-library/react';
import Counter from '.';

import { render } from './test/utilities';

test('it should render the component', () => {
  render(<Counter />);
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount.textContent).toBe('0');

  const incrementBtn = screen.getByRole('button', { name: 'Increment' });
  // fireEvent.click(incrementBtn);
  await user.click(incrementBtn);
  expect(currentCount.textContent).toBe('1');
});
