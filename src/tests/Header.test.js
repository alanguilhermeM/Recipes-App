import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './mockMatchMedia';
import renderWithRouter from '../helpers/renderWithRouter';

window.matchMedia = jest.fn().mockImplementation(() => ({
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

describe('Testando o componentes de Header', () => {
  test('Testando o Header no Profile', () => {
    const { history } = renderWithRouter('/profile');
    expect(history.location.pathname).toBe('/profile');
    expect(screen.getByRole('img', { name: /profile/i })).toBeInTheDocument();
  });

  test('Testando o header na rota meals', async () => {
    renderWithRouter('/meals');
    await waitForElementToBeRemoved(() => screen.getByText('Carregando...'), { timeout: 10000 });
    const buttonPesquisa = screen.getByRole('img', { name: /busca/i });
    expect(buttonPesquisa).toBeInTheDocument();

    userEvent.click(buttonPesquisa);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});

// ok
