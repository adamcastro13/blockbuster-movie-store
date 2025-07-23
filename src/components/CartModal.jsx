import React from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const CartModal = ({ show, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  const handleRemove = (itemId, itemTitle) => {
    removeFromCart(itemId);
    toast.info(`${itemTitle} eliminado del carrito`);
  };

  const handleUpdateQuantity = (itemId, quantity, itemTitle) => {
    updateQuantity(itemId, quantity);
    toast.info(`Cantidad de ${itemTitle} actualizada`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.info('Carrito vaciado');
  };

  const handleCheckout = () => {
    toast.success('Compra finalizada con éxito');
    clearCart();
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header border-secondary">
            <h5 className="modal-title">🛒 Tu Carrito de Compras</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {cart.length === 0 ? (
              <div className="text-center py-4">
                <p className="fs-5">Tu carrito está vacío</p>
                <p className="text-muted">¡Agrega algunas películas geniales!</p>
              </div>
            ) : (
              <>
                <div className="row">
                  <div className="col-md-8">
                    {cart.map(item => (
                      <div
                        key={item.id}
                        className="d-flex align-items-center justify-content-between border-bottom border-secondary py-3"
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={item.poster || 'https://via.placeholder.com/60x90/333/fff?text=Movie'}
                            alt={item.title}
                            className="me-3"
                            style={{ width: '60px', height: '90px', objectFit: 'cover' }}
                          />
                          <div>
                            <h6 className="mb-1">{item.title}</h6>
                            <small className="text-muted">{item.category}</small>
                            <div className="mt-1">
                              <span className="badge bg-warning text-dark">${item.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-sm btn-outline-light"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.title)}
                            >
                              -
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button
                              className="btn btn-sm btn-outline-light"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.title)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleRemove(item.id, item.title)}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-secondary text-white p-3">
                      <h5>Resumen de la Compra</h5>
                      <hr />
                      <p>Total: <strong>${getTotalPrice().toFixed(2)}</strong></p>
                      <button
                        className="btn btn-success w-100"
                        onClick={handleCheckout}
                      >
                        Finalizar Compra
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="modal-footer border-secondary">
            {cart.length > 0 && (
              <button className="btn btn-outline-danger me-2" onClick={handleClearCart}>
                Vaciar Carrito
              </button>
            )}
            <button className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
