import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favorite, setFavorite] = useState([]);

  // descomentar o recover do localStorage
  const recoverFavorites = JSON.parse(localStorage
    .getItem('doneRecipes')) || { favoriteRecipes: [] };
  const { favoriteRecipes } = recoverFavorites;

  // remover o OBJ abaixo quando terminar
  // const recoverFavorites = {
  //   favoriteRecipes: [
  //     {
  //       id: 17222,
  //       type: 'drink',
  //       nationality: '',
  //       category: 'Cocktail',
  //       alcoholicOrNot: 'Alcoholic',
  //       name: 'A1',
  //       image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  //     },
  //     {
  //       id: 52977,
  //       type: 'meal',
  //       nationality: 'Turkish',
  //       category: 'Side',
  //       alcoholicOrNot: '',
  //       name: 'Corba',
  //       image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  //     },
  //   ],
  // };

  useEffect(() => {
    setFavorite(favoriteRecipes);
  }, []);

  // remover a linha abaixo quando terminar.
  // const { favoriteRecipes } = recoverFavorites;
  // remover a linha abaixo quando terminar
  // localStorage.setItem('doneRecipes', JSON.stringify({ favoriteRecipes }));

  const filterByType = (type) => {
    const filteredFav = favoriteRecipes.filter((f) => f.type === type);
    setFavorite(filteredFav);
  };

  const filterAll = () => {
    setFavorite(recoverFavorites.favoriteRecipes);
  };

  const removeFavorite = (id) => {
    const favoriteRecipe = favorite.filter((f) => f.id !== id);
    setFavorite(favoriteRecipe);
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify({ favoriteRecipes: favoriteRecipe }),
    );
  };

  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ filterAll }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => filterByType('meal') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => filterByType('drink') }
        >
          Drinks
        </button>
      </div>

      <div>
        { favorite
        && favorite.map((fav, index) => (
          <div key={ index }>
            <Link to={ `${fav.type}s/${fav.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                style={ { width: 150 } }
                src={ fav.image }
                alt={ fav.name }
              />
              <h6 data-testid={ `${index}-horizontal-name` }>{ fav.name }</h6>
            </Link>
            <h5 data-testid={ `${index}-horizontal-top-text` }>

              {' '}
              { fav.category }
              {' '}
              {' '}
              {fav.nationality}
              {fav.alcoholicOrNot}

            </h5>

            <button
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => { copy(`http://localhost:3000/${fav.type}s/${fav.id}`); global.alert('Link copied!'); } }
            >
              <img src={ shareIcon } alt="share Icon" />

            </button>
            <button
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => removeFavorite(fav.id) }
            >
              <img src={ heartIcon } alt="fav Icon" />

            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
