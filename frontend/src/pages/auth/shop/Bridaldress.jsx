import React, { useState } from 'react';
import { Search, User, ShoppingCart, Heart, ChevronDown, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import MarketFooter from './marketlayout/MarketFooter';

const BridalDress = () => {
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [activeFilters, setActiveFilters] = useState({
    color: null,
    price: null,
    size: null
  });

  // Sample bridal dress data
  const bridalDresses = [
    {
      id: 1,
      name: 'Swarovski Embellished Mermaid',
      description: 'Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress',
      price: '₦500,000,000.00',
      rating: 4.5,
      type: 'Rent',
      image: 'https://storage.googleapis.com/a1aa/image/a9f3dd84-dbf6-4f6b-cfd5-8e2ea02f5264.jpg'
    },
    {
      id: 2,
      name: 'Elegant Sweetheart Gown',
      description: 'Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress',
      price: '₦500,000,000.00',
      rating: 4.5,
      type: 'Buy',
      image: 'https://storage.googleapis.com/a1aa/image/1df6bc9a-38f8-4493-f186-28b3e608f702.jpg'
    },
    {
      id: 3,
      name: 'Luxury Designer Dress',
      description: 'Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress',
      price: '₦500,000,000.00',
      rating: 4.5,
      type: 'Auction',
      image: 'https://storage.googleapis.com/a1aa/image/b3b39b3d-714a-48e5-d836-75f43abe0620.jpg'
    }
  ];

  // Generate 12 cards by repeating the 3 base designs
  const allDresses = [];
  for (let i = 0; i < 12; i++) {
    const baseDress = bridalDresses[i % 3];
    allDresses.push({
      ...baseDress,
      id: i + 1
    });
  }

  const addToCart = (dressId) => {
    setCartCount(prev => prev + 1);
  };

  const toggleFavorite = (dressId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(dressId)) {
        newFavorites.delete(dressId);
      } else {
        newFavorites.add(dressId);
      }
      return newFavorites;
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-500">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-500">☆</span>
      );
    }

    return stars;
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Rent':
        return 'bg-blue-100 text-blue-700';
      case 'Buy':
        return 'bg-green-100 text-green-700';
      case 'Auction':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const navItems = ['Home', 'Shop', 'About', 'How it works', 'Showcase', 'Reviews', 'FAQ', 'Contact'];
  const footerLinks = [
    { number: '01', label: 'Home' },
    { number: '02', label: 'Shop' },
    { number: '03', label: 'About' },
    { number: '04', label: 'FAQ' },
    { number: '05', label: 'Contact' }
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
       <Navbar />

      {/* Hero section */}
      <section className="relative">
        <div className="relative overflow-hidden group">
            <img 
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756577409/image_37_wagxvb.png"
                alt="Close-up of wedding dress lace and buttons showing intricate floral embroidery and pearl buttons"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent flex flex-col justify-end px-6 pb-16 max-w-[100rem] mx-auto w-full">
          <nav className="text-xs text-gray-100 mb-2 font-semibold">
            <a className="hover:underline cursor-pointer">Weddings</a>
            <span className="mx-1">/</span>
            <span className="text-gray-300">Bridal dresses</span>
          </nav>
          <h1 className="text-3xl text-white sm:text-4xl md:text-5xl font-semibold max-w-lg leading-tight">
           Bridal dresses
          </h1>
          <p className="mt-2 max-w-md text-sm sm:text-base text-gray-100">
            Find the perfect wedding dress to make your special day memorable
          </p>
        </div>

      </section>

      {/* Listings header */}
      <section className="px-6 mt-10 max-w-[100rem] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500 mb-1">
              LISTINGS
            </p>
            <h2 className="text-xl font-semibold">
              Available Listings
            </h2>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-700 font-medium">
            {['Color', 'Price', 'Size'].map((filter) => (
              <button 
                key={filter}
                className="flex items-center space-x-1 hover:text-black transition-colors cursor-pointer"
                onClick={() => console.log(`Filter by ${filter}`)}
              >
                <span>{filter}</span>
                <ChevronDown size={12} />
              </button>
            ))}
          </div>
        </div>

        {/* Listings grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allDresses.map((dress) => (
            <div 
              key={dress.id} 
              className="border border-gray-200 rounded-lg p-4 flex flex-col space-y-3 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  alt={`${dress.name} bridal gown`} 
                  className="w-full h-80 object-cover rounded-lg" 
                  src={dress.image}
                />
                <span className={`absolute top-2 left-2 text-xs font-semibold rounded-full px-2 py-0.5 ${getTypeColor(dress.type)}`}>
                  {dress.type}
                </span>
              </div>
              
              <div className="flex items-center space-x-1 text-yellow-500 text-xs">
                {renderStars(dress.rating)}
                <span className="text-gray-400 text-xs ml-1">
                  ({dress.rating})
                </span>
              </div>
              
              <p className="font-semibold text-sm">
                {dress.price}
              </p>
              
              <p className="text-xs text-gray-600 leading-tight">
                A {dress.description}
              </p>
              
              <div className="flex justify-between items-center mt-auto text-gray-600 text-sm">
                <button 
                  className={`transition-colors ${
                    favorites.has(dress.id) ? 'text-red-500' : 'hover:text-black'
                  }`}
                  onClick={() => toggleFavorite(dress.id)}
                  aria-label="Add to favorites"
                >
                  <Heart 
                    size={16} 
                    fill={favorites.has(dress.id) ? 'currentColor' : 'none'} 
                  />
                </button>
                <button 
                  className="flex items-center space-x-1 border border-gray-300 rounded-md px-2 py-1 text-xs hover:bg-gray-100 transition-colors"
                  onClick={() => addToCart(dress.id)}
                >
                  <ShoppingCart size={12} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
        <footer className="max-w-[100rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-10 pt-10">
            <MarketFooter />
        </footer>
    </div>
  );
};

export default BridalDress;