import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    <ThemeProvider>
      <Toaster position="bottom-right" />
      {showPreloader && <Preloader isFadingOut={!isLoading} />}
      <CartProvider>
        <BrowserRouter>
          <div className="app-container">
            <Header />

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
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
