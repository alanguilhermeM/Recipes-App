import React from 'react';

export default function RecipeInProgress() {
  return (
    <div>
      <img
        src=""
        alt=""
        data-testid="recipe-photo"
      />

      <h1 data-testid="recipe-title">Titulo</h1>

      <button data-testid="share-btn">
        Compartilhar
      </button>

      <button data-testid="favorite-btn">Favoritar</button>

      <p data-testid="recipe-category">
        Categoria
      </p>

      <p data-testid="instructions">
        Instruções
      </p>

      <button data-testid="finish-recipe-btn">
        Finalizar Receita
      </button>
    </div>
  );
}
