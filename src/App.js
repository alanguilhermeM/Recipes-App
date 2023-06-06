import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Provider from './context/myProvider';
import Login from './pages/Login';

function App() {
  return (
    <div className="meals">

      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
