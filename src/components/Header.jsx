import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = ({ onNavigate }) => {
    const { cartItemCount } = useContext(CartContext);
    const [isScrolled, setIsScrolled] = useState(false);

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

    return (
        <>
            <div className="header-placeholder"></div>
            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header-container">
                    <div className="logo" onClick={() => onNavigate('home')}>
                        <div className="logo-wrapper">
                            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Drupa Logo" className="logo-img" />
                            <h1 className="logo-text">Drupa</h1>
                        </div>
                    </div>

                    <nav className="nav-menu">
                        <ul className="nav-links">
                            <li>
                                <button onClick={() => onNavigate('home')} className="nav-link">
                                    Inicio
                                </button>
                            </li>
                            <li>
                                <button onClick={() => onNavigate('products')} className="nav-link">
                                    Productos
                                </button>
                            </li>
                        </ul>
                    </nav>

                    <div className="header-actions">
                        <ThemeToggle />

                        <div className="cart-widget">
                            <button onClick={() => onNavigate('cart')} className="cart-button">
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
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
