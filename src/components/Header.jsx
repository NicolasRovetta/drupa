import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
    const { cartItemCount } = useContext(CartContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
            setSearchTerm('');
        }
    };

    return (
        <>
            <div className="header-placeholder"></div>
            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header-container">
                    <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
                        <div className="logo-wrapper">
                            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Drupa Logo" className="logo-img" />
                            <h1 className="logo-text">Drupa</h1>
                        </div>
                    </Link>

                    <nav className="nav-menu">
                        <ul className="nav-links">
                            <li>
                                <Link to="/" className="nav-link">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="nav-link">
                                    Productos
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="header-actions">
                        <form className="search-form" onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <button type="submit" className="search-btn" aria-label="Buscar">
                                🔍
                            </button>
                        </form>

                        <ThemeToggle />

                        <div className="cart-widget">
                            <Link to="/cart" className="cart-button" style={{ textDecoration: 'none' }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="cart-icon"
                                >
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                                {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
