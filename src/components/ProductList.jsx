import { useState } from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = () => {
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    // Extract unique categories
    const categories = ['Todos', ...new Set(products.map(p => p.category))];

    const filteredProducts = selectedCategory === 'Todos'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <section className="product-section">
            <div className="product-list-container">

                <div className="section-header">
                    <h2 className="section-title">Nuestros Productos</h2>

                    <div className="category-filters">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ProductList;
