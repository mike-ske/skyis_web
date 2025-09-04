import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SkyisSignup() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
    // Handle Google signup here
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Password validation helpers
  const isLengthValid = formData.password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-between max-w-7xl mx-auto px-6 py-12 gap-12 md:gap-24">
        {/* Left Image Section */}
        <div className="hidden flex-1 sm:flex flex-shrink-0 w-full md:max-w-lg lg:max-w-2xl rounded-3xl overflow-hidden relative">
            <img
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756222176/Frame_1686553286_qxegrh.png"
                alt="Person holding a green umbrella with a black bag hanging on their shoulder, standing near a black metal fence"
                className="w-full h-auto object-cover rounded-3xl"
            />
        </div>

        {/* Right Form Section */}
        <div className="w-full max-w-md">
          <div className="flex justify-end mb-6">
             <Link 
                className="text-[#0B3B38] text-sm font-normal hover:underline" 
                to="/login"
              >
                Login
              </Link>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="hidden flex-1 sm:flex justify-center items-center flex-shrink-0 w-full md:max-w-lg lg:max-w-2xl rounded-3xl overflow-hidden relative">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg"
                  alt="Skyis Logo"
                  className="w-full h-auto object-cover rounded-3xl cursor-pointer hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
              Get Started with Skyis
            </h1>
            <p className="text-center text-gray-500 text-sm max-w-xs">
              Select how you would like to experience skyis so we can create the tailored experience you need.
            </p>
          </div>

          {/* Google Signup Button */}
          <button 
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 mb-6 hover:bg-gray-50 transition-colors" 
            type="button"
            onClick={handleGoogleSignup}
          >
            <img 
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753199382/Google-Symbol_1_vjy1jo.svg"
                alt="Google logo icon"
                className="w-4 h-4"
              />
            <span className="font-semibold text-gray-900 text-sm">
              Sign up with Google
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <hr className="flex-grow border-t border-gray-200"/>
            <span className="mx-3 text-xs text-gray-400">
              OR
            </span>
            <hr className="flex-grow border-t border-gray-200"/>
          </div>

          {/* Signup Form */}
          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-normal text-gray-700 mb-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  className="w-full border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-900 focus:border-green-900" 
                  id="email"
                  name="email"
                  placeholder="johndoe@example.com" 
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-normal text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input 
                  className="w-full border border-gray-200 rounded-lg py-3 pl-10 pr-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-900 focus:border-green-900" 
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                />
                <button 
                  aria-label="Toggle password visibility" 
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600" 
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="flex flex-col gap-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  isLengthValid ? 'bg-green-200 text-green-600' : 'bg-gray-200 text-gray-400'
                }`}>
                  <Check className="w-3 h-3" />
                </div>
                <span className={isLengthValid ? 'text-green-600' : 'text-gray-500'}>
                  Must be at least 8 characters
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  hasSpecialChar ? 'bg-green-200 text-green-600' : 'bg-gray-200 text-gray-400'
                }`}>
                  <Check className="w-3 h-3" />
                </div>
                <span className={hasSpecialChar ? 'text-green-600' : 'text-gray-500'}>
                  Must contain one special character
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              className="mt-6 w-full bg-green-900 text-white rounded-full py-3 text-sm font-normal hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
              type="submit"
              onClick={handleSubmit}
              disabled={!formData.email || !formData.password || !isLengthValid || !hasSpecialChar}
            >
              Continue
            </button>
          </div>

          {/* Terms and Privacy */}
          <p className="mt-6 text-xs text-gray-600 max-w-xs">
            By continuing, you agree to our{' '}
            <a className="underline text-gray-700 hover:text-gray-900" href="#">
              Terms
            </a>
            {' '}and{' '}
            <a className="underline text-gray-700 hover:text-gray-900" href="#">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}