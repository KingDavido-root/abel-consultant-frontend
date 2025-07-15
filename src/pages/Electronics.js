import { useState, useEffect } from 'react';
import dummyElectronics from '../data/dummyElectronics';
import ProductCard from '../components/ProductCard';

export default function Electronics() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(dummyElectronics);
    setLoading(false);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Electronics</h2>
      {loading ? (
        <p className="text-center">⌛ Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard key={product._id} product={product} type="electronic" />
          ))}
        </div>
      )}
    </div>
  );
}
