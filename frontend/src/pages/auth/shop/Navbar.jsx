import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ cartItems = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get active nav item based on current path
  const getActiveNavItem = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/marketplace' || path.startsWith('/shop')) return 'shop';
    if (path === '/about') return 'about';
    if (path === '/how-it-works') return 'how-it-works';
    if (path === '/showcase') return 'showcase';
    if (path === '/reviews') return 'reviews';
    if (path === '/faq') return 'faq';
    if (path === '/contact') return 'contact';
    return '';
  };

  const [activeNavItem, setActiveNavItem] = useState(getActiveNavItem());

  // Update active nav item when location changes
  useEffect(() => {
    setActiveNavItem(getActiveNavItem());
  }, [location]);

  const topNavItems = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    label: 'NEW ARRIVALS',
    href: '#new-arrivals'
  }));

  const mainNavItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'shop', label: 'Shop', href: '/marketplace' },
    { id: 'about', label: 'About', href: '/#about' },
    { id: 'how-it-works', label: 'How it works', href: '/#howitworks' },
    { id: 'showcase', label: 'Showcase', href: '/#showcase' },
    { id: 'reviews', label: 'Reviews', href: '/#reviews' },
    { id: 'faq', label: 'FAQ', href: '/#faq' },
    { id: 'contact', label: 'Contact', href: '/#contact' }
  ];

  const handleNavClick = (navItem) => {
    setActiveNavItem(navItem.id);
    setIsMobileMenuOpen(false);
    // Smooth scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIconClick = (iconName) => {
    setIsMobileMenuOpen(false);
    switch(iconName) {
      case 'Search':
        navigate('/search');
        break;
      case 'User':
        navigate('/login');
        break;
      case 'Cart':
        navigate('/cart');
        break;
      default:
        break;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Top Green Navigation */}
      <header className="bg-[#0f3a3a] text-white text-xs sm:text-sm font-semibold">
        <nav className="mx-auto flex items-center justify-between px-4 py-2">
          {/* Scrolling Text */}
          <div className="relative flex-1 overflow-hidden">
            <ul className="flex space-x-12 animate-marquee whitespace-nowrap">
              {Array(200)
                .fill("NEW ARRIVALS")
                .map((item, i) => (
                  <li key={i} className="cursor-pointer">
                    {item}
                  </li>
                ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Main Header Navigation */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-[100rem] gap-10 mx-auto px-4 sm:px-4 lg:px-4 flex items-center justify-between h-20">
          {/* Logo */}
          <div className="hidden flex-1 sm:flex flex-shrink-0 w-full md:max-w-lg lg:max-w-2xl rounded-3xl overflow-hidden relative">
            <Link 
              to="/" 
              onClick={() => handleNavClick({ id: 'home' })}
              className="flex items-center"
            >
              <img 
                alt="Skyis logo" 
                className="h-10 w-auto" 
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg" 
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm font-normal text-gray-900">
            {mainNavItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                onClick={() => handleNavClick(item)}
                className={`hover:underline transition-colors duration-200 ${
                  activeNavItem === item.id ? 'border-b-2 border-black pb-1' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-6 text-gray-900 text-lg">
              <button 
                onClick={() => handleIconClick('Search')}
                className="hover:text-gray-600 transition-colors duration-200" 
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <button 
                onClick={() => handleIconClick('User')}
                className="hover:text-gray-600 transition-colors duration-200" 
                aria-label="User account"
              >
                <User size={18} />
              </button>
              <button 
                onClick={() => handleIconClick('Cart')}
                className="relative hover:text-gray-600 transition-colors duration-200" 
                aria-label="Shopping cart"
              >
                <ShoppingCart size={18} />
                {cartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold animate-pulse">
                    {cartItems > 99 ? '99+' : cartItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-900 hover:text-gray-600 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {/* Mobile Nav Items */}
              {mainNavItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => handleNavClick(item)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    activeNavItem === item.id 
                      ? 'text-green-900 bg-green-50 border-l-4 border-green-900' 
                      : 'text-gray-900 hover:text-green-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Icons */}
              <div className="flex items-center justify-around pt-4 pb-2 border-t border-gray-200 mt-4">
                <button 
                  onClick={() => handleIconClick('Search')}
                  className="flex flex-col items-center space-y-1 text-gray-600 hover:text-green-900 transition-colors duration-200"
                >
                  <Search size={20} />
                  <span className="text-xs">Search</span>
                </button>
                <button 
                  onClick={() => handleIconClick('User')}
                  className="flex flex-col items-center space-y-1 text-gray-600 hover:text-green-900 transition-colors duration-200"
                >
                  <User size={20} />
                  <span className="text-xs">Account</span>
                </button>
                <button 
                  onClick={() => handleIconClick('Cart')}
                  className="flex flex-col items-center space-y-1 text-gray-600 hover:text-green-900 transition-colors duration-200 relative"
                >
                  <div className="relative">
                    <ShoppingCart size={20} />
                    {cartItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                        {cartItems > 9 ? '9+' : cartItems}
                      </span>
                    )}
                  </div>
                  <span className="text-xs">Cart</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;