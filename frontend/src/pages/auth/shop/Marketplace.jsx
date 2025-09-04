import React, { useState } from 'react';
import { Search, User, ShoppingCart, ChevronDown, Heart, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import MarketFooter from './marketlayout/MarketFooter';

const Marketplace = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(0);
  const [wishlist, setWishlist] = useState(new Set());
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    price: '',
    size: ''
  });

  // Sample product data
  const products = {
    weddings: [
      {
        id: 1,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767693/image_14_s69jci.png",
        type: "Rent",
        price: "₦500,000,000.00",
        title: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
        rating: 4.5,
        typeColor: "bg-gray-100 text-gray-700"
      },
      {
        id: 2,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767843/image_13_wbwvlq.png",
        type: "Buy",
        price: "₦500,000,000.00",
        title: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
        rating: 4.5,
        typeColor: "bg-gray-100 text-gray-700"
      },
      {
        id: 3,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767845/image_15_vuuipp.png",
        type: "Auction",
        price: "₦500,000,000.00",
        title: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
        rating: 4.5,
        typeColor: "bg-black text-white"
      }
    ],
    luxury: [
      {
        id: 4,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767695/image_20_nc4ll3.png",
        type: "Rent",
        price: "₦500,000,000.00",
        title: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
        rating: 4.5,
        typeColor: "bg-gray-100 text-gray-700"
      },
      {
        id: 5,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767695/image_24_xfxfjx.png",
        type: "Auction",
        price: "₦500,000,000.00",
        title: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
        rating: 4.5,
        typeColor: "bg-black text-white"
      },
      {
        id: 6,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767697/image_24-1_ntdsyo.png",
        type: "Buy",
        price: "₦500,000,000.00",
        title: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
        rating: 4.5,
        typeColor: "bg-gray-100 text-gray-700"
      }
    ],
    readyToWear: [
      {
        id: 7,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767695/image_25-1_mteczb.png",
        type: "Auction",
        price: "₦500,000,000.00",
        title: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
        rating: 4.5,
        typeColor: "bg-black text-white"
      },
      {
        id: 8,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767696/image_25-2_slorai.png",
        type: "Buy",
        price: "₦500,000,000.00",
        title: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
        rating: 4.5,
        typeColor: "bg-gray-100 text-gray-700"
      },
      {
        id: 9,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767696/image_26_yxioyo.png",
        type: "Rent",
        price: "₦500,000,000.00",
        title: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
        rating: 4.5,
        typeColor: "bg-gray-100 text-gray-700"
      }
    ],
    bespoke: [
      {
        id: 10,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
        type: "Auction",
        price: "₦500,000,000.00",
        title: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
        rating: 4.5,
        typeColor: "bg-black text-white"
      },
      {
        id: 11,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767696/image_18_kobuc5.png",
        type: "Buy",
        price: "₦500,000,000.00",
        title: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
        rating: 4.5,
        typeColor: "bg-gray-100 text-gray-700"
      },
      {
        id: 12,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_19_e08htj.png",
        type: "Rent",
        price: "₦500,000,000.00",
        title: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
        rating: 4.5,
        typeColor: "bg-gray-100 text-gray-700"
      }
    ],
    thrift: [
      {
        id: 13,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767695/image_25-1_mteczb.png",
        type: "Auction",
        price: "₦500,000,000.00",
        title: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
        rating: 4.5,
        typeColor: "bg-black text-white"
      },
      {
        id: 14,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767696/image_25-2_slorai.png",
        type: "Buy",
        price: "₦500,000,000.00",
        title: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
        rating: 4.5,
        typeColor: "bg-gray-100 text-gray-700"
      },
      {
        id: 15,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767696/image_26_yxioyo.png",
        type: "Rent",
        price: "₦500,000,000.00",
        title: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
        rating: 4.5,
        typeColor: "bg-gray-100 text-gray-700"
      }
    ]
  };

  // Category routing mapping
  const categoryRoutes = {
    weddings: '/wedding',
    luxury: '/luxury',
    readyToWear: '/ready-to-wear',
    bespoke: '/bespoke',
    thrift: '/thrift'
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const addToCart = () => {
    setCartItems(prev => prev + 1);
  };

  const handleSeeAllClick = (sectionKey) => {
    const route = categoryRoutes[sectionKey];
    if (route) {
      navigate(route);
    }
  };

  const ProductCard = ({ product }) => (
    <article className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative m-4">
        <img 
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-cover rounded-2xl"
        />
        <span className={`absolute top-3 left-3 ${product.typeColor} text-xs font-semibold px-2 py-1 rounded`}>
          {product.type}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-1 mb-1">
          <div className="flex text-orange-400 text-sm">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-current" />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.rating})</span>
        </div>
        <p className="font-semibold text-lg mb-1">{product.price}</p>
        <p className="text-xs text-gray-600 mb-4 leading-tight">{product.title}</p>
        <div className="flex justify-between items-center text-gray-700 text-sm">
          <button 
            onClick={() => toggleWishlist(product.id)}
            className="hover:text-gray-900 transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart 
              size={16} 
              className={wishlist.has(product.id) ? "fill-red-500 text-red-500" : ""}
            />
          </button>
          <button 
            onClick={addToCart}
            className="flex items-center space-x-1 border border-gray-300 rounded px-3 py-1 text-xs hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart size={12} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );

  const ProductSection = ({ title, products, sectionKey }) => (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-normal">{title}</h2>
        <button 
          onClick={() => handleSeeAllClick(sectionKey)}
          className="flex items-center space-x-1 text-sm font-normal underline text-gray-700 hover:text-gray-900 transition-colors group"
        >
          <span>See all</span>
          <ArrowRight 
            size={14} 
            className="transform group-hover:translate-x-1 transition-transform duration-200" 
          />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );

  const FilterDropdown = ({ label, value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 cursor-pointer select-none text-sm font-semibold text-gray-700 hover:text-gray-900"
        >
          <span>{label}</span>
          <ChevronDown size={12} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen" style={{ fontFamily: 'system-ui, sans-serif' }}>
      
        <Navbar cartItems={cartItems} />
      <main className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-normal mb-8">Latest Products</h1>
        
        {/* Filters */}
        <div className="flex justify-end space-x-6 mb-8">
          <FilterDropdown
            label="Category"
            value={activeFilters.category}
            onChange={(value) => setActiveFilters(prev => ({ ...prev, category: value }))}
            options={[
              { value: '', label: 'All Categories' },
              { value: 'weddings', label: 'Weddings' },
              { value: 'luxury', label: 'Luxury' },
              { value: 'ready-to-wear', label: 'Ready-to-wear' }
            ]}
          />
          <FilterDropdown
            label="Price"
            value={activeFilters.price}
            onChange={(value) => setActiveFilters(prev => ({ ...prev, price: value }))}
            options={[
              { value: '', label: 'All Prices' },
              { value: 'low', label: 'Under ₦1M' },
              { value: 'medium', label: '₦1M - ₦10M' },
              { value: 'high', label: 'Over ₦10M' }
            ]}
          />
          <FilterDropdown
            label="Size"
            value={activeFilters.size}
            onChange={(value) => setActiveFilters(prev => ({ ...prev, size: value }))}
            options={[
              { value: '', label: 'All Sizes' },
              { value: 'xs', label: 'XS' },
              { value: 's', label: 'S' },
              { value: 'm', label: 'M' },
              { value: 'l', label: 'L' },
              { value: 'xl', label: 'XL' }
            ]}
          />
        </div>

        {/* Product Sections */}
        <ProductSection title="Weddings" products={products.weddings} sectionKey="weddings" />
        <ProductSection title="Luxury" products={products.luxury} sectionKey="luxury" />
        <ProductSection title="Ready-to-wear" products={products.readyToWear} sectionKey="readyToWear" />
        <ProductSection title="Bespoke & tailored" products={products.bespoke} sectionKey="bespoke" />
        <ProductSection title="Thrift & pre-loved" products={products.thrift} sectionKey="thrift" />

        {/* Footer */}
        <footer className="max-w-10xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-10 pt-10">
            <MarketFooter />
        </footer>
        
      </main>
    </div>
  );
};

export default Marketplace;