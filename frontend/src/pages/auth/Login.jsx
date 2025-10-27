
import React, { useState, useEffect } from "react";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Button from './components/Button';
import ImageCarousel from './components/ImageCarousel';
import { validateEmail, validatePassword } from './utils/validation';
import Input from './components/Input';
import { googleAuthService } from './services/googleAuthService';
import { useAuth } from '../../contexts/AuthContext';

const setupCSRF = async () => {
  try {
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
    const csrfUrl = `${apiUrl}/sanctum/csrf-cookie`;
    
    await fetch(csrfUrl, {
      method: 'GET',
      credentials: 'include',
    });
    
    console.log('✅ CSRF token setup complete');
  } catch (error) {
    console.warn('⚠️ CSRF setup failed:', error);
  }
};

const SkyisLogin = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [googleReady, setGoogleReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading: authLoading } = useAuth();

  useEffect(() => {
    setupCSRF();
  }, []);

  useEffect(() => {
    const initGoogleAuth = async () => {
      try {
        await googleAuthService.initialize();
        setGoogleReady(true);
        
        setTimeout(() => {
          const rendered = googleAuthService.renderButton('googleButton');
          if (!rendered) {
            console.warn('Failed to render Google button');
          }
        }, 100);
      } catch (error) {
        console.error('Google Auth initialization failed:', error);
        setGoogleReady(false);
        setErrors(prev => ({ 
          ...prev, 
          google: 'Google Sign-In is currently unavailable. Please use email login.' 
        }));
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
    
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (isSubmitting) return; // Prevent double submission

    setIsSubmitting(true);
    setErrors(prev => ({ ...prev, general: '' }));

    try {
      const loginData = {
        email: formData.email.toLowerCase().trim(),
        password: formData.password
      };

      console.log('🔐 Submitting login...');

      // Call login from AuthContext - this updates state
      await login(loginData);
      
      console.log('✅ Login successful, state updated');
      
      // Small delay to ensure state propagates
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Navigate using React Router
      const from = location.state?.from?.pathname || '/';
      
      console.log('🚀 Navigating to:', from);
      navigate(from, { replace: true });
      
    } catch (error) {
      console.error('❌ Login error:', error);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      setErrors({ general: errorMessage });
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting || authLoading;

  return (
    <div className="h-screen flex overflow-hidden">
      <div className="hidden w-auto lg:flex relative">
        <ImageCarousel />
      </div>

      <motion.div 
        className="w-full lg:w-[150%] flex items-center justify-center p-4 sm:p-6 bg-white overflow-y-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md space-y-4 sm:space-y-6 md:space-y-8 py-4">
          <div className="flex justify-end mb-4 sm:mb-6">
            <Link 
              className="text-[#0B3B38] text-sm font-normal hover:underline" 
              to="/register"
            >
              Sign Up
            </Link>
          </div>
          
          <div className="hidden sm:flex justify-center items-center w-full rounded-3xl overflow-hidden mb-4 sm:mb-6">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg"
                alt="Skyis Logo"
                className="w-full max-w-xs h-auto object-cover rounded-3xl cursor-pointer hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Log in and reconnect with fashion's most creative ecosystem.</p>
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div id="googleButton" className="flex justify-center">
                {/* Google button will be rendered here */}
              </div>
              {errors.google && (
                <p className="mt-2 text-sm text-amber-600 text-center">{errors.google}</p>
              )}
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </motion.div>

            <motion.form 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onSubmit={handleSubmit}
            >
              <Input
                type="email"
                label="Email Address"
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={handleChange('email')}
                icon={Mail}
                error={errors.email}
                required
                disabled={isLoading}
              />
              
              <Input
                type="password"
                label="Password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange('password')}
                icon={Lock}
                error={errors.password}
                required
                disabled={isLoading}
              />

              <AnimatePresence>
                {errors.general && (
                  <motion.div 
                    className="flex items-center gap-1 text-sm text-red-600 bg-red-50 p-3 rounded-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <span>⚠️</span>
                    {errors.general}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Button
                  type="submit"
                  loading={isLoading}
                  className="mt-4 sm:mt-6 w-full"
                  disabled={!formData.email || !formData.password || isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Login'}
                </Button>
              </motion.div>
            </motion.form>
            
            <motion.div 
              className="flex text-center hover:underline justify-end pb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link to="forgot-password" className="text-sm text-emerald-900 hover:text-emerald-700 ">
                Forgot password
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkyisLogin;