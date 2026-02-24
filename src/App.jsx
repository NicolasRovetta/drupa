import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [currentView, setCurrentView] = useState('home');
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

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <ThemeProvider>
      {showPreloader && <Preloader isFadingOut={!isLoading} />}
      <CartProvider>
        <div className="app-container">
          <Header onNavigate={handleNavigate} />

          <main>
            {currentView === 'home' && <Home onNavigate={handleNavigate} />}
            {currentView === 'products' && <ProductList />}
            {currentView === 'cart' && <Cart onNavigate={handleNavigate} />}
          </main>

          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
