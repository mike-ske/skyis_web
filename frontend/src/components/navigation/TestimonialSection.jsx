import React, { useState, useEffect } from 'react';

const TestimonialSection = () => {
  const [email, setEmail] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    
    {
      name: "Maria Chen",
      role: "Fashion Designer",
      quote: "The platform has revolutionized my creative process. I've connected with amazing collaborators and my sales have tripled since joining Skyis.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "David Rodriguez",
      role: "Fashion Entrepreneur",
      quote: "Skyis isn't just a marketplace, it's a community. The tools and connections I've made here have been invaluable for my fashion business.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Sarah Johnson",
      role: "Creative Director",
      quote: "From concept to customer, Skyis has streamlined every aspect of my fashion journey. The platform's intuitive design makes collaboration effortless.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    }
  ];

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleSubscribe = () => {
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <div className="relative flex overflow-hidden h-96 my-[150px]" style={{ backgroundImage: `url('https://res.cloudinary.com/drgk8rmny/image/upload/v1752848103/Frame_1321315317_czisfz.svg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:py-2">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-40 items-center h-full">
          
          {/* Left Side - Testimonials */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Testimonial Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:bg-white/15">
              <div className="text-center lg:text-left">
                <h2 className="text-sm sm:text-xl font-bold text-white mb-3 animate-fade-in">
                  What People say about Skyis!!!!
                </h2>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <img
                    src={testimonials[currentSlide].avatar}
                    alt={testimonials[currentSlide].name}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white/30 animate-pulse-slow"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-snug text-white">
                    {testimonials[currentSlide].name}
                  </h3>
                  <p className="text-gray-300 text-xs md:text-xs">
                    {testimonials[currentSlide].role}
                  </p>
                </div>
              </div>

              <blockquote className="text-gray-200 font-light leading-snug md:text-base lg:text-xs animate-fade-in">
                "{testimonials[currentSlide].quote}"
              </blockquote>

              {/* Testimonial Navigation Dots */}
              <div className="flex justify-start space-x-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-teal-400 scale-125' 
                        : 'bg-gray-500 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Newsletter */}
          <div className="order-1 lg:order-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:bg-white/15">
              <h3 className="text-l md:text-xl font-bold text-white mb-6 animate-fade-in">
                Subscribe to our Newsletter & Never miss out!!!
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-xs md:text-sm mb-2">
                    Enter your email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="JohnDoe@gmail.com"
                    className="w-full text-xs px-2 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                  />
                </div>
                
                <button
                  onClick={handleSubscribe}
                  className="w-full text-xs bg-[#0F5B54] hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 px-2 rounded-lg transform transition-all duration-300 hover:scale-10 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TestimonialSection;