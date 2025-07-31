import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ShoppingCart from '../components/ShoppingCart';

export default function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    saveForLater,
    processCheckout,
  } = useCart();

  const handleCheckout = async (checkoutData) => {
    const result = await processCheckout(checkoutData);
    if (result.success) {
      navigate(`/order-tracking/${result.order.orderId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ShoppingCart
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onSaveForLater={saveForLater}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
