import React, { useState } from 'react';
import { X, Check, AlertCircle, Loader2 } from 'lucide-react';

// Main Waitlist Modal Component
const WaitlistForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Full name is required';
    } else if (formData.fullname.trim().length < 2) {
      newErrors.fullname = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success (you can replace this with actual API call)
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ fullname: '', email: '' });
    setErrors({});
    setIsLoading(false);
    setIsSubmitted(false);
  };

  // Handle close with reset
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay - Fixed positioning with highest z-index */}
      <div 
        className=" fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        style={{ 
          zIndex: 9999,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={handleBackdropClick}
      >
        {/* Modal Content - Perfectly centered */}
        <div 
          className="relative bg-white rounded-2xl w-full max-w-sm mx-auto shadow-2xl transform transition-all duration-500 ease-out animate-scale-in"
          style={{
            maxHeight: '90vh',
            overflow: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            {/* Close button */}
            <button 
              onClick={handleClose}
              aria-label="Close" 
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200 hover:scale-110 transform z-10"
            >
              <X size={18} />
            </button>

            {/* Decorative dots pattern */}
            <svg 
              aria-hidden="true" 
              className="absolute top-8 right-8 pointer-events-none opacity-30" 
              fill="none" 
              height="80" 
              width="80" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern height="10" id="dots" patternUnits="userSpaceOnUse" width="10" x="0" y="0">
                  <circle cx="1" cy="1" fill="#CBD5E1" r="1" />
                </pattern>
              </defs>
              <rect fill="url(#dots)" height="80" width="80" />
            </svg>

            {/* Success State */}
            {isSubmitted ? (
              <div className="flex flex-col items-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce-in">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-center text-gray-900 font-semibold text-lg leading-6 mb-2">
                  You're on the list!
                </h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                  Thank you for joining our waitlist. We'll notify you when early access becomes available.
                </p>
                <div className="flex gap-3 w-full">
                  
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-gray-100 text-gray-700 text-sm font-normal rounded-full py-3 px-6 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Form State */
              <div className="animate-fade-in font-[Product_Sans]">
                {/* Logo and branding */}
                <div className="flex flex-col items-center mb-6">
                   <img 
                        alt="Feather icon in green" 
                        className="" 
                        height="" 
                        src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg" 
                        width=""
                    />
                </div>

                {/* Header */}
                <h2 className="font-[Product_Sans] text-center text-gray-900 font-semibold text-lg leading-6 mb-1 select-none">
                  Join our waitlist
                </h2>
                <p className="font-[Product_Sans] text-center text-gray-500 text-sm mb-6 select-none">
                  Secure early access to exclusive fashion experiences.
                </p>

                {/* Form */}
                <div className="space-y-5">
                  {/* Full Name Field */}
                  <div className="transform transition-all duration-200">
                    <label 
                      className="block text-gray-700 text-xs font-medium mb-1 select-none" 
                      htmlFor="fullname"
                    >
                      Full Name*
                    </label>
                    <div className="relative">
                      <input
                        className={`w-full rounded-lg border text-gray-700 text-sm placeholder-gray-400 px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-900 focus:border-teal-900 ${
                          errors.fullname 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-200'
                        }`}
                        id="fullname"
                        name="fullname"
                        placeholder="Enter full name"
                        type="text"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                      {errors.fullname && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.fullname && (
                      <p className="text-red-500 text-xs mt-1 animate-slide-down">
                        {errors.fullname}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="transform transition-all duration-200">
                    <label 
                      className="block text-gray-700 text-xs font-medium mb-1 select-none" 
                      htmlFor="email"
                    >
                      Email Address*
                    </label>
                    <div className="relative">
                      <input
                        className={`w-full rounded-lg border text-gray-700 text-sm placeholder-gray-400 px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-900 focus:border-teal-900 ${
                          errors.email 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-200'
                        }`}
                        id="email"
                        name="email"
                        placeholder="Enter email address"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                      {errors.email && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 animate-slide-down">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Submit Error */}
                  {errors.submit && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 animate-slide-down">
                      <p className="text-red-600 text-sm text-center">{errors.submit}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-teal-900 text-white text-sm font-normal rounded-full py-3 px-6 mt-1 hover:bg-teal-800 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Joining waitlist...
                      </>
                    ) : (
                      'Join waitlist'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom styles for animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.9) translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </>
  );
};

export default WaitlistForm;