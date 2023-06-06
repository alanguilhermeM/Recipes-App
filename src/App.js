import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Provider from './context/myProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="meals">

      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" component={ Recipes } />
          <Route path="/meals/:id" component={ Recipes } />
          <Route path="/drinks" component={ Recipes } />
          <Route path="/drinks/:id" component={ Recipes } />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
