import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { FiHome, FiUsers, FiBox, FiShoppingCart, FiLogOut } from 'react-icons/fi';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user')); // Get user from localStorage

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const menuItems = [
    { path: '/admin', icon: <FiHome size={20} />, label: 'Dashboard' },
    { path: '/admin/users', icon: <FiUsers size={20} />, label: 'Users' },
    { path: '/admin/products', icon: <FiBox size={20} />, label: 'Products' },
    { path: '/admin/orders', icon: <FiShoppingCart size={20} />, label: 'Orders' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                location.pathname === item.path ? 'bg-gray-100' : ''
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <FiLogOut size={20} />
            <span className="ml-3">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {menuItems.find((item) => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
