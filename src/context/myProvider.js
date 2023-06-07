import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [searchState, setSearchState] = useState([]);
  const valor = useMemo(
    () => ({ searchState, setSearchState }),
    [searchState, setSearchState],
  );

  return (
    <MyContext.Provider value={ valor }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
