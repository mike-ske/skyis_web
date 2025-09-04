import React from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedContactButton from '../../../../components/navigation/ContactButton';
import { Link } from 'react-router-dom';

const LandingFooter = () => {
  return (
    <div className="relative w-full px-4">
      {/* Top Divider */}

      {/* Main Content Container */}
      <div className="mx-auto py-8 lg:py-16">
        <div className="sm:flex gap-[20%] mb-[1%] flex-col sm:flex-row justify-center items-start space-y-8">
          
          {/* Left Content */}
          <div className="space-y-4 w-full order-2 lg:order-1">
            <h1
              className="text-3xl md:text-4xl lg:text-7xl font-bold text-gray-400"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                letterSpacing: '-0.05rem',
              }}
            >
              Stay connected<span className="text-xs align-top">®</span>
            </h1>

            <div className="space-y-3">
              <h2
                className="text-3xl md:text-4xl lg:text-7xl font-bold text-black"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  letterSpacing: '-0.05rem',
                }}
              >
                sayhi@skyis.com
              </h2>

              <p
                className="text-sm md:text-base text-gray-600 max-w-sm leading-normal"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  letterSpacing: '-0.04rem',
                }}
              >
                Join the fashion-tech ecosystem connecting designers, tailors,
                creators, and fashion lovers in one seamless platform.
              </p>
            </div>

            {/* Contact Button */}
            <AnimatedContactButton />
          </div>

          {/* Navigation Menu */}
          <div className="space-y-2 w-full pt-6 order-3 lg:order-1">
            {[
              { label: 'Home', number: '01', path: '/' },
              { label: 'Shop', number: '02', path: '/marketplace' },
              { label: 'About', number: '03', path: '/#about' },
              { label: 'FAQ', number: '04', path: '/#faq' },
              { label: 'Contact', number: '05', path: '/#contact' },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center justify-between py-2 border-b border-gray-300 hover:border-teal-800 transition-colors duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs text-gray-500 font-normal"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    {item.number}/
                  </span>
                  <span
                    className="text-base text-gray-800 group-hover:text-teal-800 transition-colors duration-300 font-normal"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    {item.label}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-teal-800 transform group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>
        
          {/* Right Content - Brand and Image */}
          <div className="relative order-1 lg:order-2 ">
            <div className="relative gap-10 flex sm:flex-row flex-col items-center sm:items-end space-y-6 sm:space-y-0 sm:space-x-6">
              {/* Large SKYIS Text */}
              {/* Large SKYIS Text */}
              <div className="flex mt-20 sm:flex flex-shrink-0 w-full md:max-w-lg lg:max-w-2xl overflow-hidden relative">
                <img
                  src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756991363/skyis_pvjsuh.svg"
                  alt="Login illustration"
                  className="w-full h-auto object-cover "
                />
              </div>

              {/* Overlapping Image */}
              <div className="rounded-[20px] w-full h-[16rem] object-cover">
                <img style={{margin: '0 0 0 auto'}}
                  src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756214389/image_17_eomyml.png"
                  alt="Sweater"
                  className="w-[30rem] flex flex-1  h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
      </div>

      {/* Bottom Divider */}
      <hr className="border-t border-gray-200 my-4" />
      <div
        className="max-w-[1553px] mx-auto px-4 sm:text-lg text-xs text-gray-500"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-0.04rem' }}
      >
        Copyright © Skyis 2025
      </div>
    </div>
  );
};

export default LandingFooter;
