// ProtectedRoute.jsx - FIXED VERSION
import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ requireVerified = false, requireOnboarding = false }) => {
  const { isAuthenticated, user, loading, isInitialized } = useAuth();
  const location = useLocation();

  console.log('🛡️ ProtectedRoute check:', {
    loading,
    isInitialized,
    isAuthenticated,
    user: user?.email,
    currentPath: location.pathname
  });

  // Show loading spinner only during initial auth check
  // If we're initialized but still loading, something is wrong
  if (loading && isInitialized) {
    console.warn('⚠️ ProtectedRoute: Stuck in loading state after initialization');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Authentication check taking longer than expected...</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    console.log('❌ ProtectedRoute: Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated but email not verified (if required)
  // if (requireVerified && user && !user.email_verified_at) {
  //   console.log('📧 ProtectedRoute: Email not verified, redirecting');
  //   return <Navigate to="/check-email" state={{ email: user.email }} replace />;
  // }

  console.log('✅ ProtectedRoute: Access granted, rendering Outlet');
  
  // THIS IS THE KEY FIX - Render Outlet instead of children
  return <Outlet />;
};

export default ProtectedRoute;