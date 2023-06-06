import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Provider from '../context/myProvider';
import App from '../App';

const renderWithRouterAndContext = (component, path = '/') => {
  const history = createMemoryHistory({ initialEntries: [path] });
  return ({
    ...render(
      <Provider>
        <Router history={ history }>
          {component}
        </Router>
      </Provider>,
    ),
    history,
  });
};

describe('Testes para o componente Footer', () => {
  it('Teste se renderiza um footer na page meals', () => {
    const { history } = renderWithRouterAndContext(<App />, '/meals');
    expect(history.location.pathname).toBe('/meals');
  });
});
