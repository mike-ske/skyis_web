import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const AboutUsComp = () => {
  const [isVisible, setIsVisible] = useState({});
  const cardRefs = useRef([]);
  const [headerVisible, setHeaderVisible] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers = [];
    
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  setIsVisible(prev => ({ ...prev, [index]: true }));
                }, index * 150); // Stagger animation
              }
            });
          },
          { 
            threshold: 0.1,
            rootMargin: '50px 0px'
          }
        );
        
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const cardData = [
    {
      image: "https://storage.googleapis.com/a1aa/image/61a73a69-0cd8-4676-c152-c58bd7ce8339.jpg",
      title: "Creator",
      description: "Create and showcase your signature designs with intuitive fashion tools",
      link: "Become a creator",
      alt: "Woman fashion designer sketching clothing designs at table in cozy room"
    },
    {
      image: "https://storage.googleapis.com/a1aa/image/676fd1b0-f07b-42e9-aa64-338fa4709576.jpg",
      title: "Fashion Designer",
      description: "Engage customers and offer professional fashion services seamlessly",
      link: "Become a designer",
      alt: "Fashion designer working on sewing machine in studio with measuring tape"
    },
    {
      image: "https://storage.googleapis.com/a1aa/image/ec2b9ec9-168c-4658-3ff7-aefe4f186b6d.jpg",
      title: "Retail",
      description: "Grow your brand by selling collections through our integrated marketplace",
      link: "Become a retailer",
      alt: "Clothing on hangers in retail store with spotlight lighting"
    },
    {
      image: "https://storage.googleapis.com/a1aa/image/127d278f-d1c5-4fcf-c5bc-a81c758c6095.jpg",
      title: "Shopper",
      description: "Explore and shop exclusive pieces from visionary designers worldwide",
      link: "Shop exclusive designs",
      alt: "Shopper selecting clothes from rack in store"
    }
  ];

  return (
    <div className="relative bg-white overflow-x-hidden min-h-screen">
      {/* Decorative Background Element */}
      <div 
        className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-r from-gray-50 to-white opacity-60 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
      />
      <div className="mb-16">

      <div className=" mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-20">
      <div className="flex items-center">
        <div className="w-6 h-6 bg-teal-800 rounded-md mr-3"></div>
            <span className="text-gray-700 font-medium">About Skyis</span>
        </div>
      </div>
         {/* Main Title */}
        <div className="mb-20 text-center max-w-4xl mx-auto space-y-6">
          <h1 
            style={{ letterSpacing: '-1.5px' }} 
            className={`text-5xl font-normal text-gray-900 leading-tight transform transition-all duration-1000 ease-out delay-400`}
          >
            Skyis is a revolutionary fashion-tech ecosystem that bridges the gap between creativity and commerce. 
            We empower designers, tailors, creators, and fashion enthusiasts to connect, 
            collaborate, and thrive in the digital fashion landscape.
          </h1>
        </div>


        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {cardData.map((card, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className={`group transform transition-all duration-700 ease-out ${
                isVisible[index] 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
            >
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-lg transition-transform duration-500 hover:scale-[1.02]">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img 
                    alt={card.alt}
                    className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
                    src={card.image}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="py-4">
                  <h3 className="font-semibold text-[13px] text-gray-900 mb-2 transition-colors duration-300 group-hover:text-teal-900">
                    {card.title}
                  </h3>
                  
                  <p className="text-[13px] text-gray-700 leading-tight mb-3 transition-colors duration-300">
                    {card.description}
                  </p>
                  
                  {/* Action Link */}
                  <a 
                    href="#" 
                    className="inline-flex items-center text-[13px] font-semibold text-gray-700 hover:text-teal-900 transition-all duration-300 group-hover:translate-x-1"
                    onClick={(e) => e.preventDefault()}
                  >
                    {card.link}
                    <ArrowRight 
                      className="ml-1 w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" 
                    />
                  </a>
                </div>
              </div>


            </div>
          ))}
        </div>

        {/* Additional floating elements for visual interest */}
        <div className="absolute top-1/4 right-10 w-2 h-2 bg-teal-900 rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 left-10 w-3 h-3 bg-teal-900 rounded-full opacity-10 animate-bounce" style={{ animationDelay: '1s' }} />
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced hover effects */
        .group:hover .group-hover\\:scale-105 {
          transform: scale(1.05);
        }

        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
};

export default AboutUsComp;