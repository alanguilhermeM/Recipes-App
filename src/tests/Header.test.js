import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testando o componentes de Header', () => {
  test('Testando o Header no Profile', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    expect(history.location.pathname).toBe('/profile');
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /profile/i })).toBeInTheDocument();
  });
});
