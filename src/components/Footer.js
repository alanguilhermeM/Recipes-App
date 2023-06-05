import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import melIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img src={ drinkIcon } alt="Link para a página de bebidas" />
      </button>
      <button
        data-testid="meals-bottom-btn"
        type="button"
        onClick={ () => history.push('/meals') }
      >
        <img src={ melIcon } alt="Link para a página de comidas" />
      </button>
    </footer>
  );
}
