import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import DrinksAndMeals from './DrinksAndMeals';
import Footer from '../components/Footer';
import Meals from './Meals';
import Drinks from './Drinks';
import '../styles/Drinks.css';
import MyContext from '../context/myContext';

export default function Recipes() {
  const { location } = useHistory();
  const { pathname } = location;
  const [path, setPath] = useState(true);
  const { search } = useContext(MyContext);

  useEffect(() => {
    if (pathname === '/drinks') {
      setPath(false);
    }
  }, [pathname]);

  return (
    <div>
      <Header />
      {search && <DrinksAndMeals />}
      {!search && path && <Meals />}
      {!search && !path && <Drinks />}
      <Footer />
    </div>
  );
}
