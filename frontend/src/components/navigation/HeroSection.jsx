import React, { useState, useEffect } from 'react';
import { Search, Menu, ArrowRight } from 'lucide-react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import MenuSection from "./MenuSection";
import WaitlistForm from './WaitinglistForm';
import Navbar from '../../pages/auth/shop/Navbar';

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div id="hero" className="relative isolate min-h-screen text-white font-['Product_Sans'] overflow-hidden">
      {/* Background Image with better mobile handling */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://res.cloudinary.com/drgk8rmny/image/upload/v1755968519/Hero_wcgdpo.png"
          alt="Side profile of a person wearing a green jacket and a brown cap, dark moody background"
          className="w-full h-full object-cover object-center md:object-[center_20%]"
        />
        {/* Gradient overlay for better text readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 md:bg-black/10"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 max-w-[1553px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* <MenuSection /> */}
      </header>
     
      {/* Main Content */}
      <main className="relative z-20 h-[calc(100vh-80px)] flex flex-col justify-end pb-8 sm:pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-[1553px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 md:gap-12">
            
            {/* Left Content - Hero Text */}
            <div 
              className={`flex-1 transform transition-all duration-1200 ease-out delay-300 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              <p className="font-['Times'] text-white text-xs sm:text-sm md:text-base lg:text-xl font-normal mb-2 sm:mb-3 select-none">
                ©2025
              </p>
              <h1 className="text-white font-extrabold leading-[1.1] sm:leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl select-none max-w-full lg:max-w-[90%]">
                Where Creativity
                <br className="hidden sm:block" />
                Meets Commerce
              </h1>
            </div>

            {/* Right Content - Description and CTA */}
            <div 
              className={`flex-1 lg:text-right lg:max-w-md xl:max-w-lg transform transition-all duration-1200 ease-out delay-500 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-normal mb-4 sm:mb-6 select-none leading-relaxed">
                Join the fashion-tech ecosystem connecting designers, tailors, creators, and fashion lovers in one seamless platform.
              </p>
              
              {/* Waitlist Button */}
              <button 
                onClick={openModal}
                className="relative flex items-center justify-between gap-4 sm:gap-8 md:gap-12 lg:gap-16 rounded-[30px] pr-4 sm:pr-6 md:pr-8 pl-3 sm:pl-4 py-2.5 sm:py-3 bg-gray-100 text-black overflow-hidden w-full sm:w-auto sm:min-w-[200px] md:min-w-[220px] lg:ml-auto transition-all duration-300 hover:shadow-xl group"
              >
                {/* Sliding Fill Effect */}
                <span className="absolute top-0 left-[-100%] w-full h-full bg-[#00403F] rounded-full transition-all duration-700 ease-in-out group-hover:left-0 z-0"></span>

                {/* Icon Circle */}
                <span
                  className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00403F] transition-colors duration-700 ease-in-out group-hover:bg-transparent relative z-10 flex-shrink-0"
                  aria-hidden="true"
                >
                  <i className="fas fa-arrow-right text-white text-sm sm:text-base"></i>
                </span>

                {/* Text */}
                <span className="text-sm sm:text-base font-normal relative z-10 transition-colors duration-500 group-hover:text-white flex-1 text-center">
                  Join waitlist
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Waitlist Modal */}
      <WaitlistForm isOpen={isModalOpen} onClose={closeModal} />

      {/* Initial fade effect */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-2000 pointer-events-none z-30 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};

export default LandingPage;