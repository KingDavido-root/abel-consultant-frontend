import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

// Components
import PrivateRoute from './components/shared/PrivateRoute';
import AdminRoute from './components/shared/AdminRoute';

// Cart and Order Components
import CartView from './components/cart/CartView';
import OrderHistory from './components/orders/OrderHistory';

// Admin Components
import Dashboard from './components/admin/dashboard/Dashboard';
import OrdersManagement from './components/admin/orders/OrdersManagement';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          
          {/* Protected Routes */}
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartView />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <OrderHistory />
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <OrdersManagement />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
