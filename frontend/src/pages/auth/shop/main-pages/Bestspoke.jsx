import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import MarketFooter from '../marketlayout/MarketFooter';
import CartModal from '../CartModal';
import { ChevronDown } from 'lucide-react';

const Bespoke = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const categoryRoutes = {
    'Custom designs': '/custom-designs',
    'Mech / streetwear': '/mech-streetwear',
    'Fashion-to-order': '/fashion-to-order'
  };

  const categories = [
    {
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808942/image_66_mq3aa7.png",
      label: "Custom designs",
      alt: "Woman wearing intricate beige custom design dress"
    },
    {
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808941/image_68_nkapir.png",
      label: "Mech / streetwear",
      alt: "Young man wearing colorful mech streetwear jacket"
    },
    {
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808942/image_67_e2ncjf.png",
      label: "Fashion-to-order",
      alt: "Two people working on fashion design patterns"
    }
  ];

  const handleCategoryClick = (category) => {
    const routePath = categoryRoutes[category.label];
    if (routePath) {
      navigate(routePath);
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      <section className="relative bg-gray-900 text-white">
        <div className="relative overflow-hidden group">
          <img 
            src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808977/image_65_sltoh8.png"
            alt="Bespoke fashion collection"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent flex flex-col justify-end px-6 pb-16 max-w-[100rem] mx-auto w-full">
          <h2 className="sm:text-4xl text-xl font-normal leading-tight">
            Bespoke
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-300">
            Commission custom designs crafted to your exact style and fit — unique pieces made just for you.
          </p>
        </div>
      </section>

      <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="mb-6">
          <p className="text-xs sm:text-lg font-normal text-gray-600 uppercase tracking-wide">
            Categories
          </p>
          <h3 className="text-2xl font-semibold text-gray-900 mt-1">
            Our Collection
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index} 
              onClick={() => handleCategoryClick(category)}
              className="relative rounded-lg overflow-hidden group cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 min-h-[400px]"
                loading="lazy"
              />
              <span className="absolute bottom-3 left-3 bg-gray-200 text-gray-600 text-[10px] font-normal rounded-md px-2 py-0.5 select-none">
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

export default Bespoke;