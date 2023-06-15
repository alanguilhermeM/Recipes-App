import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../App';
import Provider from '../context/myProvider';

describe('Tests for "DoneRecipes" page', () => {
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

  it('Testa se renderiza os botões de filtro', () => {
    const { history } = renderWithRouterAndContext(<App />, '/done-recipes');
    expect(history.location.pathname).toBe('/done-recipes');

    const buttonDrink = screen.getByRole('button', {
      name: /drinks/i,
    });
    const buttonMeals = screen.getByRole('button', {
      name: /meals/i,
    });
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });

    userEvent.click(buttonDrink);
    const drinkName = screen.getByText(/aquamarine/i);
    expect(drinkName).toBeInTheDocument();

    userEvent.click(buttonMeals);
    const mealsName = screen.getByText(/spicy arrabiata penne/i);
    expect(mealsName).toBeInTheDocument();

    userEvent.click(buttonAll);
    expect(drinkName).toBeInTheDocument();
    expect(mealsName).toBeInTheDocument();
  });
});
