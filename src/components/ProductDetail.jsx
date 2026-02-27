import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { client } from '../sanityClient';
import urlBuilder from '@sanity/image-url';
import { CartContext } from '../context/CartContext';
import './ProductDetail.css';

const builder = urlBuilder(client);
function urlFor(source) {
    return builder.image(source);
}

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const query = `*[_type == "product" && _id == $id][0]`;
                const result = await client.fetch(query, { id });
                setProduct(result);
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => quantity > 1 && setQuantity(prev => prev - 1);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            setQuantity(1);
        }
    };

    if (loading) {
        return <div className="pdp-loading">Cargando producto...</div>;
    }

    if (!product) {
        return (
            <div className="pdp-error">
                <h2>Producto no encontrado</h2>
                <button onClick={() => navigate('/products')} className="back-btn">Volver a la tienda</button>
            </div>
        );
    }

    const imageUrl = product.image ? urlFor(product.image).url() : product.imageUrl;
    const price = product.price || 0;

    return (
        <div className="pdp-container fade-in">
            <button className="back-btn" onClick={() => navigate(-1)}>← Volver</button>

            <div className="pdp-grid">
                <div className="pdp-image-section">
                    {imageUrl ? (
                        <img src={imageUrl} alt={product.name} className="pdp-image" />
                    ) : (
                        <div className="pdp-no-image">Sin imagen</div>
                    )}
                </div>

                <div className="pdp-info-section">
                    {product.category && <span className="pdp-category">{product.category}</span>}
                    <h1 className="pdp-title">{product.name}</h1>
                    <p className="pdp-presentation">{product.presentation || ''}</p>
                    <p className="pdp-price">${price.toLocaleString('es-AR')}</p>

                    <div className="pdp-description">
                        <h3>Descripción</h3>
                        <p>{product.description || 'Este producto no cuenta con descripción detallada por el momento.'}</p>
                    </div>

                    <div className="pdp-actions">
                        <div className="quantity-controls pdp-quantity">
                            <button className="qty-btn" onClick={handleDecrement}>-</button>
                            <span className="qty-val">{quantity}</span>
                            <button className="qty-btn" onClick={handleIncrement}>+</button>
                        </div>
                        <button className="add-cart-btn pdp-add-btn" onClick={handleAddToCart}>
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
