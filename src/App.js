import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Electronics from './pages/Electronics';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import OrderTracking from './pages/OrderTracking';
import AdminPanel from './pages/AdminPanel';
import Inventory from './pages/Inventory';

import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-white">
              <Navbar />
              <main className="flex-1 container mx-auto p-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/electronics" element={<Electronics />} />

                  <Route
                    path="/orders"
                    element={
                      <PrivateRoute>
                        <Orders />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/cart"
                    element={
                      <PrivateRoute>
                        <Cart />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/order-tracking/:orderId"
                    element={
                      <PrivateRoute>
                        <OrderTracking />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute roles={['admin']}>
                        <AdminPanel />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/inventory"
                    element={
                      <ProtectedRoute roles={['admin']}>
                        <Inventory />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
            <ToastContainer position="top-center" />
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
