import React, { useState, useEffect } from 'react';

const AnimatedImageSequence = () => {
  const images = [
    'https://res.cloudinary.com/drgk8rmny/image/upload/v1752766968/502fe8a0-4084-4860-8da2-d2496c478efe_gcbeho.svg',
    'https://res.cloudinary.com/drgk8rmny/image/upload/v1751692571/2_eq3tvv.png',
    'https://res.cloudinary.com/drgk8rmny/image/upload/v1751692571/3_hqif0i.png',
    'https://res.cloudinary.com/drgk8rmny/image/upload/v1752985168/Property_1_Frame_1321315297_lusdux.svg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full h-[100px] mt-14 flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-l h-10 flex items-center justify-center">
        
        {/* Display all images in rotation motion */}
        <div className="relative w-full h-full flex items-center justify-flex-start pl-16">
          {images.map((image, index) => {
            // Calculate position based on current index
            const position = (index - currentIndex + images.length) % images.length;
            
            let transform = '';
            let opacity = 0.3;
            let zIndex = 1;
            
            if (position === 0) {
              // Current/active image - center, largest
              transform = 'translateX(0px) scale(1.1)';
              opacity = 1;
              zIndex = 10;
            } else if (position === 1) {
              // Next image - right side
              transform = 'translateX(40px) scale(0.85)';
              opacity = 0.8;
              zIndex = 5;
            } else if (position === images.length - 1) {
              // Previous image - left side
              transform = 'translateX(-40px) scale(0.85)';
              opacity = 0.8;
              zIndex = 5;
            } else {
              // Hidden images - closer positions
              if (position === 2) {
                transform = 'translateX(80px) scale(0.7)';
              } else {
                transform = 'translateX(-80px) scale(0.7)';
              }
              opacity = 0.5;
              zIndex = 1;
            }
            
            return (
              <div
                key={index}
                className="absolute w-16 h-20 transition-all duration-1000 ease-in-out"
                style={{
                  transform,
                  opacity,
                  zIndex,
                }}
              >
                <img
                  src={image}
                  alt={`Fashion model ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                  style={{
                    filter: position === 0 
                      ? 'brightness(1.2) contrast(1.15) saturate(1.1)' 
                      : 'brightness(0.8) contrast(0.9)',
                  }}
                />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default AnimatedImageSequence;