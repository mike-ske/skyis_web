import React from 'react';
import Footer from '../navigation/Footer';
import Header from '../navigation/Header';
import { Helmet } from 'react-helmet';
import ImageSlider from '../navigation/ImageSlider';
import AnimatedImageLoop from '../navigation/AnimatedImageLoop';
import FashionTabs from '../navigation/FashionTabs';
import BuySellTabs from '../navigation/BuySellTabs';
import TestimonialSection from '../navigation/TestimonialSection';
import AnimatedImageSequence from '../navigation/AnnimatedImageSequence';


const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Helmet>
        <title>Skyis</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          body {
            font-family: "Inter", sans-serif;
          }
        `}</style>
      </Helmet>

      {/* Navbar */}
      <div className="top-0 left-0 w-full z-50 absolute" style={{ 
          backgroundImage: 'linear-gradient(45deg, #071B1A, #0a1a19)',
          
        }}>
        <div className="invisible">
          <Header />
        </div>
      </div>

       <Header />
      {/* Hero Section */}
      <section aria-label="Hero" style={{ 
        backgroundImage: 'linear-gradient(45deg, #071B1A, #0a1a19)'
      }}
        className="bg-gradient-to-r from-[#071B1A] to-[#0A1A19] text-white min-h-screen flex items-center"
      >
        <div className="max-w-[90rem] mx-auto px-6 sm:px-10 py-16 flex flex-col lg:flex-row items-center lg:items-center gap-8 w-full">
          <div className="lg:w-full space-y-6 max-w-full">
            <h1 className="text-3xl sm:text-[60px] font-semibold leading-[4.75rem]">
              Create, connect, sell
              <br />
              and buy with ease.
            </h1>
            <p className="text-xs sm:text-[16px] leading-8 font-light max-w-xs md:max-w-md ">
              Join a thriving network of designers, tailors, and fashion lovers
              building the future together.
            </p>
            <button className="bg-white text-[#0B1A17] rounded-full px-8 py-4 w-max text-sm font-semibold hover:bg-gray-100 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg animate-slideInLeft animation-delay-200">
              Get started for free
            </button>
            
              <AnimatedImageSequence />

          </div>
          <div className="lg:w-full relative max-w-md sm:max-w-lg lg:max-w-none mx-auto lg:mx-0">
            
            <ImageSlider />
            {/* Top left card floating outside */}
            <div className="absolute -top-6 -left-6 rounded-md flex items-center space-x-2 text-xs text-[#071B1A]">
              <img
                alt="Currency icon for Nigerian Naira"
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1752984358/Frame_1321315300_koj2hn.svg"
                
              />
            </div>
            {/* Middle left card partially inside */}
            <div className="absolute top-20 -left-4 bg-white rounded-md shadow-md px-3 py-2 flex items-center space-x-2 text-xs text-[#071B1A]">
              <img
                alt="Currency icon for Nigerian Naira"
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1752984358/Frame_1321315299_azd4kf.svg"
                
              />
            </div>
            {/* Bottom left card partially inside */}
            <div className="absolute bottom-6 -left-4 bg-white rounded-md shadow-md px-3 py-2 flex flex-col text-xs text-[#071B1A]">
              <img
                alt="Luxury wedding gown fashion photo of a female model wearing an orange dress"
                className="rounded-sm mb-1 object-cover"
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1752984359/Frame_1321315210_xu8i1h.svg"
              />
            </div>
            
          </div>
        </div>
      </section>
      {/* Section 2: Fashion Tabs */}
      <FashionTabs />
      {/* Section 3: Fashion Designers */}
     

      {/* Section 4: Buying on Skyis */}
      <BuySellTabs />
      
      {/* Section 5: Ready to create, sell, or shop */}
      <section
        aria-label="Ready to create, sell, or shop"
        className="p-16 bg-[#FAF0CC]"
      >
        <div className="max-w-[90rem] mx-auto px-6 sm:px-10 py-16 rounded-xl relative overflow-hidden bg-[#F6F0E6]">
          <div className="absolute inset-0">
            <img
              alt="Collage of fashion models posing in various outfits"
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/drgk8rmny/image/upload/v1752841812/Frame_1321315270_1_dz4wlm.svg"
              
            />
            <div className="absolute inset-0 "></div>
          </div>
          <div className="relative flex flex-col md:flex-row items-center max-w-7xl mx-auto gap-6 py-16">
            <div className="md:w-8/12 flex flex-col gap-6 rounded-lg p-8 text-white max-w-lg mx-auto md:mx-0">
              <h2 className="text-2xl sm:text-5xl font-semibold leading-tight mb-3">
                Ready to create, sell,
                <br />
                or shop?
              </h2>
              <p className="text-xs sm:text-md font-light mb-6">
                Join thousands shaping the future of fashion commerce.
              </p>
              <button className="bg-white text-[#0B1A17] rounded-full px-8 py-4 w-max text-sm font-semibold hover:bg-gray-100 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg animate-slideInLeft animation-delay-200">
                Get started for free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 */}
      
      {/* Section 7: Testimonials */}
      <TestimonialSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;