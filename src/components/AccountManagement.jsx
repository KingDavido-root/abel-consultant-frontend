import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiUser, FiPackage, FiShoppingBag, FiSettings, FiHeart, FiCreditCard, FiMapPin, FiTruck, FiBell } from 'react-icons/fi';
import { API_URL } from '../config/api';

const AccountManagement = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [addresses, setAddresses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [serviceAppointments, setServiceAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    switch (activeTab) {
      case 'orders':
        fetchOrders();
        break;
      case 'addresses':
        fetchAddresses();
        break;
      case 'payments':
        fetchPaymentMethods();
        break;
      case 'appointments':
        fetchAppointments();
        break;
      case 'notifications':
        fetchNotifications();
        break;
      case 'wishlist':
        fetchWishlist();
        break;
      default:
        break;
    }
  }, [activeTab]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/addresses`,
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setAddresses(response.data);
    } catch (error) {
      toast.error('Failed to fetch addresses');
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/payment-methods`,
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setPaymentMethods(response.data);
    } catch (error) {
      toast.error('Failed to fetch payment methods');
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${API_URL}/appointments`,
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setServiceAppointments(response.data);
    } catch (error) {
      toast.error('Failed to fetch appointments');
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${API_URL}/notifications`,
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setNotifications(response.data);
    } catch (error) {
      toast.error('Failed to fetch notifications');
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${API_URL}/wishlist`,
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setWishlist(response.data);
    } catch (error) {
      toast.error('Failed to fetch wishlist');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/my`,
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        name: profile.name,
        email: profile.email
      };

      if (profile.newPassword) {
        if (profile.newPassword !== profile.confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        data.currentPassword = profile.currentPassword;
        data.newPassword = profile.newPassword;
      }

      const response = await axios.put(`${API_URL}/users/profile`,
        headers: { Authorization: `Bearer ${user.token}` }
      });

      updateUser(response.data);
      toast.success('Profile updated successfully');
      setProfile(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <FiUser />
            <span>Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <FiPackage />
            <span>Orders</span>
          </button>
          {user?.role === 'admin' && (
            <button
              onClick={() => window.location.href = '/admin'}
              className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <FiSettings />
              <span>Admin Panel</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'addresses' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <FiMapPin />
            <span>Addresses</span>
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'payments' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <FiCreditCard />
            <span>Payment Methods</span>
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'appointments' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <FiTruck />
            <span>Service Appointments</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <FiBell />
            <span>Notifications</span>
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'wishlist' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <FiHeart />
            <span>Wishlist</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={profile.currentPassword}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={profile.newPassword}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={profile.confirmPassword}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Order History</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td className="px-6 py-4 whitespace-nowrap">{order._id.slice(-6)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ${order.totals?.total?.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                            No orders found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Saved Addresses</h2>
              <div className="space-y-4">
                {addresses.map((address, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{address.type}</h3>
                        <p className="text-gray-600">{address.street}</p>
                        <p className="text-gray-600">{address.city}, {address.state} {address.zip}</p>
                      </div>
                      <div className="space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Add New Address
                </button>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Payment Methods</h2>
              <div className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{method.type === 'card' ? '💳' : '🏦'}</div>
                        <div>
                          <h3 className="font-medium">{method.name}</h3>
                          <p className="text-gray-600">{method.type === 'card' ? `**** **** **** ${method.last4}` : method.accountNumber}</p>
                        </div>
                      </div>
                      <button className="text-red-600 hover:text-red-800">Remove</button>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Add Payment Method
                </button>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Service Appointments</h2>
              <div className="space-y-4">
                {serviceAppointments.map((appointment, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{appointment.service}</h3>
                        <p className="text-gray-600">Date: {new Date(appointment.date).toLocaleDateString()}</p>
                        <p className="text-gray-600">Time: {appointment.time}</p>
                        <p className={`mt-2 ${getStatusColor(appointment.status)}`}>{appointment.status}</p>
                      </div>
                      <div className="space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">Reschedule</button>
                        <button className="text-red-600 hover:text-red-800">Cancel</button>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Book New Appointment
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Notifications</h2>
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
                        <FiBell className={notification.read ? 'text-gray-600' : 'text-blue-600'} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="text-gray-600">{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-1">{new Date(notification.date).toLocaleDateString()}</p>
                      </div>
                      {!notification.read && (
                        <button className="text-sm text-blue-600 hover:text-blue-800">Mark as Read</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">Wishlist</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishlist.map((item) => (
                  <div key={item._id} className="border p-4 rounded-lg">
                    <div className="flex space-x-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-contain" />
                        ) : (
                          <FiPackage className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-gray-600">${item.price}</p>
                        <div className="mt-2 space-x-2">
                          <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                            Add to Cart
                          </button>
                          <button className="text-sm text-red-600 hover:text-red-800">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
