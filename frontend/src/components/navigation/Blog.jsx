import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const Blog = () => {
  const [isVisible, setIsVisible] = useState({});
  const [headerVisible, setHeaderVisible] = useState(false);
  const cardRefs = useRef([]);
  const headerRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers = [];
    
    // Header observer
    if (headerRef.current) {
      const headerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setHeaderVisible(true);
            }
          });
        },
        { 
          threshold: 0.1,
          rootMargin: '50px 0px'
        }
      );
      
      headerObserver.observe(headerRef.current);
      observers.push(headerObserver);
    }
    
    // Cards observers
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  setIsVisible(prev => ({ ...prev, [index]: true }));
                }, index * 200); // Stagger animation
              }
            });
          },
          { 
            threshold: 0.1,
            rootMargin: '50px 0px'
          }
        );
        
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const blogData = [
    {
      image: "https://storage.googleapis.com/a1aa/image/8cd0ff8f-6a5b-404e-5f2c-d633198d393a.jpg",
      title: "UX review presentations",
      description: "How do you create compelling presentations that wow your colleagues and impress your managers?",
      author: {
        name: "Olivia Rhye",
        avatar: "https://storage.googleapis.com/a1aa/image/c8c4e904-e3ff-4040-fadb-1ec92ecd24b7.jpg",
        date: "08 Aug 2025"
      },
      alt: "Abstract purple and transparent glass-like shapes on a light gray background"
    },
    {
      image: "https://storage.googleapis.com/a1aa/image/9d87e587-3016-4566-8b49-fab503dadc13.jpg",
      title: "Migrating to Linear 101",
      description: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      author: {
        name: "Phoenix Baker",
        avatar: "https://storage.googleapis.com/a1aa/image/ddf69ccf-8905-45f8-0bb8-0600b70b4a05.jpg",
        date: "08 Aug 2025"
      },
      alt: "Two people working at a desk with laptops and a camera, one woman smiling and one man with back to camera"
    },
    {
      image: "https://storage.googleapis.com/a1aa/image/601ae09d-c735-4a72-8c9b-fb3063091b82.jpg",
      title: "Building your API stack",
      description: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
      author: {
        name: "Lana Steiner",
        avatar: "https://storage.googleapis.com/a1aa/image/41bd779b-5e80-40c5-a8f1-db35e99c410f.jpg",
        date: "08 Aug 2025"
      },
      alt: "Illustration of three metallic rectangular frames stacked with screws floating around"
    }
  ];

  return (
    <div className="bg-white text-slate-900 overflow-hidden">
        <div className=" mx-auto px-6 sm:px-10 pt-16 pb-20">
            <div className="mb-16">
                <div className="flex items-center">
                <div className="w-6 h-6 bg-teal-800 rounded-md mr-3"></div>
                    <span className="text-gray-700 font-medium">Blog</span>
                </div>
            </div>
            <section className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogData.map((post, index) => (
                    <article
                    key={index}
                    ref={el => cardRefs.current[index] = el}
                    className={`group space-y-4 cursor-pointer transform transition-all duration-700 ease-out hover:scale-105 ${
                        isVisible[index] 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-12 opacity-0'
                    }`}
                    onClick={(e) => e.preventDefault()}
                    >
                    {/* Image Container */}
                    <div className="relative overflow-hidden rounded-lg">
                        <img 
                        alt={post.alt}
                        className="w-full h-[200px] rounded-lg object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
                        src={post.image}
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                        
                        {/* Floating Read More Indicator */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 ">
                        <ExternalLink className="w-4 h-4 text-slate-700" />
                        </div>

                        {/* Reading Time Badge */}
                        <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        5 min read
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        {/* Title with Icon */}
                        <h3 className="text-xl font-semibold flex items-center gap-2 group-hover:text-slate-700 transition-colors duration-300">
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {post.title}
                        </span>
                        <ExternalLink className="text-slate-900 text-base opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                        {post.description}
                        </p>

                        {/* Author Info */}
                        <div className="flex items-center space-x-3">
                        <div className="relative">
                            <img 
                            alt={`Portrait of ${post.author.name}`}
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-slate-200 transition-all duration-300"
                            src={post.author.avatar}
                            />
                            
                            {/* Online Status Indicator */}
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
                        </div>
                        
                        <div className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors duration-300">
                            <p className="font-semibold leading-none group-hover:translate-x-0.5 transition-transform duration-300">
                            {post.author.name}
                            </p>
                            <p className="leading-none group-hover:translate-x-0.5 transition-transform duration-300 delay-75">
                            {post.author.date}
                            </p>
                        </div>
                        </div>
                    </div>

                    {/* Progress Bar Animation */}
                    <div className="h-0.5 bg-gradient-to-r from-slate-300 to-slate-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    {/* Card Shadow Effect */}
                    <div className="absolute inset-0 rounded-lg duration-500 pointer-events-none -z-10" />
                    </article>
                ))}
                </div>

                {/* Load More Button */}
                <div className="flex justify-center mt-12">
                <button className="group px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transform hover:scale-105 transition-all duration-300 shadow-lg ">
                    <span className="flex items-center gap-2">
                    Load More Articles
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                </button>
                </div>
            </section>
        </div>
      {/* Floating Background Elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-slate-900/5 rounded-full animate-pulse" />
      <div className="absolute bottom-40 left-10 w-6 h-6 bg-slate-900/10 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-10 w-2 h-2 bg-slate-900/20 rounded-full animate-ping" style={{ animationDelay: '1s' }} />

      {/* Custom Styles */}
      <style jsx>{`
        /* Enhanced card hover effects */
        .group:hover {
          transform: translateY(-8px) scale(1.02);
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Card shimmer effect */
        .group::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.8s;
          pointer-events: none;
          z-index: 1;
          border-radius: 0.5rem;
        }

        .group:hover::before {
          left: 100%;
        }

        /* Staggered entrance animations */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Progressive loading animation */
        .group {
          animation: slideInUp 0.6s ease-out forwards;
        }

        /* Enhanced focus states for accessibility */
        .group:focus-within {
          outline: 2px solid rgba(59, 130, 246, 0.5);
          outline-offset: 2px;
        }

        /* Micro-interactions */
        .group:active {
          transform: translateY(-4px) scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default Blog;