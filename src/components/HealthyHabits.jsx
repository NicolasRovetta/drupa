import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './HealthyHabits.css';

const FAQ_DATA = [
    {
        question: "¿Qué significa que un producto sea realmente orgánico?",
        answer: "Un producto orgánico es aquel que se cultiva sin el uso de pesticidas sintéticos, fertilizantes químicos, organismos genéticamente modificados (OGMs) ni radiación. En Drupa, nos aseguramos de que nuestros proveedores cumplan con estrictos estándares de agroecología."
    },
    {
        question: "¿Cuáles son los beneficios reales de consumir frutos secos a diario?",
        answer: "Los frutos secos son una excelente fuente de grasas saludables (Omega 3 y 6), proteínas vegetales, fibra, vitaminas (como la E) y minerales (magnesio, zinc). Un puñado al día ayuda a proteger la salud cardiovascular, mejora la función cerebral y aporta saciedad duradera."
    },
    {
        question: "¿Por qué elegir alimentos sin conservantes artificiales?",
        answer: "Los conservantes artificiales pueden alterar la flora intestinal y causar inflamación a largo plazo. Consumir alimentos en su estado natural o con conservantes naturales asegura una mejor absorción de nutrientes y un funcionamiento óptimo del sistema digestivo."
    },
    {
        question: "¿Cómo puedo incorporar semillas en mi dieta diaria?",
        answer: "¡Es muy fácil! Puedes espolvorear chía o lino molido sobre tu yogur o avena, agregar semillas de girasol o calabaza a tus ensaladas para darles un toque crujiente, o mezclarlas en tus batidos (smoothies) antes de licuar."
    }
];

const HealthyHabits = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger entrance animations
        setIsVisible(true);
        window.scrollTo(0, 0);
    }, []);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className={`healthy-habits-container ${isVisible ? 'visible' : ''}`}>
            <Helmet>
                <title>Hábitos Saludables | Drupa Tienda Saludable</title>
                <meta name="description" content="Descubrí los beneficios de una dieta orgánica y natural. Consejos, preguntas frecuentes e información sobre alimentación consciente." />
            </Helmet>

            <section className="habits-hero">
                <div className="hero-content">
                    <span className="hero-badge">Estilo de Vida Drupa</span>
                    <h1 className="hero-title">Transformá tu vida con <br className="hide-mobile" /><span className="highlight">Hábitos Saludables</span></h1>
                    <p className="hero-subtitle">
                        La alimentación consciente no es una dieta, es una forma de vivir. Descubrí cómo pequeños cambios pueden generar un gran impacto en tu energía y bienestar diario.
                    </p>
                </div>

                {/* Floating decorative elements */}
                <div className="floating-elements">
                    <div className="float-item leaf-1">🍃</div>
                    <div className="float-item nut-1">🥜</div>
                    <div className="float-item almond-1">🌰</div>
                    <div className="float-item seed-1">🌱</div>
                </div>
            </section>

            <section className="benefits-section">
                <div className="section-header">
                    <h2>El Poder de lo <span className="highlight">Natural</span></h2>
                    <p>Por qué elegir alimentos orgánicos y mínimamente procesados</p>
                </div>

                <div className="benefits-grid">
                    <div className="benefit-card">
                        <div className="benefit-icon">🌿</div>
                        <h3>Más Nutrientes</h3>
                        <p>Los suelos orgánicos son más ricos, lo que se traduce en alimentos con mayor concentración de vitaminas, minerales y antioxidantes clave para tu salud.</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">🛡️</div>
                        <h3>Sistema Inmune Fuerte</h3>
                        <p>Al evitar pesticidas y químicos, tu cuerpo no gasta energía en desintoxicarse, permitiendo que tu sistema inmunológico funcione al 100%.</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">🌎</div>
                        <h3>Cuidado del Planeta</h3>
                        <p>La agricultura ecológica protege la biodiversidad, cuida nuestras fuentes de agua y promueve un ecosistema sostenible para las futuras generaciones.</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">⚡</div>
                        <h3>Energía Real</h3>
                        <p>Al consumir alimentos de bajo índice glucémico como los frutos secos, obtienes energía estable durante todo el día sin los bajones del azúcar refinada.</p>
                    </div>
                </div>
            </section>

            <section className="faq-section">
                <div className="faq-container">
                    <div className="faq-intro">
                        <h2>Aprende con <span className="highlight">Drupa</span></h2>
                        <p>Resolvemos las dudas más frecuentes sobre alimentación saludable e ingredientes naturales.</p>
                        <div className="faq-decoration">💡</div>
                    </div>

                    <div className="faq-list">
                        {FAQ_DATA.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item ${openFaq === index ? 'open' : ''}`}
                                onClick={() => toggleFaq(index)}
                            >
                                <div className="faq-question">
                                    <h3>{faq.question}</h3>
                                    <span className="faq-toggle-icon">
                                        {openFaq === index ? '−' : '+'}
                                    </span>
                                </div>
                                <div
                                    className="faq-answer-wrapper"
                                    style={{
                                        maxHeight: openFaq === index ? '200px' : '0px',
                                        opacity: openFaq === index ? 1 : 0
                                    }}
                                >
                                    <p className="faq-answer">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="cta-box">
                    <h2>¿Listo para empezar tu cambio?</h2>
                    <p>Nuestra sección de productos tiene todo lo que necesitas para dar el primer paso hacia una vida más sana.</p>
                    <a href="/products" className="cta-button">Ver Nuestros Productos</a>
                </div>
            </section>
        </div>
    );
};

export default HealthyHabits;
