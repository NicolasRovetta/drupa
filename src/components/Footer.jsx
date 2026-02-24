const Footer = () => {
    return (
        <footer style={{
            backgroundColor: 'var(--color-dark)',
            color: 'var(--color-surface)',
            textAlign: 'center',
            padding: '2rem',
            marginTop: 'auto'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h3 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>Drupa Dietética</h3>
                <p style={{ color: 'var(--color-text-gray)', fontSize: '0.9rem' }}>
                    © {new Date().getFullYear()} Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
