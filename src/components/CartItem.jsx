import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useContext(CartContext);

    return (
        <div className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />

            <div className="cart-item-details">
                <h4 className="cart-item-name">{item.name}</h4>
                <p className="cart-item-presentation">
                    {item.selectedVariant ? `Peso: ${item.selectedVariant}` : (item.presentation || '')}
                </p>
                <p className="cart-item-price">${item.price.toLocaleString('es-AR')}</p>
            </div>

            <div className="cart-item-actions">
                <div className="cart-quantity-controls">
                    <button
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity - 1)}
                    >
                        -
                    </button>
                    <span className="cart-qty-val">{item.quantity}</span>
                    <button
                        className="cart-qty-btn"
                        onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity + 1)}
                    >
                        +
                    </button>
                </div>

                <p className="cart-item-subtotal">
                    ${(item.price * item.quantity).toLocaleString('es-AR')}
                </p>

                <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item.cartItemId || item.id)}
                    title="Eliminar producto"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CartItem;
