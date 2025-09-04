import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SkyisCheckMail() {
  const [email] = useState('johndoe@example.com'); // This would typically come from props or context
  const [isResending, setIsResending] = useState(false);

  const handleOpenMailApp = () => {
    console.log('Opening mail app...');
    // Handle opening mail app - could open mailto: link or native mail app
    window.open('mailto:', '_blank');
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    console.log('Resending email to:', email);
    
    // Simulate API call to resend email
    setTimeout(() => {
      setIsResending(false);
      // Show success message or handle response
    }, 1000);
  };

  const handleBackToLogin = () => {
    console.log('Navigate back to login');
    // Handle navigation back to login page
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-6 font-sans">
        <main className="min-h-screen w-dvw flex flex-col md:flex-row items-center justify-center md:justify-between max-w-7xl mx-auto px-6 py-12 gap-12 md:gap-24">
        {/* Left Image Section */}
        <div className="hidden flex-1  sm:flex flex-shrink-0 w-full md:max-w-lg lg:max-w-2xl rounded-3xl overflow-hidden relative">
            <img
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756222176/Frame_1686553286_qxegrh.png"
                alt="Person holding a green umbrella with a black bag hanging on their shoulder, standing near a black metal fence"
                className="w-full h-auto object-cover rounded-3xl"
            />
        </div>

        {/* Right Content Section */}
        <section className="md:flex-1 flex flex-col items-center justify-center text-center px-6 md:px-0 mt-12 md:mt-0 max-w-md md:max-w-none mx-auto md:mx-0">
          {/* Mail Icon */}
          <button 
            aria-label="Mail icon" 
            className="mb-6 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            type="button"
          >
            <Mail className="text-gray-700 w-5 h-5" />
          </button>

          {/* Header */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Check your mail
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-8 max-w-xs">
            We sent a password reset link to{' '}
            <span className="font-normal">
              {email}
            </span>
          </p>

          {/* Open Mail App Button */}
          <button 
            className="w-full max-w-xs bg-teal-900 hover:bg-teal-800 text-white py-3 rounded-full border-4 border-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-700"
            onClick={handleOpenMailApp}
          >
            Open mail app
          </button>

          {/* Resend Email Text */}
          <p className="text-gray-600 mt-6 text-sm max-w-xs">
            Didn't receive the email?{' '}
            <button 
              className="font-bold cursor-pointer hover:text-gray-800 focus:outline-none focus:underline transition-colors disabled:opacity-50"
              onClick={handleResendEmail}
              disabled={isResending}
            >
              {isResending ? 'Resending...' : 'Click to resend'}
            </button>
          </p>

          {/* Back to Login Button */}
          <button 
            className="mt-6 text-gray-500 text-sm flex items-center space-x-2 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded px-2 py-1 transition-colors"
            onClick={handleBackToLogin}
          >
            <ArrowLeft className="w-4 h-4" />
            <Link 
              className="text-[#0B3B38] text-sm font-normal hover:underline" 
              to="/login"
            >
              Back to login
            </Link>
          </button>
        </section>
      </main>
    </div>
  );
}