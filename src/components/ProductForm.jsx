import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Modal = styled.div`
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1050;
`;

const ModalDialog = styled.div`
  max-width: 800px;
  margin: 1.75rem auto;
`;

const ModalContent = styled.div`
  background-color: #1a1a1a;
  color: white;
  border-radius: 0.3rem;
`;

const ModalHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h5`
  margin: 0;
  font-size: 1.25rem;
`;

const ModalBody = styled.div`
  padding: 1rem;
`;

const ModalFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #333;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const FormControl = styled.input`
  background-color: #2c2c2c;
  color: white;
  border: 1px solid #444;
  border-radius: 0.25rem;
  padding: 0.5rem;
  width: 100%;
`;

const FormSelect = styled.select`
  background-color: #2c2c2c;
  color: white;
  border: 1px solid #444;
  border-radius: 0.25rem;
  padding: 0.5rem;
  width: 100%;
`;

const TextArea = styled.textarea`
  background-color: #2c2c2c;
  color: white;
  border: 1px solid #444;
  border-radius: 0.25rem;
  padding: 0.5rem;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  &.primary {
    background-color: #007bff;
    color: white;
    &:hover {
      background-color: #0056b3;
    }
  }
  &.secondary {
    background-color: #6c757d;
    color: white;
    &:hover {
      background-color: #5a6268;
    }
  }
`;

const PreviewImage = styled.img`
  max-width: 150px;
  max-height: 200px;
  border-radius: 0.25rem;
  background-color: #2c2c2c;
  border: 1px solid #444;
`;

const ProductForm = ({ movie, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: movie?.id || undefined,
    title: movie?.title || '',
    description: movie?.description || '',
    category: movie?.category || 'Acción',
    price: movie?.price || '',
    poster: movie?.poster || '',
    actors: movie?.actors || ''
  });

  const categories = [
    'Acción', 'Aventura', 'Comedia', 'Drama', 'Ciencia Ficción',
    'Terror', 'Fantasía', 'Musical', 'Western', 'Bélico', 'Histórico',
    'Animación', 'Documental'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones
    if (!formData.title) {
      toast.error('El título es obligatorio');
      return;
    }
    if (!formData.description || formData.description.length < 10) {
      toast.error('La descripción debe tener al menos 10 caracteres');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error('El precio debe ser mayor a 0');
      return;
    }
    if (formData.poster && !isValidUrl(formData.poster)) {
      toast.error('La URL del póster no es válida');
      return;
    }
    if (movie && !formData.id) {
      toast.error('Error: ID de la película no especificado');
      return;
    }

    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      id: movie ? formData.id : undefined
    });
  };

  const isValidUrl = (url) => {
    if (!url || url.trim() === '') return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <Modal>
      <ModalDialog>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{movie ? 'Editar Película' : 'Agregar Nueva Película'}</ModalTitle>
            <Button className="secondary" onClick={onCancel}>✕</Button>
          </ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Título</label>
                    <FormControl
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <FormSelect
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </FormSelect>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Precio ($)</label>
                    <FormControl
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <TextArea
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Actores (separados por comas)</label>
                    <FormControl
                      type="text"
                      value={formData.actors}
                      onChange={(e) => setFormData({ ...formData, actors: e.target.value })}
                      placeholder="Ej: Leonardo DiCaprio, Kate Winslet"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">URL del Póster (opcional)</label>
                    <FormControl
                      type="url"
                      value={formData.poster}
                      onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                      placeholder="https://ejemplo.com/poster.jpg"
                    />
                  </div>
                  {formData.poster && formData.poster.trim() !== '' && (
                    <div className="text-center">
                      <PreviewImage
                        src={formData.poster}
                        alt="Vista previa"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          toast.warn('No se pudo cargar la imagen del póster');
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button type="button" className="secondary" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" className="primary">
                {movie ? 'Actualizar' : 'Agregar'} Película
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </ModalDialog>
    </Modal>
  );
};

export default ProductForm;
