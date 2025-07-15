import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-xl font-bold text-blue-400 hover:text-blue-500">
          Abel Consultant LLC
        </Link>
        <Link to="/electronics" className="hover:text-blue-300">Electronics</Link>
        <Link to="/cars" className="hover:text-blue-300">Vehicles</Link>
        <Link to="/spareparts" className="hover:text-blue-300">Spare Parts</Link>
        <Link to="/orders" className="hover:text-blue-300">My Orders</Link>
        {user?.role === 'admin' && (
          <Link to="/admin" className="hover:text-yellow-400">Admin</Link>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="italic">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-300">Login</Link>
            <Link to="/register" className="hover:text-blue-300">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
