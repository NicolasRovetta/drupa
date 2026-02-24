import { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <ThemeProvider>
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
