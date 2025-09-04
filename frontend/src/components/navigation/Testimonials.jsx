import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Amaka O.",
      role: "Fashion Designer",
      location: "Lagos, Nigeria",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face",
      rating: 5,
      testimonial: "Before joining Skyis, I struggled to get my designs in front of the right audience. Now, I have customers from three continents. The platform feels like it was built for creators like me."
    },
    {
      id: 2,
      name: "John Fitzgerald",
      role: "Boutique Owner",
      location: "London, UK",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      rating: 5,
      testimonial: "Finally, a platform that understands the fashion community. Skyis connects me with talented tailors and reliable suppliers. It's collaborative, stylish, and simple to use. My work has never looked better."
    },
    {
      id: 3,
      name: "Ellie sattler",
      role: "Accessories Brand Founder",
      location: "Cape Town, South Africa",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      rating: 6,
      testimonial: "It's more than a marketplace — it's a movement. Skyis is about creativity and connection. I've met designers I admire, learned from industry experts, and grown my sales by 40% in 6 months."
    },
    {
      id: 4,
      name: "Kate Mccallister",
      role: "Tailor",
      location: "Accra, Ghana",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face",
      rating: 5,
      testimonial: "From side hustle to full-time career. I started selling handmade clothes as a hobby. Skyis gave me the tools, visibility, and confidence to make it my full-time job."
    },
    {
      id: 5,
      name: "Tina Rossell",
      role: "Textile Artist",
      location: "Mumbai, India",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face",
      rating: 5,
      testimonial: "The community keeps me inspired. Skyis isn't just about selling products — it's about sharing stories, celebrating culture, and inspiring others in the fashion world."
    },
    {
      id: 6,
      name: "Tina Rossell",
      role: "Streetwear Designer",
      location: "New York, USA",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
      rating: 6,
      testimonial: "Smooth, stylish, and stress-free. I can manage my orders, showcase my designs, and connect with customers all in one place. Skyis has made running my fashion business so much easier."
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex space-x-1 mb-4">
        {[...Array(6)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    
    <section className="py-16 px-4 sm:px-6 lg:px-8 ">
    <div className="mb-16">
        <div className="flex items-center">
            <div className="w-6 h-6 bg-teal-800 rounded-md mr-3"></div>
            <span className="text-gray-700 font-medium">Testimonials</span>
        </div>
    </div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          
          <h2 style={{ letterSpacing: '-0.2rem' }} className="text-4xl sm:text-5xl lg:text-8xl font-normal text-gray-900 mb-8 leading-tight">
            Trusted By Experts.
          </h2>
          
          <p className="text-gray-500 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Real stories from real clients. See how our designs have transformed international and elevated 
            businesses, and created lasting impressions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* Avatar */}
              <div className="mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              {/* Rating */}
              {renderStars(testimonial.rating)}

              {/* Testimonial Text */}
              <p style={{ letterSpacing: '-0.04rem' }} className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                {testimonial.testimonial}
              </p>
               <hr className="border-t border-gray-200 my-4" />
              {/* Author Info */}
              <div className="border-t border-gray-100 pt-4">
                <h4 style={{ letterSpacing: '-0.04rem' }}  className="font-semibold text-gray-900 text-sm sm:text-base">
                  {testimonial.name}
                  <span className="text-gray-500 font-normal"> • {testimonial.role}</span>
                </h4>
                <p style={{ letterSpacing: '-0.04rem' }} className="text-gray-500 text-xs sm:text-sm mt-1">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}