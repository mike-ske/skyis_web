import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import MarketFooter from './marketlayout/MarketFooter';

import { 
  Menu, 
  Search, 
  User, 
  ShoppingCart, 
  ChevronDown, 
  ArrowRight,
  Mountain,
  X
} from 'lucide-react';

const ReadyToWear = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrollingText, setScrollingText] = useState(0);

  // Auto-scroll the top banner
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollingText(prev => prev - 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const navigationItems = [
    { name: 'Home', href: '#', active: false },
    { name: 'Shop', href: '#', active: true },
    { name: 'About', href: '#' },
    { name: 'How it works', href: '#' },
    { name: 'Showcase', href: '#' },
    { name: 'Reviews', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  const footerLinks = [
    { id: '01', name: 'Home', href: '#' },
    { id: '02', name: 'Shop', href: '#' },
    { id: '03', name: 'About', href: '#' },
    { id: '04', name: 'FAQ', href: '#' },
    { id: '05', name: 'Contact', href: '#' },
  ];

  const categories = [
    {
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808946/image_74_uhpzd9.png",
      label: "Everyday wear",
      alt: "Beige T-shirt with headphones and blue sneakers on wooden floor"
    },
    {
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808948/image_75_vizml1.png",
      label: "Cultural wear",
      alt: "Smiling man wearing colorful traditional African attire and beaded necklace"
    },
    {
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808949/image_77_neu4ou.png",
      label: "Occasional wear",
      alt: "Dark gray blazer with shirt and brown boots on gray background"
    }
  ];

  const filterOptions = {
    category: ['All Categories', 'Everyday', 'Cultural', 'Occasional'],
    price: ['All Prices', 'Under ₦10k', '₦10k - ₦50k', 'Over ₦50k'],
    size: ['All Sizes', 'XS', 'S', 'M', 'L', 'XL', 'XXL']
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const TopBanner = () => {
    const bannerText = "NEW ARRIVALS ";
    const repeatedText = Array(20).fill(bannerText).join("");
    
    return (
      <div className="bg-[#004136] text-white text-[10px] font-semibold tracking-widest uppercase select-none overflow-hidden">
        <div 
          className="flex whitespace-nowrap animate-scroll"
          style={{ 
            transform: `translateX(${scrollingText}px)`,
            animation: 'scroll 30s linear infinite'
          }}
        >
          {repeatedText.split('').map((char, index) => (
            <span key={index} className="inline-block px-1">
              {char}
            </span>
          ))}
        </div>
        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
      </div>
    );
  };

  const FilterDropdown = ({ label, options, type }) => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(type)}
        className="flex items-center space-x-1 hover:underline text-xs font-normal text-gray-700"
      >
        <span>{label}</span>
        <ChevronDown 
          size={10} 
          className={`transform transition-transform duration-200 ${
            activeDropdown === type ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {activeDropdown === type && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="py-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => setActiveDropdown(null)}
                className="block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const MobileMenu = () => (
    <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
      isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
      <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            <Mountain size={20} />
            <span className="font-medium">Skyis</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="p-4">
          {navigationItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`block py-3 px-2 border-b border-gray-100 transition-colors ${
                item.active 
                  ? 'text-[#004136] font-medium' 
                  : 'text-gray-700 hover:text-[#004136]'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Top Banner */}
      <Navbar />
      {/* Mobile Menu */}
      <MobileMenu />
      <section className="relative bg-gray-900 text-white">
        <div className="relative overflow-hidden group">
            <img 
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808976/image_73_gwsvdg.png"
                alt="Close-up of wedding dress lace and buttons showing intricate floral embroidery and pearl buttons"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent flex flex-col justify-end px-6 pb-16 max-w-[100rem] mx-auto w-full">
          <h2 className="sm:text-4xl text-xl font-normal leading-tight">
            Ready To Wear
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300">
            Explore everyday essentials and stylish outfits designed for comfort,
            culture, and confidence in your daily life.
          </p>
        </div>
      </section>

      {/* Categories & Collection */}
      <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs sm:text-lg font-light uppercase text-gray-700 tracking-wide">
              CATEGORIES
            </p>
            <h3 className="text-2xl font-semibold">
              Our Collection
            </h3>
          </div>
          <div className="flex space-x-8">
            <FilterDropdown 
              label="Category" 
              options={filterOptions.category}
              type="category"
            />
            <FilterDropdown 
              label="Price" 
              options={filterOptions.price}
              type="price"
            />
            <FilterDropdown 
              label="Size" 
              options={filterOptions.size}
              type="size"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden group cursor-pointer">
              <img
                src={category.image}
                alt={category.alt}
                className="w-full h-100 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute bottom-2 left-2 bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded select-none">
                {category.label}
              </span>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </section>

      <footer className="max-w-[100rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-10 pt-10">
        <MarketFooter />
      </footer>
    </div>
  );
};

export default ReadyToWear;