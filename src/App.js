import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';

import Login from './pages/Login';
// import Meals from './pages/Meals';
// import Drinks from './pages/Drinks';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import PageNotFound from './pages/PageNotFound';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Recipes } />
        <Route path="/meals/:id" component={ RecipeDetails } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="*" component={ PageNotFound } />
      </Switch>
    </div>
  );
}

export default App;
