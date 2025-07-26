import React, { useState } from 'react';

const tabs = [
  {
    name: 'Fashion Designers',
    content: {
      icon: "https://res.cloudinary.com/drgk8rmny/image/upload/v1752840978/Frame_1321315250_zmkvwz.svg",
      title: "Fashion Designers",
      description: "Showcase your creativity, connect with tailors, sell or rent collections, and get discovered by buyers—all on one powerful platform.",
      buttonText: "Get started for free",
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1751713859/Frame_1321315433.raw_eeowo7.svg",
      imageAlt: "Fashion Designer",
      gradient: "linear-gradient(to right, #F8BBD9, #C084FC)"
    }
  },
  {
    name: 'Shoppers',
    content: {
      icon: "https://res.cloudinary.com/drgk8rmny/image/upload/v1752840970/Frame_1321315250_a5gnhj.svg",
      title: "Shoppers",
      description: "Discover unique fashion pieces from talented designers and shop owners. Find ready-to-wear or custom outfits that match your style perfectly.",
      buttonText: "Start Shopping",
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1752867053/Frame_1321315425_o2qnbk.svg",
      imageAlt: "Happy Shopper",
      gradient: "linear-gradient(90deg, #A8E6CF 0%, #17A2B8 100%)"
    }
  },
  {
    name: 'Fashion Creative',
    content: {
      icon: "https://res.cloudinary.com/drgk8rmny/image/upload/v1752840978/Frame_1321315250_zmkvwz.svg",
      title: "Fashion Creative",
      description: "Express your artistic vision and collaborate with like-minded creatives. Turn your fashion ideas into reality with our creative platform.",
      buttonText: "Explore Creative Tools",
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1752867203/Frame_1321315435_arr0dx.svg",
      imageAlt: "Fashion Creative",
      gradient: "linear-gradient(10deg, #A8E6CF 0%, #4ECDC4 100%)"
    }
  },
  {
    name: 'Luxury shopper',
    content: {
      icon: "https://res.cloudinary.com/drgk8rmny/image/upload/v1752840978/Frame_1321315250_zmkvwz.svg",
      title: "Luxury Shopper",
      description: "Access exclusive luxury fashion pieces and limited collections. Experience premium shopping with personalized service and curated selections.",
      buttonText: "Browse Luxury Collections",
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1752867191/Frame_1321315430_zwllcx.svg",
      imageAlt: "Luxury Shopper",
      gradient: "linear-gradient(90deg, #B794F6 0%, #4299E1 100%)"
    }
  },
];

const FashionTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const currentContent = tabs[activeTab].content;

  return (
    <section className="max-w-[1280px] mx-auto px-4 py-16">
      <h2 className="text-3xl sm:text-[60px] font-semibold leading-[4.75rem] mx-auto text-left">
        Seamless, creative, and connected fashion commerce made simple
        <span className="text-gray-400 font-semibold">
          , so you can focus on what matters most, your craft.
        </span>
      </h2>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Category filter"
        className="my-20 max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-3xl bg-gray-100 rounded-full flex justify-between p-3 items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-400 font-semibold select-none"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            tabIndex={activeTab === index ? 0 : -1}
            aria-selected={activeTab === index}
            onClick={() => setActiveTab(index)}
            className={`px-4 p-2.5 rounded-full focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105 ${
              activeTab === index
                ? 'bg-white text-[#0B1A17] shadow-lg'
                : 'text-gray-500 hover:text-[#0B1A17] hover:bg-gray-200'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative overflow-hidden mt-8">
        <div
          key={activeTab}
          className="rounded-xl max-w-full w-full mx-auto px-4 sm:px-10 lg:px-16 py-12 animate-fadeInUp"
          style={{
            background: currentContent.gradient,
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Section */}
            <div className="flex flex-col max-w-lg space-y-4 gap-3.5">
              <div
                aria-hidden="true"
                className="w-12 h-12 rounded-lg bg-white flex items-center justify-center animate-bounceIn"
              >
                <img
                  src={currentContent.icon}
                  alt="Icon"
                  className="w-auto h-auto rounded-lg shadow-lg transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h3 className="text-xl sm:text-4xl font-bold text-[#0B1A17] animate-slideInLeft">
                {currentContent.title}
              </h3>
              <p className="text-sm font-normal text-[#0B1A17] animate-slideInLeft animation-delay-100">
                {currentContent.description}
              </p>
              <button className="bg-white text-[#0B1A17] rounded-full px-8 py-4 w-max text-sm font-semibold hover:bg-gray-100 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg animate-slideInLeft animation-delay-200">
                {currentContent.buttonText}
              </button>
            </div>

            {/* Right Section */}
            <div className="relative max-w-[480px] w-full">
              <img
                src={currentContent.image}
                alt={currentContent.imageAlt}
                className="rounded-xl animate-slideInRight transition-all duration-500 hover:scale-105 w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }

        .animate-bounceIn {
          animation: bounceIn 0.8s ease-out;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
          animation-fill-mode: both;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
      `}</style>
    </section>
  );
};

export default FashionTabs;