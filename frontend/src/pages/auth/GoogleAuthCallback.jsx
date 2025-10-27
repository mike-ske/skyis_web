// Google Auth Callback Component
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from './services/authService';
import { useAuth } from '../../contexts/AuthContext'

const GoogleAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const userData = urlParams.get('user');
    const error = urlParams.get('message');

    if (error) {
      navigate('/login?error=' + encodeURIComponent(error));
      return;
    }

    if (token && userData) {
      const success = authService.handleGoogleCallback(token, userData);
      if (success) {
        checkAuthStatus();
        navigate('/');
      } else {
        navigate('/login?error=Authentication failed');
      }
    } else {
      navigate('/login?error=Invalid callback');
    }
  }, [location, navigate, checkAuthStatus]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing Google authentication...</p>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;