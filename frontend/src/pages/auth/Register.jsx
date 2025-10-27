import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Check, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from './components/Button';
import Input from './components/Input';
import ImageCarousel from './components/ImageCarousel';
import { validateEmail, validatePassword, validateName } from './utils/validation';
import { googleAuthService } from './services/googleAuthService';

const SkyisSignup = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();

  // Initialize Google Auth on component mount
  useEffect(() => {
    const initGoogleAuth = async () => {
      try {
        await googleAuthService.initialize();
        setGoogleReady(true);
        
        // Render button after a short delay
        setTimeout(() => {
          const rendered = googleAuthService.renderButton('googleSignupButton');
          if (!rendered) {
            console.warn('Failed to render Google button - check Client ID configuration');
          }
        }, 100);
      } catch (error) {
        console.error('Google Auth initialization failed:', error);
        setGoogleReady(false);
      }
    };
  
    initGoogleAuth();
  }, []);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    newErrors.firstName = validateName(formData.firstName || '', 'First name');
    newErrors.lastName = validateName(formData.lastName || '', 'Last name');
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password, true);
    
    if (formData.password && formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    
    setLoading(true);
    setErrors(prev => ({ ...prev, general: '' }));

    try {
      const registrationData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        firstName: formData.firstName,
        lastName: formData.lastName
      };

        // Navigate to check email page
      navigate('/check-email', {
        state: {
          email: formData.email,
          message: 'Please check your email to verify your account.'
        }
      });

      console.log('Sending registration data:', { 
        ...registrationData, 
        password: '[HIDDEN]', 
        password_confirmation: '[HIDDEN]' 
      });

      const response = await register(registrationData);
     
      console.log('Registration successful:', response);
      setSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.message.includes('Validation failed') || error.response?.status === 422) {
        let errorMessage = 'Please check your input and try again.';
        
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          const firstError = Object.values(errors)[0];
          errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
        }
        
        setErrors({ general: errorMessage });
      } else if (error.message.includes('already registered') || error.response?.status === 409) {
        setErrors({ general: 'An account with this email already exists. Please login instead.' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setErrors({ general: error.message || 'Registration failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const isLengthValid = formData.password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

  if (success) {
    return (
      <div className="h-screen flex items-center justify-center bg-white overflow-hidden">
        <div className="text-center space-y-6 max-w-md px-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Account Created!</h2>
          <p className="text-gray-600">
            Welcome to Skyis! We've sent a verification email to{' '}
            <strong>{formData.email}</strong>. Please check your inbox and click the verification link to activate your account.
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/verify-email', { state: { email: formData.email } })} 
              className="w-full"
            >
              Go to Email Verification
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')} 
              className="w-full"
            >
              Back to Login
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or try again in a few minutes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="hidden lg:flex relative">
        <ImageCarousel />
      </div>

      <div className="w-full lg:w-[150%] flex items-center justify-center p-3 sm:p-4 bg-white overflow-y-auto">
        <div className="w-full max-w-md space-y-2 sm:space-y-3 md:space-y-4 py-2 my-auto">
          <div className="flex justify-end mb-2">
            <Link 
              className="text-[#0B3B38] text-sm font-normal hover:underline" 
              to="/login"
            >
              Login
            </Link>
          </div>
          
          <div className="hidden sm:flex justify-center items-center w-full rounded-3xl overflow-hidden mb-2">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg"
                alt="Skyis Logo"
                className="w-full max-w-[200px] h-auto object-cover rounded-3xl cursor-pointer hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>
          
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Get Started with Skyis</h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              Create your account to join fashion's most creative ecosystem.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div id="googleSignupButton" className="flex justify-center">
              {/* Google button will be rendered here */}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
              {/* First Name and Last Name Row */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <Input
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  icon={User}
                  error={errors.firstName}
                  label="First Name"
                  required
                />
                <Input
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange('lastName')}
                  icon={User}
                  error={errors.lastName}
                  label="Last Name"
                  required
                />
              </div>

              {/* Email */}
              <Input
                type="email"
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={handleChange('email')}
                icon={Mail}
                error={errors.email}
                label="Email Address"
                required
              />

              {/* Password */}
              <Input
                type="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange('password')}
                icon={Lock}
                error={errors.password}
                label="Password"
                required
              />

              {/* Confirm Password */}
              <Input
                type="password"
                placeholder="••••••••••••"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                icon={Lock}
                error={errors.confirmPassword}
                label="Confirm Password"
                required
              />

              {/* Password Requirements */}
              <div className="flex flex-col gap-1.5 text-xs text-gray-500 py-1">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    isLengthValid ? 'bg-green-200 text-green-600' : 'bg-gray-200 text-gray-400'
                  }`}>
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span className={isLengthValid ? 'text-green-600' : 'text-gray-500'}>
                    Must be at least 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    hasSpecialChar ? 'bg-green-200 text-green-600' : 'bg-gray-200 text-gray-400'
                  }`}>
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span className={hasSpecialChar ? 'text-green-600' : 'text-gray-500'}>
                    Must contain one special character
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {errors.general && (
                <div className="text-xs sm:text-sm text-red-600 bg-red-50 p-2 rounded-lg">
                  {errors.general}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                loading={loading}
                className="w-full mt-2 sm:mt-3"
                disabled={
                  !formData.firstName || 
                  !formData.lastName || 
                  !formData.email || 
                  !formData.password || 
                  !formData.confirmPassword ||
                  !isLengthValid || 
                  !hasSpecialChar || 
                  loading
                }
              >
                {loading ? 'Creating account...' : 'Sign up'}
              </Button>
            </form>

            <div className="text-center text-xs sm:text-sm text-gray-600 pb-2">
              By continuing, you agree to our{' '}
              <button className="text-emerald-600 hover:text-emerald-700">
                Terms of use
              </button>{' '}
              and{' '}
              <button className="text-emerald-600 hover:text-emerald-700">
                Privacy Policy
              </button>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkyisSignup;