import React, { useState } from 'react';
import ProductForm from './ProductForm';

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

  return (
    <div className="bg-dark text-white p-4 mb-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>🛠️ Panel de Administración</h4>
          <button
            className="btn btn-success"
            onClick={() => setShowForm(true)}
          >
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie.id}>
                  <td>{movie.title}</td>
                  <td><span className="badge bg-info">{movie.category}</span></td>
                  <td>${movie.price}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => handleEdit(movie)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDeleteMovie(movie.id)}
                    >
                      🗑️ Eliminar
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
