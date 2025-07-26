import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleGoogleAuth = () => {
    // Handle Google authentication logic
    console.log('Google authentication clicked');
  };

  const handleEmailAuth = () => {
    // Handle email authentication logic
    console.log('Email authentication clicked');
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Define theme-based classes
  const themeClasses = {
    body: isDark ? 'text-white' : 'bg-gray-50 text-black',
    logo: isDark ? 'text-[#054643]' : 'text-teal-900',
    footer: isDark ? 'text-[#CCFF36]' : 'text-teal-900',
    form: isDark ? 'bg-[#0B0B0B] border-[#054643] border-[1px]' : 'bg-white border-gray-300',
    modeToggle: isDark 
      ? 'bg-[#054643] text-white hover:bg-[#043330]' 
      : 'bg-gray-100 text-teal-900 hover:bg-gray-200',
    description: isDark ? 'text-gray-300' : 'text-gray-500',
    googleBtn: isDark 
      ? 'border-[#054643] bg-[#0B0B0B] hover:bg-[#1a1a1a] text-gray-200 border-1' 
      : 'border-gray-300 bg-white hover:bg-gray-50 text-black',
    primaryBtn: isDark 
      ? 'bg-[#054643] hover:bg-[#043330]' 
      : 'bg-teal-900 hover:bg-teal-800',
    termsText: isDark ? 'text-gray-300' : 'text-black',
    termsLink: isDark ? 'text-[#CCFF36] hover:text-[#043330]' : 'text-teal-900'
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#0B0B0B]' : 'bg-gray-50'} ${themeClasses.body}`} style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Theme Toggle */}
      

      <div className="flex flex-1 flex-col md:flex-row max-w-7xl w-full mx-auto">
        {/* Left side */}
        <div className="flex flex-col justify-between flex-1 px-8 md:px-16 py-10">
          <div>
            <div className="flex items-center justify-between mb-8">
              <img
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg"
                alt="Skyis logo"
                className={`w-auto transition-all duration-300 ${isDark ? 'brightness-0 invert' : ''}`}
              />
              
              {/* Theme Toggle aligned with logo */}
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-full transition-all absolute right-16 duration-300 ${
                  isDark 
                    ? 'bg-[#054643] hover:bg-[#043330] text-yellow-400' 
                    : 'bg-white hover:bg-gray-100 text-gray-700 shadow-md'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            <h1 className="text-3xl md:text-4xl font-normal max-w-md leading-tight mb-8 transition-colors duration-300">
              From concept to closet — fashion, fully connected.
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

        {/* Right side */}
        <div className="flex-1 flex items-center justify-center px-8 md:px-16 py-10">
          <div className={`border-[1px] border-black w-full max-w-md rounded-lg p-10 relative transition-all duration-300 ${themeClasses.form}`}>
            <button 
              onClick={toggleMode}
              className={`absolute top-8 right-8 text-xs font-semibold rounded-full px-5 py-2 transition-all duration-200 transform hover:scale-105 ${themeClasses.modeToggle}`}
            >
              {isLoginMode ? 'New user? Sign up' : 'Already a user? Log in'}
            </button>
            
            <h2 className="text-2xl font-bold mb-2 transition-colors duration-300 mt-14">
              {isLoginMode ? 'Log In' : 'Get Started'}
            </h2>
            <p className={`text-sm mb-8 transition-colors duration-300 ${themeClasses.description}`}>
              {isLoginMode 
                ? 'Welcome back! Please log in to your account.' 
                : 'Welcome to skyis! Let\'s get started by creating your account.'}
            </p>
            
            <button 
              onClick={handleGoogleAuth}
              className={`border-[1px] border-black w-full rounded-full py-3 mb-4 flex items-center justify-center space-x-2 text-sm transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${themeClasses.googleBtn}`}
            >
              <img 
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753199382/Google-Symbol_1_vjy1jo.svg"
                alt="Google logo icon"
                className="w-4 h-4"
              />
              <span>
                {isLoginMode ? 'Sign in with Google' : 'Continue with Google'}
              </span>
            </button>
            
            <div className="text-center text-xs font-semibold mb-4 transition-colors duration-300">
              OR
            </div>
            
            <button 
              onClick={handleEmailAuth}
              className={`w-full text-white rounded-full py-3 flex items-center justify-center space-x-2 text-sm transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${themeClasses.primaryBtn}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>
                {isLoginMode ? 'Sign in with email' : 'Continue with email'}
              </span>
            </button>
            
            <p className={`text-xs font-bold mt-6 text-center max-w-xs mx-auto leading-tight transition-colors duration-300 ${themeClasses.termsText}`}>
              By {isLoginMode ? 'signing in' : 'continuing'} with Google or Email, you agree to{' '}
              <a href="#" className={`hover:underline transition-all duration-200 ${themeClasses.termsLink}`}>
                Skyis Terms of Service
              </a>
              {' '}and{' '}
              <a href="#" className={`hover:underline transition-all duration-200 ${themeClasses.termsLink}`}>
                Privacy Policy
              </a>
            </p>
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

export default Login;