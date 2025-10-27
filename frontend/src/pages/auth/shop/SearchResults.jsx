import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, X } from 'lucide-react';
import { useSearch } from '../../../contexts/SearchContext';
import Navbar from './Navbar';
import MarketFooter from './marketlayout/MarketFooter';

const SearchResults = () => {
  const { 
    searchQuery, 
    searchResults, 
    isSearching, 
    searchFilters,
    setSearchFilters,
    performSearch,
    clearSearch 
  } = useSearch();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery, searchFilters);
    }
  }, [searchQuery, searchFilters, performSearch]);

  const handleFilterChange = (filterType, value) => {
    setSearchFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setSearchFilters({
      category: '',
      priceRange: '',
      type: '',
      rating: ''
    });
  };

  const ProductCard = ({ product }) => (
    <div 
      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/productdetail-${product.type.toLowerCase()}/${product.id}`)}
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
          product.type === 'Buy' ? 'bg-white text-gray-900' :
          product.type === 'Rent' ? 'bg-yellow-300 text-gray-900' :
          'bg-teal-900 text-white'
        }`}>
          {product.type}
        </span>
        <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
          ⭐ {product.rating}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-900">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">{product.price}</span>
          <button className="bg-[#0B7A72] text-white px-4 py-2 rounded-lg hover:bg-[#096860] transition-colors text-sm font-semibold">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />
      
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-[#0B7A72] hover:text-[#096860] transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back
            </button>
            <div>
              <h1 className="text-3xl font-semibold">Search Results</h1>
              <p className="text-gray-600">
                {isSearching ? 'Searching...' : `${searchResults.length} results for "${searchQuery}"`}
              </p>
            </div>
          </div>

          {(searchFilters.category || searchFilters.priceRange || searchFilters.type || searchFilters.rating) && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 text-[#0B7A72] hover:text-[#096860] transition-colors"
            >
              <X size={16} />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <Filter size={20} className="mr-2" />
                  Filters
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#0B7A72] hover:text-[#096860]"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h4 className="font-semibold mb-3">Category</h4>
                  <div className="space-y-2">
                    {['luxury', 'ready-to-wear', 'bespoke', 'thrift', 'wedding'].map(category => (
                      <label key={category} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={searchFilters.category === category}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="text-[#0B7A72] focus:ring-[#0B7A72]"
                        />
                        <span className="capitalize">{category.replace('-', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {[
                      { value: '0-10000', label: 'Under ₦10,000' },
                      { value: '10000-50000', label: '₦10,000 - ₦50,000' },
                      { value: '50000-200000', label: '₦50,000 - ₦200,000' },
                      { value: '200000-500000', label: '₦200,000 - ₦500,000' },
                      { value: '500000-1000000000', label: 'Over ₦500,000' }
                    ].map(range => (
                      <label key={range.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          value={range.value}
                          checked={searchFilters.priceRange === range.value}
                          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                          className="text-[#0B7A72] focus:ring-[#0B7A72]"
                        />
                        <span>{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <h4 className="font-semibold mb-3">Type</h4>
                  <div className="space-y-2">
                    {['Buy', 'Rent', 'Auction'].map(type => (
                      <label key={type} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={searchFilters.type === type}
                          onChange={(e) => handleFilterChange('type', e.target.value)}
                          className="text-[#0B7A72] focus:ring-[#0B7A72]"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="font-semibold mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <label key={rating} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={rating.toString()}
                          checked={searchFilters.rating === rating.toString()}
                          onChange={(e) => handleFilterChange('rating', e.target.value)}
                          className="text-[#0B7A72] focus:ring-[#0B7A72]"
                        />
                        <span>{rating}+ Stars</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            {isSearching ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B7A72]"></div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                <button
                  onClick={clearSearch}
                  className="bg-[#0B7A72] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#096860] transition-colors"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="max-w-[100rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-10 pt-10">
        <MarketFooter />
      </footer>
    </div>
  );
};

export default SearchResults;