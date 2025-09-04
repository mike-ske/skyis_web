import React, { useEffect, useState } from 'react';

export default function CommunityShowcaseSection() {
  const showcaseImages = [
    {
      id: 1,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756764895/image_3_xyoyrl.png",
      alt: "Fashion collection display"
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756764896/image_6_qyksko.png",
      alt: "Teal fabric and accessories"
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756764894/image_13_1_rde3sm.png",
      alt: "Street fashion silhouette"
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756764894/image_12_e6uh0x.png",
      alt: "Fashion design details"
    },
    {
      id: 5,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756764894/image_8_qcvffh.png",
      alt: "Green fashion piece"
    },
    {
      id: 6,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756764893/image_11_tkvza3.png",
      alt: "Street style photography"
    },
    {
      id: 7,
      src: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756764892/image_14_1_kqjhji.png",
      alt: "Fashion portrait"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
      alt: "Fashion model"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
      alt: "Fashion accessories"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop",
      alt: "Fashion shopping"
    }
  ];

  const [animationOffset, setAnimationOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationOffset(prev => (prev + 0.5) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getImageStyle = (index) => {
    // Calculate horizontal position for each image
    const spacing = 200; // Space between images
    const totalWidth = spacing * showcaseImages.length;
    const baseX = index * spacing;
    
    // Create continuous horizontal movement
    let x = (baseX - animationOffset * 3) % (totalWidth + 400);
    if (x < -200) x += totalWidth + 400; // Wrap around
    
    // Scale calculation: large on left, smallest at center, large on right
    const containerWidth = 1200; // Width of visible area
    const centerX = containerWidth / 2;
    const distanceFromCenter = Math.abs(x - centerX);
    const maxDistance = containerWidth / 2;
    
    // Scale from 1.2 (edges) to 0.6 (center)
    const scale = 0.6 + (distanceFromCenter / maxDistance) * 0.6;
    
    // Z-index: smaller images (closer to center) should be behind
    const zIndex = Math.floor(scale * 100);
    
    // Opacity: fade out when too far left or right
    let opacity = 1;
    if (x < -100) opacity = Math.max(0, (x + 200) / 100);
    if (x > containerWidth + 100) opacity = Math.max(0, (containerWidth + 200 - x) / 100);
    
    return {
      transform: `translateX(${x - centerX}px) scale(${scale})`,
      zIndex: zIndex,
      opacity: opacity
    };
  };

  return (
    <section id="showcase"  className="py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      
      <div className="max-w-full mx-auto">
        <div className="mb-16">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-teal-800 rounded-md mr-3"></div>
                <span className="text-gray-700 font-medium">Community Showcase</span>
            </div>
        </div>
        {/* Header */}
        <div className="text-center mb-16">
          
          
          <h2 className="text-4xl sm:text-5xl lg:text-8xl font-normal text-gray-900 mb-8 leading-tight">
            Every Pixel Clicked.
          </h2>
          
          <p className="text-gray-500 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Capturing moments, creating memories. Through my lens, i capture stunning visuals that bring your 
            brand to life with clarity, emotion, and impact.
          </p>
        </div>

        {/* Image Gallery */}
        <div className="relative">
          {/* Mobile Layout - Simple Grid */}
          <div className="grid grid-cols-2 gap-4 sm:hidden">
            {showcaseImages.slice(0, 6).map((image) => (
              <div key={image.id} className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>

          {/* Tablet Layout - Grid */}
          <div className="hidden sm:grid lg:hidden grid-cols-3 gap-6">
            {showcaseImages.slice(0, 6).map((image) => (
              <div key={image.id} className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>

          {/* Desktop Layout - Horizontal Sliding Animation */}
          <div className="hidden lg:block">
            <div className="relative w-full h-96 flex items-center justify-center overflow-hidden">
              {showcaseImages.map((image, index) => (
                <div
                  key={image.id}
                  className="absolute transition-all duration-75 ease-linear"
                  style={getImageStyle(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-48 h-64 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              ))}
              
              {/* Center indicator line */}
              <div className="absolute hidden top-0 left-1/2 w-0.5 h-full bg-teal-200 opacity-30 transform -translate-x-0.5"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
          
        