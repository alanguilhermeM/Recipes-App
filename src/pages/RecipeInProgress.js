import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { handlePathname } from '../helpers/functions';
import { fetchProgressApi } from '../helpers/api';

export default function RecipeInProgress() {
  // const ingredients = JSON.parse(localStorage.getItem('ingredients'));
  const location = useLocation();
  const [tipo, id] = handlePathname(location); // pegar se é meal ou drink e o id da receita
  const [recipeData, setRecipeData] = useState({}); // para guardar o retorno da api, 1 para meals e drink
  const [listIngredientes, setListIngredientes] = useState([]);
  const opcao = tipo === 'meals' ? 'Meal' : 'Drink'; // para pegar na chave do retorno da api
  const [disable, setDisable] = useState(true);
  const history = useHistory(true);

  function handleCheckboxChange(index, event) {
    const updatedList = [...listIngredientes];
    updatedList[index].checked = event.target.checked;

    const verificacao = listIngredientes.every((item) => item.checked === true);
    setDisable(!verificacao);

    setListIngredientes(updatedList);
  }

  const handleSubmit = () => {
    localStorage.setItem('doneRecipes', JSON.stringify(id));
    history.push('/done-recipes');
  };
  useEffect(() => {
    fetchProgressApi(tipo, id, setRecipeData, setListIngredientes);
  }, []);

  return (
    <div>
      <img
        src={ recipeData[`str${opcao}Thumb`] }
        alt=""
        data-testid="recipe-photo"
        width="70px"
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
          <p>{item.checked}</p>
          <input
            type="checkbox"
            onChange={ (event) => handleCheckboxChange(index, event) }
          />
          <span className={ item.checked ? 'checked' : '' }>
            {item.ingredient}
            {item.measure}
          </span>

        </label>
      )) }

      <p data-testid="instructions">
        {recipeData.strInstructions}
      </p>

      <button
        data-testid="finish-recipe-btn"
        disabled={ disable }
        onClick={ () => handleSubmit() }
        style={ { position: 'fixed', bottom: 0 } }
      >
        Finalizar Receita
      </button>
    </div>
  );
}
