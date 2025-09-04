import React, { useState } from 'react';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Clock, 
  Users, 
  Bell, 
  Settings,
  Search,
  Eye,
  Receipt,
  UserCheck,
  Plus,
  Menu,
  X
} from 'lucide-react';

import DashHeader from "./DashHeader.jsx"
import DashboardCards from './DashboardCard.jsx';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [listingSidebarOpen, setListingSidebarOpen] = useState(false);
  const [loading, setLoading] = useState({});
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    listingType: 'Buy'
  });

  const handleAction = async (actionName, callback) => {
    setLoading(prev => ({ ...prev, [actionName]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (callback) callback();
    setLoading(prev => ({ ...prev, [actionName]: false }));
  };

  const handleAddNewListing = () => {
    handleAction('addListing', () => {
      setListingSidebarOpen(true);
    });
  };

  const handlePreviewStore = () => {
    handleAction('previewStore', () => {
      console.log('Preview store');
    });
  };

  const handleSubmitListing = () => {
    handleAction('submitListing', () => {
      console.log('Listing submitted:', formData);
      setListingSidebarOpen(false);
      setFormData({ itemName: '', category: '', listingType: 'Buy' });
    });
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Package, label: 'Listings' },
    { icon: ShoppingCart, label: 'Orders' },
    { icon: Clock, label: 'Auctions' },
    { icon: Users, label: 'Hire & Collaborate' },
    { icon: Bell, label: 'Notifications' },
    { icon: Settings, label: 'Settings' }
  ];

  const statsCards = [
    {
      title: 'Total Revenue',
      value: '₦1,000,000.00',
      change: '+12.5%',
      icon: Receipt,
      subtitle: 'From last month'
    },
    {
      title: 'Active Listings',
      value: '93',
      change: '+5.2%',
      icon: Package,
      subtitle: 'From last month'
    },
    {
      title: 'Orders',
      value: '48',
      change: '+8.2%',
      icon: ShoppingCart,
      subtitle: 'From last month'
    },
    {
      title: 'Customers',
      value: '324',
      change: '+15.3%',
      icon: UserCheck,
      subtitle: 'From last month'
    }
  ];

  const recentOrders = [
    { id: '#1045', customer: 'Fiyinfolu Idamiebi', item: 'Leather bag', date: 'Aug 23, 2025', amount: '₦45,000' },
    { id: '#1046', customer: 'Amarachi Anigbogu', item: 'Denim jacket', date: 'Aug 23, 2025', amount: '₦32,000' },
    { id: '#1047', customer: 'Damiete Gbobo', item: 'Heels (Red)', date: 'Aug 22, 2025', amount: '₦42,000' },
    { id: '#1048', customer: 'Itubo Kalio', item: 'French tuxedo', date: 'Aug 21, 2025', amount: '₦420,000' }
  ];

  const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
  );

  return (
    <div className="bg-[#F3F5F7] min-h-screen flex relative">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        bg-white w-64 min-h-screen flex flex-col px-6 py-8 border-r border-gray-200
        fixed lg:relative lg:translate-x-0 z-30 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-2">
            {/* Logo */}
            <div className="flex items-center space-x-2 text-white text-sm font-normal">
                 <img 
                alt="Feather icon in green" 
                className="" 
                height="" 
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg" 
                width=""
              />
            </div>
          </div>
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col space-y-2 text-gray-900 text-sm font-normal">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                className={`flex items-center space-x-3 rounded-lg px-4 py-3 transition-colors ${
                  item.active 
                    ? 'bg-[#E6F0EF] text-[#00403F]' 
                    : 'hover:bg-gray-100 hover:text-[#00403F]'
                }`}
                href="#"
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-6 xl:p-10 space-y-6 lg:space-y-8">
        {/* Top bar */}
       
        <DashHeader />
       

        {/* Dashboard header */}
        <section className="space-y-1">
          <h1 className="text-black text-xl lg:text-2xl font-semibold">Dashboard</h1>
          <p className="text-gray-600 text-sm font-normal">
            Welcome back, Tena. Here's your store overview.
          </p>
        </section>

        {/* Preview store button */}
        <div className="flex justify-end">
          <button 
            className="bg-[#00403F] text-white rounded-full px-4 lg:px-6 py-2 flex items-center space-x-2 text-sm font-medium hover:bg-[#00332f] disabled:opacity-50 transition-all"
            onClick={handlePreviewStore}
            disabled={loading.previewStore}
          >
            {loading.previewStore ? <LoadingSpinner /> : <Eye className="w-4 h-4" />}
            <span>Preview store</span>
          </button>
        </div>

        {/* Stats cards */}
        <DashboardCards statsCards={statsCards} />

        {/* Quick actions */}
        <section className="bg-white rounded-lg p-4 lg:p-6">
          <h2 className="text-black font-semibold mb-4 text-sm lg:text-base">Quick actions</h2>
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <button 
              className="flex items-center justify-center space-x-2 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition-all"
              onClick={handleAddNewListing}
              disabled={loading.addListing}
            >
              {loading.addListing ? <LoadingSpinner /> : <Plus className="w-4 h-4" />}
              <span>Add new listing</span>
            </button>
            <button className="flex items-center justify-center space-x-2 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all">
              <Clock className="w-4 h-4" />
              <span>Create auction</span>
            </button>
            <button className="flex items-center justify-center space-x-2 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all">
              <Users className="w-4 h-4" />
              <span>Post collaborations</span>
            </button>
          </div>
        </section>

        {/* Recent orders */}
        <section className="bg-white rounded-lg p-4 lg:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-black font-semibold text-sm lg:text-base">Recent orders</h3>
            <a className="text-gray-600 text-xs font-normal hover:underline" href="#">
              See more
            </a>
          </div>
          
          {/* Mobile view */}
          <div className="block lg:hidden space-y-3">
            {recentOrders.map((order, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-black text-sm">{order.id}</span>
                  <span className="text-xs text-gray-500">{order.date}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-700">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.item}</p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm line-through text-gray-500">{order.amount}</span>
                    <button className="text-xs text-gray-900 underline">View order</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left text-gray-700 text-xs">
              <thead className="bg-[#F3F5F7] text-gray-500 font-normal">
                <tr>
                  <th className="pl-4 pr-2 py-3 w-6">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="py-3 pr-6">Order ID</th>
                  <th className="py-3 pr-6">Customer</th>
                  <th className="py-3 pr-6">Item</th>
                  <th className="py-3 pr-6">Order date</th>
                  <th className="py-3 pr-6">Amount</th>
                  <th className="py-3 pr-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="pl-4 pr-2 py-3">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="py-3 pr-6 font-semibold text-black">{order.id}</td>
                    <td className="py-3 pr-6">{order.customer}</td>
                    <td className="py-3 pr-6">{order.item}</td>
                    <td className="py-3 pr-6">{order.date}</td>
                    <td className="py-3 pr-6 line-through">{order.amount}</td>
                    <td className="py-3 pr-4">
                      <button className="text-gray-900 underline hover:no-underline">
                        View order
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Listing Sidebar */}
      <div className={`
        fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${listingSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-lg font-semibold text-black">List New Item</h2>
              <p className="text-sm text-gray-600">Step 1 of 4: Basic Info</p>
            </div>
            <button 
              onClick={() => setListingSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="px-6 py-4">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-[#00403F] h-1 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 px-6 py-4 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-black mb-4">Basic information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vintage Chanel Evening Dress"
                    value={formData.itemName}
                    onChange={(e) => setFormData(prev => ({ ...prev, itemName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00403F] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00403F] focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="clothing">Clothing</option>
                    <option value="accessories">Accessories</option>
                    <option value="shoes">Shoes</option>
                    <option value="bags">Bags</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Listing type
                  </label>
                  <div className="flex space-x-2">
                    {['Buy', 'Rent', 'Auction'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFormData(prev => ({ ...prev, listingType: type }))}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          formData.listingType === type
                            ? 'bg-[#E6F0EF] text-[#00403F] border border-[#00403F]'
                            : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
              <span>← Previous</span>
            </button>
            <button 
              onClick={handleSubmitListing}
              disabled={loading.submitListing}
              className="bg-[#00403F] text-white px-6 py-2 rounded-md hover:bg-[#00332f] disabled:opacity-50 flex items-center space-x-2 transition-all"
            >
              {loading.submitListing ? <LoadingSpinner /> : null}
              <span>Next →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar overlay */}
      {listingSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setListingSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;