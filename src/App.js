import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/myProvider';

function App() {
  return (
    <div className="meals">
      <Provider />
    </div>
  );
}

export default App;
