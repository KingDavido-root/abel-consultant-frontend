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
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/" className="font-semibold">Abel Consultant LLC</Link>
        <Link to="/electronics" className="hover:underline">Electronics</Link>
        <Link to="/cars" className="hover:underline">Vehicles</Link>
        <Link to="/spareparts" className="hover:underline">Spare Parts</Link>
        <Link to="/orders" className="hover:underline">My Orders</Link>
      </div>
      <div className="space-x-4">
        {user ? (
          <>
            <span className="italic">{user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 px-2 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
