import { useState, useEffect, useContext } from 'react';
import { FaBox, FaShoppingCart, FaChartLine, FaUsers, FaTruck, FaCheck, FaTimes } from 'react-icons/fa';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

export default function AdminDashboard() {
  const { token, user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    images: [''],
    stock: '',
    category: '',
    brand: '',
    technicalSpecs: {}
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (user?.role !== 'admin') return;
    const fetchData = async () => {
      try {
        const [resProducts, resOrders, resStats] = await Promise.all([
          api.get('/products/electronics'),
          api.get('/orders/admin/all', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/orders/admin/stats', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setProducts(resProducts.data);
        setOrders(resOrders.data);
        setStats(resStats.data);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'text-blue-500';
      case 'Shipped': return 'text-orange-500';
      case 'Delivered': return 'text-green-500';
      case 'Cancelled': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {/* Navigation Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`mr-4 py-2 px-4 ${activeTab === 'dashboard' ? 'border-b-2 border-blue-500' : ''}`}
        >
          <FaChartLine className="inline mr-2" /> Dashboard
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`mr-4 py-2 px-4 ${activeTab === 'products' ? 'border-b-2 border-blue-500' : ''}`}
        >
          <FaBox className="inline mr-2" /> Products
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`mr-4 py-2 px-4 ${activeTab === 'orders' ? 'border-b-2 border-blue-500' : ''}`}
        >
          <FaShoppingCart className="inline mr-2" /> Orders
        </button>
      </div>

      {/* Dashboard Overview */}
      {activeTab === 'dashboard' && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Orders</h3>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
            <div className="mt-2">
              <div className="text-sm">
                <span className="text-green-500">{stats.deliveredOrders}</span> delivered
              </div>
              <div className="text-sm">
                <span className="text-blue-500">{stats.processingOrders}</span> processing
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Revenue</h3>
            <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
            <div className="mt-2">
              <div className="text-sm text-gray-500">Last 30 days</div>
            </div>
          </div>
          {/* Add more stat cards as needed */}
        </div>
      )}

      {/* Products Management */}
      {activeTab === 'products' && (
        <div>
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="font-semibold mb-4">Add New Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Title"
                value={newProduct.title}
                onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
                className="border rounded p-2"
              />
              <input
                placeholder="Brand"
                value={newProduct.brand}
                onChange={e => setNewProduct({ ...newProduct, brand: e.target.value })}
                className="border rounded p-2"
              />
              <input
                placeholder="Category"
                value={newProduct.category}
                onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                className="border rounded p-2"
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                className="border rounded p-2"
              />
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                className="border rounded p-2"
              />
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                className="border rounded p-2"
                rows="3"
              />
              <button
                onClick={handleAddProduct}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Product
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map(product => (
                  <tr key={product._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="font-medium">{product.title}</div>
                          <div className="text-sm text-gray-500">{product.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Management */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map(order => (
                <tr key={order._id}>
                  <td className="px-6 py-4 font-medium">{order._id}</td>
                  <td className="px-6 py-4">
                    <div>{order.shippingAddress?.name}</div>
                    <div className="text-sm text-gray-500">{order.user?.email}</div>
                  </td>
                  <td className="px-6 py-4">{order.items?.length || 1} items</td>
                  <td className="px-6 py-4">${order.totals?.total || 0}</td>
                  <td className="px-6 py-4">
                    <span className={`${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={e => handleUpdateOrderStatus(order._id, e.target.value)}
                      className="border rounded p-1"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
