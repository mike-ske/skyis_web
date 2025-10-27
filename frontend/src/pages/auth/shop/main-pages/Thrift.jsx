import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import MarketFooter from '../marketlayout/MarketFooter';
import CartModal from '../CartModal';

const Thrift = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categoryRoutes = {
    'Crowdsourced listings': '/crowdsourced-listings',
    'Verified quality checks': '/verified-quality',
    'Auction-only items': '/auction-items'
  };
  
  const collectionItems = [
    {
      id: 1,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808945/image_69_n2hszm.png",
      alt: "Folded denim jacket and pink shirt",
      tag: "Crowdsourced listings"
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808945/image_70_xs3wsw.png",
      alt: "Gloved hands inspecting navy blue shirt",
      tag: "Verified quality checks"
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808947/image_71_du1xy2.png",
      alt: "Beige lace dress on mannequin",
      tag: "Auction-only items"
    }
  ];

  const handleCategoryClick = (item) => {
    const routePath = categoryRoutes[item.tag];
    if (routePath) {
      navigate(routePath);
    }
  };

  return (
    <div className="bg-white text-gray-900">
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      <section className="relative bg-gray-900 text-white">
        <div className="relative overflow-hidden group">
          <img 
            src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808967/image_78_zaacta.png"
            alt="Thrift and pre-loved fashion"
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
        </div>
        
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

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default Thrift;