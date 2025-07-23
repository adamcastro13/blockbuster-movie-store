import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import styled, { keyframes } from 'styled-components';

// Animaciones
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const MovieDetailContainer = styled.div`
  background: linear-gradient(135deg, #071227 0%, #1a1a1a 100%);
  color: white;
  padding: 2rem;
  min-height: calc(100vh - 56px);
  animation: ${fadeIn} 0.5s ease-out;
`;

const MovieCard = styled.div`
  background-color: #1e1e1e;
  border-radius: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.2);
  }
`;

const MovieImage = styled.img`
  width: 100%;
  max-width: 350px;
  height: auto;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  animation: ${scaleIn} 0.6s ease-out;
`;

const MovieTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #f4d421ff;
  font-family: 'ITC Machine Medium', sans-serif;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

const MovieDescription = styled.p`
  font-size: 1.1rem;
  color: #adb5bd;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const MovieBadge = styled.span`
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

const MoviePrice = styled.span`
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffc107;
`;

const ActorBadge = styled.span`
  background-color: #6c757d;
  color: white;
  padding: 0.4em 0.8em;
  font-size: 0.9rem;
  border-radius: 0.3rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Button = styled.button`
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

const InfoText = styled.small`
  display: block;
  text-align: left;
  color: #6c757d;
  font-size: 0.9rem;
`;

const API_URL = 'https://687db570918b642243327cf9.mockapi.io/movies';

const MovieDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Movie data:', data);
        setMovie(data);
      } catch (err) {
        console.log('Error fetching movie:', err);
        toast.error('Error al cargar la película: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleAddToCart = () => {
    if (movie) {
      addToCart(movie);
      toast.success(`${movie.title} agregado al carrito`);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <div className="text-white">
          <div className="spinner-border text-primary me-3" role="status"></div>
          Cargando película...
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-white text-center min-vh-100 d-flex align-items-center justify-content-center">
        <div>
          <h3>Película no encontrada</h3>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <MovieDetailContainer className="container">
      <Helmet>
        <title>{`${movie.title} - Blockbuster`}</title>
        <meta name="description" content={`Detalles de ${movie.title}. ${movie.extensiveDescription || movie.description}`} />
        <meta name="keywords" content={`${movie.title}, ${movie.category}, ${movie.actors?.join(', ') || ''}, Blockbuster, películas`} />
        <meta property="og:title" content={`${movie.title} - Blockbuster`} />
        <meta property="og:description" content={`Detalles de ${movie.title}. ${movie.extensiveDescription || movie.description}`} />
        <meta property="og:image" content={movie.poster} />
      </Helmet>
      <MovieCard className="row">
        <div className="col-md-4">
          <MovieImage
            src={movie.poster}
            alt={movie.title}
          />
        </div>
        <div className="col-md-8">
          <MovieTitle className="navbar-brand">{movie.title}</MovieTitle>
          <MovieDescription>{movie.extensiveDescription || movie.description}</MovieDescription>
          {movie.actors && (
            <div className="mb-3">
              <strong>Actores:</strong>
              {Array.isArray(movie.actors)
                ? movie.actors.map((actor, index) => (
                    <ActorBadge key={index}>{actor.trim()}</ActorBadge>
                  ))
                : movie.actors.split(',').map((actor, index) => (
                    <ActorBadge key={index}>{actor.trim()}</ActorBadge>
                  ))}
            </div>
          )}
          <div className="mb-3">
            <MovieBadge>{movie.category}</MovieBadge>
            <MoviePrice>${movie.price}</MoviePrice>
          </div>
          {user ? (
            <Button onClick={handleAddToCart} aria-label={`Agregar ${movie.title} al carrito`}>
              🛒 Agregar al Carrito
            </Button>
          ) : (
            <InfoText className="h6 navbar-brand">Inicia sesión para comprar</InfoText>
          )}
        </div>
      </MovieCard>
    </MovieDetailContainer>
  );
};

export default MovieDetail;
