import React, { useState, useEffect } from 'react';

// This component implements an image slider with fade transitions and dot indicators.
const ImageSlider = () => {
  const images = [
    'https://res.cloudinary.com/drgk8rmny/image/upload/v1752985841/Property_1_Frame_1321315295_qvkdhl.svg', 
    'https://res.cloudinary.com/drgk8rmny/image/upload/v1752985168/Property_1_Frame_1321315296_rdmmnj.svg', 
    'https://res.cloudinary.com/drgk8rmny/image/upload/v1752985168/Property_1_Variant4_uzef7p.svg', 
    'https://res.cloudinary.com/drgk8rmny/image/upload/v1752985168/Property_1_Frame_1321315297_lusdux.svg', 
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className='relative w-full h-64 sm:h-80 lg:h-[400px] rounded-xl overflow-hidden shadow-lg' style={{ 
      'width' : '544px',
      'height' : '674px',
      'margin' : '0 0 0 auto',
     }}>
      <img
        alt="Fashion slider"
        className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
        src={images[currentIndex]}
      />
      
      {/* Dot indicators
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setCurrentIndex(index);
                setFade(true);
              }, 250);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 ${
              index === currentIndex 
                ? 'shadow-lg scale-110' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            style={{
              backgroundColor: index === currentIndex ? '#06403b' : undefined
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default ImageSlider;


