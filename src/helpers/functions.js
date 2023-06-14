const chave = {
  meals: {},
  drinks: {},
};

export function handleIngredients(tipo, id, data) {
  const ingredients = [];
  const n = 20;
  for (let i = 1; i <= n; i += 1) {
    const ingredient = data[`strIngredient${i}`];
    const measure = data[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '' && measure && measure.trim() !== '') {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure.trim(),
      });
    }
  }
  chave[tipo][id] = ingredients;
  localStorage.setItem('ingredients', JSON.stringify(chave));
  return ingredients;
}

export function handlePathname(location) {
  const endereco = location.pathname.split('/');
  const tipo = endereco[1];
  const id = endereco[2];
  return [tipo, id];
}
