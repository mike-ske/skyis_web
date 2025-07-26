import React, { useState } from 'react';
import StickyNavbar from '../navigation/StickyNavbar';
import Footer from '../navigation/Footer';

const CreativeDesigner = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqItems = [
    {
      question: "How do I get discovered on Skyis?",
      answer: "Create a compelling profile showcasing your unique creative identity, upload high-quality work samples, and actively engage with the community to increase your visibility."
    },
    {
      question: "How do I receive payments?",
      answer: "Skyis supports multiple payment methods including local and international currencies. Payments are processed securely through our platform with multiple payout options."
    },
    {
      question: "What roles are considered fashion creatives?",
      answer: "Fashion creatives include designers, stylists, photographers, models, makeup artists, fashion illustrators, pattern makers, and other professionals in the fashion industry."
    },
    {
      question: "Can I apply for jobs and gigs?",
      answer: "Yes! Browse available opportunities, submit proposals, and connect directly with brands and other creatives looking for talent in your specialty area."
    }
  ];

  return (
    <div className="bg-white text-black font-['Product Sans',sans-serif]">
      {/* Header */}
      
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
      <section className="bg-gradient-to-b from-[#070707] to-[#2a0a3a] text-white w-full px-10 mx-auto py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12" style={{
                background: 'linear-gradient(to bottom, #070707, #2a0a3a)'
            }}>
        <div className="max-w-md md:max-w-lg space-y-6">
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.5]" style={{ 
            lineHeight: '1.2',
           }}>
            Creative? Connect.
            <br />
            Collaborate. Get
            <br />
            Hired.
          </h1>
          <p className="text-xs sm:text-sm leading-[1.3]" style={{ 
            lineHeight: '1.8',
           }}>
            Skyis is where fashion creatives get booked, build a brand, and work with industry pros worldwide.
          </p>
          <button className="text-xs sm:text-sm 
                    hover:opacity-90 transition
                    rounded-full px-8 py-4 w-max hover:bg-gray-100 ease-in-out transform hover:scale-105 hover:shadow-lg font-semibold focus:outline-none 
                    focus:ring-2 focus:ring-offset-1 focus:ring-white"
            style={{
                background: 'linear-gradient(to right, #1e2a6f, #6e1e6f)'
            }}
            >
            Join as a Creative
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

      {/* Section 2 */}
      <section className="mx-auto px-10 py-16 md:py-24">
        <h2 className="text-center font-semibold text-2xl sm:text-3xl md:text-6xl leading-tight mb-2 mx-auto">
          Where Creativity Turns Into Opportunity
        </h2>
        <p className="text-center text-[10px] sm:text-xs text-gray-500 mt-2 max-w-[480px] mx-auto">
          Empowering fashion creatives to shine, earn, and grow in a connected, opportunity-rich ecosystem.
        </p>

        {/* Black card with image and text */}
        <div className="mt-12 bg-[#0a0a0a] rounded-xl p-4 sm:p-6 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mx-auto">
        <div className="flex-1 w-full md:max-w-[320px]" >
            <h3 className="font-semibold text-white text-xl sm:text-2xl md:text-3xl mb-3 md:mb-2">
            Standout Profiles
            </h3>
            <p className="text-xs sm:text-sm md:text-[14px] text-white/80 leading-5 sm:leading-6">
            Showcase your distinct creative identity, stand out with a compelling profile, and attract attention from leading designers, innovative brands, and collaborators seeking fresh talent for fashion-forward projects.
            </p>
        </div>
        <div className="flex-1 w-full max-w-full md:max-w-[400px] lg:max-w-[500px] rounded-lg overflow-hidden border border-white/20" style={{ 
            margin: '0 0 0 auto'
         }}>
            <img 
            alt="Photo of a fashion model in a red dress and hat with a small profile card overlay showing a woman wearing a beige hijab, name, location, rating, and a view profile button" 
            className="w-full h-auto max-h-[250px] sm:max-h-[300px] md:max-h-[350px] lg:max-h-[400px] object-cover object-center"
            src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753130115/Frame_1321315409_eq8fu9.svg" 
            />
        </div>
        </div>

        {/* Two cards below */}
        <div className="mt-12 mx-auto flex flex-col md:flex-row gap-6 md:gap-8 ">
          <div className="flex-1 rounded-xl overflow-hidden relative">
            <img 
              alt="Background image showing a speaker presenting to an audience in an art gallery" 
              className="w-full h-full object-cover" 
              height="260" 
              src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753133656/Frame_1321315407_oza1ds.svg" 
              width="480"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 p-10 flex flex-col justify-start rounded-xl">
              <h3 className="text-white font-semibold text-lg sm:text-[40px] mb-4">
                Creative Community Access
              </h3>
              <p className="text-white text-[10px] sm:text-[16px] leading-tight">
                Build valuable relationships, find teammates, and stay inspired through an active creator network.
              </p>
            </div>
          </div>
          <div className="flex-1 bg-[#0051d2] rounded-xl p-10 flex flex-col justify-start max-w-full sm:max-w-[400px]">
            <h3 className="text-white font-semibold text-lg sm:text-[32px] mb-2">
              Earn From Your Skills
            </h3>
            <p className="text-white text-[10px] sm:text-[16px] my-6 leading-7">
              Monetize your talent across gigs, partnerships, rentals, and collaborative offers.
            </p>
            <div className="space-y-2 flex flex-col justify-center items-center">
              <button className="bg-white text-[#071B1A] rounded-full px-6 py-4 w-max hover:bg-gray-100 ease-in-out transform hover:scale-105 flex justify-center items-center gap-2 hover:shadow-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white">
                <img alt="Flag of Nigeria" className="w-5 rounded-full h-5 object-cover" src="https://flagcdn.com/w20/ng.png" />
                NGN-Nigerian Naira
              </button>
              <button className="bg-white text-[#071B1A] rounded-full px-6 py-4 w-max hover:bg-gray-100 ease-in-out transform hover:scale-105 flex justify-center items-center gap-2 hover:shadow-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white">
                <img alt="Flag of United States" className="w-5 rounded-full h-5 object-cover" src="https://flagcdn.com/w20/us.png" />
                USD-United states dollars
              </button>
              <button className="bg-white text-[#071B1A] rounded-full px-6 py-4 w-max hover:bg-gray-100 ease-in-out transform hover:scale-105 flex justify-center items-center gap-[-8px] hover:shadow-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white">
                <img alt="Flag of United Kingdom" className="w-5 rounded-full h-5 object-cover" src="https://flagcdn.com/w20/gb.png" />
                <img alt="Flag of France" className="w-5 rounded-full h-5 object-cover" src="https://flagcdn.com/w20/fr.png" />
                <img alt="Flag of Germany" className="w-5 rounded-full h-5 object-cover" src="https://flagcdn.com/w20/de.png" />
                <img alt="Flag of Italy" className="w-5 rounded-full h-5 object-cover" src="https://flagcdn.com/w20/it.png" />
                <img alt="Flag of Spain" className="w-5 rounded-full h-5 object-cover" src="https://flagcdn.com/w20/es.png" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto px-10 pb-20">
        <div className="mx-auto flex justify-between flex-col md:flex-row gap-8 md:gap-20">
          <h2 className="font-semibold text-2xl sm:text-3xl md:text-6xl max-w-full">
            We've got answers to your questions
          </h2>
          <div className="flex flex-col space-y-4 text-[10px] text-gray-900 ">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-300 pb-2">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={expandedFaq === index}
                >
                  <span>{item.question}</span>
                  <i className={`fas ${expandedFaq === index ? 'fa-minus' : 'fa-plus'} text-xs transition-transform`}></i>
                </button>
                {expandedFaq === index && (
                  <div className="mt-2 text-gray-700 leading-tight">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className=" text-white ">
        <Footer/> 
      </footer>
    </div>
  );
};

export default CreativeDesigner;