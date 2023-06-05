import React, { useContext, useState } from 'react';
import MyContext from './myContext';

function Provider({ children }) {
  // const [state, setState] = useState();

  return (
    <MyContext.Provider value={ null }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;
