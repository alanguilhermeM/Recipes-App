import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import App from '../App';
import Provider from '../context/myProvider';

describe('Tests for "DoneRecipes" page', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    history.push('/done-recipes');
    render(
      <Router history={ history }>
        <Provider>
          <App />
        </Provider>
      </Router>,
    );
  });

  it('Tests the filter ', () => {
    const filters = ['All', 'Meal', 'Drink'];
    filters.forEach((filter) => {
      const filterButton = screen.getByText(filter);
      expect(filterButton).toBeInTheDocument();
    });
  });

  it('Tests the rendering of recipes', () => {
    mockDoneRecipes.forEach((recipe) => {
      const recipeItem = screen.getByText(recipe.strMeal || recipe.strDrink);
      expect(recipeItem).toBeInTheDocument();
    });
  });

  it('Tests the filtering of recipes', () => {
    const mealsButton = screen.getByText(/meal/i);
    act(() => {
      userEvent.click(mealsButton);
    });

    const drinkRecipe = screen.queryByText(/aquamarine/i);
    expect(drinkRecipe).not.toBeInTheDocument();

    const mealRecipe = screen.getByText(/spicy/i);
    expect(mealRecipe).toBeInTheDocument();
  });
});
