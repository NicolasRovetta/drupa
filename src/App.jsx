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
import NotFound from './components/NotFound';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

import TopBar from './components/TopBar';

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
    const handleDataLoaded = () => {
      setIsLoading(false);
      setTimeout(() => setShowPreloader(false), 800); // 800ms fade out duration
    };

    window.addEventListener('sanityDataLoaded', handleDataLoaded);

    // Fallback just in case
    const fallbackTimer = setTimeout(() => {
      handleDataLoaded();
    }, 5000);

    return () => {
      window.removeEventListener('sanityDataLoaded', handleDataLoaded);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Update App to add TopBar and listen for load generic event if on other pages.
  // Actually the event is sanityDataLoaded, but what if they enter via /products?
  // Let's add the dispatch to ProductList as well just in case.

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
              <TopBar />
              <Header toggleTheme={toggleTheme} theme={theme} /> {/* Passed toggleTheme and theme */}

              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/producto/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="*" element={<NotFound />} />
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
