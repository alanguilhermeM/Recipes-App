import { screen } from '@testing-library/react';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import App from '../App';

describe('Testando a página Recipe In Progress', () => {
  it('Botões', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/drinks/15997/in-progress');

    expect(history.location.pathname).toBe('/drinks/15997/in-progress');

    await screen.findByTestId('recipe-photo');

    expect(screen.getByRole('button', { name: /fav/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /compartilhar/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /finalizar receita/i })).toBeDisabled();
  });
});
