import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
    const [selectedVariant, setSelectedVariant] = useState(null); // Ej: { name: '250g', price: 1500 }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const query = `*[_type == "product" && _id == $id][0]`;
                const result = await client.fetch(query, { id });
                setProduct(result);
                // Si el producto tiene variantes, auto-seleccionar la primera por defecto
                if (result?.variants && result.variants.length > 0) {
                    setSelectedVariant(result.variants[0]);
                }
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
            // Pasamos un "product" modificado al carrito, inyectándole la variante elegida y pisando el precio
            const productToAdd = {
                ...product,
                selectedVariant: selectedVariant ? selectedVariant.name : null,
                price: selectedVariant ? selectedVariant.price : product.price
            };
            addToCart(productToAdd, quantity);
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

    const imageUrl = product.image ? urlFor(product.image).url() : (product.imageUrl || 'https://images.unsplash.com/photo-1601598910408-0114a1c0d508?auto=format&fit=crop&q=80&w=800');
    // El precio visual se decide entre la variante elegida o el precio default
    const displayPrice = selectedVariant ? selectedVariant.price : (product.price || 0);

    const seoTitle = `${product.name} | Drupa Tienda Saludable`;
    const seoDesc = product.description ? product.description.substring(0, 150) + '...' : `Comprá ${product.name} al mejor precio en Drupa.`;

    return (
        <div className="pdp-container fade-in">
            <Helmet>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDesc} />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDesc} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:type" content="product" />
            </Helmet>

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

                    <p className="pdp-price">${displayPrice.toLocaleString('es-AR')}</p>

                    {product.variants && product.variants.length > 0 && (
                        <div className="pdp-variants">
                            <h3 className="variants-title">Seleccionar Peso/Tamaño</h3>
                            <div className="variants-options">
                                {product.variants.map((v, idx) => (
                                    <button
                                        key={idx}
                                        className={`variant-btn ${selectedVariant?.name === v.name ? 'selected' : ''}`}
                                        onClick={() => setSelectedVariant(v)}
                                    >
                                        {v.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

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
