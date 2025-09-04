import React, { useState, useEffect } from 'react';
import { Search, Menu, ArrowRight } from 'lucide-react';
import "@fortawesome/fontawesome-free/css/all.min.css"; // for icons
import MenuSection from "./MenuSection";
import WaitlistForm from './WaitinglistForm';

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative isolate min-h-screen text-white font-['Product_Sans']">
        {/* Background Image */}
        <img
            src="https://res.cloudinary.com/drgk8rmny/image/upload/v1755968519/Hero_wcgdpo.png"
            alt="Side profile of a person wearing a green jacket and a brown cap, dark moody background"
            className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Header */}
        <header className="relative z-20 max-w-[1553px] mx-auto flex items-center justify-between px-4 sm:px-6 py-2">
            <MenuSection />
        </header>
        
        {/* Main Content */}
        <main className="max-w-[1553px] px-4 sm:px-6 py-6 z-50 relative bottom-[-38rem] flex flex-col md:flex-row md:items-center md:justify-between w-full mx-auto">
          
          {/* Left Content - Hero Text */}
          <div 
            className={`w-full max-w-full transform transition-all duration-1200 ease-out delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <p className="font-['Times'] text-white  text-xs sm:text-xl font-normal mb-1 select-none">
              ©2025
            </p>
            <h1 className="text-white font-extrabold leading-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl max-w-full select-none">
              Where Creativity
              Meets Commerce
            </h1>
          </div>

          {/* Right Content - Description and CTA */}
          <div 
            className={`mt-10 md:mt-0 text-right transform transition-all duration-1200 ease-out delay-500 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <p className="text-white text-lg sm:text-xl font-normal mb-6 select-none">
              Join the fashion-tech ecosystem connecting designers, tailors, creators, and fashion lovers in one seamless platform.
            </p>
            
            {/* Waitlist Button - Now integrated directly */}
            <button 
              onClick={openModal}
              style={{ margin: '0 0 0 auto' }} 
              className="relative flex items-center gap-16 rounded-[30px] pr-8 pl-4 py-3 bg-gray-100 text-black overflow-hidden min-w-[180px] transition-colors duration-500 group"
            >
              {/* Sliding Fill Effect */}
              <span className="absolute top-0 left-[-100%] w-full h-full bg-[#00403F] rounded-full transition-all duration-700 ease-in-out group-hover:left-0 z-0"></span>

              {/* Icon Circle */}
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00403F] transition-colors duration-700 ease-in-out group-hover:bg-transparent relative z-10"
                aria-hidden="true"
              >
                <i className="fas fa-arrow-right text-white text-base"></i>
              </span>

              {/* Text */}
              <span className="text-base font-normal relative z-1 transition-colors duration-500 group-hover:text-white">
                Join waitlist
              </span>
            </button>
              
          </div>
        </main>

        {/* Waitlist Modal */}
        <WaitlistForm isOpen={isModalOpen} onClose={closeModal} />

        {/* Additional floating animation for subtle background effect */}
        <div 
          className={`absolute inset-0  duration-2000 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Overlay (optional, if text needs more contrast) */}
        <div className="absolute inset-0 bg-black/10 z-10"></div>
    </div>
  );
};

export default LandingPage;