import React, { useState } from 'react';
import { Lock, Store, Paintbrush, PenTool, Scissors } from 'lucide-react';

export default function SkyisOnboarding() {
  const [selectedUserType, setSelectedUserType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected user type:', selectedUserType);
    // Handle form submission here
  };

  const userTypes = [
    {
      id: 'shopper',
      title: 'Shopper',
      description: 'Individuals who browse, buy, rent, or bid on fashion items directly from the marketplace.',
      icon: Lock
    },
    {
      id: 'shopowner',
      title: 'Shop owner',
      description: 'Vendors or boutiques who create and manage storefronts to sell, rent, or auction fashion products.',
      icon: Store
    },
    {
      id: 'creator',
      title: 'Creator',
      description: 'My business has the approval, documentation, and licences required to operate legally',
      icon: Paintbrush
    },
    {
      id: 'designer',
      title: 'Designer',
      description: 'Fashion creatives who upload portfolios, license ideas, and collaborate with tailors or brands.',
      icon: PenTool
    },
    {
      id: 'dressmarker',
      title: 'Dress marker',
      description: 'Skilled professionals who bring designs to life, fulfill custom orders, and partner with creators.',
      icon: Scissors
    }
  ];

  return (
    <div className="bg-white text-gray-700 min-h-screen font-sans">
      <div className="min-h-screen p-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24">
        {/* Left Image Section */}
        <div className="hidden sm:flex flex-shrink-0 w-full md:max-w-lg lg:max-w-2xl rounded-3xl overflow-hidden relative">
            <img
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1757673009/Frame_1686553287_zcujpi.png"
                alt="Person holding a green umbrella with a black bag hanging on their shoulder, standing near a black metal fence"
                className="w-full h-auto object-cover rounded-3xl"
            />
        </div>



        {/* Right Content Section */}
        <div className="flex flex-col max-w-xl w-full p-10">
          <div className="flex justify-end mb-6">
            <a className="text-green-900 text-sm font-normal hover:underline" href="#">
              Login
            </a>
          </div>

          <div className="flex flex-col items-center mb-6">
            <img 
              alt="Small green feather icon" 
              className="mb-4" 
              height="" 
              src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg" 
              width=""
            />
            <h1 className="text-gray-900 font-semibold text-2xl md:text-3xl mb-2 text-center">
              Get Started with Skyis
            </h1>
            <p className="text-center text-gray-500 text-sm md:text-base max-w-md">
              Select how you would like to experience skyis so we can create the tailored experience you need.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {userTypes.map((userType) => {
              const IconComponent = userType.icon;
              return (
                <label
                  key={userType.id}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-green-900 transition-colors"
                  htmlFor={userType.id}
                >
                  <div className="flex-shrink-0 mt-1 text-green-900">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="font-semibold text-gray-900 text-sm md:text-base mb-1">
                      {userType.title}
                    </div>
                    <div className="text-gray-600 text-xs md:text-sm leading-tight">
                      {userType.description}
                    </div>
                  </div>
                  <input
                    className="mt-2 w-4 h-4 text-green-900 border-gray-300 focus:ring-green-900"
                    id={userType.id}
                    name="userType"
                    type="radio"
                    value={userType.id}
                    checked={selectedUserType === userType.id}
                    onChange={(e) => setSelectedUserType(e.target.value)}
                  />
                </label>
              );
            })}

            <button
              className="mt-6 w-full bg-green-900 text-white rounded-full py-3 px-6 text-sm md:text-base font-normal hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={!selectedUserType}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}