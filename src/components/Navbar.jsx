import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`w-full z-50 fixed top-0 left-0 transition-shadow bg-white ${scrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          AbelConsult
        </Link>

        {/* Menu for large screens */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/electronics">Electronics</Link></li>
          <li><Link to="/vehicles">Vehicles</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Right-side login/register */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline">Login</Link>
          <Link to="/register" className="px-4 py-1 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">Sign Up</Link>
        </div>

        {/* Mobile menu icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4">
          <ul className="flex flex-col space-y-4 text-gray-700">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/electronics" onClick={() => setMenuOpen(false)}>Electronics</Link></li>
            <li><Link to="/vehicles" onClick={() => setMenuOpen(false)}>Vehicles</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
            <li><Link to="/register" onClick={() => setMenuOpen(false)}>Sign Up</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
