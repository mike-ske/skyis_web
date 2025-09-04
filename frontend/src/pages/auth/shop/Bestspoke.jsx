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
  X
} from 'lucide-react';

const Bestspoke = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Auto-scroll the top banner
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => (prev - 1) % 200);
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
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808942/image_66_mq3aa7.png",
      label: "Custom designs",
      alt: "Woman wearing intricate beige custom design dress standing against gray background"
    },
    {
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808941/image_68_nkapir.png",
      label: "Mech / streetwear",
      alt: "Young man wearing colorful mech streetwear jacket standing outdoors urban background"
    },
    {
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808942/image_67_e2ncjf.png",
      label: "Fashion-to-order",
      alt: "Two people working on fashion design patterns in studio with sewing machines"
    }
  ];

  const filterOptions = {
    category: ['All Categories', 'Custom Designs', 'Streetwear', 'Fashion-to-order'],
    price: ['All Prices', 'Under ₦50k', '₦50k - ₦200k', 'Over ₦200k'],
    size: ['All Sizes', 'XS', 'S', 'M', 'L', 'XL', 'XXL']
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };



  const FilterDropdown = ({ label, options, type }) => (
    <div className="relative">
      <button
        onClick={() => toggleDropdown(type)}
        className="flex items-center space-x-1 hover:text-gray-900 focus:outline-none text-xs text-gray-600 font-normal transition-colors"
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
      <div 
        className="fixed inset-0 bg-black bg-opacity-50" 
        onClick={() => setIsMobileMenuOpen(false)} 
      />
      <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-normal text-gray-900 select-none">
            Skyis
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                  ? 'text-[#00403C] font-medium underline decoration-1' 
                  : 'text-gray-700 hover:text-[#00403C]'
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
    <div className="bg-white text-gray-900 min-h-screen">


      {/* Navigation */}
        <Navbar />
      {/* Mobile Menu */}
      <MobileMenu />

      <section className="relative bg-gray-900 text-white">
        <div className="relative overflow-hidden group">
            <img 
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808977/image_65_sltoh8.png"
                alt="Close-up of wedding dress lace and buttons showing intricate floral embroidery and pearl buttons"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent flex flex-col justify-end px-6 pb-16 max-w-[100rem] mx-auto w-full">
          <h2 className="sm:text-4xl text-xl font-normal leading-tight">
            Bespoke
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300">
            Commission custom designs crafted to your exact style and fit — unique pieces made just for you.
          </p>
        </div>
      </section>

      {/* Categories and Collection */}
      <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="mb-6">
          <p className="text-xs sm:text-lg font-normal text-gray-600 uppercase tracking-wide">
            Categories
          </p>
          <h3 className="text-2xl font-semibold text-gray-900 mt-1">
            Our Collection
          </h3>
        </div>

        <div className="flex justify-end space-x-8 mb-6">
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

        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden group cursor-pointer">
              <img
                src={category.image}
                alt={category.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 min-h-[400px]"
                loading="lazy"
              />
              <span className="absolute bottom-3 left-3 bg-gray-200 text-gray-600 text-[10px] font-normal rounded-md px-2 py-0.5 select-none">
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

export default Bestspoke;