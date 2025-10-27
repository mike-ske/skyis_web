// components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, User, ShoppingCart, Menu, X, ChevronDown, Filter } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useCart } from '../../../contexts/CartContext';
import { useSearch } from '../../../contexts/SearchContext';

// Import Iconsax React icons
import { 
  Menu as Home,
  ShopAdd as Store,
  Brush2 as Pen,
  ColorSwatch as Brush,
  Scissor as Scissors,
  LogoutCurve as Logout
} from 'iconsax-reactjs';

const Navbar = ({ onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showSearchFilters, setShowSearchFilters] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  
  // Use contexts
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { 
    searchQuery, 
    setSearchQuery, 
    performSearch, 
    clearSearch,
    searchFilters,
    setSearchFilters 
  } = useSearch();

  const isHomePage = location.pathname === '/';

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setIsPastHero(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setShowSearchFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper: determine active nav item from path
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
  useEffect(() => {
    setActiveNavItem(getActiveNavItem());
  }, [location]);

  const mainNavItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'shop', label: 'Shop', href: '/marketplace' },
    { id: 'about', label: 'About', href: '/#about' },
    { id: 'how-it-works', label: 'How it works', href: '/#howitworks' },
    { id: 'showcase', label: 'Showcase', href: '/#showcase' },
    { id: 'reviews', label: 'Reviews', href: '/#reviews' },
    { id: 'faq', label: 'FAQ', href: '/#faq' },
    { id: 'contact', label: 'Contact', href: '/#contact' },
  ];

  const userDropdownItems = [
    { id: 'dashboard', 
      label: 'My dashboard', 
      icon: <Home variant="Bulk" size="18" />, 
      href: '/shopperdashboard/overview' 
    },
    { id: 'create-store', 
      label: 'Sign in as a Shop Owner', 
      icon: <Store variant="Bulk" size="18" />, 
      href: '/create-store' 
    },
    { id: 'become-creator', 
      label: 'Sign in as a Fashion Creator', 
      icon: <Pen variant="Bulk" size="18" />, 
      href: '/become-creator' 
    },
    { id: 'become-designer', 
      label: 'Sign in as a Fashion Designer', 
      icon: <Brush variant="Bulk" size="18" />, 
      href: '/become-designer' 
    },
    { id: 'become-dressmaker', 
      label: 'Sign in as a Dress Maker', 
      icon: <Scissors variant="Bulk" size="18" />, 
      href: '/become-dressmaker' 
    },
    { id: 'logout', 
      label: 'Logout', 
      icon: <Logout variant="Bulk" size="18" />, 
      href: '/logout', 
      isLogout: true 
    },
  ];

  // Search functionality
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery, searchFilters);
      navigate('/search-results');
      setIsSearchOpen(false);
      setShowSearchFilters(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearchHandler = () => {
    clearSearch();
    setIsSearchOpen(false);
    setShowSearchFilters(false);
  };

  const applyFilter = (filterType, value) => {
    const newFilters = { ...searchFilters, [filterType]: value };
    setSearchFilters(newFilters);
    if (searchQuery.trim()) {
      performSearch(searchQuery, newFilters);
    }
  };

  // Navigation handlers
  const handleNavClick = (navItem) => {
    setActiveNavItem(navItem.id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(navItem.href);
  };

  const handleIconClick = (iconName) => { 
    setIsMobileMenuOpen(false);

    switch (iconName) {
      case 'Search':
        setIsSearchOpen(true);
        break;

      case 'User':
        if (user) {
          setIsUserDropdownOpen((s) => !s);
        } else {
          navigate('/login');
        }
        break;

      case 'Cart': {
        const token = localStorage.getItem('auth_token');

        // Check if user is logged in
        if (!token) {
          console.log("⚠️ No token, redirecting to login");
          navigate('/login');
          return;
        }

        // Open cart modal or navigate
        if (typeof onCartClick === 'function') {
          onCartClick();
        } else {
          navigate('/cart');
        }
        break;
      }

      default:
        break;
    }
  };

  const handleDropdownItemClick = async (item) => {
    setIsUserDropdownOpen(false);
    
    if (item.isLogout) {
      try {
        await logout();
        navigate('/', { replace: true });
        window.location.href = '/';
      } catch (error) {
        console.error('Logout error:', error);
        localStorage.clear();
        window.location.href = '/';
      }
    } else {
      navigate(item.href);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((s) => !s);
    setIsUserDropdownOpen(false);
  };

  // Get initials from user object
  const getUserInitials = (u) => {
    if (!u) return 'U';
    const name = u.name || u.fullname || u.username || '';
    if (name && name.trim().length > 0) {
      const parts = name.trim().split(' ').filter(Boolean);
      if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
    if (u.email) return u.email.charAt(0).toUpperCase();
    return 'U';
  };

  // Pick profile image from common fields
  const profileImageFor = (u) => {
    if (!u) return null;
    return u.avatar || u.avatar_url || u.profileImage || u.profile_image || u.picture || u.image || null;
  };

  // Navbar style helpers
  const getNavbarStyles = () => {
    if (isHomePage) {
      return !isPastHero
        ? 'absolute top-10 left-0 right-0 bg-white bg-opacity-0 border-b border-transparent text-white'
        : 'sticky top-0 left-0 right-0 bg-white bg-opacity-100 border-b border-gray-200 text-gray-900 shadow-sm backdrop-blur-sm';
    }
    return 'sticky top-0 left-0 right-0 bg-white bg-opacity-100 border-b border-gray-200 text-gray-900';
  };

  const getLogoFilter = () => {
    if (isHomePage && !isScrolled) {
      return 'brightness-0 invert';
    }
    return 'brightness-100';
  };

  const getSearchInputStyles = () => {
    if (isHomePage && !isPastHero) {
      return 'bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border-white border-opacity-30';
    }
    return 'bg-white text-gray-900 placeholder-gray-500 border-gray-300';
  };

  return (
    <>
      {/* Top Green Navigation */}
      <header className="bg-[#0f3a3a] text-white text-xs sm:text-sm font-semibold">
        <nav className="mx-auto flex items-center justify-between px-4 py-2">
          <div className="relative flex-1 overflow-hidden">
            <ul className="flex space-x-12 animate-marquee whitespace-nowrap">
              {Array(200).fill('NEW ARRIVALS').map((item, i) => (
                <li key={i} className="cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Main Header Navigation */}
      <header className={`z-50 transition-colors duration-500 ease-in-out ${getNavbarStyles()}`}>
        <div
          className={`max-w-[100rem] gap-10 mx-auto px-4 sm:px-4 lg:px-4 flex items-center justify-between transition-all duration-500 ease-in-out ${isPastHero ? 'h-16' : 'h-20'}`}
        >
          {/* Logo */}
          <div className="hidden flex-1 sm:flex flex-shrink-0 w-full md:max-w-lg lg:max-w-2xl rounded-3xl overflow-hidden relative">
            <Link
              to="/"
              onClick={() => handleNavClick({ id: 'home', href: '/' })}
              className="flex items-center transition-transform duration-200 hover:scale-105"
            >
              <img
                alt="Skyis logo"
                className={`h-10 w-auto transition-all duration-500 ease-in-out ${getLogoFilter()}`}
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm font-normal">
            {mainNavItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                onClick={() => handleNavClick(item)}
                className={`hover:opacity-80 transition-all duration-200 transform hover:scale-105 ${
                  activeNavItem === item.id ? 'border-b-2 border-current pb-1' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-6 text-lg">
              {/* Search with Dropdown */}
              <div className="relative" ref={searchRef}>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="hover:opacity-70 transition-all duration-200 transform hover:scale-110"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>

                {/* Search Dropdown */}
                {isSearchOpen && (
                  <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50">
                    <form onSubmit={handleSearchSubmit}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Search Products</h3>
                        <button
                          type="button"
                          onClick={() => setShowSearchFilters(!showSearchFilters)}
                          className="flex items-center space-x-2 text-[#0B7A72] hover:text-[#096860] transition-colors"
                        >
                          <Filter size={16} />
                          <span className="text-sm font-medium">Filters</span>
                        </button>
                      </div>

                      {/* Search Input */}
                      <div className="relative mb-4">
                        <input
                          type="text"
                          placeholder="Search for products, brands, and categories..."
                          value={searchQuery}
                          onChange={handleSearchChange}
                          className="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent transition-all"
                        />
                        <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={clearSearchHandler}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <X size={20} />
                          </button>
                        )}
                      </div>

                      {/* Search Filters */}
                      {showSearchFilters && (
                        <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                              value={searchFilters.category}
                              onChange={(e) => applyFilter('category', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent"
                            >
                              <option value="">All Categories</option>
                              <option value="luxury">Luxury</option>
                              <option value="ready-to-wear">Ready-to-Wear</option>
                              <option value="bespoke">Bespoke</option>
                              <option value="thrift">Thrift</option>
                              <option value="wedding">Wedding</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                            <select
                              value={searchFilters.priceRange}
                              onChange={(e) => applyFilter('priceRange', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent"
                            >
                              <option value="">Any Price</option>
                              <option value="0-10000">Under ₦10,000</option>
                              <option value="10000-50000">₦10,000 - ₦50,000</option>
                              <option value="50000-200000">₦50,000 - ₦200,000</option>
                              <option value="200000-500000">₦200,000 - ₦500,000</option>
                              <option value="500000-1000000000">Over ₦500,000</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                            <select
                              value={searchFilters.type}
                              onChange={(e) => applyFilter('type', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent"
                            >
                              <option value="">All Types</option>
                              <option value="Buy">Buy</option>
                              <option value="Rent">Rent</option>
                              <option value="Auction">Auction</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                            <select
                              value={searchFilters.rating}
                              onChange={(e) => applyFilter('rating', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent"
                            >
                              <option value="">Any Rating</option>
                              <option value="4">4+ Stars</option>
                              <option value="3">3+ Stars</option>
                              <option value="2">2+ Stars</option>
                              <option value="1">1+ Stars</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* Search Button */}
                      <button
                        type="submit"
                        disabled={!searchQuery.trim()}
                        className="w-full bg-[#0B7A72] text-white py-3 rounded-full font-semibold hover:bg-[#096860] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Search Products
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* User Profile / Login */}
              <div className="relative" ref={dropdownRef}>
                {user ? (
                  <button
                    onClick={() => handleIconClick('User')}
                    className="flex items-center space-x-2 hover:opacity-70 transition-all duration-200 transform hover:scale-105"
                    aria-label="User menu"
                  >
                    {profileImageFor(user) ? (
                      <img
                        src={profileImageFor(user)}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full object-cover shadow-md"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
                        {getUserInitials(user)}
                      </div>
                    )}

                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => handleIconClick('User')}
                    className="hover:opacity-70 transition-all duration-200 transform hover:scale-110"
                    aria-label="User account"
                  >
                    <User size={18} />
                  </button>
                )}

                {/* User Dropdown Menu */}
                {user && isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 transform transition-all duration-200 ease-out origin-top-right">
                    {userDropdownItems.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => handleDropdownItemClick(item)}
                        className={`w-full text-left px-4 py-3 text-sm sm:text-lg flex justify-between border-b-gray-100 my-2 border-b items-center space-x-3 transition-all duration-150 hover:bg-gray-50 ${
                          item.isLogout ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
                        } ${index === userDropdownItems.length - 1 ? ' mt-1' : ''}`}
                      >
                        <div className="text-gray-500 flex items-center space-x-2">
                          <span className="text-sm sm:text-lg">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <span className="ml-auto text-gray-400">→</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart with dynamic count from context */}
              <button
                onClick={() => handleIconClick('Cart')}
                className="relative hover:opacity-70 transition-all duration-200 transform hover:scale-110"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold animate-bounce">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden hover:opacity-70 transition-all duration-200 transform hover:scale-110"
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white border-t border-gray-200 shadow-lg absolute left-0 right-0 top-full">
            <div className="px-4 py-2 space-y-1">
              {/* Mobile Search */}
              <div className="mb-4">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent"
                  />
                  <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </form>
              </div>

              {/* Mobile Nav Items */}
              {mainNavItems.map((item, index) => (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={() => handleNavClick(item)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-all duration-200 transform hover:translate-x-2 ${
                    activeNavItem === item.id ? 'text-green-900 bg-green-50 border-l-4 border-green-900' : 'text-gray-900 hover:text-green-900 hover:bg-gray-50'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Icons */}
              <div className="flex items-center justify-around pt-4 pb-2 border-t border-gray-200 mt-4">
                <button onClick={() => handleIconClick('Search')} className="flex flex-col items-center space-y-1 text-gray-600 hover:text-green-900">
                  <Search size={20} />
                  <span className="text-xs">Search</span>
                </button>

                {user ? (
                  <div className="flex flex-col items-center space-y-1">
                    {profileImageFor(user) ? (
                      <img src={profileImageFor(user)} alt="User Avatar" className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                        {getUserInitials(user)}
                      </div>
                    )}
                    <span className="text-xs text-gray-600">Profile</span>
                  </div>
                ) : (
                  <button onClick={() => handleIconClick('User')} className="flex flex-col items-center space-y-1 text-gray-600 hover:text-green-900">
                    <User size={20} />
                    <span className="text-xs">Account</span>
                  </button>
                )}

                <button onClick={() => handleIconClick('Cart')} className="flex flex-col items-center space-y-1 text-gray-600 hover:text-green-900 relative">
                  <div className="relative">
                    <ShoppingCart size={20} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                        {cartCount > 9 ? '9+' : cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs">Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;