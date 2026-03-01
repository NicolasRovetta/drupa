import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../sanityClient';
import urlBuilder from '@sanity/image-url';
import HealthyIcons from './HealthyIcons';
import HeroBackground from './HeroBackground';
import { motion } from 'framer-motion';
import './Home.css';

const builder = urlBuilder(client);
function urlFor(source) {
    return builder.image(source).auto('format').fit('max');
}

const Home = () => {
    const navigate = useNavigate();
    const [homeData, setHomeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                // Fetch el primer documento del tipo homePage
                const homeResult = await client.fetch('*[_type == "homePage"][0]');
                setHomeData(homeResult);
            } catch (error) {
                console.error('Error fetching home data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    useEffect(() => {
        if (!loading) {
            window.dispatchEvent(new Event('sanityDataLoaded'));
        }
    }, [loading]);

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
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {heroTitle}
                    </motion.h1>
                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {heroSubtitle}
                    </motion.p>
                    <motion.button
                        className="cta-button"
                        onClick={() => navigate('/products')}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Ver Productos
                    </motion.button>
                </div>
            </section>



            {/* Info Section */}
            <section className="info-section">
                <div className="info-grid">
                    {[
                        { icon: '🌿', title: 'Calidad Premium', desc: 'Seleccionamos cuidadosamente nuestros productos para ofrecerte siempre lo mejor.' },
                        { icon: '⚖️', title: 'Venta a Granel', desc: 'Llevá la cantidad exacta que necesitás, desde pequeñas porciones hasta kilos.' },
                        { icon: '🚚', title: 'Envíos Rápidos', desc: 'Comprá online y recibí tu pedido en la puerta de tu casa de forma rápida y segura.' }
                    ].map((info, idx) => (
                        <motion.div
                            className="info-card"
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                        >
                            <div className="info-icon">{info.icon}</div>
                            <h3>{info.title}</h3>
                            <p>{info.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* About Us Mini Section */}
            <motion.section
                className="about-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <div className="about-content">
                    <div className="about-text">
                        <h2>{aboutTitle}</h2>
                        <p>{aboutText}</p>
                    </div>
                    <div className="about-image-wrapper">
                        <HealthyIcons />
                    </div>
                </div>
            </motion.section>

            {/* Testimonials Section (New) */}
            <section className="testimonials-section">
                <h2>Lo que dicen nuestros clientes</h2>
                <div className="testimonials-grid">
                    {[
                        { name: "Luciana G.", text: "¡Los frutos secos son fresquísimos! El envío llegó rapidísimo a casa. Totalmente recomendados.", rating: 5 },
                        { name: "Martín P.", text: "Excelente atención por WhatsApp. Me asesoraron sobre qué semillas me convenían más. Superó mis expectativas.", rating: 5 },
                        { name: "Camila R.", text: "La mejor dietética de la zona. Comprar a granel desde la web es muy cómodo y los precios son muy buenos.", rating: 4 }
                    ].map((testimonial, idx) => (
                        <motion.div
                            className="testimonial-card"
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.15 }}
                        >
                            <div className="stars">{"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}</div>
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <p className="testimonial-author">- {testimonial.name}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
