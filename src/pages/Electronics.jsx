import React from 'react';
import ProductCard from '../components/ProductCard';

const dummyElectronics = [
  {
    id: 1,
    name: 'iPhone 14 Pro Max',
    price: 999,
    image: '/images/iphone.jpg',
    description: 'Flagship Apple device with A16 Bionic chip',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    price: 899,
    image: '/images/galaxy.jpg',
    description: 'Premium Android experience',
  },
  {
    id: 3,
    name: 'MacBook Air M2',
    price: 1299,
    image: '/images/macbook.jpg',
    description: 'Lightweight performance powerhouse',
  },
  // Add more dummy products as needed
];

const Electronics = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Electronics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyElectronics.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Electronics;
