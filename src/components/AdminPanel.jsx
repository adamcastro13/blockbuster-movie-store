import React, { useState } from 'react';
import ProductForm from './ProductForm';
import { toast } from 'react-toastify';

const AdminPanel = ({ movies, onAddMovie, onEditMovie, onDeleteMovie }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const handleSubmit = (movieData) => {
    if (editingMovie) {
      onEditMovie(movieData);
    } else {
      onAddMovie(movieData);
    }
    setShowForm(false);
    setEditingMovie(null);
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMovie(null);
  };

  // Nueva función para marcar una película como destacada
  const handleSetFeatured = async (movie) => {
    try {
      // Primero, desmarcar todas las películas como destacadas
      const promises = movies
        .filter(m => m.isFeatured && m.id !== movie.id)
        .map(m =>
          fetch(`https://687db570918b642243327cf9.mockapi.io/movies/${m.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...m, isFeatured: false }),
          })
        );
      await Promise.all(promises);

      // Luego, marcar la película seleccionada como destacada
      const response = await fetch(`https://687db570918b642243327cf9.mockapi.io/movies/${movie.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...movie, isFeatured: true }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      onEditMovie({ ...movie, isFeatured: true });
      toast.success(`"${movie.title}" establecida como película destacada`);
    } catch (err) {
      toast.error('Error al establecer la película destacada: ' + err.message);
    }
  };

  return (
    <div className="bg-dark text-white p-4 mb-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>🛠️ Panel de Administración</h4>
          <button className="btn btn-success" onClick={() => setShowForm(true)}>
            + Agregar Película
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Destacada</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie.id}>
                  <td>{movie.title}</td>
                  <td><span className="badge bg-info">{movie.category}</span></td>
                  <td>${movie.price}</td>
                  <td>{movie.isFeatured ? '⭐ Sí' : 'No'}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => handleEdit(movie)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger me-2"
                      onClick={() => onDeleteMovie(movie.id)}
                    >
                      🗑️ Eliminar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleSetFeatured(movie)}
                      disabled={movie.isFeatured}
                    >
                      ⭐ Marcar como Destacada
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showForm && (
          <ProductForm
            movie={editingMovie}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;