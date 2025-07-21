import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProduct } from '../context/ProductContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { getCartSummary } = useCart();
  const { wishlist } = useProduct();
  const cartSummary = getCartSummary();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <Link 
          to="/" 
          className="text-xl font-bold text-blue-400 hover:text-blue-500 transition-colors"
        >
          Abel Consultant LLC
        </Link>
        <Link to="/electronics" className="hover:text-blue-300 transition-colors">Electronics</Link>
        <Link to="/cars" className="hover:text-blue-300 transition-colors">Vehicles</Link>
        <Link to="/spareparts" className="hover:text-blue-300 transition-colors">Spare Parts</Link>
<Link to="/orders" className="hover:text-blue-300 transition-colors">My Orders</Link>
        <Link to="/vehicles" className="hover:text-blue-300 transition-colors">My Vehicles</Link>
        {user?.role === 'admin' && (
          <Link to="/admin" className="hover:text-yellow-400 transition-colors">Admin</Link>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <Link
              to="/cart"
              className="hover:text-blue-300 transition-colors flex items-center"
            >
              <FaShoppingCart className="mr-1" />
              <span className="hidden md:inline">Cart</span>
              {cartSummary.itemCount > 0 && (
                <span className="ml-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {cartSummary.itemCount}
                </span>
              )}
            </Link>
            <Link
              to="/wishlist"
              className="hover:text-blue-300 transition-colors flex items-center"
            >
              <FaHeart className="mr-1" />
              <span className="hidden md:inline">Wishlist</span>
              {wishlist.length > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </>
        )}
        {user ? (
          <>
            <Link
              to="/account"
              className="hover:text-blue-300 transition-colors flex items-center"
            >
              <span className="italic text-sm md:text-base">{user.name}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 transition-colors px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-300 transition-colors">Login</Link>
            <Link to="/register" className="hover:text-blue-300 transition-colors">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
