import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaStar, FaHeart, FaShoppingCart, FaInfoCircle } from 'react-icons/fa';
import { useImageLoader } from '../utils/imageOptimization';

export default function ProductCard({ product, type, onAddToWishlist, onQuickView }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Use optimized image loading
  const { imageSrc, loading: imageLoading } = useImageLoader(product.images?.[currentImageIndex]);

  const handleOrder = async () => {
    if (!user) {
      setMessage('⚠️ Please login to place an order');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await axios.post(
        '/api/orders',
        { productType: type, productId: product._id },
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );
      setMessage('✅ Order placed successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to place order');
    }
    setLoading(false);
  };

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-transform hover:-translate-y-1 overflow-hidden flex flex-col relative group">
      {/* Wishlist button */}
      <button
        onClick={() => onAddToWishlist(product.id)}
        className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <FaHeart className="text-red-500" />
      </button>

      {/* Quick view button */}
      <button
        onClick={() => onQuickView(product)}
        className="absolute top-2 left-2 z-10 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <FaInfoCircle className="text-blue-500" />
      </button>

      {/* Image carousel */}
      <div className="relative h-48">
        <img
          src={imageSrc || product.images?.[0]}
          alt={product.name}
          className="h-48 w-full object-cover transition-opacity duration-300"
          style={{ opacity: imageLoading ? 0.5 : 1 }}
        />
        {product.images?.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                onClick={() => setCurrentImageIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Product info */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <div className="flex items-center">
            <FaStar className="text-yellow-400" />
            <span className="ml-1 text-sm">{product.averageRating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm flex-1">{product.description}</p>

        {/* Price and variants */}
        <div className="mt-2">
          <p className="font-bold text-blue-600">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(selectedVariant?.price || product.price)}
          </p>

          {product.variants?.length > 0 && (
            <div className="mt-2">
              <select
                className="w-full p-1 border rounded"
                value={selectedVariant?.id}
                onChange={(e) => setSelectedVariant(
                  product.variants.find(v => v.id === e.target.value)
                )}
              >
                {product.variants.map(variant => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name} - {variant.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </option>
                ))}
              </select>
            </div>
          )}

        {/* Action buttons */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleOrder}
            disabled={loading || !product.isInStock()}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <FaShoppingCart />
            {loading ? 'Processing...' : 'Add to Cart'}
          </button>

          <button
            onClick={() => onQuickView(product)}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
          >
            Details
          </button>
        </div>

        {/* Technical specs preview */}
        {Object.keys(product.technicalSpecs || {}).length > 0 && (
          <div className="mt-3 text-xs text-gray-500">
            <h4 className="font-semibold mb-1">Key Specifications:</h4>
            <ul className="list-disc list-inside">
              {Object.entries(product.technicalSpecs)
                .slice(0, 3)
                .map(([key, value]) => (
                  <li key={key}>{`${key}: ${value}`}</li>
                ))}
            </ul>
          </div>
        )}

        {message && (
          <p className="text-xs mt-2 text-center">{message}</p>
        )}
      </div>
    </div>
  );
}
