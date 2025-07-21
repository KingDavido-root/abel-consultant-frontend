import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">
              ${product.price}
            </span>
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-gray-600">
                {product.rating || '4.5'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
