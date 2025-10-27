import React, { useState } from 'react';
import { Bell, Users, Clock, DollarSign, Settings } from 'lucide-react';

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'collaboration',
      title: 'New Collaboration Request',
      message: 'Modern Threads wants to collaborate on a summer collection',
      time: '1hr ago',
      isRead: false,
      icon: Users
    },
    {
      id: 2,
      type: 'collaboration',
      title: 'New Collaboration Request',
      message: 'Urban Style Co. wants to partner for fall fashion week',
      time: '2hrs ago',
      isRead: false,
      icon: Users
    },
    {
      id: 3,
      type: 'auction',
      title: 'Auction Ending Soon',
      message: 'Your "Minimalist Evening Gown" auction ends in 5mins',
      time: '13mins ago',
      isRead: true,
      icon: Users
    },
    {
      id: 4,
      type: 'earnings',
      title: 'Payment Received',
      message: 'You received $250 for your latest design project',
      time: '1 day ago',
      isRead: true,
      icon: Users
    },
    {
      id: 5,
      type: 'system',
      title: 'Profile Update Required',
      message: 'Please update your portfolio to improve visibility',
      time: '2 days ago',
      isRead: false,
      icon: Users
    }
  ]);

  const toggleReadStatus = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, isRead: !notification.isRead }
        : notification
    ));
  };

  const getFilteredNotifications = () => {
    if (activeFilter === 'all') return notifications;
    if (activeFilter === 'unread') return notifications.filter(n => !n.isRead);
    if (activeFilter === 'read') return notifications.filter(n => n.isRead);
    return notifications.filter(n => n.type === activeFilter);
  };

  const FilterButton = ({ filter, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-[#00403F] text-white shadow-md'
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      {label}
    </button>
  );

  const NotificationCard = ({ notification }) => {
    const IconComponent = notification.icon;
    
    return (
      <article 
        className={`rounded-xl p-4 sm:p-6 transition-all duration-200 ${
          notification.isRead 
            ? 'bg-white border border-gray-100' 
            : 'bg-gradient-to-r bg-green-100 from-[#ECFDF7] to-[#F0FDF4] border border-green-100'
        }`}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div 
            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              notification.isRead 
                ? 'bg-gray-100 text-gray-400' 
                : 'bg-white text-[#00403F] shadow-sm'
            }`}
          >
            <IconComponent className="w-5 h-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h2 className={`font-semibold text-base sm:text-lg leading-tight ${
                  notification.isRead ? 'text-gray-600' : 'text-black'
                }`}>
                  {notification.title}
                </h2>
                <p className={`text-sm sm:text-base leading-relaxed mt-2 ${
                  notification.isRead ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {notification.message}
                </p>
                <time className="text-gray-400 text-xs sm:text-sm mt-3 block">
                  {notification.time}
                </time>
              </div>
              
              <button
                onClick={() => toggleReadStatus(notification.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                  notification.isRead
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    : 'bg-[#00403F] text-white hover:bg-[#005951] shadow-md hover:shadow-lg'
                }`}
              >
                {notification.isRead ? 'Mark as unread' : 'Mark as read'}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className=" px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className=" mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Bell className="w-6 h-6 text-[#00403F]" />
                <h1 className="text-2xl sm:text-3xl font-bold text-black">
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full min-w-[24px] text-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-base sm:text-lg">
                Stay updated with your creative business
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-200">
        <div className=" mx-auto">
          <div className="flex flex-wrap gap-3">
            <FilterButton
              filter="all"
              label="All"
              isActive={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            />
            <FilterButton
              filter="unread"
              label="Unread"
              isActive={activeFilter === 'unread'}
              onClick={() => setActiveFilter('unread')}
            />
            <FilterButton
              filter="read"
              label="Read"
              isActive={activeFilter === 'read'}
              onClick={() => setActiveFilter('read')}
            />
            <FilterButton
              filter="collaboration"
              label="Collaborations"
              isActive={activeFilter === 'collaboration'}
              onClick={() => setActiveFilter('collaboration')}
            />
            <FilterButton
              filter="auction"
              label="Auctions"
              isActive={activeFilter === 'auction'}
              onClick={() => setActiveFilter('auction')}
            />
            <FilterButton
              filter="earnings"
              label="Earnings"
              isActive={activeFilter === 'earnings'}
              onClick={() => setActiveFilter('earnings')}
            />
          </div>
        </div>
      </section>

      {/* Notifications List */}
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className=" mx-auto space-y-4 sm:space-y-6">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          ) : (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                No notifications found
              </h3>
              <p className="text-gray-400 text-base">
                {activeFilter === 'all' 
                  ? "You're all caught up!" 
                  : `No ${activeFilter} notifications at the moment.`}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Notifications;