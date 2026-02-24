import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';
import './Cart.css';

const Cart = ({ onNavigate }) => {
    const { cart, cartTotal, clearCart } = useContext(CartContext);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = () => {
        setIsCheckingOut(true);
        // Simulate checkout process
        setTimeout(() => {
            alert('¡Gracias por tu compra en Drupa!');
            clearCart();
            setIsCheckingOut(false);
            onNavigate('home');
        }, 1500);
    };

    if (cart.length === 0) {
        return (
            <div className="cart-empty-container">
                <h2>Tu carrito está vacío</h2>
                <p>Parece que aún no has agregado productos a tu carrito.</p>
                <button className="back-to-shop-btn" onClick={() => onNavigate('products')}>
                    Ir a la tienda
                </button>
            </div>
        );
    }

    return (
        <section className="cart-section">
            <div className="cart-container">
                <h2 className="cart-title">Tu Carrito de Compras</h2>

                <div className="cart-content">
                    <div className="cart-items-list">
                        {cart.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Resumen del Pedido</h3>

                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${cartTotal.toLocaleString('es-AR')}</span>
                        </div>
                        <div className="summary-row">
                            <span>Envío</span>
                            <span>Calculado en el checkout</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row total">
                            <span>Total Estimado</span>
                            <span>${cartTotal.toLocaleString('es-AR')}</span>
                        </div>

                        <button
                            className="checkout-btn"
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                        >
                            {isCheckingOut ? 'Procesando...' : 'Finalizar Compra'}
                        </button>

                        <button className="continue-shopping-btn" onClick={() => onNavigate('products')}>
                            Seguir Comprando
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;
