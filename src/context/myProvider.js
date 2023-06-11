import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [searchState, setSearchState] = useState([]);
  const [search, setSearch] = useState(false);

  const valor = useMemo(
    () => ({ searchState, setSearchState, search, setSearch }),
    [searchState, setSearchState, search, setSearch],
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
