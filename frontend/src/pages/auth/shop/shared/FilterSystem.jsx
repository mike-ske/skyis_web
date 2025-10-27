import React, { useState, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

const FilterSystem = ({ products, onFilterChange, availableFilters }) => {
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    price: [],
    size: [],
    color: [],
    type: []
  });
  const [openDropdown, setOpenDropdown] = useState(null);

  // Extract unique values for filters
  const getUniqueValues = (key) => {
    const values = new Set();
    products.forEach(product => {
      if (product[key]) {
        if (Array.isArray(product[key])) {
          product[key].forEach(val => values.add(val));
        } else {
          values.add(product[key]);
        }
      }
    });
    return Array.from(values).sort();
  };

  const filterOptions = {
    category: availableFilters?.categories || getUniqueValues('category'),
    type: availableFilters?.types || ['Buy', 'Rent', 'Auction'],
    price: [
      { label: 'Under ₦50,000', value: '0-50000' },
      { label: '₦50,000 - ₦200,000', value: '50000-200000' },
      { label: '₦200,000 - ₦500,000', value: '200000-500000' },
      { label: 'Over ₦500,000', value: '500000-9999999' }
    ],
    size: availableFilters?.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    color: availableFilters?.colors || getUniqueValues('color')
  };

  useEffect(() => {
    applyFilters();
  }, [activeFilters]);

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by category
    if (activeFilters.category.length > 0) {
      filtered = filtered.filter(product => 
        activeFilters.category.includes(product.category)
      );
    }

    // Filter by type
    if (activeFilters.type.length > 0) {
      filtered = filtered.filter(product => 
        activeFilters.type.includes(product.type)
      );
    }

    // Filter by price
    if (activeFilters.price.length > 0) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price.replace(/[₦,]/g, ''));
        return activeFilters.price.some(range => {
          const [min, max] = range.split('-').map(Number);
          return price >= min && price <= max;
        });
      });
    }

    // Filter by size
    if (activeFilters.size.length > 0) {
      filtered = filtered.filter(product => 
        activeFilters.size.includes(product.size)
      );
    }

    // Filter by color
    if (activeFilters.color.length > 0) {
      filtered = filtered.filter(product => 
        activeFilters.color.includes(product.color)
      );
    }

    onFilterChange(filtered);
  };

  const toggleFilter = (filterType, value) => {
    setActiveFilters(prev => {
      const currentFilters = prev[filterType];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter(v => v !== value)
        : [...currentFilters, value];
      
      return { ...prev, [filterType]: newFilters };
    });
  };

  const clearFilter = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].filter(v => v !== value)
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      category: [],
      price: [],
      size: [],
      color: [],
      type: []
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((sum, arr) => sum + arr.length, 0);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const FilterDropdown = ({ label, filterKey, options }) => {
    const isOpen = openDropdown === filterKey;
    const activeCount = activeFilters[filterKey].length;

    return (
      <div className="relative">
        <button
          onClick={() => toggleDropdown(filterKey)}
          className={`flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
            activeCount > 0 
              ? 'border-teal-600 bg-teal-50 text-teal-700' 
              : 'border-gray-300 text-gray-700 hover:border-gray-400'
          }`}
        >
          <span>{label}</span>
          {activeCount > 0 && (
            <span className="bg-teal-600 text-white text-xs rounded-full px-2 py-0.5">
              {activeCount}
            </span>
          )}
          <ChevronDown 
            size={16} 
            className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setOpenDropdown(null)}
            />
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-sm">Filter by {label}</span>
                  {activeCount > 0 && (
                    <button
                      onClick={() => setActiveFilters(prev => ({ ...prev, [filterKey]: [] }))}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {(Array.isArray(options) ? options : []).map((option) => {
                    const value = option.value || option;
                    const displayLabel = option.label || option;
                    const isActive = activeFilters[filterKey].includes(value);

                    return (
                      <label
                        key={value}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() => toggleFilter(filterKey, value)}
                          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">{displayLabel}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <FilterDropdown label="Category" filterKey="category" options={filterOptions.category} />
        <FilterDropdown label="Type" filterKey="type" options={filterOptions.type} />
        <FilterDropdown label="Price" filterKey="price" options={filterOptions.price} />
        <FilterDropdown label="Size" filterKey="size" options={filterOptions.size} />
        {filterOptions.color.length > 0 && (
          <FilterDropdown label="Color" filterKey="color" options={filterOptions.color} />
        )}

        {getActiveFilterCount() > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center space-x-1"
          >
            <X size={16} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Active filters:</span>
          {Object.entries(activeFilters).map(([filterType, values]) =>
            values.map(value => {
              const priceOption = filterOptions.price.find(opt => opt.value === value);
              const displayValue = priceOption ? priceOption.label : value;

              return (
                <span
                  key={`${filterType}-${value}`}
                  className="inline-flex items-center space-x-1 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-medium"
                >
                  <span>{displayValue}</span>
                  <button
                    onClick={() => clearFilter(filterType, value)}
                    className="hover:text-teal-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSystem;