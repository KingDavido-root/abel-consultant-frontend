import React, { useState } from 'react';
import { FaTimes, FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useImageLoader } from '../utils/imageOptimization';

export default function ProductQuickView({ product, onClose, onAddToCart, onAddToWishlist }) {
  const [selectedTab, setSelectedTab] = useState('details');
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Use optimized image loading
  const { imageSrc, loading: imageLoading } = useImageLoader(product.images?.[currentImageIndex]);

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'specs', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left column - Images */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img
                src={imageSrc || product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
                style={{ opacity: imageLoading ? 0.5 : 1 }}
              />
            </div>

            {/* Thumbnail gallery */}
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                      idx === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right column - Product info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400" />
                  <span className="ml-1">{product.averageRating}</span>
                  <span className="text-gray-500 ml-1">
                    ({product.ratings.length} reviews)
                  </span>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(selectedVariant?.price || product.price)}
                </span>
              </div>
            </div>

            {/* Variants */}
            {product.variants?.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Variant
                </label>
                <select
                  className="w-full p-2 border rounded-md"
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

            {/* Tabs */}
            <div>
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                        selectedTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="mt-4 h-64 overflow-y-auto">
                {selectedTab === 'details' && (
                  <p className="text-gray-600">{product.description}</p>
                )}

                {selectedTab === 'specs' && (
                  <div className="space-y-4">
                    {Object.entries(product.technicalSpecs || {}).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-4 py-2 border-b">
                        <dt className="font-medium text-gray-500">{key}</dt>
                        <dd className="text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTab === 'reviews' && (
                  <div className="space-y-4">
                    {product.reviews.map((review, idx) => (
                      <div key={idx} className="border-b pb-4">
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-500">
                            {review.author}
                          </span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => onAddToCart(product.id, selectedVariant?.id)}
                disabled={!product.isInStock()}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <FaShoppingCart />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => onAddToWishlist(product.id)}
                className="flex items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                <FaHeart className="text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
