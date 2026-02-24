import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        // Optional UI feedback could go here
        setQuantity(1); // Reset after adding
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <span className="product-category">{product.category}</span>
            </div>

            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-presentation">{product.presentation}</p>
                <p className="product-price">${product.price.toLocaleString('es-AR')}</p>

                <div className="product-actions">
                    <div className="quantity-controls">
                        <button className="qty-btn" onClick={handleDecrement}>-</button>
                        <span className="qty-val">{quantity}</span>
                        <button className="qty-btn" onClick={handleIncrement}>+</button>
                    </div>
                    <button className="add-cart-btn" onClick={handleAddToCart}>
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
