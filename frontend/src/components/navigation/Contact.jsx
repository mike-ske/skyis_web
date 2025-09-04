import React, { useState } from 'react';
import { MapPin, Phone } from 'lucide-react';

export default function ContactUsSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact"  className="py-16 px-4 sm:px-6 lg:px-8 ">
       <div className="mb-16">
            <div className="flex items-center">
                <div className="w-6 h-6 bg-teal-800 rounded-md mr-3"></div>
                <span style={{ letterSpacing: '-0.04rem' }}  className="text-gray-700 font-medium">Lets Work Together</span>
            </div>
        </div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 style={{ letterSpacing: '-0.4rem' }}  className="text-4xl sm:text-5xl lg:text-8xl font-normal text-gray-900 mb-6 leading-tight">
                Contact Us!
              </h2>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-md">
                Let's create something amazing together! Reach out I'd love to hear about your project and ideas.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6 pt-8">
              <div className="flex items-center space-x-4">
                <MapPin className="w-5 h-5 text-black flex-shrink-0" />
                <span className="text-gray-700 text-sm sm:text-base">
                  1234 Lekki Phase 1, Lekki Lagos
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-black flex-shrink-0" />
                <span className="text-gray-700 text-sm sm:text-base">
                  09012345678
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-gray-900 placeholder-gray-400"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-gray-900 placeholder-gray-400"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Message*
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-gray-900 placeholder-gray-400 resize-none"
                  placeholder="Tell us about your project and ideas..."
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full border-8 border-gray-200 bg-teal-900 hover:bg-teal-700 disabled:bg-teal-400 text-white font-medium py-4 px-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}