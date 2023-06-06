import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
//   const [state, setState] = useState();

  const maxNumber = 12;

  const [drinks, setDrinks] = useState(null);

  const fetchDrinks = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const filter = await data.drinks.slice(0, maxNumber);
    setDrinks(filter);
  };

  const state = useMemo(() => ({
    drinks,
    fetchDrinks,
  }), []);

  return (
    <MyContext.Provider value={ state }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
