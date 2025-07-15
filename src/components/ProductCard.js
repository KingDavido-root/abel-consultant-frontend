import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProductCard({ product, type }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleOrder = async () => {
    if (!user) {
      setMessage('⚠️ Please login to place an order');
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
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-transform hover:-translate-y-1 overflow-hidden flex flex-col">
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
        <p className="text-gray-600 text-sm flex-1">{product.description}</p>
        <p className="font-bold text-blue-600 mt-2">${product.price}</p>

        <button
          onClick={handleOrder}
          disabled={loading}
          className="bg-green-600 text-white py-2 rounded mt-2 hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? 'Placing...' : 'Place Order'}
        </button>

        {message && (
          <p className="text-xs mt-1 text-center">{message}</p>
        )}
      </div>
    </div>
  );
}
