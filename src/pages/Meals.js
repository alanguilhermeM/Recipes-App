import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Meals() {
  const [meals, setMeals] = useState([]);
  const maxNumber = 12;
  const fetchMeals = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const filter = await data.meals.slice(0, maxNumber);
    console.log(filter);
    setMeals(filter);
  };
  useEffect(() => {
    fetchMeals();
  }, []);

  if (meals.length === 0) return <div>Carregando...</div>;

  return (

    <div>
      { meals.map((meal, index) => (
        <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
          <Link
            to={ `/meals/${meal.idMeal}` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ `${meal.strMeal} ilustration` }
            />
            <h1 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h1>

          </Link>
        </div>
      ))}
    </div>
  );
}

export default Meals;
