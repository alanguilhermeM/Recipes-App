import React from 'react';
import { Router } from 'react-router-dom';
import './mockMatchMedia';
import { createMemoryHistory } from 'history';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Provider from '../context/myProvider';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

window.matchMedia = jest.fn().mockImplementation(() => ({
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

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
const dataTestDrink = 'drinks-bottom-btn';
const dataTestMeals = 'meals-bottom-btn';
// const loading = 'Carregando...';

describe('Testes para o componente Footer', () => {
  it('Teste se renderiza um footer na page meals, com dois buttons', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/meals');
    expect(history.location.pathname).toBe('/meals');

    // await waitForElementToBeRemoved(() => screen.getByText(loading), { timeout: 10000 });

    expect(screen.getByTestId(dataTestDrink)).toBeDefined();
    expect(screen.getByTestId(dataTestMeals)).toBeDefined();
  });

  it('Teste se renderiza um footer na page drinks, com dois buttons', async () => {
    const { history } = renderWithRouterAndContext(<App />, '/drinks');
    expect(history.location.pathname).toBe('/drinks');

    // await waitForElementToBeRemoved(() => screen.getByText(loading), { timeout: 10000 });

    expect(screen.getByTestId(dataTestDrink)).toBeDefined();
    expect(screen.getByTestId(dataTestMeals)).toBeDefined();
  });

  it('Teste se renderiza um footer na page profile, com dois buttons', () => {
    const { history } = renderWithRouterAndContext(<App />, '/profile');
    expect(history.location.pathname).toBe('/profile');

    expect(screen.getByTestId(dataTestDrink)).toBeDefined();
    expect(screen.getByTestId(dataTestMeals)).toBeDefined();
  });

  it('Testa o funcionamento dos botões', async () => {
    renderWithRouter('/drinks');
    // await waitForElementToBeRemoved(() => screen.getByText(loading), { timeout: 10000 });
    userEvent.click(screen.getByTestId(dataTestMeals));
    // await waitForElementToBeRemoved(() => screen.getByText(loading), { timeout: 10000 });
    expect(screen.getByRole('heading', { name: /Meals/i })).toBeInTheDocument();

    userEvent.click(screen.getByTestId(dataTestDrink));
    // await waitForElementToBeRemoved(() => screen.getByText(loading), { timeout: 10000 });
    expect(screen.getByRole('heading', { name: /Drinks/i })).toBeInTheDocument();
  });
});
