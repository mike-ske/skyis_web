import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import MarketFooter from '../marketlayout/MarketFooter';
import CartModal from '../CartModal';
import { useCart } from '../../../../contexts/CartContext';
import { ChevronDown } from 'lucide-react';

const ReadyToWear = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const categoryRoutes = {
    'Everyday wear': '/everyday-wear',
    'Cultural wear': '/cultural-wear',
    'Occasional wear': '/occasional-wear'
  };

  const categories = [
    {
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808946/image_74_uhpzd9.png",
      label: "Everyday wear",
      alt: "Beige T-shirt with headphones and blue sneakers on wooden floor"
    },
    {
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808948/image_75_vizml1.png",
      label: "Cultural wear",
      alt: "Smiling man wearing colorful traditional African attire and beaded necklace"
    },
    {
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808949/image_77_neu4ou.png",
      label: "Occasional wear",
      alt: "Dark gray blazer with shirt and brown boots on gray background"
    }
  ];

  const handleCategoryClick = (category) => {
    const routePath = categoryRoutes[category.label];
    if (routePath) {
      navigate(routePath);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      <section className="relative bg-gray-900 text-white">
        <div className="relative overflow-hidden group">
          <img 
            src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808976/image_73_gwsvdg.png"
            alt="Ready to wear collection hero image"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent flex flex-col justify-end px-6 pb-16 max-w-[100rem] mx-auto w-full">
          <h2 className="sm:text-4xl text-xl font-normal leading-tight">
            Ready To Wear
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300">
            Explore everyday essentials and stylish outfits designed for comfort, culture, and confidence in your daily life.
          </p>
        </div>
      </section>

      <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs sm:text-lg font-light uppercase text-gray-700 tracking-wide">
              CATEGORIES
            </p>
            <h3 className="text-2xl font-semibold">
              Our Collection
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div 
              key={index} 
              onClick={() => handleCategoryClick(category)}
              className="relative rounded-lg overflow-hidden group cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.alt}
                className="w-full h-100 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute bottom-2 left-2 bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded select-none">
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

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default ReadyToWear;