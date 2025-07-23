import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import styled, { keyframes } from 'styled-components';
import { FaFilm } from 'react-icons/fa';

//Animacions
const spotlight = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

// Estilos con styled-components
const Navbar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: #09034aff !important;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const FeaturedSection = styled.div`
  background: linear-gradient(to right, #09034aff, #1a1a1a);
  color: white;
  padding: 2rem 0;
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 0.8s ease-out;

  /* Spotlight effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    background-size: 200% 100%;
    animation: ${spotlight} 6s linear infinite;
    z-index: 0;
  }

  /* Responsive margin to avoid overlap with fixed Navbar and SearchAndFilters */
  margin-top: 56px; /* Height of Navbar */
  @media (max-width: 768px) {
    margin-top: 106px; /* Navbar (~56px) + SearchAndFilters (~50px) */
  }
`;

const FeaturedImage = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 0.25rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
  z-index: 1;
  &:hover {
    transform: scale(1.05);
  }
`;

const FeaturedTitle = styled.h3`
  font-family: 'ITC Machine Medium', sans-serif;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #f4d421ff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const FeaturedText = styled.p`
  font-size: 1.1rem;
  color: #ffc107;
  margin-bottom: 1rem;
  line-height: 1.5;
  z-index: 1;
`;

const FeaturedButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
    transform: translateY(-2px);
  }
`;

const API_URL_FEATURED = 'https://687db570918b642243327cf9.mockapi.io/featured_movie';

const Header = ({ onShowLogin, onShowCart }) => {
  const { user, logout } = useAuth();
  const { getTotalItems, addToCart } = useCart();
  const location = useLocation();
  const [featuredMovie, setFeaturedMovie] = useState({
    id: 'pulpFiction-offer',
    title: 'Pulp Fiction',
    price: 599.99,
    category: 'Crimen',
    description: 'Historias entrecruzadas de crimen y redención.',
    poster: 'https://m.media-amazon.com/images/I/718LfFW+tIL.jpg',
  });

  // Obtener la película destacada desde MockAPI
  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const response = await fetch(`${API_URL_FEATURED}/1`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFeaturedMovie(data);
      } catch (err) {
        console.error('Error al cargar la película destacada:', err);
        toast.error('Error al cargar la película destacada');
      }
    };
    fetchFeaturedMovie();
  }, []);

  const handleAddToCart = () => {
    addToCart(featuredMovie);
    toast.success(`${featuredMovie.title} agregado al carrito`);
  };

  // Ocultar la sección destacada en la página de detalles de la película
  const showFeaturedSection = !location.pathname.startsWith('/movie/');

  return (
    <>
      <Navbar className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/" style={{ color: '#f4d421ff' }}>
            BLOCKBUSTER 🎬
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/movies">
                  Películas
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-outline-light position-relative"
                onClick={onShowCart}
                aria-label={`Abrir carrito con ${getTotalItems()} productos`}
              >
                🛒
                {getTotalItems() > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              {user ? (
                <div className="d-flex align-items-center gap-2">
                  <span className="text-light">Hola, {user.username}</span>
                  <button className="btn btn-outline-light btn-sm" onClick={logout} aria-label="Cerrar sesión">
                    Salir
                  </button>
                </div>
              ) : (
                <button className="btn btn-warning" onClick={onShowLogin} aria-label="Iniciar sesión">
                  Iniciar Sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </Navbar>
      {showFeaturedSection && (
        <FeaturedSection aria-labelledby="featured-movie-title">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4 mb-3 mb-md-0">
                <FeaturedImage
                  src={featuredMovie.poster}
                  alt={`Póster de ${featuredMovie.title} en oferta`}
                  aria-label={`Póster de ${featuredMovie.title} en oferta`}
                />
              </div>
              <div className="col-md-8">
                <FeaturedTitle id="featured-movie-title">
                  🎥 ¡Oferta Especial: "{featuredMovie.title}" con 20% de descuento!
                </FeaturedTitle>
                <FeaturedText>
                  Disfruta de esta película icónica por solo ${featuredMovie.price}. ¡No te pierdas esta oferta de Blockbuster!
                </FeaturedText>
                <FeaturedButton
                  onClick={handleAddToCart}
                  aria-label={`Agregar ${featuredMovie.title} al carrito`}
                >
                  <FaFilm /> Agregar al Carrito
                </FeaturedButton>
              </div>
            </div>
          </div>
        </FeaturedSection>
      )}
    </>
  );
};

export default Header;
