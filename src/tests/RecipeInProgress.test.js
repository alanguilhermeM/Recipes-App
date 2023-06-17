import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../helpers/renderWithRouterAndContext';
import App from '../App';
import { mockData } from './mockData';

const path = '/drinks/15997/in-progress';
describe('Testando a página Recipe In Progress', () => {
  const { history } = renderWithRouterAndContext(<App />, path);
  beforeEach(() => {
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('Botões', async () => {
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
    await screen.findByTestId('recipe-photo');
    expect(screen.getByRole('button', { name: /fav/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /compartilhar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /finalizar receita/i })).toBeDisabled();
    const favoriteButton = screen.getByTestId('favorite-btn');
    expect(favoriteButton.src).toContain('whiteHeartIcon.svg');
    userEvent.click(favoriteButton);
    expect(favoriteButton.src).toContain('blackHeartIcon.svg');
    userEvent.click(favoriteButton);
    expect(favoriteButton.src).toContain('whiteHeartIcon.svg');
  });
  it('verifica o checkbox', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndContext(<App />, path);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
    const checkboxes = await screen.findByRole('checkbox', {
      name: /galliano/i,
    });
    const button = screen.getByRole('button', { name: /finalizar receita/i });
    expect(button).toBeDisabled();
    expect(checkboxes).toBeInTheDocument();
    expect(checkboxes.checked).toBe(false);
    userEvent.click(checkboxes);
    expect(checkboxes.checked).toBe(true);
    expect(button).toBeInTheDocument();
    userEvent.click(button);
  });
  /*  it('testa se o botão compartilhar funciona', async () => {
    renderWithRouterAndContext(<App />, path);
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
  }); */
});
