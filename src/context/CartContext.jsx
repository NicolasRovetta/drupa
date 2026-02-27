import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('drupa-cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save to local storage on cart change
    useEffect(() => {
        localStorage.setItem('drupa-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        const productId = product._id || product.id;
        const isExisting = cart.find((item) => (item._id || item.id) === productId);

        if (isExisting) {
            toast.success(`Se actualizaron las cantidades de ${product.name}`);
        } else {
            toast.success(`${product.name} agregado al carrito`);
        }

        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => (item._id || item.id) === productId);

            if (existingItem) {
                return prevCart.map((item) =>
                    (item._id || item.id) === productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prevCart, { ...product, id: productId, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => (item._id || item.id) !== productId));
        toast.error('Producto eliminado del carrito');
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                (item._id || item.id) === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartItemCount
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
