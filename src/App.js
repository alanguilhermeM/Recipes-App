import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/myProvider';
import Login from './pages/Login';

function App() {
  return (
    <div className="meals">
      <Provider>
        <Login />
      </Provider>
    </div>
  );
}

export default App;
