import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Provider from './context/myProvider';

import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
// import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div className="meals">

      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route path="/meals/:id" component={ Meals } />
          <Route path="/drinks" component={ Drinks } />
          <Route path="/drinks/:id" component={ Drinks } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route path="*" component={ PageNotFound } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
