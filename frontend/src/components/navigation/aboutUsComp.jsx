import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function AboutUsComp() {
  return (
    <div id="about"  className="min-h-screen p-8">
      <div className="flex items-center">
        <div className="w-6 h-6 bg-teal-800 rounded-md mr-3"></div>
        <span className="text-gray-700 font-medium">About Skyis</span>
      </div>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-5xl font-normal  text-gray-900 leading-tight text-center max-w-4xl">
            Skyis is a revolutionary <br></br> 
          </h1>
          <h1 style={{ letterSpacing: '-1.5px' }} className="text-5xl font-normal text-gray-900 leading-tight max-w-4xl">
            fashion-tech ecosystem that bridges the gap between creativity and commerce. We empower designers, tailors, creators, and fashion enthusiasts to connect, collaborate, and thrive in the digital fashion landscape.
          </h1>
        </div>

        {/* Grid of cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Creator Card */}
          <div className="bg-white rounded-lg overflow-hidden">
            <img 
              src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756764894/image_15_1_lbnolc.png" 
              alt="Creator workspace with design tools"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Creator</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Create and showcase your signature designs with intuitive fashion tools
              </p>
              <button className="flex items-center text-gray-900 font-medium hover:text-teal-600 transition-colors">
                Become a creator
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Fashion Designer Card */}
          <div className="bg-white rounded-lg overflow-hidden">
            <img 
              src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756764892/tailor-sewing-textile-garment_1_kfkpmj.png" 
              alt="Fashion designer working on laptop"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fashion Designer</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Engage customers and offer professional fashion services seamlessly
              </p>
              <button className="flex items-center text-gray-900 font-medium hover:text-teal-600 transition-colors">
                Become a designer
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Retail Card */}
          <div className="bg-white rounded-lg overflow-hidden">
            <img 
              src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756764893/close-up-piano-hanging-rack_1_g2rxmj.png" 
              alt="Retail clothing rack"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Retail</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Grow your brand by selling collections through our integrated marketplace
              </p>
              <button className="flex items-center text-gray-900 font-medium hover:text-teal-600 transition-colors">
                Become a retailer
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Shopper Card */}
          <div className="bg-white rounded-lg overflow-hidden">
            <img 
              src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756765683/image_16_f4cg3g.png" 
              alt="Woman shopping through clothes"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Shopper</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Explore and shop exclusive pieces from visionary designers worldwide
              </p>
              <button className="flex items-center text-gray-900 font-medium hover:text-teal-600 transition-colors">
                Shop exclusive designs
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}