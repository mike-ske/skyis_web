import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Home, Package, ShoppingCart, Clock, Users, Bell, Settings } from 'lucide-react';

const DashboardSide = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  menuItems = null
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentActive, setCurrentActive] = useState('overview');

  // Update active state based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/dashboard/overview') {
      setCurrentActive('overview');
    } else if (path === '/dashboard/listing') {
      setCurrentActive('listings');
    } else if (path === '/dashboard/orders') {
      setCurrentActive('orders');
    } else if (path === '/dashboard/auctions') {
      setCurrentActive('auctions');
    } else if (path === '/dashboard/collaborate') {
      setCurrentActive('collaborate');
    } else if (path === '/dashboard/notifications') {
      setCurrentActive('notifications');
    } else if (path === '/dashboard/settings') {
      setCurrentActive('settings');
    }
  }, [location.pathname]);

  // Updated menu items to match nested routes
  const defaultMenuItems = [
    { 
      id: 'overview', 
      icon: Home, 
      label: 'Dashboard', 
      href: '/dashboard/overview',
      badge: null 
    },
    { 
      id: 'listings', 
      icon: Package, 
      label: 'Listings', 
      href: '/dashboard/listing',
      badge: null 
    },
    { 
      id: 'orders', 
      icon: ShoppingCart, 
      label: 'Orders', 
      href: '/dashboard/orders',
      badge: 2 
    },
    { 
      id: 'auctions', 
      icon: Clock, 
      label: 'Auctions', 
      href: '/dashboard/auctions',
      badge: null 
    },
    { 
      id: 'collaborate', 
      icon: Users, 
      label: 'Hire & Collaborate', 
      href: '/dashboard/collaborate',
      badge: null 
    },
    { 
      id: 'notifications', 
      icon: Bell, 
      label: 'Notifications', 
      href: '/dashboard/notifications',
      badge: null 
    },
    { 
      id: 'settings', 
      icon: Settings, 
      label: 'Settings', 
      href: '/dashboard/settings',
      badge: null 
    }
  ];

  const items = menuItems || defaultMenuItems;

  const handleLinkClick = (e, href, itemId) => {
    e.preventDefault();
    
    // Update active state
    setCurrentActive(itemId);
    
    // Navigate to the route using React Router
    navigate(href);
    
    // Close sidebar on mobile when navigating
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        bg-white w-64 min-h-screen flex flex-col px-6 py-8 border-r border-gray-200
        fixed lg:relative lg:translate-x-0 z-30 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-2">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                alt="Skyis Logo" 
                className="w-auto transition-transform duration-200 hover:scale-105" 
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg" 
              />
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-all duration-200"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2 text-gray-900 text-sm font-normal flex-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentActive === item.id;
            
            return (
              <button
                key={item.id}
                type="button"
                className={`
                  group flex items-center justify-between rounded-lg px-4 py-3 w-full text-left
                  transition-all duration-200 transform hover:scale-[1.02] cursor-pointer
                  ${isActive 
                    ? 'bg-green-50 text-green-800 shadow-sm font-medium' 
                    : 'hover:bg-gray-100 hover:text-green-700 hover:shadow-sm'
                  }
                `}
                onClick={(e) => handleLinkClick(e, item.href, item.id)}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`
                    w-5 h-5 transition-colors duration-200
                    ${isActive ? 'text-green-800' : 'text-gray-500 group-hover:text-green-700'}
                  `} />
                  <span className="transition-colors duration-200">
                    {item.label}
                  </span>
                </div>
                
                {/* Badge */}
                {item.badge && (
                  <span className={`
                    inline-flex items-center justify-center w-6 h-6 text-xs font-semibold 
                    rounded-full transition-all duration-200
                    ${isActive 
                      ? 'bg-green-800 text-white' 
                      : 'bg-red-500 text-white animate-pulse'
                    }
                  `}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer section (optional) */}
        <div className="mt-auto pt-6 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>&copy; 2025 Skyis</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSide;