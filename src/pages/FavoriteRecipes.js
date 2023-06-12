import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import heartIcon from '../images/blackHeartIcon.svg';
import 'react-toastify/dist/ReactToastify.css';

export default function FavoriteRecipes() {
  const [favorite, setFavorite] = useState([]);

  // descomentar o recover do localStorage
  const recoverFavorites = JSON.parse(localStorage
    .getItem('favoriteRecipes')) || [];

  useEffect(() => {
    setFavorite(recoverFavorites);
  }, []);

  const filterByType = (type) => {
    const filteredFav = recoverFavorites.filter((f) => f.type === type);
    setFavorite(filteredFav);
  };

  const filterAll = () => {
    setFavorite(recoverFavorites);
  };

  const removeFavorite = (id) => {
    const favoriteRecipe = favorite.filter((f) => f.id !== id);
    setFavorite(favoriteRecipe);
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipe),
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
        <ToastContainer />
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
              {fav.nationality}
              {' '}
              -
              {' '}
              { fav.category }
              {fav.alcoholicOrNot}

            </h5>

            <button
              src={ shareIcon }
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => { toast.info('Link copied!'); copy(`http://localhost:3000/${fav.type}s/${fav.id}`); } }
            >
              <img src={ shareIcon } alt="share Icon" />

            </button>
            <button
              src={ heartIcon }
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
