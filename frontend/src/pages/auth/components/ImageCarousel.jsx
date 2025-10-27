import React, { useState, useEffect } from 'react';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://res.cloudinary.com/drgk8rmny/image/upload/v1758271585/Property_1_1_ojbgdh.png',
    'https://res.cloudinary.com/drgk8rmny/image/upload/v1758271585/Property_1_5_n8msii.png',
    'https://res.cloudinary.com/drgk8rmny/image/upload/v1758271584/Property_1_2_c9ihwm.png',
    'https://res.cloudinary.com/drgk8rmny/image/upload/v1758271585/Property_1_3_m0zjmw.png',
    'https://res.cloudinary.com/drgk8rmny/image/upload/v1758271584/Property_1_4_zc9ldd.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative h-full overflow-hidden">
      <div 
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img
              src={image}
              alt={`Fashion ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Logo Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      
      {/* Navigation Arrows */}
      {/* <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all"
      >
        <i className="ri-arrow-left-line text-xl" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all"
      >
        <i className="ri-arrow-right-line text-xl" />
      </button> */}

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-[96%] transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;