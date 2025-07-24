import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL, getAuthHeaders } from '../../config/api';
import { FiUsers, FiBox, FiShoppingCart, FiDollarSign } from 'react-icons/fi';

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${color} text-white mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

const RecentOrdersTable = ({ orders }) => (
  <div className="bg-white rounded-lg shadow mt-6">
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="py-2">{order._id.slice(-6)}</td>
                <td className="py-2">{order.user?.name || 'N/A'}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-2">${order.totals?.total || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/dashboard`, getAuthHeaders());
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FiUsers size={24} />}
          title="Total Users"
          value={stats.stats.users}
          color="bg-blue-500"
        />
        <StatCard
          icon={<FiBox size={24} />}
          title="Total Products"
          value={stats.stats.products.total}
          color="bg-green-500"
        />
        <StatCard
          icon={<FiShoppingCart size={24} />}
          title="Total Orders"
          value={stats.stats.orders}
          color="bg-purple-500"
        />
        <StatCard
          icon={<FiDollarSign size={24} />}
          title="Total Revenue"
          value={`$${stats.stats.revenue.toFixed(2)}`}
          color="bg-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Product Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Electronics</span>
              <span>{stats.stats.products.electronics}</span>
            </div>
            <div className="flex justify-between">
              <span>Cars</span>
              <span>{stats.stats.products.cars}</span>
            </div>
            <div className="flex justify-between">
              <span>Spare Parts</span>
              <span>{stats.stats.products.spareParts}</span>
            </div>
          </div>
        </div>

        <RecentOrdersTable orders={stats.recentOrders} />
      </div>
    </div>
  );
};

export default Dashboard;
