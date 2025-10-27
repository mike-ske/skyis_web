

// ==================== FILE 2: ShopperDashboardHeader.jsx ====================
// REPLACE YOUR ENTIRE ShopperDashboardHeader.jsx WITH THIS:

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  SearchNormal,
  Notification,
  HamburgerMenu,
  Profile,
  LogoutCurve,
  Setting2
} from 'iconsax-reactjs';

const DashboardHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { user, logout } = useAuth();

  const userData = user || {
    name: 'Tena',
    email: 'user@example.com',
    avatar: null,
  };

  const handleLogout = async () => {
    if (loggingOut) return;
    
    setLoggingOut(true);
    setShowProfileMenu(false);

    try {
      await logout();
      localStorage.clear();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <HamburgerMenu size={20} variant="Bulk" className="text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-2 lg:hidden">
            <img 
              alt="Skyis Logo" 
              className="h-8 w-auto" 
              src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg" 
            />
          </div>
        </div>
        
        {/* Center - Search */}
        <div className="hidden md:block flex-1 max-w-lg mx-8">
          <div className="relative">
            <SearchNormal 
              variant="Linear"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
              size={20} 
            />
            <input
              type="text"
              placeholder="Search products, orders, or anything..."
              className="w-full pl-10 text-gray-800 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        
        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <SearchNormal variant="Bulk" size={20} className="text-gray-600" />
          </button>
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 relative"
            >
              <Notification variant="Bulk" size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-4 text-sm text-gray-500 text-center">
                    No new notifications
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
            >
              <span className="text-white text-sm font-medium">
                {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
              </span>
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                  <p className="text-xs text-gray-500">{userData.email}</p>
                </div>
                
                <div className="py-1">
                  <button
                    onClick={() => {
                      navigate('/shopperdashboard/settings');
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Profile variant="Bulk" size={16} />
                    <span>Profile</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      navigate('/shopperdashboard/settings');
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Setting2 variant="Bulk" size={16} />
                    <span>Settings</span>
                  </button>
                  
                  <hr className="my-1" />
                  
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <LogoutCurve variant="Bulk" size={16} />
                    <span>{loggingOut ? 'Logging out...' : 'Sign out'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {(showProfileMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => {
            setShowProfileMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
};

export default DashboardHeader;

// ==================== END OF FILE ====================