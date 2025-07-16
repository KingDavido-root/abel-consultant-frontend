import React, { useState } from 'react';
import { FaTrash, FaMinus, FaPlus, FaSave, FaShoppingBag } from 'react-icons/fa';
import { useProduct } from '../context/ProductContext';

export default function ShoppingCart({ items, onUpdateQuantity, onRemoveItem, onSaveForLater, onCheckout }) {
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Calculate subtotal
  const subtotal = items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  // Calculate shipping
  const shipping = subtotal > 100 ? 0 : 10;

  // Calculate tax
  const tax = subtotal * 0.1; // 10% tax

  // Calculate total
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(itemId, newQuantity);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setSavedAddresses([...savedAddresses, shippingAddress]);
    setShowAddressForm(false);
  };

  const handleCheckout = () => {
    onCheckout({
      items,
      shippingAddress,
      paymentMethod,
      totals: {
        subtotal,
        shipping,
        tax,
        total,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center border-b pb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1 ml-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-500">{item.variant || 'Standard'}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <FaMinus className="text-gray-500" />
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <FaPlus className="text-gray-500" />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => onSaveForLater(item.id)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <FaSave className="text-blue-500" />
                </button>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shipping Address */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Shipping Address</h3>
        {savedAddresses.length > 0 && !showAddressForm && (
          <div className="mb-4">
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => setShippingAddress(savedAddresses[e.target.value])}
            >
              <option value="">Select a saved address</option>
              {savedAddresses.map((addr, index) => (
                <option key={index} value={index}>
                  {addr.name} - {addr.street}, {addr.city}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {(!savedAddresses.length || showAddressForm) && (
          <form onSubmit={handleAddressSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              value={shippingAddress.name}
              onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Street Address"
              className="w-full p-2 border rounded"
              value={shippingAddress.street}
              onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="City"
                className="p-2 border rounded"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
              />
              <input
                type="text"
                placeholder="State"
                className="p-2 border rounded"
                value={shippingAddress.state}
                onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="ZIP Code"
                className="p-2 border rounded"
                value={shippingAddress.zip}
                onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
              />
              <input
                type="text"
                placeholder="Country"
                className="p-2 border rounded"
                value={shippingAddress.country}
                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Address
            </button>
          </form>
        )}
        
        {savedAddresses.length > 0 && !showAddressForm && (
          <button
            onClick={() => setShowAddressForm(true)}
            className="text-blue-600 hover:text-blue-800"
          >
            Add New Address
          </button>
        )}
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Payment Method</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Credit/Debit Card
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            PayPal
          </label>
        </div>
      </div>

      {/* Order Summary */}
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={!shippingAddress.street || items.length === 0}
          className="w-full mt-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <FaShoppingBag />
          <span>Proceed to Checkout</span>
        </button>
      </div>
    </div>
  );
}
