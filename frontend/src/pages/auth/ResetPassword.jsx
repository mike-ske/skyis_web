import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Key, ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SkyisSetPassword() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);
    console.log('Setting new password...');
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('Password reset successful');
      // Handle success - redirect to login or show success message
    }, 1500);
  };

  const handleBackToLogin = () => {
    console.log('Navigate back to login');
    // Handle navigation back to login page
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Password validation
  const isLengthValid = formData.password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';
  const isFormValid = isLengthValid && hasSpecialChar && passwordsMatch;

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-6 font-sans">
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
        <section className="md:flex-1 flex flex-col items-center justify-center px-6 md:px-0 mt-10 md:mt-0">
          <div className="flex flex-col items-center space-y-4 max-w-md w-full">
            {/* Key Icon */}
            <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
              <Key className="text-gray-600 w-6 h-6" />
            </div>

            {/* Header */}
            <h1 className="text-[28px] font-semibold text-gray-900">
              Set new password
            </h1>
            <p className="text-center text-gray-600 text-sm max-w-xs">
              Your new password must be different to previously used passwords.
            </p>

            {/* Form */}
            <div className="w-full space-y-6 mt-4">
              {/* Password Field */}
              <div>
                <label className="block text-xs text-gray-700 mb-1" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input 
                    className="w-full rounded-xl border border-gray-200 pl-10 pr-12 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600" 
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your new password"
                  />
                  <span 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer hover:text-gray-600"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </span>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-xs text-gray-700 mb-1" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input 
                    className={`w-full rounded-xl border pl-10 pr-12 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 ${
                      formData.confirmPassword && !passwordsMatch ? 'border-red-300' : 'border-gray-200'
                    }`}
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your new password"
                  />
                  <span 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer hover:text-gray-600"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </span>
                </div>
                {formData.confirmPassword && !passwordsMatch && (
                  <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                )}
              </div>

              {/* Password Requirements */}
              <ul className="text-xs text-gray-600 space-y-1 mb-6">
                <li className="flex items-center space-x-2">
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
                    isLengthValid ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    <Check className="w-3 h-3" />
                  </span>
                  <span className={isLengthValid ? 'text-green-600' : 'text-gray-600'}>
                    Must be at least 8 characters
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
                    hasSpecialChar ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    <Check className="w-3 h-3" />
                  </span>
                  <span className={hasSpecialChar ? 'text-green-600' : 'text-gray-600'}>
                    Must contain one special character
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
                    passwordsMatch ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    <Check className="w-3 h-3" />
                  </span>
                  <span className={passwordsMatch ? 'text-green-600' : 'text-gray-600'}>
                    Passwords must match
                  </span>
                </li>
              </ul>

              {/* Submit Button */}
              <button 
                className="w-full py-3 rounded-full bg-teal-900 text-white text-sm font-normal hover:bg-teal-800 transition-colors border-4 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-700" 
                type="submit"
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? 'Resetting password...' : 'Reset password'}
              </button>
            </div>

            {/* Back to Login Link */}
            <button 
              className="mt-6 text-xs text-gray-600 flex items-center space-x-1 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded px-2 py-1 transition-colors"
              onClick={handleBackToLogin}
            >
              <ArrowLeft className="w-3 h-3" />
               <Link 
                  className="hover:underline focus:outline-none focus:underline"
                  onClick={handleBackToLogin}
                  to="/login"
                >
                  Back to login
                </Link>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}