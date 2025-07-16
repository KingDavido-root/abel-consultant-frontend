import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../models/Product';

const ProductContext = createContext();

export function useProduct() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      const productInstances = response.data.map(product => new Product(product));
      setProducts(productInstances);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(productInstances.map(p => p.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add to recently viewed
  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  };

  // Add/remove from wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  // Get related products
  const getRelatedProducts = (product, limit = 4) => {
    if (!product) return [];
    
    // First, try to find products with the same category
    let related = products.filter(p => 
      p.id !== product.id && 
      p.category === product.category
    );

    // If not enough, add products with the same brand
    if (related.length < limit) {
      const brandProducts = products.filter(p => 
        p.id !== product.id && 
        p.brand === product.brand && 
        !related.includes(p)
      );
      related = [...related, ...brandProducts];
    }

    // If still not enough, add products with similar price range
    if (related.length < limit) {
      const priceRange = 0.2; // 20% above or below the product price
      const minPrice = product.price * (1 - priceRange);
      const maxPrice = product.price * (1 + priceRange);
      
      const priceRangeProducts = products.filter(p => 
        p.id !== product.id && 
        p.price >= minPrice && 
        p.price <= maxPrice && 
        !related.includes(p)
      );
      related = [...related, ...priceRangeProducts];
    }

    return related.slice(0, limit);
  };

  // Filter products
  const filterProducts = ({
    category,
    priceRange,
    brands,
    inStock,
    rating,
    search
  }) => {
    return products.filter(product => {
      if (category && product.category !== category) return false;
      
      if (priceRange) {
        const [min, max] = priceRange;
        if (product.price < min || product.price > max) return false;
      }
      
      if (brands?.length && !brands.includes(product.brand)) return false;
      
      if (inStock && !product.isInStock()) return false;
      
      if (rating && product.averageRating < rating) return false;
      
      if (search) {
        const searchLower = search.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    });
  };

  // Get product suggestions
  const getProductSuggestions = (searchTerm) => {
    if (!searchTerm) return [];
    
    const searchLower = searchTerm.toLowerCase();
    return products
      .filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
      .slice(0, 5);
  };

  const value = {
    products,
    categories,
    loading,
    error,
    recentlyViewed,
    wishlist,
    addToRecentlyViewed,
    toggleWishlist,
    getRelatedProducts,
    filterProducts,
    getProductSuggestions,
    refreshProducts: fetchProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}
