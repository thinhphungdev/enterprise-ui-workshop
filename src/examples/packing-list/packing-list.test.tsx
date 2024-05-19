import { render, screen, waitFor } from 'test/utilities';
import { PackingList } from '.';
import userEvent from '@testing-library/user-event';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByLabelText('New Item Name');
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemBtn = screen.getByRole('button', { name: 'Add New Item' });

  expect(newItemInput).toHaveValue('');
  expect(addNewItemBtn).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemBtn = screen.getByRole('button', { name: 'Add New Item' });

  const user = userEvent.setup();

  await user.type(newItemInput, 'hihi');

  expect(addNewItemBtn).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  render(<PackingList />);

  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemBtn = screen.getByRole('button', { name: 'Add New Item' });
  const user = userEvent.setup();

  await user.type(newItemInput, 'Macbook Pro M3');
  await user.click(addNewItemBtn);

  expect(screen.getByLabelText('Macbook Pro M3')).not.toBeChecked();
});

it('Remove an item', async () => {
  render(<PackingList />);

  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemBtn = screen.getByRole('button', { name: 'Add New Item' });
  const user = userEvent.setup();

  await user.type(newItemInput, 'Macbook Pro M3');
  await user.click(addNewItemBtn);

  const removeItem = screen.getByLabelText('Remove Macbook Pro M3');

  await user.click(removeItem);

  await waitFor(() => expect(removeItem).not.toBeInTheDocument());
});
