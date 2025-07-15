// src/pages/AdminDashboard.js
import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

export default function AdminDashboard() {
  const { token, user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', price: '', images: [''], stock: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') return;
    const fetchData = async () => {
      try {
        const resProducts = await api.get('/products/electronics');
        const resOrders = await api.get('/orders/all', { headers: { Authorization: `Bearer ${token}` } });
        setProducts(resProducts.data);
        setOrders(resOrders.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, user]);

  const handleAddProduct = async () => {
    try {
      await api.post('/products/electronics', newProduct, { headers: { Authorization: `Bearer ${token}` } });
      alert('Product added!');
      setNewProduct({ title: '', description: '', price: '', images: [''], stock: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      setOrders(orders.map(order => order._id === id ? { ...order, status } : order));
    } catch (err) {
      console.error(err);
      alert('Failed to update order');
    }
  };

  if (loading) return <p>Loading admin data...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Add New Product</h3>
        <input placeholder="Title" value={newProduct.title} onChange={e => setNewProduct({ ...newProduct, title: e.target.value })} className="border p-1 mr-2" />
        <input placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="border p-1 mr-2" />
        <input placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} className="border p-1 mr-2" />
        <input placeholder="Stock" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} className="border p-1 mr-2" />
        <button onClick={handleAddProduct} className="bg-blue-600 text-white px-2 py-1">Add</button>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Products</h3>
        {products.map(p => (
          <div key={p._id} className="flex justify-between items-center border p-2 mb-1">
            <span>{p.title}</span>
            <button onClick={() => handleDeleteProduct(p._id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Orders</h3>
        {orders.map(order => (
          <div key={order._id} className="border p-2 mb-1">
            <p>Order ID: {order._id}</p>
            <p>Product ID: {order.productId}</p>
            <p>Status: {order.status}</p>
            <select value={order.status} onChange={e => handleUpdateOrderStatus(order._id, e.target.value)} className="border">
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
