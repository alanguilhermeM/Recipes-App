import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/myContext';
// import '../styles/Recomendation.css';

export default function RecomendationsCard(props) {
  const { recomendations } = useContext(MyContext);
  const { pathname } = props;

  return (
    <div className="carousel-container">
      <div className="carousel">
        {pathname.includes('/drinks') ? (
          recomendations.map((recomendation, index) => (
            <div
              className="recomendation-card"
              data-testid={ `${index}-recommendation-card` }
              key={ recomendation.idMeal }
            >
              <h2
                data-testid={ `${index}-recommendation-title` }
              >
                {recomendation.strMeal}

              </h2>
              {/* <img className="img" src={ recomendation.strMealThumb } alt="thumb" /> */}
            </div>
          ))
        ) : (
          recomendations.map((recomendation, index) => (
            <div
              className="recomendation-card"
              data-testid={ `${index}-recommendation-card` }
              key={ recomendation.idDrink }
            >
              <h2
                data-testid={ `${index}-recommendation-title` }
                className="current item"
              >
                {recomendation.strDrink}

              </h2>
              {/* <img className="img" src={ recomendation.strDrinkThumb } alt="thumb" /> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

RecomendationsCard.propTypes = {
  pathname: PropTypes.string.isRequired,
};
