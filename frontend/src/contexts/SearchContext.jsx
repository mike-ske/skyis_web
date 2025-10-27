import React, { createContext, useContext, useState, useCallback } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    category: '',
    priceRange: '',
    type: '',
    rating: ''
  });

  // Mock product database (replace with actual API)
  const allProducts = [
    // Add your products here or fetch from API
  ];

  const performSearch = useCallback((query, filters = {}) => {
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let results = allProducts;
      
      // Filter by search query
      if (query.trim()) {
        results = results.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // Apply filters
      if (filters.category) {
        results = results.filter(product => product.category === filters.category);
      }
      
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        results = results.filter(product => {
          const price = typeof product.price === 'string' 
            ? parseFloat(product.price.replace(/[₦,]/g, '')) 
            : product.price;
          return price >= min && (!max || price <= max);
        });
      }
      
      if (filters.type) {
        results = results.filter(product => product.type === filters.type);
      }
      
      if (filters.rating) {
        results = results.filter(product => product.rating >= parseInt(filters.rating));
      }
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  }, []);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchFilters({
      category: '',
      priceRange: '',
      type: '',
      rating: ''
    });
  };

  const value = {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    searchFilters,
    setSearchFilters,
    performSearch,
    clearSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;