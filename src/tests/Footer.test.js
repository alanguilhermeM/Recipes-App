import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen, render } from '@testing-library/react';
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

describe('Testes para o componente Footer', () => {
  const btnMeals = screen.getByTestId('meals-bottom-btn');
  const btnDrinks = screen.getByTestId('drinks-bottom-btn');

  it('Teste se renderiza um footer na page meals, com dois buttons', () => {
    const { history } = renderWithRouterAndContext(<App />, '/meals');
    expect(history.location.pathname).toBe('/meals');

    expect(btnDrinks).toBeDefined();
    expect(btnMeals).toBeDefined();
  });

  it('Teste se renderiza um footer na page drinks, com dois buttons', () => {
    const { history } = renderWithRouterAndContext(<App />, '/drinks');
    expect(history.location.pathname).toBe('/drinks');

    expect(btnDrinks).toBeDefined();
    expect(btnMeals).toBeDefined();
  });

  it('Teste se renderiza um footer na page profile, com dois buttons', () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');
    expect(history.location.pathname).toBe('/profile');

    expect(btnDrinks).toBeDefined();
    expect(btnMeals).toBeDefined();
  });
});
