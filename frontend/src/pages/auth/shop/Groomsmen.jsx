import React, { useState } from 'react';
import { Search, User, ShoppingCart, Heart, ChevronDown, ArrowRight, PenTool } from 'lucide-react';
import Navbar from './Navbar';
import MarketFooter from './marketlayout/MarketFooter';

const Groomsmen = () => {
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [activeFilters, setActiveFilters] = useState({
    color: null,
    price: null,
    size: null
  });

  // Sample tuxedo data
  const tuxedos = [
    {
      id: 1,
      name: 'Da Vinci',
      description: 'charcoal black, metallic jacquard, single lapel, mid cut intersect strap tuxedo suit',
      price: '₦500,000,000.00',
      rating: 4.5,
      type: 'Buy',
      image: 'https://storage.googleapis.com/a1aa/image/37b3af0e-9926-4d7e-feb6-f9344b6deaee.jpg',
      color: 'navy'
    },
    {
      id: 2,
      name: 'October 1st',
      description: 'castleton green covered peak lapel jacquard tuxedo suit',
      price: '₦500,000,000.00',
      rating: 4.5,
      type: 'Buy',
      image: 'https://storage.googleapis.com/a1aa/image/e8f8d812-539b-431b-c910-19ef27d934ca.jpg',
      color: 'gray'
    },
    {
      id: 3,
      name: 'Yohji',
      description: '2 buttons, Irish cream, deconstructed 3-layered knitted peak lapel suit',
      price: '₦500,000,000.00',
      rating: 4.5,
      type: 'Rent',
      image: 'https://storage.googleapis.com/a1aa/image/f0644fb1-424e-4861-678b-e15687175b11.jpg',
      color: 'cream'
    }
  ];

  // Generate 12 cards by repeating the 3 base designs
  const allTuxedos = [];
  for (let i = 0; i < 12; i++) {
    const baseTuxedo = tuxedos[i % 3];
    allTuxedos.push({
      ...baseTuxedo,
      id: i + 1
    });
  }

  const addToCart = (tuxedoId) => {
    setCartCount(prev => prev + 1);
  };

  const toggleFavorite = (tuxedoId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(tuxedoId)) {
        newFavorites.delete(tuxedoId);
      } else {
        newFavorites.add(tuxedoId);
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
        <span key={i} className="text-orange-400">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-orange-400">☆</span>
      );
    }

    return stars;
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
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      {/* Hero section */}
      <section className="relative bg-gray-900 text-white">
        <div className="relative overflow-hidden group">
            <img 
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756576986/image_39_t9ydnv.png"
                alt="Close-up of wedding dress lace and buttons showing intricate floral embroidery and pearl buttons"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent flex flex-col justify-end px-6 pb-16 max-w-[100rem] mx-auto w-full">
          <nav className="text-xs text-gray-300 mb-2 font-semibold">
            <a className="hover:underline cursor-pointer">Weddings</a>
            <span className="mx-1">/</span>
            <span className="text-gray-400">Groom wear & tuxedos</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold max-w-lg leading-tight">
            Groom wear & tuxedos
          </h1>
          <p className="mt-2 max-w-md text-sm sm:text-base text-gray-300">
            Find the perfect tuxedos to make your special day memorable
          </p>
        </div>
      </section>

      {/* Listings header */}
      <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <p className="text-xs font-semibold text-gray-500 tracking-widest mb-1">
              LISTINGS
            </p>
            <h2 className="text-2xl font-semibold">
              Available Listings
            </h2>
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0 text-sm font-semibold text-gray-900">
            {['Color', 'Price', 'Size'].map((filter) => (
              <button 
                key={filter}
                className="flex items-center space-x-1 hover:text-teal-600 cursor-pointer"
                onClick={() => console.log(`Filter by ${filter}`)}
              >
                <span>{filter}</span>
                <ChevronDown size={12} />
              </button>
            ))}
          </div>
        </div>

        {/* Listings grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allTuxedos.map((tuxedo) => (
            <article 
              key={tuxedo.id} 
              className="border border-gray-200 rounded-lg p-4 flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative rounded-lg overflow-hidden mb-3">
                <img 
                  alt={`${tuxedo.name} tuxedo`} 
                  className="w-full h-80 object-cover object-center rounded-lg" 
                  src={tuxedo.image}
                />
                <span className={`absolute top-2 left-2 text-xs font-semibold rounded-full px-2 py-0.5 ${
                  tuxedo.type === 'Rent' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                }`}>
                  {tuxedo.type}
                </span>
              </div>
              
              <div className="flex items-center space-x-1 mb-1">
                <div className="flex text-orange-400 text-sm">
                  {renderStars(tuxedo.rating)}
                </div>
                <span className="text-xs text-gray-500">
                  ({tuxedo.rating})
                </span>
              </div>
              
              <p className="font-semibold text-lg mb-1">
                {tuxedo.price}
              </p>
              
              <p className="text-xs text-gray-600 mb-3 leading-tight">
                The "{tuxedo.name}" {tuxedo.description}
              </p>
              
              <div className="flex justify-between items-center mt-auto">
                <button 
                  className="flex items-center space-x-2 text-xs text-gray-700 border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100 transition-colors"
                  onClick={() => addToCart(tuxedo.id)}
                  aria-label={`Add ${tuxedo.name} tuxedo to cart`}
                >
                  <ShoppingCart size={12} />
                  <span>Add to Cart</span>
                </button>
                
                <button 
                  className={`transition-colors ${
                    favorites.has(tuxedo.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                  }`}
                  onClick={() => toggleFavorite(tuxedo.id)}
                  aria-label="Add to favorites"
                >
                  <Heart 
                    size={16} 
                    fill={favorites.has(tuxedo.id) ? 'currentColor' : 'none'} 
                  />
                </button>
              </div>
            </article>
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

export default Groomsmen;