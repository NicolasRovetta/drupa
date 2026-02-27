import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { client } from '../sanityClient';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch all products from Sanity
                const query = '*[_type == "product"]';
                const sanityProducts = await client.fetch(query);
                setProducts(sanityProducts);
            } catch (error) {
                console.error('Error fetching products from Sanity:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Extract unique categories, filter out undefined just in case
    const categories = ['Todos', ...new Set(products.map(p => p.category).filter(Boolean))];

    let filteredProducts = products;

    if (searchQuery) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }

    if (selectedCategory !== 'Todos') {
        filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
    }

    return (
        <section className="product-section">
            <div className="product-list-container">

                <div className="section-header">
                    <h2 className="section-title">
                        {searchQuery ? `Resultados de búsqueda: "${searchQuery}"` : 'Nuestros Productos'}
                    </h2>

                    <div className="category-filters">
                        {categories.map(cat => {
                            // Si es "Todos", lo dejamos igual. Si es una categoría de Sanity ("frutos-secos"), le damos formato.
                            const formattedCat = cat === 'Todos' ? cat : cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

                            return (
                                <button
                                    key={cat}
                                    className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {formattedCat}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', fontSize: '1.2rem' }}>
                        Cargando catálogo...
                    </div>
                ) : (
                    <div className="product-grid">
                        {filteredProducts.map(product => (
                            <ProductCard key={product._id || product.id} product={product} />
                        ))}
                        {filteredProducts.length === 0 && (
                            <p style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem' }}>
                                Aún no hay productos cargados en esta categoría o no hay resultados para tu búsqueda.
                            </p>
                        )}
                    </div>
                )}

            </div>
        </section>
    );
};

export default ProductList;
