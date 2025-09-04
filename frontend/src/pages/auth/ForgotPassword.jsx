import React, { useState } from 'react';
import { Mail, Key, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SkyisResetPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    console.log('Reset password requested for:', email);
    
    // Simulate loading time
    setTimeout(() => {
      setIsSubmitting(false);
      // Handle success/error states here
    }, 1000);
  };

  const handleBackToLogin = () => {
    console.log('Navigate back to login');
    // Handle navigation back to login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 font-sans">
      <main className="min-h-screen w-dvw flex flex-col md:flex-row items-center justify-center md:justify-between max-w-7xl mx-auto px-6 py-12 gap-12 md:gap-24">
        {/* Left Image Section */}
        <div className="hidden flex-1 sm:flex flex-shrink-0 w-full md:max-w-lg lg:max-w-2xl rounded-3xl overflow-hidden relative">
            <img
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756222176/Frame_1686553286_qxegrh.png"
                alt="Person holding a green umbrella with a black bag hanging on their shoulder, standing near a black metal fence"
                className="w-full h-auto object-cover rounded-3xl"
            />
        </div>

        {/* Right Form Section */}
        <section className="flex flex-col justify-center mt-12 md:mt-0 w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <button 
              aria-label="Key icon" 
              className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
              type="button"
            >
              <Key className="text-gray-600 w-5 h-5" />
            </button>
          </div>

          {/* Header */}
          <h1 className="text-center text-[28px] font-semibold text-gray-900 mb-2">
            Reset Your Password
          </h1>
          <p className="text-center text-gray-600 mb-8 px-6">
            No worries — it happens to the best of us. Enter your email to get back into your Skyis account.
          </p>

          {/* Form */}
          <div className="flex flex-col space-y-6 px-6">
            <label className="text-sm text-gray-700 font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Mail className="w-4 h-4" />
              </span>
              <input 
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent" 
                id="email"
                name="email"
                placeholder="johndoe@example.com" 
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button 
              className="w-full py-3 bg-teal-900 text-white rounded-full shadow-sm hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
              type="submit"
              onClick={handleSubmit}
              disabled={!email || isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Continue'}
            </button>
          </div>

          {/* Back to Login Link */}
          <div className="text-center mt-8 text-gray-500 text-sm flex justify-center items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <Link 
              className="hover:underline focus:outline-none focus:underline"
              onClick={handleBackToLogin}
              to="/login"
            >
              Back to login
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}