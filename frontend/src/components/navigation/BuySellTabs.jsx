import React, { useState } from "react";

const BuySellTabs = () => {
  const [activeTab, setActiveTab] = useState("Buy");

  const tabContent = {
    Buy: {
      icon: "https://res.cloudinary.com/drgk8rmny/image/upload/v1752840970/Frame_1321315250_a5gnhj.svg",
      title: "Buying on Skyis",
      description: "Discover unique fashion pieces from talented designers, tailors, and shop owners across Africa. Buy ready-to-wear or custom outfits that match your style – secure, seamless, and made just for you.",
      buttonText: "Start Shopping",
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1752841580/Frame_1321315450_d5vuw6.svg",
      imageAlt: "Happy shopper",
      gradient: "linear-gradient(90deg, #5BCB9B 0%, #00D1B2 100%)"
    },
    Sell: {
      icon: "https://res.cloudinary.com/drgk8rmny/image/upload/v1752840970/Frame_1321315250_a5gnhj.svg",
      title: "Selling on Skyis",
      description: "List and sell your fashion creations with ease. Whether you're a designer or shop owner, reach buyers ready to pay for your style, story, and originality—all in one place.",
      buttonText: "Start Selling",
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1752847968/Frame_1321315447_nnqxcu.svg",
      imageAlt: "Happy seller",
      gradient: "linear-gradient(10deg, #FF6B6B 0%, #FFE066 100%)"
    },
    Auction: {
      icon: "https://res.cloudinary.com/drgk8rmny/image/upload/v1752840970/Frame_1321315250_a5gnhj.svg",
      title: "Auctioning on Skyis",
      description: "Turn exclusivity into value. Auction limited-edition fashion pieces and let the market decide their worth. Build hype, attract bids, and grow your brand through every drop.",
      buttonText: "Launch Your First Auction Now",
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1752847999/Frame_1321315451_2_r8m6jg.svg",
      imageAlt: "Happy auction",
      gradient: "linear-gradient(90deg, #5BCB9B 0%, #00D1B2 100%)"
    }
  };

  const currentContent = tabContent[activeTab];

  return (
    <section className="bg-[#0B1A17] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10">
        {/* Heading */}
        <h1 className="text-white text-3xl sm:text-[60px] font-semibold leading-[4.75rem] mx-auto text-left">
          Connecting creators, sellers, buyers, and{" "}
          <span className="text-gray-400 font-semibold">
            fashion collaborators
          </span>
        </h1>

        {/* Tabs */}
        <div
          role="tablist"
          className="mt-8 max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-3xl bg-gray-100 rounded-full flex justify-between p-3 items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-400 font-semibold select-none"
        >
          {["Buy", "Sell", "Auction"].map((tab) => (
            <button
              key={tab}
              role="tab"
              tabIndex={activeTab === tab ? 0 : -1}
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 p-2.5 rounded-full focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105 ${
                activeTab === tab
                  ? "bg-white text-[#0B1A17] shadow-lg"
                  : "bg-transparent hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="relative overflow-hidden">
          <div
            key={activeTab}
            className="rounded-xl max-w-[1280px] w-full mx-auto px-4 sm:px-10 lg:px-16 py-12 animate-fadeInUp"
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
                    className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-110"
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
                  className="rounded-xl animate-slideInRight transition-all duration-500 hover:scale-105 "
                />
              </div>
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

export default BuySellTabs;