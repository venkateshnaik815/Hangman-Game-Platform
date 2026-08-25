import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hangman game title', () => {
  render(<App />);
  const linkElement = screen.getByText(/HANGMAN GAME/i);
  expect(linkElement).toBeInTheDocument();
});
