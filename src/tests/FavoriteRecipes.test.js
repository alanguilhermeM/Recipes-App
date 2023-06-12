import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
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

describe('Teste para a tela de Receitas Favoritas', () => {
  const path = '/favorite-recipes';
  const testIdImg = '0-horizontal-image';
  const testIdName = '0-horizontal-top-text';
  const favorites = [
    {
      id: 17222,
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'A1',
      image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    },
    {
      id: 52977,
      type: 'meal',
      nationality: 'Turkish',
      category: 'Side',
      alcoholicOrNot: '',
      name: 'Corba',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
  ];
  localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));

  it('Testa se renderiza os botões de filtro', () => {
    const { history } = renderWithRouterAndContext(<App />, path);
    expect(history.location.pathname).toBe('/favorite-recipes');

    screen.getByRole('button', { name: /all/i });
    screen.getByRole('button', { name: /meals/i });
    screen.getByRole('button', { name: /drinks/i });
  });

  it('Testa se renderia os cards das receitas favoritas', async () => {
    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(favorites));
    renderWithRouterAndContext(<App />, path);

    expect(localStorage.getItem).toHaveBeenCalled();

    const imgFavorite1 = screen.getByTestId(testIdImg);
    expect(imgFavorite1).toHaveAttribute('src', favorites[0].image);

    const nameFavorite1 = screen.getByTestId(testIdName);
    expect(nameFavorite1).toBeDefined();

    const imgFavorite2 = screen.getByTestId('1-horizontal-image');
    expect(imgFavorite2).toHaveAttribute('src', favorites[1].image);

    const nameFavorite2 = screen.getByTestId('1-horizontal-top-text');
    expect(nameFavorite2).toBeDefined();
  });

  it('Testa se é possivel remover uma receita da lista de favoritos', async () => {
    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(favorites));
    renderWithRouterAndContext(<App />, path);
    expect(localStorage.getItem).toHaveBeenCalled();

    const imgFavorite1 = screen.getByTestId(testIdImg);
    expect(imgFavorite1).toHaveAttribute('src', favorites[0].image);

    const btnFav = screen.getAllByTestId('0-horizontal-favorite-btn')[0];
    userEvent.click(btnFav);
    // terminar esse.
  });

  it('Testa se é possivel filtrar uma receita pelo button meals', async () => {
    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(favorites));
    renderWithRouterAndContext(<App />, path);
    expect(localStorage.getItem).toHaveBeenCalled();

    const btnFilterMeal = screen.getByRole('button', { name: /meals/i });

    const nameFavorite1 = screen.getByTestId(testIdName);
    expect(nameFavorite1).toBeDefined();

    userEvent.click(btnFilterMeal);

    await waitFor(async () => {
      const favoriteElement = screen.queryByTestId(testIdName);
      expect(favoriteElement).toEqual(nameFavorite1);
    }, { timeout: 3000 });
  });

  it('Testa se é possivel filtrar uma receita pelo button drinks', async () => {
    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(favorites));
    renderWithRouterAndContext(<App />, path);
    expect(localStorage.getItem).toHaveBeenCalled();

    const btnFilterDrinks = screen.getByRole('button', { name: /drinks/i });

    const nameFavorite1 = screen.getByTestId(testIdName);
    expect(nameFavorite1).toBeDefined();

    userEvent.click(btnFilterDrinks);

    await waitFor(async () => {
      const favoriteElement = screen.queryByTestId(testIdName);
      expect(favoriteElement).toEqual(nameFavorite1);
    }, { timeout: 3000 });
  });

  it('Testa se ao clicar no button All se volta todos os favoritos', async () => {
    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(favorites));
    renderWithRouterAndContext(<App />, path);
    expect(localStorage.getItem).toHaveBeenCalled();

    const btnFilterDrinks = screen.getByRole('button', { name: /drinks/i });
    const btnFilterAll = screen.getByRole('button', { name: /all/i });

    const nameFavorite1 = screen.getByTestId(testIdName);
    expect(nameFavorite1).toBeDefined();

    userEvent.click(btnFilterDrinks);

    await waitFor(async () => {
      const favoriteElement = screen.queryByTestId(testIdName);
      expect(favoriteElement).toEqual(nameFavorite1);
    }, { timeout: 3000 });

    userEvent.click(btnFilterAll);

    await waitFor(async () => {
      const imgFavorite1 = screen.getByTestId(testIdImg);
      expect(imgFavorite1).toHaveAttribute('src', favorites[0].image);

      const nameFavorite01 = screen.getByTestId('0-horizontal-top-text');
      expect(nameFavorite01).toBeDefined();

      const imgFavorite2 = screen.getByTestId('1-horizontal-image');
      expect(imgFavorite2).toHaveAttribute('src', favorites[1].image);

      const nameFavorite2 = screen.getByTestId('1-horizontal-top-text');
      expect(nameFavorite2).toBeDefined();
    }, { timeout: 3000 });
  });
});
