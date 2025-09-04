import React from 'react';
import '../../css/carousel.css'; // don't forget to import this


const images = [
  'https://res.cloudinary.com/drgk8rmny/image/upload/v1752766952/0c33b3a1-9723-4f6e-8a9d-090341fd430c-1_ox8lj9.svg',
  'https://res.cloudinary.com/drgk8rmny/image/upload/v1752985168/Property_1_Frame_1321315296_rdmmnj.svg',
  'https://storage.googleapis.com/a1aa/image/2f762ee3-ce39-4bf4-8b49-2754ddf717d3.jpg',
];

const AnimatedImageLoop = () => {
  return (
    <div className="relative bottom-[-120px] w-full overflow-hidden px-2">
      <div className="flex items-center space-x-5 animate-carousel-track">
        {images.concat(images).map((src, idx) => (
          <div key={idx} className="relative w-12 h-12 shrink-0">
            <img
              src={src}
              alt={`Model ${idx}`}
              className="w-12 h-12 object-cover rounded-sm animate-carousel-img"
              style={{ animationDelay: `${(idx % images.length) * 2}s` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedImageLoop;
