import React from 'react';
import { useHistory } from 'react-router-dom/';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const history = useHistory(true);
  const emailUser = JSON.parse(localStorage.getItem('user')) || '';

  const logout = () => {
    localStorage.clear('user');
    history.push('/');
  };
  return (
    <div>
      <Header />

      <h5 data-testid="profile-email">{emailUser.email}</h5>
      <button
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes

      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ logout }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
