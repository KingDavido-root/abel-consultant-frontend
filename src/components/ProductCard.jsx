import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/electronics/${product.id}`}>
      <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className="text-gray-600 text-sm">{product.description}</p>
          <p className="mt-2 text-indigo-600 font-bold">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
