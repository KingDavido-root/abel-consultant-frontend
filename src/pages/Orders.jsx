import { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    api.get('/orders/my', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <div className="grid gap-4">
        {orders.map(order => (
          <div key={order._id} className="border rounded p-4 shadow bg-white">
            <p className="font-semibold">Product ID: {order.productId}</p>
            <p>Type: {order.productType}</p>
            <p>Status: <span className="text-green-600">{order.status}</span></p>
            <p className="text-gray-500 text-sm">Ordered at: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
