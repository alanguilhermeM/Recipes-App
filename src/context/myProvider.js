// import React from 'react';

import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  // const [state, setState] = useState();

  return (
    <MyContext.Provider value={ null }>
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
