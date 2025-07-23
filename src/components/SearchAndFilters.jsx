import React from 'react';
import styled from 'styled-components';

// Estilos con styled-components
const SearchContainer = styled.div`
  position: fixed;
  top: 56px; /* Altura del Navbar, ajustar si es necesario */
  width: 100%;
  z-index: 900;
  background-color: #09034aff; /* Mismo color que el Navbar */
  padding: 1rem 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const SearchAndFilters = ({ onSearch, onCategoryChange, searchTerm, selectedCategory }) => {
  const categories = [
    'Todas', 'Acción', 'Aventura', 'Comedia', 'Drama', 'Ciencia Ficción',
    'Terror', 'Fantasía', 'Musical', 'Western', 'Bélico', 'Histórico',
    'Animación', 'Documental'
  ];

  return (
    <SearchContainer>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="input-group">
              <span className="input-group-text bg-secondary text-white border-secondary" aria-hidden="true">
                🔍
              </span>
              <input
                type="text"
                className="form-control bg-secondary text-white border-secondary"
                placeholder="Buscar películas..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                aria-label="Buscar películas"
              />
            </div>
          </div>
          <div className="col-md-6">
            <select
              className="form-select bg-secondary text-white border-secondary"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              aria-label="Seleccionar categoría"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'Todas' ? 'Todas las categorías' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </SearchContainer>
  );
};

export default SearchAndFilters;
