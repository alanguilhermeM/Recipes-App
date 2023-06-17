import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchApi, fetchRecomendations } from '../helpers/api';
import '../styles/RecipeDetails.css';
import MyContext from '../context/myContext';
import RecomendationsCard from './RecomendationsCard';

export default function RecipeDetails() {
  const { location } = useHistory();
  const { pathname } = location;
  const [path, setPath] = useState(true); // Variável de estado para determinar o caminho (refeição ou bebida)
  const [meal, setMeal] = useState([]); // Variável de estado para armazenar os detalhes da refeição
  const [drink, setDrink] = useState([]); // Variável de estado para armazenar os detalhes da bebida
  const { setRecomendations } = useContext(MyContext); // Acessando o contexto para definir as recomendações
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [inProgressRec, setInProgressRec] = useState(false);

  async function returnApi() {
    const n = 6;
    const recomend = await fetchRecomendations(pathname);

    if (recomend && typeof recomend === 'object') {
      if (pathname.includes('/drinks')) {
        const recomendArray = Object.values(recomend.meals || {});
        const recomendSlice = recomendArray.slice(0, n);
        setRecomendations(recomendSlice);
      } else {
        const recomendArray = Object.values(recomend.drinks || {});
        const recomendSlice = recomendArray.slice(0, n);
        setRecomendations(recomendSlice);
      }
    }
  }

  function handleLocalStorage(id) {
    const local = localStorage.getItem('doneRecipes');
    const doneRecipes = local ? JSON.parse(local) : [];
    let validation = false;
    validation = doneRecipes.some((doneRecipe) => doneRecipe.id === id);
    setAlreadyExist(validation);

    const local2 = localStorage.getItem('inProgressRecipes');
    const inProgressRecipes = local2 ? JSON.parse(local2) : {};
    let validation2 = false;

    if (pathname.includes('/drinks')) {
      validation2 = inProgressRecipes.drinks
       && Object.prototype.hasOwnProperty.call(inProgressRecipes.drinks, id);
    } else {
      validation2 = inProgressRecipes.meals
       && Object.prototype.hasOwnProperty.call(inProgressRecipes.meals, id);
    }

    setInProgressRec(validation2);
  }

  useEffect(() => {
    const [, , id] = pathname.split('/');
    fetchApi(pathname, setMeal, setDrink, setPath); // Chamando a função fetchApi para obter os detalhes da receita
    returnApi(); // Chamando a função returnApi para obter as recomendações
    // console.log(pathname);
    handleLocalStorage(id);
  }, [pathname]);

  // Função para renderizar os ingredientes da receita
  const renderIngredients = (item) => {
    const ingredients = [];
    const n = 20;
    for (let i = 1; i <= n; i += 1) {
      const ingredient = item[`strIngredient${i}`];
      const measure = item[`strMeasure${i}`];
      if (ingredient && measure) { // Verifica se ingredient e measure são valores válidos
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure.trim(),
        });
        // console.log(ingredients);
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

  // Função para renderizar os detalhes da refeição
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

  // Função para renderizar os detalhes da bebida
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
      <div className="cards">
        <RecomendationsCard pathname={ pathname } />
      </div>
      {
        inProgressRec && !alreadyExist && (
          <button
            data-testid="start-recipe-btn"
            className="btn"
          >
            Continue Recipe
          </button>
        )
      }

      {
        !inProgressRec && !alreadyExist && (
          <button
            data-testid="start-recipe-btn"
            className="btn"
          >
            Iniciar Receita
          </button>
        )
      }
    </div>
  );
}
