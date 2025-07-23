import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';


const CardContainer = styled.div`
  transition: transform 0.2s ease-in-out;
  border: 1px solid #333;
  background-color: #1a1a1a;
  color: white;
  height: 100%;
  border-radius: 0.25rem;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    border-color: #007bff;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h6`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const CardText = styled.p`
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 1rem;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  margin-top: auto;
`;

const Badge = styled.span`
  background-color: #17a2b8;
  color: white;
  padding: 0.25em 0.4em;
  font-size: 0.75rem;
  border-radius: 0.25rem;
`;

const Price = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #ffc107;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const InfoText = styled.small`
  display: block;
  text-align: center;
  color: #6c757d;
`;

const MovieCard = ({ movie, onAddToCart }) => {
  const { user } = useAuth();

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <CardContainer>
        <Link to={`/movie/${movie.id}`} aria-label={`Ver detalles de ${movie.title}`}>
          <CardImage
            src={movie.poster || 'https://via.placeholder.com/300x450/333/fff?text=Movie+Poster'}
            alt={movie.title}
          />
        </Link>
        <CardBody>
          <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <CardTitle>{movie.title}</CardTitle>
          </Link>
          <CardText>{movie.description}</CardText>
          <CardFooter>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Badge>{movie.category}</Badge>
              <Price>${movie.price}</Price>
            </div>
            {user ? (
              <Button onClick={() => onAddToCart(movie)} aria-label={`Agregar ${movie.title} al carrito`}>
                🛒 Agregar al Carrito
              </Button>
            ) : (
              <InfoText>Inicia sesión para comprar</InfoText>
            )}
          </CardFooter>
        </CardBody>
      </CardContainer>
    </div>
  );
};

export default MovieCard;
