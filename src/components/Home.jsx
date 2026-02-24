import './Home.css';

const Home = ({ onNavigate }) => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Bienvenido a Drupa</h1>
                    <p className="hero-subtitle">
                        Tu dietética de confianza. Encontrá la mejor selección de frutos secos, semillas, cereales y mucho más.
                    </p>
                    <button className="cta-button" onClick={() => onNavigate('products')}>
                        Ver Productos
                    </button>
                </div>
            </section>

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
                        <h2>Nuestra Misión</h2>
                        <p>
                            En <strong>Drupa</strong> creemos en una alimentación sana y natural.
                            Por eso nos dedicamos a acercar productos de primera calidad, sin procesamientos innecesarios,
                            directo a tu mesa. Con la calidez y el servicio que nos caracteriza, buscamos ser tu principal
                            opción en el mundo de la alimentación consciente.
                        </p>
                    </div>
                    <div className="about-image-wrapper">
                        <img src="https://images.unsplash.com/photo-1601598910408-0114a1c0d508?auto=format&fit=crop&q=80&w=800" alt="Alimentación Natural" className="about-logo" style={{ borderRadius: 'var(--radius-lg)' }} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
