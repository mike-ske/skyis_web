import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import MarketFooter from './marketlayout/MarketFooter';

const Luxury = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  
  // Navigation items data
  const navItems = [
    { id: 1, name: "Home", active: false },
    { id: 2, name: "Shop", active: true },
    { id: 3, name: "About", active: false },
    { id: 4, name: "How it works", active: false },
    { id: 5, name: "Showcase", active: false },
    { id: 6, name: "Reviews", active: false },
    { id: 7, name: "FAQ", active: false },
    { id: 8, name: "Contact", active: false }
  ];
  
  // Footer links data
  const footerLinks = [
    { id: 1, number: "01 /", name: "Home" },
    { id: 2, number: "02 /", name: "Shop" },
    { id: 3, number: "03 /", name: "About" },
    { id: 4, number: "04 /", name: "FAQ" },
    { id: 5, number: "05 /", name: "Contact" }
  ];

  // Mapping object to convert category tags to route paths
  const categoryRoutes = {
    'Wear & style collections': '/collections',
    'Designer costumes': '/designer-costumes',
    'Luxury bags': '/luxury-bags',
    'Pre-owned luxury goods': '/pre-owned-luxury'
  };
  
  // Collection items data
  const collectionItems = [
    {
      id: 1,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808935/image_59_don465.png",
      alt: "Gray long coat on mannequin with shadowed background",
      tag: "Wear & style collections"
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808939/image_61_xajmcw.png",
      alt: "Designer costumes white and red on mannequins with dark background",
      tag: "Designer costumes"
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808936/image_62_i5xwue.png",
      alt: "Brown luxury bag with gold clasp on beige background",
      tag: "Luxury bags"
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808935/image_63_mxhigt.png",
      alt: "Brown and beige boots and bag on dark background",
      tag: "Pre-owned luxury goods"
    }
  ];

  // Handle category click with navigation
  const handleCategoryClick = (item) => {
    console.log(`Viewing category: ${item.tag}`);
    
    // Get the route path from the mapping
    const routePath = categoryRoutes[item.tag];
    
    if (routePath) {
      navigate(routePath);
    } else {
      console.warn(`No route found for category: ${item.tag}`);
      // Optionally, you could show a message to the user or navigate to a default page
    }
  };

  return (
    <div className="bg-white text-black" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Top scrolling nav */}
       <Navbar />
      {/* Hero section */}
       <section className="relative bg-gray-900 text-white">
            <div className="relative overflow-hidden group">
                <img 
                    src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808967/image_56_frjxmy.png"
                    alt="Close-up of wedding dress lace and buttons showing intricate floral embroidery and pearl buttons"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent flex flex-col justify-end px-6 pb-16 max-w-[100rem] mx-auto w-full">
                <h2 className="sm:text-4xl text-xl font-normal leading-tight">
                    Luxury
                </h2>
                <p className="mt-2 text-sm sm:text-base text-gray-300">
                Discover timeless designer pieces and exclusive collections that bring elegance and sophistication to every occasion.
                </p>
            </div>
      </section>

      {/* Categories heading and filters */}
      <section className="max-w-[100rem] mx-auto px-4 mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <p className="text-xs sm:text-lg font-normal uppercase text-gray-600 tracking-wide mb-1">
              Categories
            </p>
            <h3 className="text-2xl font-semibold font-playfair">
              Our Collection
            </h3>
          </div>
          <div className="flex space-x-8 mt-4 sm:mt-0 text-xs font-normal text-gray-700">
            <button className="flex items-center space-x-1 hover:underline">
              <span>Category</span>
              <i className="fas fa-chevron-down text-[10px]"></i>
            </button>
            <button className="flex items-center space-x-1 hover:underline">
              <span>Price</span>
              <i className="fas fa-chevron-down text-[10px]"></i>
            </button>
            <button className="flex items-center space-x-1 hover:underline">
              <span>Size</span>
              <i className="fas fa-chevron-down text-[10px]"></i>
            </button>
          </div>
        </div>
        
         {/* Collection images grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {collectionItems.map(item => (
            <div 
              key={item.id} 
              onClick={() => handleCategoryClick(item)}
              className="relative rounded-lg overflow-hidden group cursor-pointer"
            >
              <img 
                alt={item.alt} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 min-h-[400px]" 
                loading="lazy" 
                src={item.src} 
              />
              <span className="absolute bottom-3 left-3 bg-gray-200 text-gray-600 text-[10px] font-normal rounded-md px-2 py-0.5 select-none">
                {item.tag}
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

export default Luxury;