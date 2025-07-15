import { useState, useEffect } from 'react';
import dummyCars from '../data/dummyCars';
import ProductCard from '../components/ProductCard';

export default function Cars() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(dummyCars);
    setLoading(false);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Vehicles</h2>
      {loading ? (
        <p className="text-center">⌛ Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard key={product._id} product={product} type="car" />
          ))}
        </div>
      )}
    </div>
  );
}
