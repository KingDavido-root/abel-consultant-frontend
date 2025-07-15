import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProductCard({ product, type }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleOrder = async () => {
    if (!user) {
      setMessage('Please login to place an order');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await axios.post(
        '/api/orders',
        { productType: type, productId: product._id },
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );
      setMessage('✅ Order placed successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to place order');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-md rounded p-4 flex flex-col items-center">
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-32 h-32 object-cover mb-2"
      />
      <h3 className="font-semibold">{product.title}</h3>
      <p className="text-gray-600 text-sm">{product.description}</p>
      <p className="text-blue-600 font-bold mb-2">${product.price}</p>
      <button
        onClick={handleOrder}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mb-2"
      >
        {loading ? 'Placing...' : 'Place Order'}
      </button>
      {message && <p className="text-xs text-center">{message}</p>}
    </div>
  );
}
