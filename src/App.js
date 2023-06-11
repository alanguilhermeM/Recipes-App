import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';

import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import PageNotFound from './pages/PageNotFound';
// import DrinksAndMeals from './pages/DrinksAndMeals';
import Recipes from './pages/Recipes';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Recipes } />
        <Route path="/meals/:id" component={ Meals } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/drinks/:id" component={ Drinks } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="*" component={ PageNotFound } />
      </Switch>
    </div>
  );
}

export default App;
