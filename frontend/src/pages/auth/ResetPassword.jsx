"use client"
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
// import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import { Eye, EyeOff, Moon, Sun } from 'lucide-react';

const ResetPassword = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load theme preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Save theme preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const validatePassword = (password) => {
    if (!password) return 'New password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
    if (!/(?=.*[!@#$%^&*])/.test(password)) return 'Password must contain at least one special character (!@#$%^&*)';
    return '';
  };

  const validateConfirmPassword = (confirmPassword, newPassword) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== newPassword) return 'Passwords do not match';
    return '';
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'newPassword':
        return validatePassword(value);
      case 'confirmPassword':
        return validateConfirmPassword(value, formData.newPassword);
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }

    // Special case: if confirm password is touched and new password changes, revalidate confirm
    if (name === 'newPassword' && touched.confirmPassword) {
      const confirmError = validateConfirmPassword(formData.confirmPassword, value);
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmError
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    // If no errors, proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Password reset successfully! 🎉');
      console.log('Password reset:', formData);
      
      // Reset form
      setFormData({
        newPassword: '',
        confirmPassword: ''
      });
      setTouched({});
      setErrors({});
    }
    
    setIsSubmitting(false);
  };

  const handleGoogleSignUp = () => {
    console.log('Google Sign Up clicked');
    alert('Google Sign Up functionality would be implemented here');
  };

  const ErrorMessage = ({ message, show }) => (
    <div className={`transform transition-all duration-300 ease-in-out overflow-hidden ${
      show ? 'opacity-100 max-h-24 translate-y-0' : 'opacity-0 max-h-0 -translate-y-2'
    }`}>
      <p className="text-red-500 text-xs mt-2 flex items-start space-x-2">
        <span className="inline-block w-1 h-1 bg-red-500 rounded-full animate-pulse mt-1.5 flex-shrink-0"></span>
        <span className="leading-tight">{message}</span>
      </p>
    </div>
  );

  const PasswordStrengthIndicator = ({ password }) => {
    const requirements = [
      { test: /.{8,}/, label: '8+ characters' },
      { test: /[a-z]/, label: 'Lowercase letter' },
      { test: /[A-Z]/, label: 'Uppercase letter' },
      { test: /\d/, label: 'Number' },
      { test: /[!@#$%^&*]/, label: 'Special character' }
    ];

    const metRequirements = requirements.filter(req => req.test.test(password));
    const strength = metRequirements.length;

    if (!password || !touched.newPassword) return null;

    return (
      <div className="mt-2 space-y-2">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                level <= strength
                  ? strength <= 2
                    ? 'bg-red-500'
                    : strength <= 3
                    ? 'bg-yellow-500'
                    : strength <= 4
                    ? 'bg-blue-500'
                    : 'bg-green-500'
                  : darkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-1 text-xs">
          {requirements.map((req, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 transition-colors duration-200 ${
                req.test.test(password) ? 'text-green-600' : darkMode ? 'text-gray-400' : 'text-gray-400'
              }`}
            >
              <span className={`w-1 h-1 rounded-full ${
                req.test.test(password) ? 'bg-green-500' : darkMode ? 'bg-gray-500' : 'bg-gray-300'
              }`}></span>
              <span>{req.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const themeColors = {
    light: {
      bg: 'bg-[#F9F9F9]',
      text: 'text-black',
      logoText: 'text-[#0F3D3A]',
      brandColor: '#0F3D3A',
      cardBg: 'bg-white',
      border: 'border-gray-300',
      inputBg: 'bg-white',
      footerText: 'text-black'
    },
    dark: {
      bg: 'bg-[#0B0B0B]',
      text: 'text-white',
      logoText: 'text-[#054643]',
      brandColor: '#054643',
      cardBg: 'bg-gray-900',
      border: 'border-gray-600',
      inputBg: 'bg-gray-800',
      footerText: 'text-gray-300'
    }
  };

  const currentTheme = darkMode ? themeColors.dark : themeColors.light;

  return (
    <div className={`${currentTheme.bg} min-h-screen flex flex-col transition-colors duration-300`}>
        <div className="flex justify-between items-center px-6 md:px-20 py-6">
            <div className="flex items-center space-x-3">
                <img
                    src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg"
                    alt="Skyis logo"
                    className={`w-auto transition-all duration-300 ${currentTheme ? 'brightness-0 invert' : ''}`}
                />
            </div>
            {/* Theme Toggle aligned with logo */}
            <button
                onClick={toggleTheme}
                className={`p-3 rounded-full ${currentTheme.cardBg} ${currentTheme.border} border transition-all duration-300 hover:scale-110 shadow-lg`}
                aria-label="Toggle theme"
            >
                {darkMode ? (
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
                className={`hidden sm:flex md:flex w-full max-w-lg h-auto transition-all duration-300 ${currentTheme ? 'brightness-100' : ''}`}
                />
            </div>
            
            <footer className={`hidden sm:flex md:flex justify-between text-xs font-normal mt-10 transition-colors duration-300 ${currentTheme.footer}`}>
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
            <div className={`w-full max-w-md ${currentTheme.cardBg} ${currentTheme.border} border-[1px] rounded-lg p-8 shadow-lg transition-all duration-300`}>
                <h2 className={`${currentTheme.text} text-2xl font-extrabold mb-8 transition-colors duration-300`}>
                Reset password
                </h2>

                <div className="space-y-6">
                
                {/* New Password field */}
                <div>
                    <label htmlFor="new-password" className={`block text-xs font-semibold ${currentTheme.text} mb-1 transition-colors duration-300`}>
                    New password
                    </label>
                    <div className="relative">
                    <input
                        type={showNewPassword ? 'text' : 'password'}
                        id="new-password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Enter Password"
                        autoComplete="new-password"
                        className={`w-full border rounded-md px-4 py-3 pr-12 text-xs placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 ${currentTheme.inputBg} ${
                        errors.newPassword && touched.newPassword
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500 animate-shake text-red-500'
                            : `${currentTheme.border} focus:ring-[${currentTheme.brandColor}] focus:border-[${currentTheme.brandColor}] ${currentTheme.text}`
                        }`}
                        style={{
                        '--tw-ring-color': currentTheme.brandColor,
                        borderColor: errors.newPassword && touched.newPassword ? '#ef4444' : undefined
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className={`absolute inset-y-0 right-3 flex items-center transition-colors duration-200 ${
                        darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                        }`}
                        aria-label="Toggle password visibility"
                    >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    </div>
                    <ErrorMessage message={errors.newPassword} show={touched.newPassword && errors.newPassword} />
                    <PasswordStrengthIndicator password={formData.newPassword} />
                </div>

                {/* Confirm Password field */}
                <div>
                    <label htmlFor="confirm-password" className={`block text-xs font-semibold ${currentTheme.text} mb-1 transition-colors duration-300`}>
                    Confirm password
                    </label>
                    <div className="relative">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirm-password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Re-enter Password"
                        autoComplete="new-password"
                        className={`w-full border rounded-md px-4 py-3 pr-12 text-xs placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 ${currentTheme.inputBg} ${
                        errors.confirmPassword && touched.confirmPassword
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500 animate-shake text-red-500'
                            : formData.confirmPassword && formData.confirmPassword === formData.newPassword && !errors.newPassword
                            ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                            : `${currentTheme.border} focus:ring-[${currentTheme.brandColor}] focus:border-[${currentTheme.brandColor}]`
                        } ${currentTheme.text}`}
                        style={{
                        '--tw-ring-color': errors.confirmPassword && touched.confirmPassword 
                            ? '#ef4444' 
                            : formData.confirmPassword && formData.confirmPassword === formData.newPassword && !errors.newPassword
                            ? '#10b981'
                            : currentTheme.brandColor
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={`absolute inset-y-0 right-3 flex items-center transition-colors duration-200 ${
                        darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                        }`}
                        aria-label="Toggle password visibility"
                    >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    </div>
                    <ErrorMessage message={errors.confirmPassword} show={touched.confirmPassword && errors.confirmPassword} />
                    
                    {/* Success indicator for matching passwords */}
                    {formData.confirmPassword && 
                    formData.confirmPassword === formData.newPassword && 
                    !errors.newPassword && 
                    touched.confirmPassword && (
                    <div className="flex items-center space-x-2 mt-2 text-green-600 text-xs">
                        <span className="inline-block w-1 h-1 bg-green-500 rounded-full"></span>
                        <span>Passwords match!</span>
                    </div>
                    )}
                </div>

                {/* Submit button */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full text-white text-sm font-normal rounded-full py-3 transition-all duration-300 transform ${
                    isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : `bg-[${currentTheme.brandColor}] hover:scale-105 active:scale-95`
                    }`}
                    style={{
                    backgroundColor: isSubmitting ? '#9ca3af' : currentTheme.brandColor,
                    '&:hover': !isSubmitting ? {
                        backgroundColor: darkMode ? '#043a37' : '#0b2c2a'
                    } : {}
                    }}
                    onMouseEnter={(e) => {
                    if (!isSubmitting) {
                        e.target.style.backgroundColor = darkMode ? '#043a37' : '#0b2c2a';
                    }
                    }}
                    onMouseLeave={(e) => {
                    if (!isSubmitting) {
                        e.target.style.backgroundColor = currentTheme.brandColor;
                    }
                    }}
                >
                    {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Resetting...</span>
                    </div>
                    ) : (
                    'Submit'
                    )}
                </button>

                </div>
            </div>
            </div>
        </div>
      

      {/* Mobile footer */}
        <footer className={`flex-1 px-8 md:px-16 py-10 flex justify-between md:hidden sm:hidden text-xs font-normal mt-10 transition-colors duration-300 ${currentTheme.footer}`}>
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

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ResetPassword;