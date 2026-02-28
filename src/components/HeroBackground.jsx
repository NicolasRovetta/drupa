import './HeroBackground.css';

const HeroBackground = () => {
    // Array de emojis relacionados a alimentos saludables/naturaleza
    const elements = ['🍃', '🌿', '🌾', '🥑', '🥜', '🌰', '🌻', '🍎', '🥕', '🍓'];

    // Generamos 15 elementos flotantes para el fondo
    const floatingItems = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        emoji: elements[i % elements.length],
        left: `${Math.random() * 100}%`,
        // Duración de animación aleatoria entre 15 y 30 segundos
        animationDuration: `${15 + Math.random() * 15}s`,
        // Retraso de start aleatorio para que no salgan todos juntos en la misma línea
        animationDelay: `-${Math.random() * 20}s`,
        // Tamaño aleatorio
        fontSize: `${2 + Math.random() * 3}rem`,
        // Opacidad muy baja para que no interfiera con el texto, aportando un efecto visual rico
        opacity: 0.1 + Math.random() * 0.15
    }));

    return (
        <div className="hero-background-container">
            {floatingItems.map((item) => (
                <div
                    key={item.id}
                    className="hero-floating-item"
                    style={{
                        left: item.left,
                        animationDuration: item.animationDuration,
                        animationDelay: item.animationDelay,
                        fontSize: item.fontSize,
                        opacity: item.opacity
                    }}
                >
                    {item.emoji}
                </div>
            ))}
        </div>
    );
};

export default HeroBackground;
