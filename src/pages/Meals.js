import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/Meals.css';

function Meals() {
  const [meals, setMeals] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [filtred, setFiltred] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [filtredAll, setFiltredAll] = useState(false);

  const maxNumber = 12;
  const minNumber = 5;
  const firstItens = 'search.php?s=';

  const fetchMeals = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const filter = await data.meals.slice(0, maxNumber);
    // const category = await data.meals.slice(0, minNumber);
    // setCategorys(category);
    setMeals(filter);
  };

  const fetchMealsBtn = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    // console.log(data);
    const category = await data.meals.slice(0, minNumber);
    setCategorys(await category);
  };

  async function handleClick(category) {
    if (categoryFilter.length === 0) {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      const categoryFilters = await data.meals.slice(0, maxNumber);
      setCategoryFilter(categoryFilters);
      setFiltred(true);
    } else {
      setFiltred(false);
      fetchMeals();
    }
  }

  async function handleClickAll(param) {
    if (allCategory.length === 0) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${param}`);
      const data = await response.json();
      const filter = await data.meals.slice(0, maxNumber);
      setFiltredAll(true);
      setAllCategory(filter);
    } else {
      setFiltredAll(false);
      fetchMeals();
    }
  }

  useEffect(() => {
    fetchMeals();
    fetchMealsBtn();
  }, []);

  if (meals.length === 0 || categorys.length === 0) return <div>Carregando...</div>;

  return (
    <div className="container-meals">
      {filtredAll && (
        allCategory.map((meal, index) => (
          <div
            className="container"
            key={ meal.idMrink }
            data-testid={ `${index}-recipe-card` }
          >
            <p>{meal.strMeal}</p>
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strCategory }
            />
            <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
          </div>
        ))
      )}
      {!filtredAll && (
        filtred ? (
          categoryFilter.map((meal, index) => (
            <div
              className="container"
              key={ meal.idMeal }
              data-testid={ `${index}-recipe-card` }
            >
              <Link to={ `/meals/${meal.idMeal}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt={ `${meal.strMeal} ilustration` }
                  className="img-meals"
                />
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              </Link>
            </div>
          ))
        ) : (
          meals.map((meal, index) => (
            <div
              className="container"
              key={ meal.idMeal }
              data-testid={ `${index}-recipe-card` }
            >
              <Link to={ `/meals/${meal.idMeal}` }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt={ `${meal.strMeal} ilustration` }
                  className="img-meals"
                />
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              </Link>
            </div>
          ))
        )
      )}
      {
        categorys.map((category) => (
          <label key={ category.idMeal }>
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
        onClick={ () => handleClickAll(firstItens) }
        data-testid="All-category-filter"
      >
        All

      </button>
    </div>
  );
}

export default Meals;
