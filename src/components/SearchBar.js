import React, { useContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/myContext';

function SearchBar({ searchBar }) {
  const { location } = useHistory();
  const history = useHistory();
  const [searchType, setSearchType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [plusLength, setPlusLength] = useState(true);
  const { setSearchState, setSearch } = useContext(MyContext);
  const firstLetter = 'first-letter';

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const redirectDrink = (data) => {
    const drink = data.drinks;
    if (drink.length === 1) {
      history.push(`/drinks/${drink[0].idDrink}`);
      setPlusLength(false);
    }
  };

  const redirectMeal = (data) => {
    const meal = data.meals;
    if (meal.length === 1) {
      history.push(`/meals/${meal[0].idMeal}`);
      setPlusLength(false);
    }
  };

  const handleSearch = () => {
    if (searchType === firstLetter && searchQuery.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    const { pathname } = location;
    let endpoint = '';

    switch (pathname) {
    case '/meals':
      if (searchType === 'ingredient') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`;
      } else if (searchType === 'name') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;
      } else {
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchQuery}`;
      }
      break;
    default:
      if (searchType === 'ingredient') {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchQuery}`;
      } else if (searchType === 'name') {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`;
      } else {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchQuery}`;
      }
      break;
    }

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        if (pathname === '/meals') {
          const mealsAp = data;
          setSearchState([{ mealsAp, plusLength }]);
          redirectMeal(data);
        } else {
          const drinksAp = data;
          setSearchState([{ drinksAp, plusLength }]);
          redirectDrink(data);
        }
      })
      .catch((error) => {
        error.message = 'Sorry, we haven\'t found any recipes for these filters.';
        global.alert(error.message); // Caso a receita não seja encontrada, vai exibir um alerta
      });
    setSearch(true);
  };

  return (
    <div>
      {
        searchBar ? (
          <input
            type="text"
            placeholder="Digite sua busca..."
            value={ searchQuery }
            onChange={ handleSearchQueryChange }
            data-testid="search-input"
          />
        )
          : null
      }

      <div>
        <label>
          <input
            type="radio"
            value="ingredient"
            checked={ searchType === 'ingredient' }
            onChange={ handleSearchTypeChange }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="name"
            checked={ searchType === 'name' }
            onChange={ handleSearchTypeChange }
            data-testid="name-search-radio"
          />
          Name
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            value={ firstLetter }
            checked={ searchType === firstLetter }
            onChange={ handleSearchTypeChange }
            data-testid="first-letter-search-radio"
          />
          First letter
        </label>
      </div>

      <button
        onClick={ handleSearch }
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  searchBar: PropTypes.bool.isRequired,
};

export default SearchBar;
