import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Animaciones para promociones
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7); }
  50% { transform: scale(1.02); box-shadow: 0 0 20px 10px rgba(0, 123, 255, 0.3); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Estilos
const FeatureContainer = styled.div`
  background: linear-gradient(135deg, #071227 0%, #1e1e1e 100%);
  border-radius: 0.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  animation: ${pulse} 2s infinite ease-in-out;

  /* Eliminar padding-top en pantallas grandes */
  padding-top: 0;

  @media (max-width: 768px) {
    padding-top: 106px; /* Mantener padding en responsivo */
  }
`;

const FeatureImage = styled.img`
  width: 100%;
  max-width: 350px;
  height: auto;
  object-fit: cover;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  animation: ${slideIn} 0.6s ease-out;
`;

const FeatureTitle = styled.h2`
  font-size: 2rem;
  color: #f4d421ff;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  width: 100%; /* Ocupa todo el ancho en pantallas grandes */
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.5rem; /* Tamaño más pequeño en responsivo */
    width: auto; /* Mantener diseño actual en responsivo */
  }
`;

const FeaturePrice = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffc107;
  display: block;
  margin-bottom: 1rem;
  width: 100%; /* Ocupa todo el ancho en pantallas grandes */

  @media (max-width: 768px) {
    font-size: 1.3rem; /* Tamaño más pequeño en responsivo */
    width: auto; /* Mantener diseño actual en responsivo */
  }
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #adb5bd;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const FeatureBadge = styled.span`
  background-color: #17a2b8;
  color: white;
  padding: 0.4em 0.8em;
  font-size: 0.9rem;
  border-radius: 0.3rem;
  margin-right: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #138496;
  }
`;

const FeatureButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 0.3rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const FeaturedMovieForm = ({ movie, onAddToCart }) => {
  return (
    <FeatureContainer className="container">
      <div className="row align-items-center">
        <div className="col-md-4">
          <Link to={`/movie/${movie.id}`} aria-label={`Ver detalles de ${movie.title}`}>
            <FeatureImage
              src={movie.poster}
              alt={movie.title}
            />
          </Link>
        </div>
        <div className="col-md-8">
          <FeatureTitle>{movie.title}</FeatureTitle>
          <FeaturePrice>${movie.price}</FeaturePrice>
          <FeatureDescription>{movie.description}</FeatureDescription>
          <FeatureBadge>{movie.category}</FeatureBadge>
          <FeatureButton onClick={() => onAddToCart(movie)} aria-label={`Agregar ${movie.title} al carrito`}>
            🛒 Agregar al Carrito
          </FeatureButton>
        </div>
      </div>
    </FeatureContainer>
  );
};

export default FeaturedMovieForm;
