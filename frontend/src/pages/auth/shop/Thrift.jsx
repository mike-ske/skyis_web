import React, { useState } from 'react';
import Navbar from './Navbar';
import MarketFooter from './marketlayout/MarketFooter';

const Thrift = () => {
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
  
  // Collection images data
  const collectionItems = [
    {
      id: 1,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808945/image_69_n2hszm.png",
      alt: "Folded denim jacket and pink shirt with heart pattern on a pile of clothes",
      tag: "Crowdsourced listings"
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808945/image_70_xs3wsw.png",
      alt: "Gloved hands inspecting navy blue shirt with denim jeans in the background",
      tag: "Verified quality checks"
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808947/image_71_du1xy2.png",
      alt: "Beige lace dress on mannequin with dark background",
      tag: "Auction-only items"
    }
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Top bar */}
      <Navbar />
      <section className="relative bg-gray-900 text-white">
        <div className="relative overflow-hidden group">
            <img 
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808967/image_78_zaacta.png"
                alt="Close-up of wedding dress lace and buttons showing intricate floral embroidery and pearl buttons"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent flex flex-col justify-end px-6 pb-16 max-w-[100rem] mx-auto w-full">
          <h2 className="sm:text-4xl text-xl font-normal leading-tight">
            Thrift & Pre-Loved
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300">
            Shop quality pre-loved fashion, thrift finds, and auction-only treasures that are sustainable and full of character.
          </p>
        </div>
      </section>

      {/* Categories & Collection */}
      <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <p className="text-xs text-gray-600 font-normal tracking-wide mb-1">
              CATEGORIES
            </p>
            <h3 className="text-2xl font-semibold font-sans">
              Our Collection
            </h3>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0 text-xs text-gray-700 font-normal">
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
            <div key={item.id} className="relative rounded-lg overflow-hidden group cursor-pointer">
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

export default Thrift;