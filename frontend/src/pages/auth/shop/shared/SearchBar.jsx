import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ allProducts, placeholder = "Search products..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Close search results when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      performSearch(searchQuery);
      setIsOpen(true);
    } else {
      setSearchResults([]);
      setIsOpen(false);
    }
  }, [searchQuery]);

  const performSearch = (query) => {
    const lowercaseQuery = query.toLowerCase();
    
    const results = allProducts.filter(product => {
      const searchableText = `
        ${product.name || ''} 
        ${product.title || ''} 
        ${product.description || ''} 
        ${product.category || ''} 
        ${product.type || ''}
        ${product.color || ''}
      `.toLowerCase();

      return searchableText.includes(lowercaseQuery);
    });

    // Sort by relevance
    const sorted = results.sort((a, b) => {
      const aName = (a.name || '').toLowerCase();
      const bName = (b.name || '').toLowerCase();
      const aTitle = (a.title || '').toLowerCase();
      const bTitle = (b.title || '').toLowerCase();

      // Exact match in name gets highest priority
      if (aName === lowercaseQuery) return -1;
      if (bName === lowercaseQuery) return 1;

      // Name starts with query
      if (aName.startsWith(lowercaseQuery)) return -1;
      if (bName.startsWith(lowercaseQuery)) return 1;

      // Title contains query
      if (aTitle.includes(lowercaseQuery) && !bTitle.includes(lowercaseQuery)) return -1;
      if (!aTitle.includes(lowercaseQuery) && bTitle.includes(lowercaseQuery)) return 1;

      return 0;
    });

    setSearchResults(sorted.slice(0, 8)); // Show top 8 results
  };

  const handleProductClick = (product) => {
    saveRecentSearch(searchQuery);
    setSearchQuery('');
    setIsOpen(false);

    const routePath =
      product.type === "Rent"
        ? `/productdetail-rent/${product.id}`
        : product.type === "Auction"
        ? `/productdetail-auction/${product.id}`
        : `/productdetail-buy/${product.id}`;

    navigate(routePath, { state: { product } });
  };

  const saveRecentSearch = (query) => {
    if (!query.trim()) return;

    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length > 0) {
      handleProductClick(searchResults[0]);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
                setIsOpen(false);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
          {searchQuery.trim().length === 0 && recentSearches.length > 0 && (
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                  <TrendingUp size={16} />
                  <span>Recent Searches</span>
                </span>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(query)}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchResults.length > 0 ? (
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2">
                {searchResults.length} results found
              </div>
              {searchResults.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {product.name || product.title}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {product.description}
                    </p>
                    <p className="text-sm font-semibold text-teal-600 mt-1">
                      {product.price}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${product.typeColor}`}>
                    {product.type}
                  </span>
                </button>
              ))}
            </div>
          ) : searchQuery.trim().length > 0 ? (
            <div className="p-8 text-center">
              <Search className="mx-auto text-gray-400 mb-3" size={48} />
              <p className="text-gray-600 font-medium">No products found</p>
              <p className="text-sm text-gray-500 mt-1">
                Try searching with different keywords
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;