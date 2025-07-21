import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL, getAuthHeaders } from '../../config/api';
import { FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/orders`, getAuthHeaders());
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching orders');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleMarkAsShipped = async (orderId) => {
    try {
      await axios.put(`${API_URL}/api/admin/orders/${orderId}`, { status: 'Shipped' }, getAuthHeaders());
      toast.success('Order marked as shipped');
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating order status');
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;

    try {
      await axios.delete(`${API_URL}/api/admin/orders/${orderId}`, getAuthHeaders());
      toast.success('Order deleted successfully');
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting order');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold">Orders Management</h2>

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{order._id.slice(-6)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.user?.name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">${order.totals?.total || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.status !== 'Shipped' && (
                      <button
                        onClick={() => handleMarkAsShipped(order._id)}
                        className="text-green-600 hover:text-green-900 mr-3">
                        <FiCheckCircle />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-red-600 hover:text-red-900">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersManagement;

