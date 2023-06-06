import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  const maxNumber = 12;

  const [drinks, setDrinks] = useState([]);

  const fetchDrinks = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const filter = await data.drinks.slice(0, maxNumber);
    console.log(filter);
    setDrinks(filter);
  };

  useEffect(() => {
    fetchDrinks();
  }, []);

  if (drinks.length === 0) return <div>Carregando...</div>;
  return (
    <>
      <Header />
      <div className="container-drinks">
        {drinks.map((drink, index) => (
          <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
            <Link
              to={ `/drinks/${drink.idDrink}` }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ `${drink.strDrink} ilustration` }
                className="img-drinks"
              />
              <h1 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h1>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Drinks;
