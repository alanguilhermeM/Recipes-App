import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/Drinks.css';

function Drinks() {
  const maxNumber = 12;
  const minNumber = 5;
  const firstItens = 'search.php?s=';

  const [categorys, setCategorys] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [filtred, setFiltred] = useState(false);
  const [filtredAll, setFiltredAll] = useState(false);

  const fetchDrinks = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const filter = await data.drinks.slice(0, maxNumber);
    setDrinks(filter);
  };

  const fetchDrinksBtn = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const category = await data.drinks.slice(0, minNumber);
    setCategorys(await category);
  };

  async function handleClick(category) {
    if (categoryFilter.length === 0) {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      const categoryFilters = await data.drinks.slice(0, maxNumber);
      setCategoryFilter(categoryFilters);
      setFiltred(true);
    } else {
      setFiltred(false);
      fetchDrinks();
    }
  }

  async function handleClickAll(param) {
    if (allCategory.length === 0) {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${param}`);
      const data = await response.json();
      const filter = await data.drinks.slice(0, maxNumber);
      setFiltredAll(true);
      setAllCategory(filter);
    } else {
      setFiltredAll(false);
      fetchDrinks();
    }
  }

  useEffect(() => {
    fetchDrinks();
    fetchDrinksBtn();
  }, []);

  if (drinks.length === 0 || categorys.length === 0) return <div>Carregando...</div>;
  return (
    <div className="container-drinks">
      {filtredAll && (
        allCategory.map((drink, index) => (
          <div
            className="container"
            key={ drink.idDrink }
            data-testid={ `${index}-recipe-card` }
          >
            <p>{drink.strDrink}</p>
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strCategory }
            />
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
          </div>
        ))
      )}
      {!filtredAll && (
        filtred ? (
          categoryFilter.map((drink, index) => (
            <div
              className="container"
              key={ drink.idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <Link to={ `/drinks/${drink.idDrink}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ `${drink.strDrink} ilustration` }
                  className="img-drinks"
                />
                <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
              </Link>
            </div>
          ))
        ) : (
          drinks.map((drink, index) => (
            <div
              className="container"
              key={ drink.idDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <Link to={ `/drinks/${drink.idDrink}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ `${drink.strDrink} ilustration` }
                  className="img-drinks"
                />
                <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
              </Link>
            </div>
          ))
        )
      )}
      {
        categorys.map((category) => (
          <label key={ category.idDrink }>
            <button
              onClick={ () => handleClick(category.strCategory) }
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}
            </button>
          </label>
        ))
      }
      <button
        data-testid="All-category-filter"
        onClick={ () => handleClickAll(firstItens) }
      >
        All

      </button>
    </div>
  );
}

export default Drinks;
