import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header';
import LoginForm from './LoginForm';
import CartModal from './CartModal';
import SearchAndFilters from './SearchAndFilters';
import MovieCard from './MovieCard';
import MovieDetail from './MovieDetail';
import AdminPanel from './AdminPanel';
import styled, { keyframes } from 'styled-components';
import Footer from './Footer';

// Animaciones
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MainContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #071227 0%, #1a1a1a 100%);
  /* Remove fixed padding-top and use media query for responsiveness */
  padding-top: 56px; /* Height of Navbar */
  @media (max-width: 768px) {
    padding-top: 106px; /* Navbar (~56px) + SearchAndFilters (~50px) */
  }
`;

const MovieGrid = styled.div`
  animation: ${fadeInUp} 0.6s ease-out;
`;

const PaginationButton = styled.button`
  background-color: #09034aff;
  color: white;
  border: 1px solid #444;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  margin: 0 0.2rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #007bff;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
// MOCKAPI
const API_URL = 'https://687db570918b642243327cf9.mockapi.io/movies';

const BlockbusterApp = () => {
  const { user, loading } = useAuth();
  const { addToCart } = useCart();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(12);
  const location = useLocation();

  // Fetch con MockAPI
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data);
        setFilteredMovies(data);
      } catch (err) {
        toast.error('Error al cargar películas: ' + err.message);
      }
    };
    fetchMovies();
  }, []);

  // Filtrar peliculas basadas en titulo y en categoria
  useEffect(() => {
    let filtered = [...movies];
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'Todas') {
      filtered = filtered.filter(movie => movie.category === selectedCategory);
    }
    setFilteredMovies(filtered);
    setCurrentPage(1);
  }, [movies, searchTerm, selectedCategory]);

