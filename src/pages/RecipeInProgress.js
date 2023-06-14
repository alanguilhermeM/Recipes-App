import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { handlePathname, handleIngredients } from '../helpers/functions';
import { fetchProgressApi } from '../helpers/api';

export default function RecipeInProgress() {
  // const ingredients = JSON.parse(localStorage.getItem('ingredients'));
  const location = useLocation();
  const [tipo, id] = handlePathname(location); // pegar se é meal ou drink e o id da receita
  const [recipeData, setRecipeData] = useState({}); // para guardar o retorno da api, 1 para meals e drink
  const listIngredientes = handleIngredients(tipo, id, recipeData);

  const opcao = tipo === 'meals' ? 'Meal' : 'Drink'; // para pegar na chave do retorno da api

  useEffect(() => {
    fetchProgressApi(tipo, id, setRecipeData);
    handleIngredients(tipo, id, recipeData);
  }, []);

  return (
    <div>
      <img
        src={ recipeData[`str${opcao}Thumb`] }
        alt=""
        data-testid="recipe-photo"
      />

      <h1 data-testid="recipe-title">{recipeData[`str${opcao}`]}</h1>

      <button data-testid="share-btn">
        Compartilhar
      </button>

      <button data-testid="favorite-btn">Favoritar</button>

      <p data-testid="recipe-category">
        {recipeData.strCategory}
        {tipo === 'Drinks' ? <p>{recipeData.strAlcoholic}</p> : null}
      </p>

      { listIngredientes.map((item, index) => (
        <label key={ index } data-testid={ `${index}-ingredient-step` }>
          {item.ingredient}
          {item.measure}
          <input
            type="checkbox"
          />
        </label>
      )) }

      <p data-testid="instructions">
        {recipeData.strInstructions}
      </p>

      <button data-testid="finish-recipe-btn">
        Finalizar Receita
      </button>
    </div>
  );
}
