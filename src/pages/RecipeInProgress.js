import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { handlePathname } from '../helpers/functions';
import { fetchProgressApi } from '../helpers/api';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function RecipeInProgress() {
  const location = useLocation();
  const [tipo, id] = handlePathname(location); // pegar se é meal ou drink e o id da receita
  const [recipeData, setRecipeData] = useState({}); // para guardar o retorno da api, 1 para meals e drink
  const [listIngredientes, setListIngredientes] = useState([]);
  const [disable, setDisable] = useState(true);
  const history = useHistory(true);
  const [copied, setCopied] = useState(false);
  const [fav, setFav] = useState(false);

  const opcao = tipo === 'meals' ? 'Meal' : 'Drink'; // para pegar na chave do retorno da api

  const handleCheckboxChange = (index, event) => {
    const updatedList = [...listIngredientes];
    updatedList[index].checked = event.target.checked;
    setListIngredientes(updatedList);
    const verificacao = listIngredientes.every((item) => item.checked === true);
    setDisable(!verificacao);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${tipo}/${id}`)
      .then(() => {
        setCopied(true);
      });

    const time = 2000;
    setTimeout(() => {
      setCopied(false);
    }, time);
  };

  const handleSubmit = () => {
    const obj = {
      id,
      nationality: recipeData.strArea,
      name: recipeData[`str${opcao}`],
      category: recipeData.strCategory,
      image: recipeData[`str${opcao}Thumb`],
      tags: [
        recipeData.strTags,
      ],
      alcoholicOrNot: recipeData.strAlcoholic || '',
      type: opcao,
    };
    localStorage.setItem('doneRecipes', JSON.stringify(obj));
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

      <button data-testid="share-btn" onClick={ handleCopyLink }>
        Compartilhar
      </button>

      {copied && <p>Link copied!</p>}

      <button
        onClick={ () => setFav(!fav) }
        type="button"
      >
        <img
          data-testid="favorite-btn"
          src={ fav ? blackHeartIcon : whiteHeartIcon }
          alt="fav"
        />

      </button>

      <p data-testid="recipe-category">
        {recipeData.strCategory}
        {tipo === 'Drinks' ? <p>{recipeData.strAlcoholic}</p> : null}
      </p>

      { listIngredientes.map((item, index) => (

        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          className={ item.checked ? 'checked' : '' }
        >
          <input
            type="checkbox"
            onChange={ (event) => handleCheckboxChange(index, event) }
          />

          {item.ingredient}
          {item.measure}

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
