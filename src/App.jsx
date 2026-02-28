import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Preloader from './components/Preloader';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const [theme, setTheme] = useState('light'); // Added theme state

  const toggleTheme = () => { // Added toggleTheme function
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    // Inicia el desvanecimiento de la pantalla negra a los ~4.2 segundos
    const fadeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4200);

    // Remueve por completo el preloader del DOM a los 5 segundos justos
    const removeTimer = setTimeout(() => {
      setShowPreloader(false);
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{ // Updated toastOptions
            duration: 3000,
            style: {
              background: 'var(--color-surface)',
              color: 'var(--color-text-dark)',
              border: '1px solid var(--color-border)',
            },
            success: {
              iconTheme: {
                primary: 'var(--color-success)',
                secondary: '#fff',
              },
            },
          }}
        />
        {showPreloader && <Preloader isFadingOut={!isLoading} />}
        <CartProvider>
          <Router>
            <div className="app-container">
              <Header toggleTheme={toggleTheme} theme={theme} /> {/* Passed toggleTheme and theme */}

              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/producto/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </main>

              <Footer />
              <FloatingWhatsApp />
            </div>
          </Router>
        </CartProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
