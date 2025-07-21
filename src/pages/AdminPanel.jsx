import React, { useState } from 'react';
import { FiUsers, FiBox, FiShoppingCart, FiDollarSign, FiHome } from 'react-icons/fi';
import Dashboard from '../components/admin/Dashboard';
import UsersManagement from '../components/admin/UsersManagement';
import ProductsManagement from '../components/admin/ProductsManagement';
import OrdersManagement from '../components/admin/OrdersManagement';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome size={20} /> },
    { id: 'users', label: 'Users', icon: <FiUsers size={20} /> },
    { id: 'products', label: 'Products', icon: <FiBox size={20} /> },
    { id: 'orders', label: 'Orders', icon: <FiShoppingCart size={20} /> },
    { id: 'revenue', label: 'Revenue', icon: <FiDollarSign size={20} /> },
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full px-6 py-3 text-left ${
                activeTab === item.id
                  ? 'bg-gray-100 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'users' && <UsersManagement />}
        {activeTab === 'products' && <ProductsManagement />}
        {activeTab === 'orders' && <OrdersManagement />}
      </div>
    </div>
  );
};

export default AdminPanel;
