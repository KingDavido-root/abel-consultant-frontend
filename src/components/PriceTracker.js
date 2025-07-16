import React, { useState, useEffect } from 'react';
import { FaBell, FaCheck } from 'react-icons/fa';
import { useProduct } from '../context/ProductContext';

export default function PriceTracker({ product }) {
  const [isTracking, setIsTracking] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');
  const [priceHistory, setPriceHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load price history
    // This should be replaced with actual API call
    setPriceHistory([
      { date: '2025-07-15', price: product.price },
      { date: '2025-07-14', price: product.price * 1.1 },
      { date: '2025-07-13', price: product.price * 1.2 },
    ]);

    // Check if user is already tracking this product
    const tracked = localStorage.getItem(`priceTrack_${product.id}`);
    if (tracked) {
      const { isTracking: wasTracking, targetPrice: savedPrice } = JSON.parse(tracked);
      setIsTracking(wasTracking);
      setTargetPrice(savedPrice);
    }
  }, [product.id, product.price]);

  const handleTrackPrice = () => {
    const price = parseFloat(targetPrice);
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price');
      return;
    }
    if (price >= product.price) {
      setError('Target price should be lower than current price');
      return;
    }

    setIsTracking(true);
    setError('');

    // Save tracking preferences
    localStorage.setItem(`priceTrack_${product.id}`, JSON.stringify({
      isTracking: true,
      targetPrice: price,
    }));

    // This should be replaced with actual API call to set up price alerts
    console.log(`Tracking price for ${product.id} with target price ${price}`);
  };

  const stopTracking = () => {
    setIsTracking(false);
    localStorage.removeItem(`priceTrack_${product.id}`);
  };

  // Calculate lowest and highest prices
  const lowestPrice = Math.min(...priceHistory.map(h => h.price));
  const highestPrice = Math.max(...priceHistory.map(h => h.price));

  return (
    <div className="mt-6 p-4 border rounded-lg">
      <h2 className="font-semibold text-lg mb-4">Price Tracking</h2>

      {/* Price history summary */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">Current Price</p>
          <p className="font-semibold text-lg">${product.price}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Lowest Price</p>
          <p className="font-semibold text-lg text-green-600">${lowestPrice}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Highest Price</p>
          <p className="font-semibold text-lg text-red-600">${highestPrice}</p>
        </div>
      </div>

      {/* Price history chart (simplified version) */}
      <div className="h-24 mb-4 flex items-end space-x-1">
        {priceHistory.map((history, index) => {
          const height = (history.price / highestPrice) * 100;
          return (
            <div
              key={index}
              className="flex-1 bg-blue-200 hover:bg-blue-300 transition-all cursor-pointer relative group"
              style={{ height: `${height}%` }}
            >
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs py-1 px-2 rounded">
                ${history.price}
                <br />
                {history.date}
              </div>
            </div>
          );
        })}
      </div>

      {/* Price alert setup */}
      {!isTracking ? (
        <div>
          <div className="flex space-x-2">
            <input
              type="number"
              step="0.01"
              min="0"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder="Enter target price"
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleTrackPrice}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
            >
              <FaBell className="mr-2" />
              Track Price
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      ) : (
        <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <FaCheck className="text-green-500 mr-2" />
            <span>
              Tracking price - We'll notify you when it drops below ${targetPrice}
            </span>
          </div>
          <button
            onClick={stopTracking}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Stop Tracking
          </button>
        </div>
      )}
    </div>
  );
}
