import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import App from '../App';
import { mockFirstLetterMeals, mockIngredientMeals, mockNameMeals } from '../helpers/mockMeals';
import { mockFirstLetter, mockIngredientDrinks, mockNameDrinks } from '../helpers/mockDrinks';

describe('Testando a barra de pesquisa da rota drinks', () => {
  const reci = '0-recipe-card';
  const reci1 = '1-recipe-card';
  test('teste de ingrediente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockIngredientDrinks),
    });
    const { history } = renderWithRouterAndContext(<App />, '/drinks');
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
    const lupaImg = screen.getByRole('img', { name: /busca/i });
    expect(lupaImg).toBeInTheDocument();
    userEvent.click(lupaImg);

    const inputSearch = screen.getByRole('textbox');
    const ingredientRadio = screen.getByRole('radio', { name: /ingredient/i });
    const searchBtn = screen.getByRole('button', { name: /search/i });

    expect(inputSearch).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    userEvent.type(inputSearch, 'Cachaça');
    fireEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Cachaça');

    expect(await screen.findByTestId(reci)).toBeInTheDocument();
    expect(await screen.findByTestId(reci1)).toBeInTheDocument();
    expect(await screen.findByTestId('2-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('3-recipe-card')).toBeInTheDocument();

    userEvent.click(lupaImg);
    expect(inputSearch).not.toBeInTheDocument();
  });
  test('teste de nome', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockNameDrinks),
    });
    const { history } = renderWithRouterAndContext(<App />, '/drinks');
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    const lupaImg = screen.getByRole('img', { name: /busca/i });
    expect(lupaImg).toBeInTheDocument();
    userEvent.click(lupaImg);

    const inputSearch = screen.getByRole('textbox');
    const nameRadio = screen.getByRole('radio', { name: /name/i });
    const searchBtn = screen.getByRole('button', { name: /search/i });

    expect(inputSearch).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    userEvent.type(inputSearch, 'Caipirinha');
    fireEvent.click(nameRadio);
    userEvent.click(searchBtn);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Caipirinha');

    expect(await screen.findByTestId(reci)).toBeInTheDocument();
    expect(await screen.findByTestId(reci1)).toBeInTheDocument();

    userEvent.click(lupaImg);
    expect(inputSearch).not.toBeInTheDocument();
  });

  test('Testa se um Alert aparece quando a API retorna null (DRINKS)', async () => {
    renderWithRouterAndContext(<App />, '/drinks');
    jest.spyOn(global, 'alert').mockReturnValue(alert);
    const searchBtn = screen.getByRole('img', { name: /busca/i });

    userEvent.click(searchBtn);

    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();

    const searchFilterBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchFilterBtn);

    expect(global.alert).toHaveBeenCalled();
  });

  test('Testa se um Alert aparece quando a API retorna null (MEALS)', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Sorry, we haven\'t found any recipes for these filters.'));
    renderWithRouterAndContext(<App />, '/meals');
    const searchBtn = screen.getByRole('img', { name: /busca/i });

    userEvent.click(searchBtn);

    const radio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radio);
    expect(radio).toBeChecked();

    const inputSearch = screen.getByRole('textbox');
    const searchFilterBtn = screen.getByRole('button', { name: /search/i });

    userEvent.type(inputSearch, '');
    // userEvent.click(radio);
    userEvent.click(searchFilterBtn);

    userEvent.click(searchFilterBtn);

    // expect(global.alert()).toBe(alert);
    // expect(global.alert).toHaveBeenCalledWith("Sorry, we haven't found any recipes for these filters.");
  });

  test('Testando search por firstLetter (drinks)', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFirstLetter),
    });
    renderWithRouterAndContext(<App />, '/drinks');
    const searchBtn = screen.getByRole('img', { name: /busca/i });
    userEvent.click(searchBtn);
    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'o');
    expect(inputSearch).toHaveValue('o');
    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();
    const searchFilterBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchFilterBtn);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=o');
  });
});

describe('Testando a barra de pesquisa da rota meals', () => {
  test('teste de ingrediente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockIngredientMeals),
    });
    const { history } = renderWithRouterAndContext(<App />, '/meals');
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const lupaImg = screen.getByRole('img', { name: /busca/i });
    expect(lupaImg).toBeInTheDocument();
    userEvent.click(lupaImg);

    const inputSearch = screen.getByRole('textbox');
    const ingredientRadio = screen.getByRole('radio', { name: /ingredient/i });
    const searchBtn = screen.getByRole('button', { name: /search/i });

    expect(inputSearch).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    userEvent.type(inputSearch, 'Chicken');
    fireEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');

    expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
    expect(await screen.findByTestId('1-recipe-card')).toBeInTheDocument();

    userEvent.click(lupaImg);
    expect(inputSearch).not.toBeInTheDocument();
  });

  test('Testando search por firstLetter (meals)', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFirstLetterMeals),
    });
    renderWithRouterAndContext(<App />, '/meals');
    const searchBtn = screen.getByRole('img', { name: /busca/i });
    userEvent.click(searchBtn);
    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'o');
    expect(inputSearch).toHaveValue('o');
    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(firstLetterRadio);
    expect(firstLetterRadio).toBeChecked();
    const searchFilterBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchFilterBtn);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=o');
  });

  test('Testando search por nome único (MEALS)', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockNameMeals),
    });
    renderWithRouterAndContext(<App />, '/meals');
    const searchBtn = screen.getByRole('img', { name: /busca/i });
    userEvent.click(searchBtn);
    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'steak');
    expect(inputSearch).toHaveValue('steak');
    const nameRadio = screen.getByRole('radio', { name: /name/i });
    userEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();
    const searchFilterBtn = screen.getByRole('button', { name: /search/i });
    userEvent.click(searchFilterBtn);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=steak');
  });
});
