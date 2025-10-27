

// contexts/AuthContext.jsx - FINAL WORKING VERSION
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../pages/auth/services/authService';
import { googleAuthService } from '../pages/auth/services/googleAuthService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeAuth();
    
    // Set up Google Auth callback
    if (typeof googleAuthService?.setAuthCallback === 'function') {
      googleAuthService.setAuthCallback(handleGoogleAuthSuccess);
    }
  }, []);

  const initializeAuth = async () => {
    try {
      console.log('🔐 Initializing authentication...');
      
      const token = localStorage.getItem('auth_token');
      const storedUserData = localStorage.getItem('user_data');
      
      console.log('📦 Token exists:', !!token);
      console.log('📦 User data exists:', !!storedUserData);
      
      if (token && storedUserData) {
        try {
          const storedUser = JSON.parse(storedUserData);
          console.log('✅ Found stored user:', storedUser.email);
          
          // Set user and auth state IMMEDIATELY - no server validation
          setUser(storedUser);
          setIsAuthenticated(true);
          
          console.log('✅ User authenticated from localStorage');
          
        } catch (parseError) {
          console.error('❌ Error parsing user data:', parseError);
          clearAuth();
        }
      } else {
        console.log('🔍 No auth data found in localStorage');
        clearAuth();
      }
    } catch (error) {
      console.error('💥 Auth initialization error:', error);
      clearAuth();
    } finally {
      setLoading(false);
      setIsInitialized(true);
      console.log('🏁 Auth initialization complete - isAuthenticated:', isAuthenticated);
    }
  };

  const clearAuth = () => {
    console.log('🧹 Clearing auth data');
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isLoggedIn');
  };

  const handleGoogleAuthSuccess = async (authData) => {
    try {
      console.log('🔐 Processing Google auth success');
      
      if (authData.token && authData.user) {
        // Store in localStorage
        localStorage.setItem('auth_token', authData.token);
        localStorage.setItem('user_data', JSON.stringify(authData.user));
        localStorage.setItem('userEmail', authData.user.email);
        localStorage.setItem('userName', authData.user.name || '');
        localStorage.setItem('isLoggedIn', 'true');
        
        // Update state
        setUser(authData.user);
        setIsAuthenticated(true);
        setIsInitialized(true);
        setLoading(false);
        
        console.log('✅ Google auth state updated successfully');
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Error processing Google auth:', error);
      return false;
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      console.log('🔐 Attempting login...');
      
      const data = await authService.login(credentials);
      
      if (data.token && data.user) {
        console.log('✅ Login API successful:', data.user.email);
        
        // Store in localStorage FIRST
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_data', JSON.stringify(data.user));
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userName', data.user.name || '');
        localStorage.setItem('isLoggedIn', 'true');
        
        console.log('✅ Auth data saved to localStorage');
        
        // THEN update state
        setUser(data.user);
        setIsAuthenticated(true);
        setIsInitialized(true);
        
        console.log('✅ Auth state updated - isAuthenticated:', true);
      }
      
      return data;
    } catch (error) {
      console.error('❌ Login failed:', error);
      clearAuth();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      console.log('📝 Attempting registration...');
      
      const response = await authService.register(userData);
      
      if (response.user && response.token) {
        console.log('✅ Registration successful:', response.user.email);
        
        // Store in localStorage
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_data', JSON.stringify(response.user));
        localStorage.setItem('userEmail', response.user.email);
        localStorage.setItem('userName', response.user.name || '');
      // Don't set as authenticated until email is verified
      setUser(response.user);
      setIsAuthenticated(false);
      setIsInitialized(true);
        
        setUser(response.user);
        
        // Only set authenticated if email is verified
        if (response.user.email_verified_at) {
          setIsAuthenticated(true);
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          setIsAuthenticated(false);
        }
        
        setIsInitialized(true);
      }
      
      return response;
    } catch (error) {
      console.error('❌ Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      console.log('🚪 Logging out...');
      
      // Call backend logout if available
      if (typeof authService.logout === 'function') {
        try {
          await authService.logout();
        } catch (error) {
          console.warn('⚠️ Backend logout failed:', error);
        }
      }
      
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout error:', error);
    } finally {
      clearAuth();
      setLoading(false);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user_data', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    isInitialized,
    login,
    register,
    updateUser,
    logout,
    checkAuthStatus: initializeAuth,
    handleGoogleAuthSuccess,
  };

  console.log('🔄 AuthContext render - isAuthenticated:', isAuthenticated, 'loading:', loading);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};