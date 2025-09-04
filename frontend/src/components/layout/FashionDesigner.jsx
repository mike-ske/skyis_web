import React, { useState } from 'react';
import StickyNavbar from '../navigation/StickyNavbar';
import Footer from '../navigation/Footer';

const FashionDesigner = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const faqItems = [
    {
      question: "How do I list my designs on Skyis?",
      answer: "Getting started is easy! Simply create your designer account, complete your profile, and use our intuitive upload tool to showcase your designs. You can add high-quality images, detailed descriptions, pricing, and categorize your items. Our platform supports multiple formats and provides guidelines to help you create compelling listings that attract customers."
    },
    {
      question: "Can I offer custom work on the platform?",
      answer: "Absolutely! Skyis supports custom design services. You can create custom work listings, set your own pricing for bespoke pieces, and communicate directly with clients through our messaging system. You can showcase your custom work portfolio, set turnaround times, and manage custom orders through your designer dashboard."
    },
    {
      question: "Do I need to own a store to join?",
      answer: "No physical store required! Skyis is designed for designers at all levels - whether you're working from home, a small studio, or a large atelier. You just need your creative designs and the passion to share them. Our platform serves as your digital storefront, handling everything from display to transactions."
    },
    {
      question: "How do I price my items?",
      answer: "Pricing is flexible and entirely up to you. Consider your materials, time, skill level, and market demand. You can offer items for sale, rent, or auction. Our platform provides analytics to help you understand market trends, and you can adjust prices anytime. We also offer guidance on competitive pricing strategies for fashion items."
    }
  ];

  const currencies = [
    { flag: "https://flagcdn.com/w20/gb.png", alt: "Flag of Great Britain", text: "Great British Pounds - GBP" },
    { flag: "https://flagcdn.com/w20/us.png", alt: "Flag of United States", text: "US Dollar - USD" },
    { flag: "https://flagcdn.com/w20/ca.png", alt: "Flag of Canada", text: "Canada - Canadian Dollar" },
    { flag: "https://flagcdn.com/w20/eu.png", alt: "Flag of European Union", text: "European Euro - EUR" },
    { flag: "https://flagcdn.com/w20/cl.png", alt: "Flag of Chile", text: "Chile - Chilean Peso" },
    { flag: "https://flagcdn.com/w20/cn.png", alt: "Flag of China", text: "China - Chinese Yuan" },
    { flag: "https://flagcdn.com/w20/co.png", alt: "Flag of Colombia", text: "Colombia - Colombian Peso" },
    { flag: "https://flagcdn.com/w20/cr.png", alt: "Flag of Costa Rica", text: "Costa Rica - Costa Rican Colon" }
  ];

  return (
    <div className="bg-black text-white font-['Product Sans',sans-serif]">
      {/* Navbar */}
      <div className="top-0 left-0 w-full z-50 absolute" style={{ 
          backgroundImage: '#000',
          backgroundColor: '#000',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className="invisible">
           <StickyNavbar />
        </div>
      </div>

      <StickyNavbar />

      {/* Hero Section */}
      <section className="mx-auto px-6 sm:px-10 py-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 bg-gradient-to-b from-[#001E1B] to-[#0B3B36]"
      style={{ 
        //backgroundImage: 'linear-gradient(45deg, #001E1B, #0B3B36)',
        background: 'linear-gradient(to bottom, #0A0A0A 90%, #013733 40%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
       }}>
        <div className="lg:w-1/2 max-w-lg">
          <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-6xl mb-4" style={{ 
            lineHeight: '1.2',
            letterSpacing: '0.02em',
           }}>
            Design. Display. Get Discovered.
          </h1>
          <p className="text-[#D9D9D9] text-sm leading-8 sm:text-base my-10 max-w-md">
            Showcase your creations, connect with clients, and grow your fashion brand in a platform built for designers.
          </p>
          <button className=" text-white text-xs rounded-full px-8 py-4 w-max sm:text-sm font-semibold hover:bg-gray-100 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg animate-slideInLeft animation-delay-200" type="button" style={{ 
            background: 'linear-gradient(90deg, #1D3A6C, #144C45)',
           }}>
            Start Designing on Skyis
          </button>
        </div>
        <div className="relative" style={{ margin: '0 0 0 auto' }}>
          <img 
            alt="User interface mockup showing a fashion portfolio with images of shoes, dresses, and models in a card with rounded corners and a dark green swirling background" 
            className="rounded-xl shadow-lg" 
            height="350" 
            loading="lazy" 
            src="https://res.cloudinary.com/drgk8rmny/image/upload/v1752364053/Frame_1321315485_1_mgx111.svg" 
            width="600"
          />
        </div>
      </section>

      {/* Why Designers Choose Skyis */}
      <section className=" py-16 px-6 sm:px-10 mx-auto">
        <h2 className="text-white font-extrabold text-6xl text-center mb-12">
          Why Designers Choose Skyis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
          {/* Flexible Monetization Card */}
          <div className="bg-[#7B6AFB] rounded-lg p-6 text-white">
            <h3 className="font-bold text-lg mb-2">
              Flexible Monetization
            </h3>
            <p className="text-xs mb-4">
              Sell, rent, or auction your pieces — choose the method that fits your creative business best.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {currencies.map((currency, index) => (
                <button key={index} className="bg-[#D9D9D9] text-black rounded-full flex items-center gap-1 px-3 py-1">
                  <img alt={currency.alt} className="w-4 h-3 rounded-sm" loading="lazy" src={currency.flag} />
                  <span className="truncate">{currency.text}</span>
                  <i className="fas fa-check-circle text-[#0B3B36] ml-auto"></i>
                </button>
              ))}
            </div>
          </div>

          {/* Collaborative Tools Card */}
          <div className="bg-[#3B6069] rounded-lg p-6 text-white">
            <h3 className="font-bold text-lg mb-2">
              Collaborative Tools
            </h3>
            <p className="text-xs mb-4">
              Connect and collaborate with stylists, models, and creatives to bring your fashion projects to life.
            </p>
            <img 
              alt="Pixel style world map with collaborative points highlighted" 
              className="rounded-md" 
              height="150" 
              loading="lazy" 
              src="https://storage.googleapis.com/a1aa/image/1148553e-4b1c-4156-21cb-f5c800e93f12.jpg" 
              width="400"
            />
          </div>

          {/* Tailored Portfolios Card */}
          <div className="bg-[#3B8AE6] rounded-lg p-6 text-white">
            <h3 className="font-bold text-lg mb-2">
              Tailored Portfolios
            </h3>
            <p className="text-xs mb-4">
              Showcase your fashion designs with customizable, high-impact portfolios that attract attention and build credibility.
            </p>
            <div className="relative w-full flex items-center justify-center rounded-md overflow-hidden">
              <img 
                alt="Photo of Justice Clan, a fashion designer, wearing a green and gold outfit" 
                className="w-full h-auto sm:max-w-[20rem] " 
                loading="lazy" 
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753055816/Group_13_2_opbfya.svg" 
                
              />
            </div>
          </div>

          {/* Business Friendly Card */}
          <div className="bg-[#F37044] rounded-lg p-6 text-white">
            <h3 className="font-bold text-lg mb-2">
              Business Friendly
            </h3>
            <p className="text-xs">
              Manage orders, track performance, and handle clients with tools designed for modern fashion entrepreneurs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto px-6 sm:px-10 py-16 bg-white text-black flex flex-col md:flex-row items-start gap-12 md:gap-24">
        <div className="w-full max-w-full">
          <h2 className="font-normal text-3xl sm:text-7xl leading-tight">
            We've got answers to your questions
          </h2>
        </div>
        <div className="w-full max-w-full flex flex-col gap-6 text-xs">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-black pb-2">
              <button 
                aria-expanded={expandedFAQ === index}
                className="flex justify-between items-center w-full py-2" 
                type="button"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-left font-medium">{item.question}</span>
                <i className={`fas ${expandedFAQ === index ? 'fa-minus' : 'fa-plus'} ml-4 flex-shrink-0`}></i>
              </button>
              {expandedFAQ === index && (
                <div className="mt-3 text-gray-700 leading-relaxed animate-fadeIn">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className=" text-white ">
        <Footer/> 
      </footer>
    </div>
  );
};

export default FashionDesigner;