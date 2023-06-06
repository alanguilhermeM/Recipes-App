import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Provider from '../context/myProvider';
import App from '../App';

const renderWithRouterAndContext = (component, path = '/') => {
  const history = createMemoryHistory({ initialEntries: [path] });
  return ({
    ...render(
      <Provider>
        <Router history={ history }>
          {component}
        </Router>
      </Provider>,
    ),
    history,
  });
};

describe('Testes para a página Profile', () => {
  it('Teste se renderiza um email e os botões de redirecionamento', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');
    expect(history.location.pathname).toBe('/profile');

    expect(screen.getByRole('button', { name: /done recipes/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /favorite recipes/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /logout/i })).toBeDefined();
  });

  it('Teste se ao clicar no button Done Recipes é redirecionando para a page correta', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');
    expect(history.location.pathname).toBe('/profile');

    const btnDone = screen.getByRole('button', { name: /done recipes/i });
    expect(screen.getByRole('button', { name: /done recipes/i })).toBeDefined();
    userEvent.click(btnDone);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Teste se ao clicar no button Favorite recipes é redirecionando para a page correta', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');
    expect(history.location.pathname).toBe('/profile');

    const btnFav = screen.getByRole('button', { name: /favorite recipes/i });
    expect(screen.getByRole('button', { name: /done recipes/i })).toBeDefined();
    userEvent.click(btnFav);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Teste se ao clicar no button Logout é redirecionando para a page correta', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');
    expect(history.location.pathname).toBe('/profile');

    const btnLogout = screen.getByRole('button', { name: /logout/i });
    expect(screen.getByRole('button', { name: /done recipes/i })).toBeDefined();
    userEvent.click(btnLogout);
    expect(history.location.pathname).toBe('/');
  });
});
