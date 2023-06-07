import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { nomeRotas, semPesquisa } from '../helpers/locations';
import SearchBar from './SearchBar';

export default function Header() {
  const [searchBar, setSearchBar] = useState(false);
  const location = useLocation();
  const pesquisa = !semPesquisa.some((p) => p === nomeRotas[location.pathname]); // para nao aparecer o icone de pesquisa em algumas rotas

  const toggleSearchBar = () => {
    setSearchBar((prevState) => !prevState);
  };
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
            data-testid="search-top-btn"
            src={ searchIcon }
            onClick={ () => toggleSearchBar() }
          >
            <img
              src={ searchIcon }
              alt="busca"
            />
          </button>
        </div>)}

      <h1
        data-testid="page-title"
      >
        {nomeRotas[location.pathname]}
      </h1>
      <SearchBar searchBar={ searchBar } />
    </header>
  );
}
