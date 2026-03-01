import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <motion.div
                className="not-found-content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1>404</h1>
                <h2>¡Ups! Página no encontrada</h2>
                <p>Parece que la página que buscas no existe o fue movida.</p>
                <button className="cta-button" onClick={() => navigate('/')}>
                    Volver al Inicio
                </button>
            </motion.div>
        </div>
    );
};

export default NotFound;
