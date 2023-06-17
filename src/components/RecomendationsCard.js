import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import MyContext from '../context/myContext';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../styles/Recomendation.css';

export default function RecomendationsCard(props) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const { recomendations } = useContext(MyContext);
  // console.log(recomendations);
  const { pathname } = props;

  return (
    <div className="carousel-container">
      <Slider { ...settings }>
        {pathname.includes('/drinks') ? (
          recomendations.map((recomendation, index) => (
            <div
              className="carousel"
              data-testid={ `${index}-recommendation-card` }
              key={ recomendation.idMeal }
            >
              <h2
                data-testid={ `${index}-recommendation-title` }
              >
                {recomendation.strMeal}

              </h2>
              <img className="img" src={ recomendation.strMealThumb } alt="thumb" />
            </div>
          ))
        ) : (
          recomendations.map((recomendation, index) => (
            <div
              className="carousel"
              data-testid={ `${index}-recommendation-card` }
              key={ recomendation.idDrink }
            >
              <h2
                data-testid={ `${index}-recommendation-title` }
                className="current item"
              >
                {recomendation.strDrink}

              </h2>
              <img className="img" src={ recomendation.strDrinkThumb } alt="thumb" />
            </div>
          ))
        )}
      </Slider>
    </div>
  );
}

RecomendationsCard.propTypes = {
  pathname: PropTypes.string.isRequired,
};
