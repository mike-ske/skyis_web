// ==========================================
// 3. PUBLIC ROUTE COMPONENT (pages/PublicRoute.js)
// ==========================================

import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';

const PublicRoute = ({ children, redirectTo = '/shopperdashboard' }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // If authenticated, redirect to dashboard or specified route
  // If user is authenticated, redirect them away from public routes
  if (isAuthenticated) {
    // Get the intended destination from location state or default to dashboard
    const from = location.state?.from?.pathname || '/shopperdashboard/overview';
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;