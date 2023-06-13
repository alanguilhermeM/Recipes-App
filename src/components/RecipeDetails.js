import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchApi, fetchRecomendations } from '../helpers/api';
import MyContext from '../context/myContext';
import RecomendationsCard from './RecomendationsCard';

export default function RecipeDetails() {
  const { location } = useHistory();
  const { pathname } = location;
  const [path, setPath] = useState(true);
  const [meal, setMeal] = useState([]);
  const [drink, setDrink] = useState([]);
  const { setRecomendations } = useContext(MyContext);

  async function returnApi() {
    const n = 6;
    const recomend = await fetchRecomendations(pathname);
    const recomendArray = Object.values(recomend);
    const recomendSlice = recomendArray[0].slice(0, n);
    setRecomendations(recomendSlice);
  }
  useEffect(() => {
    fetchApi(pathname, setMeal, setDrink, setPath);
    returnApi();
  }, [pathname]);

  const renderIngredients = (item) => {
    const ingredients = [];
    const n = 20;
    for (let i = 1; i <= n; i += 1) {
      const ingredient = item[`strIngredient${i}`];
      const measure = item[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '' && measure && measure.trim() !== '') {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure.trim(),
        });
      }
    }

    return (
      ingredients.length > 0
      && ingredients.map((ingredient, ingredientIndex) => (
        <p
          key={ ingredientIndex }
          data-testid={ `${ingredientIndex}-ingredient-name-and-measure` }
        >
          {ingredient.ingredient}
          {' '}
          -
          {' '}
          {ingredient.measure}
        </p>
      ))
    );
  };

  const renderMealDetails = () => meal.map((mealItem) => (
    <div key={ mealItem.idMeal }>
      <img src={ mealItem.strMealThumb } data-testid="recipe-photo" alt="img" />
      <h1 data-testid="recipe-title">{mealItem.strMeal}</h1>
      <h3 data-testid="recipe-category">{mealItem.strCategory}</h3>
      {renderIngredients(mealItem)}
      <h5 data-testid="instructions">{mealItem.strInstructions}</h5>
      <iframe
        width="560"
        height="315"
        src={ mealItem.strYoutube }
        allowFullScreen
        title="Video"
        data-testid="video"
      />
    </div>
  ));

  const renderDrinkDetails = () => drink.map((drinkItem) => (
    <div key={ drinkItem.idDrink }>
      <img src={ drinkItem.strDrinkThumb } data-testid="recipe-photo" alt="img" />
      <h1 data-testid="recipe-title">{drinkItem.strDrink}</h1>
      <h3 data-testid="recipe-category">
        {drinkItem.strAlcoholic}
        {' '}
        {drinkItem.strCategory}
      </h3>
      {renderIngredients(drinkItem)}
      <h5 data-testid="instructions">{drinkItem.strInstructions}</h5>
    </div>
  ));

  return (
    <div>
      {path ? renderMealDetails() : renderDrinkDetails()}
      <RecomendationsCard pathname={ pathname } />
      <button
        style={ { position: 'fixed', bottom: 0 } }
        data-testid="start-recipe-btn"
      >
        Start Recipe

      </button>
    </div>
  );
}
