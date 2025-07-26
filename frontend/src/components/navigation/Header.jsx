import React, { useEffect, useState } from 'react';

const Header = () => {
  const [isDarkBackground, setIsDarkBackground] = useState(true); // Start with dark since hero is dark

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (!header) return;
      
      const rect = header.getBoundingClientRect();
      const centerY = rect.top + (rect.height / 2);
      
      // Sample multiple points across the header width for better accuracy
      const samplePoints = [
        { x: rect.left + rect.width * 0.1, y: centerY },
        { x: rect.left + rect.width * 0.3, y: centerY },
        { x: rect.left + rect.width * 0.5, y: centerY },
        { x: rect.left + rect.width * 0.7, y: centerY },
        { x: rect.left + rect.width * 0.9, y: centerY }
      ];
      
      let totalBrightness = 0;
      let validSamples = 0;
      
      samplePoints.forEach(point => {
        const element = document.elementFromPoint(point.x, point.y);
        if (element && element !== header && !header.contains(element)) {
          const computedStyle = window.getComputedStyle(element);
          let bgColor = computedStyle.backgroundColor;
          
          // If background is transparent, check parent elements
          let currentElement = element;
          while (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
            currentElement = currentElement.parentElement;
            if (!currentElement || currentElement === document.body) break;
            bgColor = window.getComputedStyle(currentElement).backgroundColor;
          }
          
          // Parse RGB values
          const rgb = bgColor.match(/\d+/g);
          
          if (rgb && rgb.length >= 3) {
            const [r, g, b] = rgb.map(Number);
            // Use luminance formula for better brightness detection
            const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
            totalBrightness += brightness;
            validSamples++;
          }
        }
      });
      
      if (validSamples > 0) {
        const avgBrightness = totalBrightness / validSamples;
        // Use a more sensitive threshold and add hysteresis to prevent flickering
        const threshold = isDarkBackground ? 140 : 120; // Different thresholds based on current state
        // When background is DARK (low brightness), we want WHITE text/logo
        // When background is LIGHT (high brightness), we want DARK GREEN text/logo
        setIsDarkBackground(avgBrightness < threshold);
      }
    };

    // Initial call
    handleScroll();
    
    // Add scroll listener with throttling for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isDarkBackground]); // Add isDarkBackground to dependency array for hysteresis

  return (
    <header
      className={`sticky z-50 w-[95%] mt-2.5 rounded-full mx-auto top-3 backdrop-blur-md bg-white/20 shadow-lg border border-white/10 ${
        isDarkBackground 
          ? 'text-[#0B5B54]'
          : 'text-white' 
      }`}
      style={{ 
        transition: 'background-color 0.15s ease-in-out', // Only animate background, not text color
        // When isDarkBackground is TRUE (dark background detected) → WHITE text
        // When isDarkBackground is FALSE (light background detected) → DARK GREEN text
        color: isDarkBackground ? '#0B5B54'  : '#ffffff'// Explicit color setting for instant change
      }}a123

    >
      <nav className="max-w-[90rem] mx-auto flex items-center justify-between px-6 sm:px-10 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://res.cloudinary.com/drgk8rmny/image/upload/e_sharpen:50/v1751692518/logo_ny12dm.png"
            alt="Skyis logo"
            className="w-auto h-8" // Added explicit sizing
            style={{ 
              // When isDarkBackground is TRUE (dark background detected) → WHITE logo
              // When isDarkBackground is FALSE (light background detected) → ORIGINAL/DARK logo
              filter: isDarkBackground 
                ? 'brightness(0) invert(1)' // WHITE logo for dark backgrounds
                : 'brightness(1) invert(0)', // ORIGINAL/DARK logo for light backgrounds
              transition: 'none' // No transition for instant change
            }}
          />
        </div>

        {/* Nav Links */}
        <ul 
          className="hidden md:flex items-center space-x-8 text-sm font-light"
          style={{ 
            // When isDarkBackground is TRUE (dark background detected) → WHITE text
            // When isDarkBackground is FALSE (light background detected) → DARK GREEN text
            color: isDarkBackground ? '#ffffff' : '#0B5B54',
            transition: 'none' // No transition for instant change
          }}
        >
          {/* Product Dropdown */}
          <li className="relative group cursor-pointer">
            <button className="flex items-center space-x-1 hover:opacity-70" style={{ transition: 'opacity 0.15s' }}>
              <span>Product</span>
              <i className="fas fa-chevron-down text-xs"></i>
            </button>
            <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-md text-sm text-[#06403b] py-2 hidden group-hover:block">
              {['Fashion', 'Creative', 'Highlight', 'Admin'].map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {item}
                </a>
              ))}
            </div>
          </li>

          {/* Resources Dropdown */}
          <li className="relative group cursor-pointer">
            <button className="flex items-center space-x-1 hover:opacity-70" style={{ transition: 'opacity 0.15s' }}>
              <span>Resources</span>
              <i className="fas fa-chevron-down text-xs"></i>
            </button>
            <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-lg rounded-md text-sm text-[#06403b] py-2 hidden group-hover:block">
              {['Design', 'Pictures', 'Paper Works', 'Colours'].map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {item}
                </a>
              ))}
            </div>
          </li>

          {/* Contact */}
          <li>
            <a href="#" className="hover:opacity-70" style={{ transition: 'opacity 0.15s' }}>
              Contact Us
            </a>
          </li>
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            className="bg-white text-[#071B1A] rounded-full px-8 py-4 w-max hover:bg-gray-100 ease-in-out transform hover:scale-105 hover:shadow-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white"
            style={{ transition: 'background-color 0.15s, transform 0.3s, box-shadow 0.3s' }}
          >
            Login
          </button>
          <button 
            className="bg-[#0F5B54] text-white rounded-full px-8 py-4 w-max text-sm font-semibold focus:outline-none ease-in-out transform hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-offset-1 hover:bg-[#0d4a45] focus:ring-[#0F5B54]"
            style={{ transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s' }}
          >
            Get started for free
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Open menu"
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-offset-1"
          type="button"
          style={{ 
            // When isDarkBackground is TRUE (dark background detected) → WHITE text
            // When isDarkBackground is FALSE (light background detected) → DARK GREEN text
            color: isDarkBackground ? '#ffffff' : '#0B5B54',
            transition: 'none' // No transition for instant change
          }}
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      </nav>
    </header>
  );
};

export default Header;