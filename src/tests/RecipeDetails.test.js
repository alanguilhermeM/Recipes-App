import { screen } from '@testing-library/react';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import './mockMatchMedia';
import App from '../App';
import { mockDetailsMeals } from '../helpers/mockMeals';

describe('teste', () => {
  test('teste', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDetailsMeals),
    });

    window.matchMedia = jest.fn().mockImplementation(() => ({
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));

    renderWithRouterAndContext(<App />, '/meals/53060');

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=53060');

    expect(await screen.findByRole('img', { name: /img/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /burek/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /side/i })).toBeInTheDocument();
    expect(await screen.findByText(/filo pastry - 1 packet/i)).toBeInTheDocument();
    expect(await screen.findByText(/filo pastry - 1 packet/i)).toBeInTheDocument();
  });
});
