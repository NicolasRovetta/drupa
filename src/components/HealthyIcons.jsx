import './HealthyIcons.css';

const HealthyIcons = () => {
    const icons = [
        { emoji: '🥑', label: 'Palta' },
        { emoji: '🥜', label: 'Maní' },
        { emoji: '🌾', label: 'Avena' },
        { emoji: '🍎', label: 'Manzana' },
        { emoji: '🍓', label: 'Frutilla' },
        { emoji: '🥦', label: 'Brócoli' },
        { emoji: '🥕', label: 'Zanahoria' },
        { emoji: '🍯', label: 'Miel' },
        { emoji: '🫐', label: 'Arándanos' },
        { emoji: '🌿', label: 'Menta' }
    ];

    return (
        <div className="healthy-icons-container">
            {icons.map((item, index) => (
                <div
                    key={index}
                    className={`healthy-icon icon-${index}`}
                    title={item.label}
                >
                    {item.emoji}
                </div>
            ))}
            <div className="healthy-icons-center">
                <span>100%<br />Natural</span>
            </div>
        </div>
    );
};

export default HealthyIcons;
