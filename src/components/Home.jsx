import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../sanityClient';
import urlBuilder from '@sanity/image-url';
import ProductCard from './ProductCard'; // Usar el cartón de productos ya creado
import HealthyIcons from './HealthyIcons';
import HeroBackground from './HeroBackground';
import './Home.css';

const builder = urlBuilder(client);
function urlFor(source) {
    return builder.image(source);
}

const Home = () => {
    const navigate = useNavigate();
    const [homeData, setHomeData] = useState(null);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                // Fetch el primer documento del tipo homePage y los productos destacados en paralelo
                const [homeResult, featuredResult] = await Promise.all([
                    client.fetch('*[_type == "homePage"][0]'),
                    client.fetch('*[_type == "product" && isFeatured == true] | order(_createdAt desc)[0...4]')
                ]);

                setHomeData(homeResult);
                setFeaturedProducts(featuredResult);
            } catch (error) {
                console.error('Error fetching home data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    // Fallbacks si no hay datos en CMS aún
    const heroTitle = homeData?.heroTitle || 'Bienvenido a Drupa';
    const heroSubtitle = homeData?.heroSubtitle || 'Tu dietética de confianza. Encontrá la mejor selección de frutos secos, semillas, cereales y mucho más.';
    const aboutTitle = homeData?.aboutTitle || 'Nuestra Misión';
    const aboutText = homeData?.aboutText || 'En Drupa creemos en una alimentación sana y natural. Por eso nos dedicamos a acercar productos de primera calidad, sin procesamientos innecesarios, directo a tu mesa. Con la calidez y el servicio que nos caracteriza, buscamos ser tu principal opción en el mundo de la alimentación consciente.';
    const aboutImageUrl = homeData?.aboutImage
        ? urlFor(homeData.aboutImage).url()
        : 'https://images.unsplash.com/photo-1601598910408-0114a1c0d508?auto=format&fit=crop&q=80&w=800';

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero">
                <HeroBackground />
                <div className="hero-content">
                    <h1 className="hero-title">{heroTitle}</h1>
                    <p className="hero-subtitle">{heroSubtitle}</p>
                    <button className="cta-button" onClick={() => navigate('/products')}>
                        Ver Productos
                    </button>
                </div>

            </section>

            {/* Featured Products Mini Section */}
            {featuredProducts && featuredProducts.length > 0 && (
                <section className="featured-section">
                    <div className="featured-header">
                        <h2>Productos Destacados</h2>
                        <button className="view-all-btn" onClick={() => navigate('/products')}>Ver catálogo completo</button>
                    </div>
                    <div className="products-grid">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </section>
            )}

            {/* Info Section */}
            <section className="info-section">
                <div className="info-grid">
                    <div className="info-card">
                        <div className="info-icon">🌿</div>
                        <h3>Calidad Premium</h3>
                        <p>Seleccionamos cuidadosamente nuestros productos para ofrecerte siempre lo mejor.</p>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">⚖️</div>
                        <h3>Venta a Granel</h3>
                        <p>Llevá la cantidad exacta que necesitás, desde pequeñas porciones hasta kilos.</p>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">🚚</div>
                        <h3>Envíos Rápidos</h3>
                        <p>Comprá online y recibí tu pedido en la puerta de tu casa de forma rápida y segura.</p>
                    </div>
                </div>
            </section>

            {/* About Us Mini Section */}
            <section className="about-section">
                <div className="about-content">
                    <div className="about-text">
                        <h2>{aboutTitle}</h2>
                        <p>{aboutText}</p>
                    </div>
                    <div className="about-image-wrapper">
                        <HealthyIcons />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
