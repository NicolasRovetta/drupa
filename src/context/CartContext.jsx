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

    // Generador de ID para el carrito que mezcla producto y variante
    const getCartItemId = (product) => {
        const baseId = product._id || product.id;
        if (product.selectedVariant) {
            return `${baseId}-${product.selectedVariant}`;
        }
        return baseId;
    };

    const addToCart = (product, quantity = 1) => {
        const cartItemId = getCartItemId(product);
        const isExisting = cart.find((item) => (item.cartItemId || item.id) === cartItemId);

        if (isExisting) {
            toast.success(`Se actualizaron las cantidades de ${product.name}`);
        } else {
            toast.success(`${product.name} agregado al carrito`);
        }

        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => (item.cartItemId || item.id) === cartItemId);

            if (existingItem) {
                return prevCart.map((item) =>
                    (item.cartItemId || item.id) === cartItemId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            // Guardamos con un ID único de carrito para poder borrar esa variante sola
            return [...prevCart, { ...product, id: product._id || product.id, cartItemId, quantity }];
        });
    };

    const removeFromCart = (cartItemId) => {
        setCart((prevCart) => prevCart.filter((item) => (item.cartItemId || item.id) !== cartItemId));
        toast.error('Producto eliminado del carrito');
    };

    const updateQuantity = (cartItemId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(cartItemId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                (item.cartItemId || item.id) === cartItemId ? { ...item, quantity } : item
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
