import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import MyContext from '../context/myContext';
import Footer from '../components/Footer';

export default function Recipes() {
  const { location } = useHistory();
  const { searchState } = useContext(MyContext);
  const { pathname } = location;
  const [slice, setSlice] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false); // Define a primeira requisição como concluída
      return; // Retorna sem fazer a requisição
    }
    // Verifica se a requisição já foi feita e os dados estão disponíveis
    if (searchState.length === 0) {
      return;
    }
    const n = 12;
    let recipes = [];
    if (pathname === '/meals') {
      recipes = searchState[0].mealsAp?.meals || [];
    } else if (pathname === '/drinks') {
      recipes = searchState[0].drinksAp?.drinks || [];
    }
    const recipeSlice = recipes.slice(0, n);

    setSlice(recipeSlice); // Define o estado com o slice do array

    // Faça o processamento dos dados e a renderização
  }, [firstLoad, searchState, pathname]);

  return (
    <div>
      <Header />
      {slice.map((recipe, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{recipe.strMeal || recipe.strDrink}</p>
        </div>
      ))}
      <Footer />
    </div>
  );
}
