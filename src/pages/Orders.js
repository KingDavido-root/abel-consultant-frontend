import { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

export default function Orders() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load orders');
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <div className="space-y-2">
        {orders.map(order => (
          <div key={order._id} className="border p-3 rounded">
            <p>Product ID: <span className="font-mono">{order.productId}</span></p>
            <p>Type: {order.productType}</p>
            <p>Status: <span className="font-semibold">{order.status}</span></p>
            <p>Created: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
