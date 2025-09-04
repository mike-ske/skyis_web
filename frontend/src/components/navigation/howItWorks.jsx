import React from 'react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Join the Community",
      description: "Sign up and choose your role - creator, tailor, retailer, or shopper. Build your profile and showcase your unique style.",
      dots: 1
    },
    {
      number: "02", 
      title: "Discover & Connect",
      description: "Explore our ecosystem to find the perfect collaborators, customers, or unique fashion pieces that match your vision.",
      dots: 2
    },
    {
      number: "03",
      title: "Create & Commerce", 
      description: "Start creating, selling, or shopping with our integrated tools designed for the modern fashion industry.",
      dots: 3
    }
  ];

  const renderDots = (count) => {
    return (
      <div className="flex justify-end space-x-2 mb-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index < count ? 'bg-gray-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="howitworks"  className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
            <div className="flex items-center">
            <div className="w-6 h-6 bg-teal-800 rounded-md mr-3"></div>
                <span className="text-gray-700 font-medium">Community Showcase</span>
            </div>
        </div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 sm:p-12 relative">
              {/* Dots at top */}
              {renderDots(step.dots)}
              
              {/* Step number */}
              <div className="absolute top-8 left-8 text-4xl sm:text-2xl font-semibold text-gray-600">
                {step.number}
              </div>
              
              {/* Content */}
              <div className="pt-[8rem]">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-gray-600 rounded-sm mr-3"></div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}