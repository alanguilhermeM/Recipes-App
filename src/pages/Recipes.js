import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import DrinksAndMeals from './DrinksAndMeals';
import Footer from '../components/Footer';
import Meals from './Meals';
import Drinks from './Drinks';

export default function Recipes() {
  const { location } = useHistory();
  const { pathname } = location;
  const [path, setPath] = useState(true);

  useEffect(() => {
    if (pathname === '/drinks') {
      setPath(false);
    }
  }, [pathname]);

  return (
    <div>
      <Header />
      {path ? <Meals /> : (<Drinks />)}
      <div>
        <DrinksAndMeals />
      </div>
      <Footer />
    </div>
  );
}
