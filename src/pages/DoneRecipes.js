import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const getDones = JSON.parse(localStorage.getItem('doneRecipes', []));
    setDoneRecipes(getDones);
  }, []);

  const handleButton = (type, id) => {
    setCopied(true);
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
  };
  return (

    <div>
      <Header />

      <div>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilter('drinks') }
        >
          Drinks
        </button>

        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => setFilter('meals') }
        >
          Meals
        </button>

        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
      </div>

      <div>
        {
          doneRecipes.filter((element) => {
            switch (filter) {
            case 'meals': return element.type === 'meal';
            case 'drinks': return element.type === 'drink';
            default: return element;
            }
          })
            .map((e, index) => (
              <div
                key={ index }
              >
                <Link to={ `/${e.type}s/${e.id}` }>
                  <img
                    alt={ e.id }
                    src={ e.image }
                    width="200px"
                    data-testid={ `${index}-horizontal-image` }
                  />
                </Link>

                <Link to={ `/${e.type}s/${e.id}` }>
                  <div
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {e.name}
                  </div>
                </Link>

                {
                  e.type === 'meal' ? (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {`${e.nationality} - ${e.category}`}
                    </p>)
                    : (
                      <p
                        data-testid={ `${index}-horizontal-top-text` }
                      >
                        {e.alcoholicOrNot}
                      </p>)
                }
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {e.doneDate}

                </p>

                {
                  copied && <p data-testid="copied-msg">Link copied!</p>
                }
                <div>
                  {
                    e.tags.map((tag) => (
                      <div
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                        key={ tag }
                      >
                        #
                        {tag}
                      </div>
                    ))
                  }
                </div>
                <button
                  data-testid="share-btn"
                  type="button"
                  onClick={ () => handleButton(e.type, e.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    alt="Share Icon"
                    src={ shareIcon }
                  />
                </button>
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default DoneRecipes;
