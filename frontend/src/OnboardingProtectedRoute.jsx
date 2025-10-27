import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const OnboardingProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-900"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: '/onboarding' }} replace />;
  }

  // If already completed onboarding, redirect to dashboard
  if (user.onboardingCompleted) {
    return <Navigate to="/dashboard" replace />;
  }

  // If authenticated but not onboarded, allow access to onboarding routes
  return <Outlet />;
};

export default OnboardingProtectedRoute;