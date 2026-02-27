import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { urlFor } from '../sanityClient';
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
        setQuantity(1);
    };

    // Parse image and fallback for mock data if needed
    const imageUrl = product.image ? urlFor(product.image).url() : product.imageUrl;
    const price = product.price || 0;

    return (
        <div className="product-card">
            <Link to={`/producto/${product._id || product.id}`} className="product-image-container" style={{ display: 'block' }}>
                {imageUrl ? (
                    <img src={imageUrl} alt={product.name} className="product-image" />
                ) : (
                    <div style={{ height: '220px', backgroundColor: 'var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Sin imagen
                    </div>
                )}
                {product.category && <span className="product-category">{product.category}</span>}
            </Link>

            <div className="product-info">
                <Link to={`/producto/${product._id || product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className="product-name">{product.name}</h3>
                </Link>
                <p className="product-presentation">{product.presentation || ''}</p>
                <p className="product-price">${price.toLocaleString('es-AR')}</p>

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
