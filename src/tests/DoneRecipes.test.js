import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './mockMatchMedia';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../App';
import Provider from '../context/myProvider';

const doneRecipes = '/done-recipes';
window.matchMedia = jest.fn().mockImplementation(() => ({
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

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
    const { history } = renderWithRouterAndContext(<App />, doneRecipes);
    expect(history.location.pathname).toBe(doneRecipes);

    const buttonDrink = screen.getByRole('button', {
      name: /drinks/i,
    });
    const buttonMeals = screen.getByRole('button', {
      name: /meals/i,
    });
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonDrink).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();

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
  it('testa se o botão compartilhar funciona', async () => {
    renderWithRouterAndContext(<App />, doneRecipes);

    global.navigator.clipboard = { writeText: jest.fn() };

    const shareBtn2 = screen.getAllByTestId('share-btn');
    expect(shareBtn2[0]).toBeInTheDocument();

    act(() => {
      userEvent.click(shareBtn2[0]);
    });

    expect(navigator.clipboard.writeText)
      .toHaveBeenCalled();
  });
  waitFor(() => {
    expect(screen.queryByText('Link copied!')).toBeInTheDocument();
  });
});

it('testa se o botão all rendeniza os dois', async () => {
  renderWithRouterAndContext(<App />, doneRecipes);
  localStorage.setItem('doneRecipes', JSON.stringify([]));

  const loadingMessage = screen.getByText('Loading...');
  expect(loadingMessage).toBeInTheDocument();
});
