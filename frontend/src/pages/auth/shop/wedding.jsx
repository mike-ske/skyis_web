import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, Scissors, ChevronDown, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import MarketFooter from './marketlayout/MarketFooter';

const Wedding = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(0);
  const [activeNavItem, setActiveNavItem] = useState('Shop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    price: '',
    size: ''
  });

  const navigationItems = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'shop', label: 'Shop', href: '#' },
    { id: 'about', label: 'About', href: '#' },
    { id: 'how-it-works', label: 'How it works', href: '#' },
    { id: 'showcase', label: 'Showcase', href: '#' },
    { id: 'reviews', label: 'Reviews', href: '#' },
    { id: 'faq', label: 'FAQ', href: '#' },
    { id: 'contact', label: 'Contact', href: '#' }
  ];

  // Mapping object to convert category titles to route paths
  const categoryRoutes = {
    'Bridal dresses': '/bridaldress',
    'Bouquets & floral props': '/bridalshoes', // You may need to add this route
    'Bridal shoes': '/bridalshoes',
    'Bridal sets & accessories': '/bridalaccessories',
    'Groom wear & tuxedos': '/groomsmen',
    'Bridal shower props': '/groomsmen', // You may need to add this route
    'Honeymoon package': '/groomsmen' // You may need to add this route
  };

  const categories = [
    {
      id: 1,
      title: 'Bridal dresses',
      image: 'https://res.cloudinary.com/drgk8rmny/image/upload/v1756446721/image_14_u9coq8.png',
      description: 'Elegant bridal gowns for your special day'
    },
    {
      id: 2,
      title: 'Bouquets & floral props',
      image: 'https://res.cloudinary.com/drgk8rmny/image/upload/v1756446813/image_32_upiq4i.png',
      description: 'Beautiful bouquets and floral arrangements'
    },
    {
      id: 3,
      title: 'Bridal shoes',
      image: 'https://res.cloudinary.com/drgk8rmny/image/upload/v1756446724/image_33_x3l7vp.png',
      description: 'Comfortable and stylish wedding footwear'
    },
    {
      id: 4,
      title: 'Bridal sets & accessories',
      image: 'https://res.cloudinary.com/drgk8rmny/image/upload/v1756446721/image_34_u6vaw9.png',
      description: 'Complete bridal accessory collections'
    },
    {
      id: 5,
      title: 'Groom wear & tuxedos',
      image: 'https://res.cloudinary.com/drgk8rmny/image/upload/v1756446721/image_30_buh1fj.png',
      description: 'Sophisticated menswear for grooms'
    },
    {
      id: 6,
      title: 'Bridal shower props',
      image: 'https://res.cloudinary.com/drgk8rmny/image/upload/v1756446722/image_35_ffbrn5.png',
      description: 'Fun props for bridal shower celebrations'
    },
    {
      id: 7,
      title: 'Honeymoon package',
      image: 'https://res.cloudinary.com/drgk8rmny/image/upload/v1756446722/image_36_typ1gy.png',
      description: 'Romantic getaway packages for newlyweds'
    }
  ];

  const footerLinks = [
    { id: 1, label: 'Home', href: '#' },
    { id: 2, label: 'Shop', href: '#' },
    { id: 3, label: 'About', href: '#' },
    { id: 4, label: 'FAQ', href: '#' },
    { id: 5, label: 'Contact', href: '#' }
  ];

  const handleNavClick = (item) => {
    setActiveNavItem(item.label);
    setIsMobileMenuOpen(false);
    console.log(`Navigating to ${item.label}`);
  };

  const handleIconClick = (iconName) => {
    if (iconName === 'Cart') {
      console.log('Opening cart');
    } else if (iconName === 'Search') {
      console.log('Opening search');
    } else if (iconName === 'User') {
      console.log('Opening user account');
    }
  };

  // Updated handleCategoryClick function with navigation
  const handleCategoryClick = (category) => {
    console.log(`Viewing category: ${category.title}`);
    
    // Get the route path from the mapping
    const routePath = categoryRoutes[category.title];
    
    if (routePath) {
      navigate(routePath);
    } else {
      console.warn(`No route found for category: ${category.title}`);
      // Optionally, you could show a message to the user or navigate to a default page
    }
  };

  const FilterDropdown = ({ label, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 hover:text-gray-900 transition-colors duration-200"
        >
          <span>{label}</span>
          <ChevronDown size={12} className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setActiveFilters(prev => ({ ...prev, [label.toLowerCase()]: option.value }));
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
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

  const CategoryCard = ({ category }) => (
    <div 
      onClick={() => handleCategoryClick(category)}
      className="relative h-[625px] rounded-lg overflow-hidden shadow-md cursor-pointer group transition-transform duration-300 hover:scale-100"
    >
      <img 
        src={category.image}
        alt={category.description}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-colors duration-300" />
      <div className="absolute bottom-3 left-3 bg-white bg-opacity-90 text-xs text-gray-700 rounded px-3 py-2 font-semibold group-hover:bg-opacity-100 transition-colors duration-300">
        {category.title}
      </div>
    </div>
  );

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      {/* Top Green Navigation Bar */}
       <Navbar />

      {/* Hero Section */}
      <section className="mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-0 relative">
          <div className="relative overflow-hidden group">
            <img 
              src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756444267/image_31_j3ux2z.png"
              alt="Close-up of wedding dress lace and buttons showing intricate floral embroidery and pearl buttons"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Hero Text Overlay */}
          <div className="absolute bottom-10 left-6 md:left-12 text-white max-w-full z-10">
            <h2 className="text-2xl md:text-7xl font-semibold mb-1 drop-shadow-lg">
              Weddings
            </h2>
            <p className="text-6xl md:text-xl drop-shadow-lg w-full">
              Find the perfect wedding dress and accessories to make your special day memorable
            </p>
          </div>
        </div>
      </section>

      {/* Categories & Collection Section */}
      <section className="max-w-[100rem] mx-auto px-4 mt-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-1 tracking-wide">
              CATEGORIES
            </p>
            <h3 className="text-2xl font-semibold text-gray-900">
              Our Collection
            </h3>
          </div>
          
          {/* Filter Controls */}
          <div className="flex space-x-6 mt-4 md:mt-0 text-gray-700 text-sm font-semibold">
            <FilterDropdown 
              label="Category" 
              options={[
                { value: '', label: 'All Categories' },
                { value: 'bridal', label: 'Bridal Dresses' },
                { value: 'accessories', label: 'Accessories' },
                { value: 'groom', label: 'Groom Wear' }
              ]}
            />
            <FilterDropdown 
              label="Price" 
              options={[
                { value: '', label: 'All Prices' },
                { value: 'low', label: 'Under ₦100K' },
                { value: 'medium', label: '₦100K - ₦500K' },
                { value: 'high', label: 'Over ₦500K' }
              ]}
            />
            <FilterDropdown 
              label="Size" 
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
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Footer */}
        <footer className="max-w-[100rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-10 pt-10">
            <MarketFooter />
        </footer>

        <p className="text-xs text-gray-400 my-6 text-center select-none">
          Copyright © Skyis 2025
        </p>
    </div>
  );
};

export default Wedding;