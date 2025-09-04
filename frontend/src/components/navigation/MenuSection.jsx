import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/marketplace' },
    { label: 'About', path: '#about' },
    { label: 'FAQS', path: '#faq' },
    { label: 'Contact', path: '/#contact' },
    { label: 'Sign in', path: '/login' },
    { label: 'Sign up', path: '/register' }
  ];

  return (
    <>
      <header className="relative z-20 max-w-[1553px] w-full mx-auto flex items-center justify-between px-4 sm:px-6 py-2">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-white text-sm font-normal">
          <img
            src="https://res.cloudinary.com/drgk8rmny/image/upload/e_sharpen:50/v1751692518/logo_ny12dm.png"
            alt="Feather icon representing Skyis logo"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-4 text-white text-sm font-normal">
          <button aria-label="Search" className="focus:outline-none">
            <i className="fas fa-search"></i>
          </button>
          <button
            aria-label="Menu"
            className="flex items-center space-x-1 focus:outline-none"
            onClick={toggleMenu}
          >
            <i className="fas fa-bars"></i>
            <span className="select-none">Menu</span>
          </button>
        </nav>
      </header>

      {/* Dropdown Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Slide Menu Panel */}
      <div 
        className={`fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={toggleMenu}
            className="text-gray-600 flex justify-center items-center hover:text-gray-800 focus:outline-none transition-colors duration-200"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="ml-2 text-sm">Close</span>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="px-4 pb-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center justify-between py-4 px-2 text-gray-700 hover:text-gray-900 border-b border-gray-200 last:border-b-0 transition-all duration-200 group transform ${
                isMenuOpen 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-4 opacity-0'
              }`}
              style={{
                transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-sm font-normal">
                01 / {item.label}
              </span>
              <svg 
                className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;