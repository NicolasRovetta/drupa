import { FaWhatsapp } from 'react-icons/fa';
import './FloatingWhatsApp.css';

const FloatingWhatsApp = () => {
    // Reemplazar con el número real de Drupa
    const phoneNumber = '5492323343383';
    const message = '¡Hola! Me gustaría hacer una consulta.';
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-wa-btn"
            aria-label="Contactar por WhatsApp"
        >
            <FaWhatsapp size={32} />
        </a>
    );
};

export default FloatingWhatsApp;
