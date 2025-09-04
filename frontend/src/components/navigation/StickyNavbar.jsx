import React, { useState } from 'react';

const StickyNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <>
      <header className="sticky z-50 w-[95%] mt-2.5 rounded-full mx-auto top-3 backdrop-blur-md bg-white/80 shadow-lg border border-white/30">
        <nav className="max-w-[90rem] mx-auto flex items-center justify-between px-6 sm:px-10 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg"
              alt="Skyis logo"
              className="w-auto h-8"
            />
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center space-x-8 text-sm font-light text-[#0B3B36]">
            {/* Product Dropdown */}
            <li className="relative group cursor-pointer">
              <button 
                className="flex items-center space-x-1 hover:text-[#0F4A44] transition-colors duration-200"
                onClick={() => toggleDropdown('product')}
              >
                <span>Product</span>
                <svg className="w-3 h-3 transform transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {activeDropdown === 'product' && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white/90 backdrop-blur-md shadow-lg rounded-md text-sm text-[#0B3B36] py-2 border border-white/30">
                  {['Fashion', 'Creative', 'Highlight', 'Admin'].map((item, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="block px-4 py-2 hover:bg-white/50 transition-colors duration-150"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </li>

            {/* Resources Dropdown */}
            <li className="relative group cursor-pointer">
              <button 
                className="flex items-center space-x-1 hover:text-[#0F4A44] transition-colors duration-200"
                onClick={() => toggleDropdown('resources')}
              >
                <span>Resources</span>
                <svg className="w-3 h-3 transform transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white/90 backdrop-blur-md shadow-lg rounded-md text-sm text-[#0B3B36] py-2 border border-white/30">
                  {['Design', 'Pictures', 'Paper Works', 'Colours'].map((item, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="block px-4 py-2 hover:bg-white/50 transition-colors duration-150"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </li>

            {/* Contact */}
            <li>
              <a href="#" className="hover:text-[#0F4A44] transition-colors duration-200">
                Contact Us
              </a>
            </li>
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-white/80 backdrop-blur-sm text-[#0B3B36] rounded-full px-8 py-3 text-sm font-semibold hover:bg-white/90 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0B3B36] focus:ring-offset-1 shadow-md">
              Login
            </button>
            <button className="bg-[#0B3B36] text-white rounded-full px-8 py-3 text-sm font-semibold hover:bg-[#0F4A44] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0B3B36] focus:ring-offset-1 shadow-md">
              Get started for free
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex flex-col space-y-1.5 focus:outline-none p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 bg-[#0B3B36] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-[#0B3B36] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-[#0B3B36] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden sticky top-[88px] z-40 w-[95%] mx-auto bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-white/30 overflow-hidden">
          <div className="px-6 py-6 space-y-4">
            {/* Mobile Menu Items */}
            <div className="space-y-4">
              {/* Product Dropdown */}
              <div>
                <button 
                  onClick={() => toggleDropdown('mobile-product')}
                  className="flex items-center justify-between w-full text-left text-[#0B3B36] font-medium text-base py-2"
                >
                  Product
                  <svg 
                    className={`w-4 h-4 transform transition-transform duration-200 ${
                      activeDropdown === 'mobile-product' ? 'rotate-180' : ''
                    }`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {activeDropdown === 'mobile-product' && (
                  <div className="mt-3 ml-4 space-y-3 border-l border-[#0B3B36]/20 pl-4">
                    {['Fashion', 'Creative', 'Highlight', 'Admin'].map((item, idx) => (
                      <a 
                        key={idx} 
                        href="#" 
                        className="block text-sm text-[#0B3B36]/80 hover:text-[#0B3B36] transition-colors duration-150"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div>
                <button 
                  onClick={() => toggleDropdown('mobile-resources')}
                  className="flex items-center justify-between w-full text-left text-[#0B3B36] font-medium text-base py-2"
                >
                  Resources
                  <svg 
                    className={`w-4 h-4 transform transition-transform duration-200 ${
                      activeDropdown === 'mobile-resources' ? 'rotate-180' : ''
                    }`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {activeDropdown === 'mobile-resources' && (
                  <div className="mt-3 ml-4 space-y-3 border-l border-[#0B3B36]/20 pl-4">
                    {['Design', 'Pictures', 'Paper Works', 'Colours'].map((item, idx) => (
                      <a 
                        key={idx} 
                        href="#" 
                        className="block text-sm text-[#0B3B36]/80 hover:text-[#0B3B36] transition-colors duration-150"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact */}
              <a 
                href="#" 
                className="block text-[#0B3B36] font-medium text-base py-2 hover:text-[#0F4A44] transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>

            {/* Mobile Buttons */}
            <div className="pt-6 border-t border-[#0B3B36]/20 space-y-3">
              <button className=" bg-white/80 backdrop-blur-sm text-[#0B3B36] rounded-full px-8 py-4 w-max sm:text-sm font-semibold ease-in-out transform hover:scale-105 hover:shadow-lg animate-slideInLeft animation-delay-200 hover:bg-white/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0B3B36] shadow-md">
                Login
              </button>
              <button className="bg-[#0B3B36] text-white rounded-full px-8 py-4 w-max sm:text-sm font-semibold ease-in-out transform hover:scale-105 hover:shadow-lg animate-slideInLeft animation-delay-200 hover:bg-[#0F4A44] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0B3B36] shadow-md">
                Get started for free
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StickyNavbar;