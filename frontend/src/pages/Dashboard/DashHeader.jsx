import React, { useState, useRef, useEffect } from 'react';
import { Search, Menu, Bell, User, Settings, LogOut, Shield, HelpCircle, ChevronDown } from 'lucide-react';

const FunctionalHeaderMenu = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New message received",
      description: "You have a new message from John Doe",
      time: "2 min ago",
      isNew: true,
      type: "message"
    },
    {
      id: 2,
      title: "System update completed",
      description: "Your system has been successfully updated to version 2.1.0",
      time: "1 hour ago",
      isNew: true,
      type: "system"
    },
    {
      id: 3,
      title: "Payment successful",
      description: "Your monthly subscription payment has been processed",
      time: "3 hours ago",
      isNew: false,
      type: "payment"
    },
    {
      id: 4,
      title: "Profile updated",
      description: "Your profile information has been updated successfully",
      time: "1 day ago",
      isNew: false,
      type: "profile"
    },
    {
      id: 5,
      title: "Security alert",
      description: "New login detected from a different device",
      time: "2 days ago",
      isNew: false,
      type: "security"
    }
  ]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNotificationClick = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isNew: false }
          : notif
      )
    );
    // Handle notification click action here
    console.log(`Clicked notification ${notificationId}`);
  };

  const handleProfileAction = (action) => {
    setProfileDropdownOpen(false);
    console.log(`Profile action: ${action}`);
    // Handle profile actions here
  };

  const newNotificationsCount = notifications.filter(notif => notif.isNew).length;

  return (
    <div className=" p-6">
      <style jsx>{`
        /* Hide all scrollbars */
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 flex-1 max-w-lg">
          <button 
            className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="relative flex-1 justify-center w-full items-center">
            <Search className="absolute left-3 top-[1.6rem] transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              className="w-full bg-white rounded-lg py-2 pl-10 pr-4 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00403F] border border-gray-200 transition-all"
              placeholder="Search" 
              type="search"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notification Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button 
              className="text-gray-600 hover:text-gray-900 p-2 relative transition-colors"
              onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
            >
              <Bell className="w-5 h-5" />
              {newNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {newNotificationsCount}
                </span>
              )}
            </button>
            
            {notificationDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    <span className="text-xs text-gray-500">{notifications.length} total</span>
                  </div>
                </div>
                
                <div className="py-2">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-b-0 ${
                        notification.isNew ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          notification.isNew ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${
                            notification.isNew ? 'font-semibold text-gray-900' : 'font-normal text-gray-600'
                          }`}>
                            {notification.title}
                          </p>
                          <p className={`text-xs mt-1 ${
                            notification.isNew ? 'text-gray-700' : 'text-gray-500'
                          }`}>
                            {notification.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="px-4 py-3 border-t border-gray-100">
                  <button className="text-xs text-[#00403F] hover:text-[#00403F]/80 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-1 transition-colors"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <img 
                alt="User avatar" 
                className="w-8 h-8 rounded-full bg-gray-300" 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23ddd'/%3E%3Ctext x='16' y='20' text-anchor='middle' fill='%23999' font-size='12'%3ET%3C/text%3E%3C/svg%3E"
              />
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${
                profileDropdownOpen ? 'rotate-180' : ''
              }`} />
            </button>
            
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">john.doe@example.com</p>
                </div>
                
                <div className="py-1">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => handleProfileAction('profile')}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </button>
                  
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => handleProfileAction('settings')}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </button>
                  
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => handleProfileAction('security')}
                  >
                    <Shield className="w-4 h-4 mr-3" />
                    Security
                  </button>
                  
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => handleProfileAction('help')}
                  >
                    <HelpCircle className="w-4 h-4 mr-3" />
                    Help & Support
                  </button>
                </div>
                
                <div className="border-t border-gray-100 py-1">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    onClick={() => handleProfileAction('logout')}
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default FunctionalHeaderMenu;