// Agregar una pelicula
  const handleAddMovie = async (movieData) => {
  try {
    if (movieData.isFeatured) {
      // Desmarcar todas las películas como destacadas
      const promises = movies
        .filter(m => m.isFeatured)
        .map(m =>
          fetch(`${API_URL}/${m.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...m, isFeatured: false }),
          })
        );
      await Promise.all(promises);
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movieData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const newMovie = await response.json();
    setMovies(prev => [...prev, newMovie]);
    toast.success('Película agregada con éxito');
  } catch (err) {
    toast.error('Error al agregar la película: ' + err.message);
  }
};
//Editar una pelicula
const handleEditMovie = async (movieData) => {
  try {
    if (movieData.isFeatured) {
      // Desmarcar todas las demás películas como destacadas
      const promises = movies
        .filter(m => m.isFeatured && m.id !== movieData.id)
        .map(m =>
          fetch(`${API_URL}/${m.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...m, isFeatured: false }),
          })
        );
      await Promise.all(promises);
    }

    const response = await fetch(`${API_URL}/${movieData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movieData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const updatedMovie = await response.json();
    setMovies(prev =>
      prev.map(movie =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );
    toast.success('Película actualizada con éxito');
  } catch (err) {
    toast.error('Error al editar la película: ' + err.message);
  }
};

  // Eliminar pelicula
  const handleDeleteMovie = async (movieId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      try {
        const response = await fetch(`${API_URL}/${movieId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setMovies(prev => prev.filter(movie => movie.id !== movieId));
        toast.success('Película eliminada con éxito');
      } catch (err) {
        toast.error('Error al eliminar la película: ' + err.message);
      }
    }
  };

  //  Agregar al carrito
  const handleAddToCart = (movie) => {
    addToCart(movie);
    toast.success(`${movie.title} agregado al carrito`);
  };

  // El pagina a pagina
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // SEO dinamico
  const pageTitle = searchTerm
    ? `Buscando "${searchTerm}" - Blockbuster`
    : selectedCategory !== 'Todas'
    ? `${selectedCategory} - Blockbuster - Página ${currentPage}`
    : `Blockbuster - Tienda de Películas - Página ${currentPage}`;
  const pageDescription = searchTerm
    ? `Resultados de búsqueda para "${searchTerm}" en Blockbuster. Encuentra las mejores películas.`
    : selectedCategory !== 'Todas'
    ? `Explora películas de ${selectedCategory} en Blockbuster. Página ${currentPage} de ${totalPages}.`
    : 'Descubre una amplia selección de películas en Blockbuster, desde clásicos hasta los últimos estrenos.';
  const keywords = [
    'películas',
    'cine',
    'Blockbuster',
    searchTerm || selectedCategory !== 'Todas' ? selectedCategory : 'todos los géneros',
  ].join(', ');

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <div className="text-white">
          <div className="spinner-border text-primary me-3" role="status"></div>
          Cargando Blockbuster...
        </div>
      </div>
    );
  }

  return (
    <MainContainer>
      <Helmet>
        {location.pathname === '/' || location.pathname === '/movies' ? (
          <>
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta name="keywords" content={keywords} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta name="robots" content="index, follow" />
          </>
        ) : null}
      </Helmet>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Header
        onShowLogin={() => setShowLogin(true)}
        onShowCart={() => setShowCart(true)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchAndFilters
                onSearch={setSearchTerm}
                onCategoryChange={setSelectedCategory}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
              />
              {user?.role === 'admin' && (
                <AdminPanel
                  movies={movies}
                  onAddMovie={handleAddMovie}
                  onEditMovie={handleEditMovie}
                  onDeleteMovie={handleDeleteMovie}
                />
              )}
              <div className="container py-4">
                {currentMovies.length === 0 ? (
                  <div className="text-center text-white py-5">
                    <h3>No se encontraron películas</h3>
                    <p className="text-muted">
                      {searchTerm || selectedCategory !== 'Todas'
                        ? 'Intenta ajustar tus filtros de búsqueda'
                        : 'Agrega algunas películas para comenzar'}
                    </p>
                  </div>
                ) : (
                  <MovieGrid className="row">
                    {currentMovies.map(movie => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </MovieGrid>
                )}
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center mt-4">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <PaginationButton
                        onClick={() => paginate(currentPage - 1)}
                        aria-label="Página anterior"
                      >
                        Anterior
                      </PaginationButton>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                      >
                        <PaginationButton
                          onClick={() => paginate(index + 1)}
                          aria-label={`Página ${index + 1}`}
                        >
                          {index + 1}
                        </PaginationButton>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <PaginationButton
                        onClick={() => paginate(currentPage + 1)}
                        aria-label="Página siguiente"
                      >
                        Siguiente
                      </PaginationButton>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <SearchAndFilters
                onSearch={setSearchTerm}
                onCategoryChange={setSelectedCategory}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
              />
              {user?.role === 'admin' && (
                <AdminPanel
                  movies={movies}
                  onAddMovie={handleAddMovie}
                  onEditMovie={handleEditMovie}
                  onDeleteMovie={handleDeleteMovie}
                />
              )}
              <div className="container py-4">
                {currentMovies.length === 0 ? (
                  <div className="text-center text-white py-5">
                    <h3>No se encontraron películas</h3>
                    <p className="text-muted">
                      {searchTerm || selectedCategory !== 'Todas'
                        ? 'Intenta ajustar tus filtros de búsqueda'
                        : 'Agrega algunas películas para comenzar'}
                    </p>
                  </div>
                ) : (
                  <MovieGrid className="row">
                    {currentMovies.map(movie => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </MovieGrid>
                )}
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center mt-4">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <PaginationButton
                        onClick={() => paginate(currentPage - 1)}
                        aria-label="Página anterior"
                      >
                        Anterior
                      </PaginationButton>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                      >
                        <PaginationButton
                          onClick={() => paginate(index + 1)}
                          aria-label={`Página ${index + 1}`}
                        >
                          {index + 1}
                        </PaginationButton>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <PaginationButton
                        onClick={() => paginate(currentPage + 1)}
                        aria-label="Página siguiente"
                      >
                        Siguiente
                      </PaginationButton>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          }
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
      {showLogin && (
        <LoginForm onClose={() => setShowLogin(false)} />
      )}
      <CartModal
        show={showCart}
        onClose={() => setShowCart(false)}
      />
      <Footer />
    </MainContainer>
  );
};

export default BlockbusterApp;
