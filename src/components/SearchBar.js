import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes, FaHistory } from 'react-icons/fa';
import { useProduct } from '../context/ProductContext';
import { performanceOptimizations } from '../utils/performanceMonitoring';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  
  const { getProductSuggestions } = useProduct();
  
  // Debounced suggestions
  const [suggestions, setSuggestions] = useState([]);
  const debouncedSearch = performanceOptimizations.debounce((term) => {
    const results = getProductSuggestions(term);
    setSuggestions(results);
  }, 300);

  // Update suggestions when search term changes
  useEffect(() => {
    if (searchTerm.length >= 2) {
      debouncedSearch(searchTerm);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save recent searches to localStorage
  const addToRecentSearches = (term) => {
    const updated = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSearch = (term = searchTerm) => {
    if (!term.trim()) return;
    
    addToRecentSearches(term);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search products..."
          className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && (searchTerm.length >= 2 || recentSearches.length > 0) && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {/* Recent searches */}
          {!searchTerm && recentSearches.length > 0 && (
            <div className="p-2">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Searches</h3>
              {recentSearches.map((term, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(term);
                    handleSearch(term);
                  }}
                  className="flex items-center w-full p-2 hover:bg-gray-50 rounded text-left"
                >
                  <FaHistory className="text-gray-400 mr-2" />
                  <span>{term}</span>
                </button>
              ))}
            </div>
          )}

          {/* Product suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Suggestions</h3>
              {suggestions.map((product) => (
                <button
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="flex items-center w-full p-2 hover:bg-gray-50 rounded"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded mr-3"
                  />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </div>
                  <div className="text-blue-600 font-medium">
                    {product.getFormattedPrice()}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No results */}
          {searchTerm.length >= 2 && suggestions.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No products found for "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
