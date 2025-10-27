import React, { useState, useRef } from 'react';
import { Bell, Check, X, Upload, Eye, EyeOff } from 'lucide-react';

const Settings = () => {
  // State management
  const [activeTab, setActiveTab] = useState('personal');
  const [notifications, setNotifications] = useState([]);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  // Form data
  const [personalData, setPersonalData] = useState({
    firstName: 'Tena',
    lastName: 'Gopregha',
    email: 'tena@example.com',
    phone: '(+234) - 8100000000',
    profileImage: null
  });
  
  const [storeData, setStoreData] = useState({
    storeName: 'Tena',
    category: '',
    storeAddress: 'Tena',
    description: '',
    storeImage: null
  });
  
  const [paymentData, setPaymentData] = useState({
    bankName: '',
    accountNumber: '',
    routingNumber: ''
  });
  
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    newReviews: true,
    auctionAlerts: true,
    marketingUpdates: false
  });
  
  // Error states
  const [errors, setErrors] = useState({});
  
  // File input refs
  const profileImageRef = useRef(null);
  const storeImageRef = useRef(null);
  
  // Notification system
  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };
  
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validatePhone = (phone) => {
    const phoneRegex = /^\(\+\d{1,3}\)\s?-\s?\d{10,}$/;
    return phoneRegex.test(phone);
  };
  
  const validatePassword = (password) => {
    return password.length >= 8;
  };
  
  // Image upload handler
  const handleImageUpload = (file, type) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'profile') {
          setPersonalData(prev => ({ ...prev, profileImage: e.target.result }));
        } else {
          setStoreData(prev => ({ ...prev, storeImage: e.target.result }));
        }
      };
      reader.readAsDataURL(file);
      addNotification('Image uploaded successfully!');
    } else {
      addNotification('Please select a valid image file', 'error');
    }
  };
  
  // Form submission handlers
  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!personalData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!personalData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!validateEmail(personalData.email)) newErrors.email = 'Valid email is required';
    if (!validatePhone(personalData.phone)) newErrors.phone = 'Valid phone number is required';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      addNotification('Personal information updated successfully!');
    }
  };
  
  const handleStoreSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!storeData.storeName.trim()) newErrors.storeName = 'Store name is required';
    if (!storeData.category) newErrors.category = 'Category is required';
    if (!storeData.storeAddress.trim()) newErrors.storeAddress = 'Store address is required';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      addNotification('Store information updated successfully!');
    }
  };
  
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!paymentData.bankName.trim()) newErrors.bankName = 'Bank name is required';
    if (!paymentData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
    if (!paymentData.routingNumber.trim()) newErrors.routingNumber = 'Routing number is required';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      addNotification('Payment information updated successfully!');
    }
  };
  
  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!securityData.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!validatePassword(securityData.newPassword)) newErrors.newPassword = 'Password must be at least 8 characters';
    if (securityData.newPassword !== securityData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      addNotification('Password updated successfully!');
      setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }
  };
  
  const handleNotificationSave = () => {
    addNotification('Notification preferences saved!');
  };
  
  // Tab configuration
  const tabs = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'store', label: 'Store' },
    { id: 'payments', label: 'Payments' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification System */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-80 ${
              notification.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
          >
            {notification.type === 'success' ? <Check size={20} /> : <X size={20} />}
            <span className="text-base">{notification.message}</span>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-auto hover:opacity-70"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className=" mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-2">Settings</h1>
          <p className="text-lg text-gray-600">Manage your account and store preferences</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 p-6">
            <nav className="flex flex-wrap gap-2 bg-gray-100 rounded-xl p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-6 py-3 rounded-lg text-base font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-[#00403C] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
              
          <div className="p-6 sm:p-8">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <form onSubmit={handlePersonalSubmit} className="space-y-8">
                <div className='flex flex-col sm:flex-row gap-2 justify-between'>
                    {/* Profile Photo Section */}
                    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                        <div className="flex flex-col items-center lg:items-start">
                        <label className="block text-base font-semibold text-gray-900 mb-2">
                        Profile Photo
                        </label>
                        <p className="text-base text-gray-500 mb-4 text-center lg:text-left max-w-xs">
                        This image will be displayed on your profile
                        </p>
                        <button
                        type="button"
                        onClick={() => profileImageRef.current?.click()}
                        className="px-6 py-3 rounded-full border-2 border-dashed border-gray-300 text-gray-600 text-base hover:border-[#00403C] hover:text-[#00403C] transition-colors flex items-center gap-2"
                        >
                        <Upload size={20} />
                        Change Image
                        </button>
                        <input
                        ref={profileImageRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files[0], 'profile')}
                        className="hidden"
                        />
                        <div className="my-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
                              <p className="text-base text-gray-500">Update your personal details here.</p>
                          </div>
                        </div>
                    </div>

                    </div>
                    
                    {/* Form Fields */}
                    <div className='w-full'>
                        <div className="w-32 h-32 rounded-full bg-[#FFE6CC] overflow-hidden mx-auto lg:mx-0">
                            {personalData.profileImage ? (
                            <img
                                src={personalData.profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            ) : (
                            <img
                                src="https://storage.googleapis.com/a1aa/image/75e5334e-2b19-41dd-4248-08dd58016d52.jpg"
                                alt="Default Profile"
                                className="w-full h-full object-cover"
                            />
                            )}
                        </div>
                        
                        <div className="my-10">
                        
                          <div>
                              <label className="block text-base text-gray-700 mb-2" htmlFor="firstName">
                              First Name
                              </label>
                              <input
                              id="firstName"
                              type="text"
                              value={personalData.firstName}
                              onChange={(e) => setPersonalData(prev => ({ ...prev, firstName: e.target.value }))}
                              className={`w-full text-gray-600 rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00403C] ${
                                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                              }`}
                              />
                              {errors.firstName && <p className="text-red-500 text-base mt-1">{errors.firstName}</p>}
                          </div>
                          
                          <div>
                              <label className="block text-base text-gray-700 mb-2" htmlFor="lastName">
                              Last Name
                              </label>
                              <input
                              id="lastName"
                              type="text"
                              value={personalData.lastName}
                              onChange={(e) => setPersonalData(prev => ({ ...prev, lastName: e.target.value }))}
                              className={`w-full text-gray-600 rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00403C] ${
                                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                              }`}
                              />
                              {errors.lastName && <p className="text-red-500 text-base mt-1">{errors.lastName}</p>}
                          </div>
                          
                          <div>
                              <label className="block text-base text-gray-700 mb-2" htmlFor="email">
                              Email Address
                              </label>
                              <input
                              id="email"
                              type="email"
                              value={personalData.email}
                              onChange={(e) => setPersonalData(prev => ({ ...prev, email: e.target.value }))}
                              className={`w-full text-gray-600 rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00403C] ${
                                  errors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                              />
                              {errors.email && <p className="text-red-500 text-base mt-1">{errors.email}</p>}
                          </div>
                          
                          <div>
                              <label className="block text-base text-gray-700 mb-2" htmlFor="phone">
                              Phone Number
                              </label>
                              <input
                              id="phone"
                              type="tel"
                              value={personalData.phone}
                              onChange={(e) => setPersonalData(prev => ({ ...prev, phone: e.target.value }))}
                              className={`w-full text-gray-600 rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00403C] ${
                                  errors.phone ? 'border-red-500' : 'border-gray-300'
                              }`}
                              />
                              {errors.phone && <p className="text-red-500 text-base mt-1">{errors.phone}</p>}
                          </div>
                        </div>
                        
                        <div className="flex my-10 flex-col sm:flex-row gap-4 justify-end">
                        <button
                            type="button"
                            className="px-8 py-3 rounded-full border border-gray-300 text-gray-600 text-base hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 rounded-full bg-[#00403C] text-white text-base hover:bg-[#00332f]"
                        >
                            Save Changes
                        </button>
                        </div>
                    </div>
                </div>
              </form>
            )}
            
            {/* Store Tab */}
            {activeTab === 'store' && (
              <form onSubmit={handleStoreSubmit} className="space-y-8">
                <div className='flex flex-col w-full sm:flex-row gap-20 justify-between'>
                    {/* Store Logo Section */}
                    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                      <div className="flex flex-col items-center lg:items-start">
                        <label className="block text-base font-semibold text-gray-900 mb-2">
                          Store Logo
                        </label>
                        <p className="text-base text-gray-500 mb-4 text-center lg:text-left max-w-xs">
                          This image will be displayed on your store profile
                        </p>
                        <button
                          type="button"
                          onClick={() => storeImageRef.current?.click()}
                          className="px-6 py-3 rounded-full border-2 border-dashed border-gray-300 text-gray-600 text-base hover:border-[#00403C] hover:text-[#00403C] transition-colors flex items-center gap-2"
                        >
                          <Upload size={20} />
                          Change Image
                        </button>
                        <input
                          ref={storeImageRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e.target.files[0], 'store')}
                          className="hidden"
                        />
                        <div className='my-10'>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">Store Information</h3>
                          <p className="text-base text-gray-500">Update your store details here.</p>
                        </div>
                      </div>
                     
                    </div>
                    
                    {/* Store Information */}
                    <div className="space-y-6 w-full">
                      <div className="w-32 h-32 rounded-full bg-[#FDEBD3] overflow-hidden mx-auto lg:mx-0">
                        {storeData.storeImage ? (
                          <img
                            src={storeData.storeImage}
                            alt="Store Logo"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src="https://storage.googleapis.com/a1aa/image/ac9eba74-ed4c-4f17-5de9-4e7aed95faa7.jpg"
                            alt="Default Store"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className='w-full mt-10'>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-base text-gray-700 mb-2" htmlFor="storeName">
                              Store Name
                            </label>
                            <input
                              id="storeName"
                              type="text"
                              value={storeData.storeName}
                              onChange={(e) => setStoreData(prev => ({ ...prev, storeName: e.target.value }))}
                              className={`w-full text-gray-600 rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00403C] ${
                                errors.storeName ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.storeName && <p className="text-red-500 text-base mt-1">{errors.storeName}</p>}
                          </div>
                          
                          <div>
                            <label className="block text-base text-gray-700 mb-2" htmlFor="category">
                              Category
                            </label>
                            <select
                              id="category"
                              value={storeData.category}
                              onChange={(e) => setStoreData(prev => ({ ...prev, category: e.target.value }))}
                              className={`w-full text-gray-600 rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00403C] ${
                                errors.category ? 'border-red-500' : 'border-gray-300'
                              }`}
                            >
                              <option value="">Select a category</option>
                              <option value="electronics">Electronics</option>
                              <option value="clothing">Clothing</option>
                              <option value="books">Books</option>
                              <option value="home">Home & Garden</option>
                              <option value="sports">Sports</option>
                              <option value="other">Other</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-base mt-1">{errors.category}</p>}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-base text-gray-700 mb-2" htmlFor="storeAddress">
                            Store Address
                          </label>
                          <input
                            id="storeAddress"
                            type="text"
                            value={storeData.storeAddress}
                            onChange={(e) => setStoreData(prev => ({ ...prev, storeAddress: e.target.value }))}
                            className={`w-full text-gray-600 rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00403C] ${
                              errors.storeAddress ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.storeAddress && <p className="text-red-500 text-base mt-1">{errors.storeAddress}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-base text-gray-700 mb-2" htmlFor="description">
                            Description
                          </label>
                          <textarea
                            id="description"
                            rows="4"
                            value={storeData.description}
                            onChange={(e) => setStoreData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Describe your store..."
                            className="text-gray-600 w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00403C] resize-none"
                          />
                        </div>
                        <div className="my-10 flex flex-col sm:flex-row gap-4 justify-end">
                          <button
                            type="button"
                            className="px-8 py-3 rounded-full border border-gray-300 text-gray-600 text-base hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-8 py-3 rounded-full bg-[#00403C] text-white text-base hover:bg-[#00332f]"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>

                    </div>
                    

                </div>

              </form>
            )}
            
            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="space-y-8 flex flex-col lg:flex-row lg:items-start gap-8">
                <div className='flex flex-col w-full'>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Information</h3>
                  <p className="text-base text-gray-500">Update your banking details here.</p>
                </div>
                
                <form onSubmit={handlePaymentSubmit} className="space-y-6 w-full ">
                  <div>
                    <label className="block text-base text-gray-700 mb-2" htmlFor="bankName">
                      Bank Name
                    </label>
                    <input
                      id="bankName"
                      type="text"
                      value={paymentData.bankName}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, bankName: e.target.value }))}
                      placeholder="Enter your bank name"
                      className={`w-full text-gray-600 rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00403C] ${
                        errors.bankName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.bankName && <p className="text-red-500 text-base mt-1">{errors.bankName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-base text-gray-700 mb-2" htmlFor="accountNumber">
                      Account Number
                    </label>
                    <input
                      id="accountNumber"
                      type="text"
                      value={paymentData.accountNumber}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, accountNumber: e.target.value }))}
                      placeholder="Enter your account number"
                      className={`w-full text-gray-600 rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00403C] ${
                        errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.accountNumber && <p className="text-red-500 text-base mt-1">{errors.accountNumber}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-base text-gray-700 mb-2" htmlFor="routingNumber">
                      Routing Number
                    </label>
                    <input
                      id="routingNumber"
                      type="text"
                      value={paymentData.routingNumber}
                      onChange={(e) => setPaymentData(prev => ({ ...prev, routingNumber: e.target.value }))}
                      placeholder="Enter routing number"
                      className={`w-full text-gray-600 rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00403C] ${
                        errors.routingNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.routingNumber && <p className="text-red-500 text-base mt-1">{errors.routingNumber}</p>}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
                    <button
                      type="button"
                      className="px-8 py-3 rounded-full border border-gray-300 text-gray-600 text-base hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-full bg-[#00403C] text-white text-base hover:bg-[#00332f]"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-8 flex flex-col lg:flex-row lg:items-start gap-8">
                <div className='flex flex-col w-full'>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Security Information</h3>
                  <p className="text-base text-gray-500">Update your password here.</p>
                </div>
                
                <form onSubmit={handleSecuritySubmit} className="space-y-6  w-full">
                  <div>
                    <label className="block text-base text-gray-700 mb-2" htmlFor="currentPassword">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        id="currentPassword"
                        type={showPassword.current ? "text" : "password"}
                        value={securityData.currentPassword}
                        onChange={(e) => setSecurityData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        placeholder="Enter your current password"
                        className={`w-full text-gray-600 rounded-lg border px-4 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-[#00403C] ${
                          errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword.current ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.currentPassword && <p className="text-red-500 text-base mt-1">{errors.currentPassword}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-base text-gray-700 mb-2" htmlFor="newPassword">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        type={showPassword.new ? "text" : "password"}
                        value={securityData.newPassword}
                        onChange={(e) => setSecurityData(prev => ({ ...prev, newPassword: e.target.value }))}
                        placeholder="Enter new password"
                        className={`w-full text-gray-600 rounded-lg border px-4 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-[#00403C] ${
                          errors.newPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.newPassword && <p className="text-red-500 text-base mt-1">{errors.newPassword}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-base text-gray-700 mb-2" htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                                                id="confirmPassword"
                        type={showPassword.confirm ? "text" : "password"}
                        value={securityData.confirmPassword}
                        onChange={(e) => setSecurityData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="Confirm new password"
                        className={`text-gray-600 w-full rounded-lg border px-4 py-3 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-[#00403C] ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-base mt-1">{errors.confirmPassword}</p>}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
                    <button
                      type="button"
                      className="px-8 py-3 rounded-full border border-gray-300 text-gray-600 text-base hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-full bg-[#00403C] text-white text-base hover:bg-[#00332f]"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-8 flex flex-col lg:flex-row lg:items-start gap-8">
                <div className='flex flex-col w-full'>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Notification Preferences</h3>
                  <p className="text-base text-gray-500">Manage how you receive notifications.</p>
                </div>
                
                <div className="space-y-6 w-full">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="text-base font-medium text-gray-900">Order Updates</h4>
                      <p className="text-base text-gray-500">Get notified about order status changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.orderUpdates}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          orderUpdates: e.target.checked
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-16 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00403C]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="text-base font-medium text-gray-900">New Reviews</h4>
                      <p className="text-base text-gray-500">Get notified when you receive new reviews</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.newReviews}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          newReviews: e.target.checked
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-16 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00403C]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="text-base font-medium text-gray-900">Auction Alerts</h4>
                      <p className="text-base text-gray-500">Get notified about auction updates and bids</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.auctionAlerts}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          auctionAlerts: e.target.checked
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-16 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00403C]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="text-base font-medium text-gray-900">Marketing Updates</h4>
                      <p className="text-base text-gray-500">Receive marketing and promotional emails</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.marketingUpdates}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          marketingUpdates: e.target.checked
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-16 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00403C]"></div>
                    </label>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
                    <button
                      type="button"
                      className="px-8 py-3 rounded-full border border-gray-300 text-gray-600 text-base hover:bg-gray-50"
                    >
                      Reset to Default
                    </button>
                    <button
                      type="button"
                      onClick={handleNotificationSave}
                      className="px-8 py-3 rounded-full bg-[#00403C] text-white text-base hover:bg-[#00332f]"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;