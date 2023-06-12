export async function fetchRecomendations(pathname) {
  const idMeal = pathname.split('/meals/')[1];
  let data;
  if (pathname === `/meals/${idMeal}`) {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endpoint);
    data = await response.json();
  } else {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endpoint);
    data = await response.json();
  }
  return data;
}

export const fetchApi = async (pathname, param1, param2, param3) => {
  const idMeal = pathname.split('/meals/')[1];
  const idDrink = pathname.split('/drinks/')[1];
  const setMeal = param1;
  const setDrink = param2;
  const setPath = param3;

  if (pathname === `/meals/${idMeal}`) {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    const mealData = [data.meals[0]];
    setMeal(mealData);
    fetchRecomendations(pathname);
  } else {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    const drinkData = [data.drinks[0]];
    setDrink(drinkData);
    setPath(false);
    fetchRecomendations(pathname);
  }
};
