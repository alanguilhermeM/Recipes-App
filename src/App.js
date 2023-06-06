import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Provider from './context/myProvider';
/* import Drinks from './pages/Drinks'; */
import Meals from './pages/Meals';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div className="meals">
      <Provider />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route path="*" component={ PageNotFound } />
      </Switch>
    </div>
  );
}

export default App;
