import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Moon, Sun, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(systemPrefersDark);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({ ...prev, [name]: fieldValue }));

    if (touched[name]) {
      const error = validateField(name, fieldValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, fieldValue);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Account created successfully! 🎉');
      console.log('Form submitted:', formData);
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return !value ? 'Email is required' :
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email' : '';
      case 'firstName':
      case 'lastName':
        return !value ? `${name === 'firstName' ? 'First' : 'Last'} name is required` :
          value.length < 2 ? 'Must be at least 2 characters' :
          !/^[a-zA-Z\s]+$/.test(value) ? 'Letters only' : '';
      case 'password':
        return !value ? 'Password is required' :
          value.length < 8 ? 'At least 8 characters' :
          !/(?=.*[a-z])/.test(value) ? 'Must include lowercase' :
          !/(?=.*[A-Z])/.test(value) ? 'Must include uppercase' :
          !/(?=.*\d)/.test(value) ? 'Must include a number' : '';
      case 'terms':
        return value ? '' : 'You must accept the terms';
      default:
        return '';
    }
  };

  const ErrorMessage = ({ message, show }) => (
    <div className={`transition-all ${show ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'}`}>
      <p className="text-red-500 text-xs mt-1">{message}</p>
    </div>
  );

  const theme = {
    bg: darkMode ? 'bg-[#0B0B0B]' : 'bg-gray-50',
    logo: darkMode ? 'text-[#054643] brightness-0 invert' : 'text-teal-900',
    text: darkMode ? 'text-white' : 'text-black',
    footer: darkMode ? 'text-[#CCFF36]' : 'text-teal-900',
    border: darkMode ? 'border-[#054643]' : 'border-gray-300',
    inputBg: darkMode ? 'bg-[#0B0B0B]' : 'bg-white',
    inputText: darkMode ? 'text-gray-100' : 'text-black',
    inputBorder: darkMode ? 'border-gray-600' : 'border-gray-300',
    btnBg: darkMode ? 'bg-[#054643] hover:bg-[#043330]' : 'bg-teal-900 hover:bg-teal-800',
    googleBorder: darkMode ? 'border-[#054643] bg-[#0B0B0B]' : 'border-gray-300 bg-white',
    googleText: darkMode ? 'text-white hover:text-[#fff]' : 'text-[#000] bg-white',
    iconColor: darkMode ? 'bg-[#054643] hover:bg-[#043330] text-yellow-400' : 'bg-white hover:bg-gray-100 text-gray-700 shadow-md',
    buttonColor: darkMode ? 'text-[#043330] hover:text-[#fff]' : 'text-black hover:text-[#fff]'
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme.bg} transition-colors duration-300`}>
      {/* Header */}
      <div className="flex justify-between items-center px-6 md:px-20 py-6">
        <div className="flex items-center space-x-3">
          <img
            src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg"
            alt="Skyis logo"
            className={`w-auto transition-all duration-300 ${theme.logo}`}
            />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full ${theme.iconColor} shadow-md transition-all duration-300`}
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto px-6 md:px-16 py-10">
        {/* Left */}
        <div className="flex-1 flex flex-col justify-center space-y-8">
          <h2 className={`text-3xl md:text-4xl font-normal max-w-lg leading-tight ${theme.text}`}>
            From concept to closet — fashion, fully connected.
          </h2>
          <img
            className="w-full max-w-md hidden md:flex"
            src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753196167/OBJECTS_wkarfr.svg"
            alt="Fashion illustration"
          />
          
          {/* Mobile footer */}
          <footer className={`hidden md:flex justify-between text-xs font-normal mt-10 transition-colors duration-300 ${theme.footer}`}>
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

        {/* Right - Signup Form */}
        <div className={`flex-1 mt-12 lg:mt-0 flex items-center justify-center`}>
          <form
            onSubmit={handleSubmit}
            className={`w-full max-w-md p-10 rounded-lg border ${theme.border} ${theme.bg} transition-all duration-300`}
          >
            <h3 className={`text-2xl font-bold mb-2 ${theme.text}`}>Get Started</h3>
            <p className={`text-sm mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              Welcome to skyis! Let’s get started by creating your account.
            </p>

            {/* Google Button */}
            <button
              type="button"
              className={`w-full flex items-center justify-center border rounded-full py-3 text-sm mb-4 ${theme.googleBorder} ${theme.googleText} transition-transform transform hover:scale-105`}
            >
              <img
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753199382/Google-Symbol_1_vjy1jo.svg"
                alt="Google icon"
                className="w-4 h-4 mr-2"
              />
              Continue with Google
            </button>

            {/* OR */}
            <div className={`text-xs font-semibold text-center mb-4 ${theme.text}`}>OR</div>

            {/* Inputs */}
            {/* First & Last Name in same row */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
            {['firstName', 'lastName'].map((field) => (
                <div key={field} className="w-full">
                <label
                    htmlFor={field}
                    className={`block text-xs font-semibold mb-1 ${theme.text}`}
                >
                    {field === 'firstName' ? 'First Name' : 'Last Name'}
                </label>
                <input
                    type="text"
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full rounded-md px-4 py-2 text-sm focus:outline-none transition-all duration-300 ${theme.inputBg} ${theme.inputText} ${theme.inputBorder} border`}
                />
                <ErrorMessage message={errors[field]} show={touched[field] && errors[field]} />
                </div>
            ))}
            </div>

            {/* Email and Password Fields */}
            {['email', 'password'].map((field) => (
            <div key={field} className="mb-4">
                <label
                htmlFor={field}
                className={`block text-xs font-semibold mb-1 ${theme.text}`}
                >
                {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                type={field === 'password' && !showPassword ? 'password' : 'text'}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder={field === 'email' ? 'john@example.com' : ''}
                className={`w-full rounded-md px-4 py-2 text-sm focus:outline-none transition-all duration-300 ${theme.inputBg} ${theme.inputText} ${theme.inputBorder} border`}
                />
                <ErrorMessage message={errors[field]} show={touched[field] && errors[field]} />
            </div>
            ))}


            {/* Terms */}
            <div className="flex items-start text-xs mt-4 mb-2">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="mr-2"
              />
              <label htmlFor="terms" className='text-gray-500'>
                By continuing, you agree to our{' '}
                <a href="#" className={`${theme.footer} text-gray-500`}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className={ `${theme.footer} text-gray-500`}>
                  Privacy Policy
                </a>.
              </label>
            </div>
            <ErrorMessage message={errors.terms} show={touched.terms && errors.terms} />

            {/* Action buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  className={`bg-[#F3F4F6] ${theme.buttonColor} text-black text-sm font-semibold rounded-full px-8 py-3 flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-[#134040] transition-all duration-300 transform hover:scale-105`}
                >
                  <ChevronLeft size={16} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-[#0F3D3E] text-white text-sm font-normal rounded-full px-10 py-3 hover:bg-[#0b2c2d] transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Create account
                </button>
              </div>
            
          </form>
        </div>
          {/* Mobile footer */}
            <footer className={`flex-1 px-8 md:px-16 py-10 flex justify-between md:hidden sm:hidden text-xs font-normal mt-10 transition-colors duration-300 ${theme.footer}`}>
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

export default Register;

