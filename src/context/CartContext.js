import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProduct } from './ProductContext';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const { products } = useProduct();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedForLater = localStorage.getItem('savedForLater');
    const orders = localStorage.getItem('recentOrders');

    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedForLater) setSavedItems(JSON.parse(savedForLater));
    if (orders) setRecentOrders(JSON.parse(orders));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('savedForLater', JSON.stringify(savedItems));
  }, [savedItems]);

  useEffect(() => {
    localStorage.setItem('recentOrders', JSON.stringify(recentOrders));
  }, [recentOrders]);

  // Add item to cart
  const addToCart = (productId, quantity = 1, variant = null) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === productId && item.variant?.id === variant?.id
      );

      if (existingItem) {
        return prevItems.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, {
        id: productId,
        name: product.name,
        price: variant?.price || product.price,
        image: product.images[0],
        quantity,
        variant: variant || null,
      }];
    });
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Save item for later
  const saveForLater = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (!item) return;

    setSavedItems(prev => [...prev, item]);
    removeFromCart(productId);
  };

  // Move saved item back to cart
  const moveToCart = (productId) => {
    const item = savedItems.find(item => item.id === productId);
    if (!item) return;

    addToCart(item.id, item.quantity, item.variant);
    setSavedItems(prev => prev.filter(item => item.id !== productId));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Process checkout
  const processCheckout = async (checkoutData) => {
    try {
      // This should be replaced with actual API call
      const order = {
        ...checkoutData,
        orderId: `ORD-${Date.now()}`,
        status: 'processing',
        date: new Date().toISOString(),
      };

      setRecentOrders(prev => [order, ...prev]);
      clearCart();

      return { success: true, order };
    } catch (error) {
      console.error('Checkout failed:', error);
      return { success: false, error: 'Checkout failed' };
    }
  };

  // Get cart summary
  const getCartSummary = () => {
    const subtotal = cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      total,
      itemCount: cartItems.reduce((count, item) => count + item.quantity, 0),
    };
  };

  const value = {
    cartItems,
    savedItems,
    recentOrders,
    addToCart,
    updateQuantity,
    removeFromCart,
    saveForLater,
    moveToCart,
    clearCart,
    processCheckout,
    getCartSummary,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
