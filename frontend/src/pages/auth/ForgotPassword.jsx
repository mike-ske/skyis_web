import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ForgotPassword = () => {
  const [isDark, setIsDark] = useState(false);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Clear error when user starts typing
    if (errors.email) {
      setErrors(prev => ({
        ...prev,
        email: ''
      }));
    }

    // Clear success state when user starts typing again
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
      setEmail('');
    } catch (error) {
      setErrors({ general: 'Failed to send reset email. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEmail('');
    setErrors({});
    setIsSuccess(false);
    // In a real app, this would navigate back to login
    alert('Navigating back to login page...');
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const themeClasses = {
    bg: isDark ? 'bg-[#0B0B0B]' : 'bg-white',
    textPrimary: isDark ? 'text-white' : 'text-black',
    textSecondary: isDark ? 'text-gray-300' : 'text-gray-400',
    footer: isDark ? 'text-[#CCFF36]' : 'text-teal-900',
    textAccent: isDark ? 'text-[#054643]' : 'text-[#0F3D38]',
    border: isDark ? 'border-1 border-gray-600' : 'border-gray-300',
    cardBg: isDark ? 'bg-[#0B0B0B]' : 'bg-white',
    inputBg: isDark ? 'bg-gray-700' : 'bg-white',
    inputText: isDark ? 'text-white' : 'text-black',
    buttonPrimary: isDark ? 'bg-[#054643] hover:bg-[#043a37]' : 'bg-[#0F3D38] hover:bg-[#0b2a29]',
    buttonSecondary: isDark ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-[#f5f5f5] hover:bg-[#e0e0e0] text-[#0F3D38]',
    googleButton: isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-white text-black hover:bg-gray-50 border border-gray-300'
  };

  const ErrorMessage = ({ message }) => (
    <div className={`text-red-500 text-xs mt-1 transform transition-all duration-300 ${
      message ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
    }`}>
      <div className="flex items-center space-x-1">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className="animate-pulse">{message}</span>
      </div>
    </div>
  );

  const SuccessMessage = () => (
    <div className={`bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6 transform transition-all duration-500 ${
      isSuccess ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`}>
      <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">Reset link sent!</span>
      </div>
      <p className="text-green-600 dark:text-green-400 text-sm mt-1">
        Check your email for password reset instructions.
      </p>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${themeClasses.bg} ${themeClasses.textPrimary}`}>
        <div className="flex justify-between items-center px-6 md:px-20 py-6">
            <div className="flex items-center space-x-3">
                <img
                    src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg"
                    alt="Skyis logo"
                    className={`w-auto transition-all duration-300 ${isDark ? 'brightness-0 invert' : ''}`}
                />
            </div>
            {/* Theme Toggle aligned with logo */}
            <button
                onClick={toggleTheme}
                className={`p-3 rounded-full ${themeClasses.cardBg} ${themeClasses.border} border transition-all duration-300 hover:scale-110 shadow-lg`}
                aria-label="Toggle theme"
            >
                {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                    <Moon className="w-5 h-5 text-gray-600" />
                )}
            </button>
        </div>
      <div className="flex flex-1 flex-col md:flex-row max-w-[1440px] mx-auto w-full px-6 md:px-12 ">
        {/* Left side */}
        <div className="flex flex-col justify-between flex-1 px-8 md:px-16 py-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-normal max-w-md leading-tight mb-8 transition-colors duration-300">
              From concept to closet — <em className='font-normal'>fashion</em> , fully connected.
            </h1>
            <img 
              src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753196167/OBJECTS_wkarfr.svg"
              alt="Illustration of a man pushing a shopping cart in front of a large smartphone screen showing a shopping app with shoes, t-shirt, and boxes, surrounded by shopping bags, leaves, and discount tags"
              className={`hidden sm:flex md:flex w-full max-w-lg h-auto transition-all duration-300 ${isDark ? 'brightness-75' : ''}`}
            />
          </div>
          
          <footer className={`hidden sm:flex md:flex justify-between text-xs font-normal mt-10 transition-colors duration-300 ${themeClasses.footer}`}>
            <div>
              Copyright (c) 2025
            </div>
            <div className="flex space-x-6 font-light text-xs">
              <a href="#" className="hover:underline transition-all duration-200">
                Terms of use
              </a>
              <a href="#" className="hover:underline transition-all duration-200">
                Privacy Policy
              </a>
            </div>
          </footer>
        </div>

        {/* Right side */}
        <div className="md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
          <div className={`w-full max-w-md border-[1px] rounded-lg p-8 transition-all duration-300 ${themeClasses.border} ${themeClasses.cardBg} shadow-xs`}>
            {isSuccess && <SuccessMessage />}
            
            {!isSuccess && (
              <>
                <h2 className={`text-2xl font-extrabold mb-3 transition-colors duration-300 ${themeClasses.textPrimary}`}>
                  Forgot password
                </h2>
                <p className={`mb-6 leading-relaxed transition-colors font-normal duration-300 ${themeClasses.textSecondary}`}>
                  Enter the email address connected to your account and we will send you a link to reset your password
                </p>
              </>
            )}

            {errors.general && (
              <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <ErrorMessage message={errors.general} />
              </div>
            )}

            {!isSuccess && (
              <div className="space-y-6">
                <div>
                  <label className={`block text-xs font-semibold mb-1 transition-colors duration-300 ${themeClasses.textPrimary}`} htmlFor="email">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#054643] focus:border-transparent transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                        : `${themeClasses.border} ${themeClasses.inputBg}`
                    } ${themeClasses.inputText}`}
                    id="email"
                    name="email"
                    placeholder="JohnDoe@gmail.com"
                    type="email"
                    autoComplete="email"
                  />
                  <ErrorMessage message={errors.email} />
                </div>

                <button
                  onClick={handleSubmit}
                  className={`w-full text-white rounded-full py-3 mb-4 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${themeClasses.buttonPrimary}`}
                  type="button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Submit'
                  )}
                </button>


                <button
                  onClick={handleCancel}
                  className={`w-full rounded-full py-3 font-semibold transition-all duration-300 hover:scale-105 ${themeClasses.buttonSecondary}`}
                  type="button"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            )}

            {isSuccess && (
              <div className="space-y-4">
                <button
                  onClick={() => setIsSuccess(false)}
                  className={`w-full rounded-full py-3 font-semibold transition-all duration-300 hover:scale-105 ${themeClasses.buttonSecondary}`}
                  type="button"
                >
                  Send Another Reset Link
                </button>
                <button
                  onClick={handleCancel}
                  className={`w-full text-white rounded-full py-3 transition-all duration-300 hover:scale-105 ${themeClasses.buttonPrimary}`}
                  type="button"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
           {/* Mobile footer */}
            <footer className={`flex-1 px-8 md:px-16 py-10 flex justify-between md:hidden sm:hidden text-xs font-normal mt-10 transition-colors duration-300 ${themeClasses.footer}`}>
                <div>
                    Copyright (c) 2025
                </div>
                <div className="flex space-x-6 font-semibold text-xs">
                    <a href="#" className="hover:underline transition-all duration-200">
                    Terms of use
                    </a>
                    <a href="#" className="hover:underline transition-all duration-200">
                    Privacy Policy
                    </a>
                </div>
            </footer>
      </div>
    </div>
  );
};

export default ForgotPassword;