import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { nomeRotas, semPesquisa } from '../helpers/locations';

export default function Header() {
  const location = useLocation();
  const pesquisa = !semPesquisa.some((p) => p === nomeRotas[location.pathname]); // para nao aparecer o icone de pesquisa em algumas rotas
  const [inputSearch, setInputSearch] = useState(false);
  return (
    <header>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile"
        />
      </Link>
      {pesquisa
      && (
        <div>
          <button
            type="button"
            onClick={ () => setInputSearch(!inputSearch) }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="busca"
            />
          </button>
          { inputSearch && <input
            type="text"
            data-testid="search-input"
          /> }
        </div>)}

      <h1
        data-testid="page-title"
      >
        {nomeRotas[location.pathname]}
      </h1>
    </header>
  );
}
