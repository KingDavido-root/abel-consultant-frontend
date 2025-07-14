import { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

export default function SpareParts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(AuthContext);

    useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await api.get('/products/electronics');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);


    const handleOrder = async (productId) => {
        try {
            await api.post('/orders',
                { productType: 'sparepart', productId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Order placed!');
        } catch (err) {
            console.error(err);
            alert('Failed to place order');
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Spare Parts</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {parts.map(part => (
                    <div key={part._id} className="border p-4 rounded shadow flex flex-col">
                        <img src={part.images?.[0]} alt={part.title} className="w-full h-40 object-cover mb-2" />
                        <h2 className="font-semibold">{part.title}</h2>
                        <p className="text-gray-500 flex-1">{part.description}</p>
                        <p className="font-bold mb-2">${part.price}</p>
                        <button
                            onClick={() => handleOrder(part._id)}
                            className="bg-green-600 text-white py-1 rounded mt-auto"
                        >
                            Place Order
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
