import React, { useState, useEffect } from 'react';
import { Sun, Moon, Bell, Target, Plus, Search, ChevronDown, ChevronLeft, ChevronRight, Menu, X, User, Settings, LogOut, Upload, Save } from 'lucide-react';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'Peter Goodness', role: 'Fashion Designer' });
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New order received for Luxury Miami', time: '2 minutes ago', read: false },
    { id: 2, message: 'Product "Summer Collection" is running low on stock', time: '1 hour ago', read: false },
    { id: 3, message: 'Monthly sales report is ready', time: '3 hours ago', read: true },
    { id: 4, message: 'Customer review added for "Designer Dress"', time: '1 day ago', read: true },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    inStock: '',
    category: 'Thrift',
    description: '',
    image: null
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    if (newSelectAll) {
      const currentPageProducts = getCurrentPageProducts().map(p => p.id);
      setSelectedProducts(currentPageProducts);
    } else {
      setSelectedProducts([]);
    }
  };

  const handleProductSelect = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handleNotificationClick = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const userRoles = ['Fashion Designer', 'Creative', 'Shopper', 'Designer', 'Artist'];

  const handleRoleChange = (role) => {
    setCurrentUser({ ...currentUser, role });
    setShowRoleDropdown(false);
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.inStock) {
      // Here you would typically send to API
      console.log('Adding product:', newProduct);
      setShowAddProduct(false);
      setNewProduct({
        name: '',
        price: '',
        inStock: '',
        category: 'Thrift',
        description: '',
        image: null
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, image: file });
    }
  };

  // Sample products data with more variety
  const allProducts = [
    {
      id: 1,
      productId: 17563,
      name: 'Luxury Miami Dress',
      variations: 2,
      inStock: 20,
      price: 'N100,000.00',
      status: 'Published',
      category: 'Designs',
      image: 'https://storage.googleapis.com/a1aa/image/2b85bfd1-1b5a-42a8-dfca-64632a001bb1.jpg'
    },
    {
      id: 2,
      productId: 17564,
      name: 'Vintage Denim Jacket',
      variations: 3,
      inStock: 15,
      price: 'N45,000.00',
      status: 'Published',
      category: 'Thrift',
      image: 'https://storage.googleapis.com/a1aa/image/2b85bfd1-1b5a-42a8-dfca-64632a001bb1.jpg'
    },
    {
      id: 3,
      productId: 17565,
      name: 'Designer Handbag',
      variations: 1,
      inStock: 8,
      price: 'N150,000.00',
      status: 'Published',
      category: 'Designs',
      image: 'https://storage.googleapis.com/a1aa/image/2b85bfd1-1b5a-42a8-dfca-64632a001bb1.jpg'
    },
    {
      id: 4,
      productId: 17566,
      name: 'Retro Sneakers',
      variations: 4,
      inStock: 0,
      price: 'N35,000.00',
      status: 'Draft',
      category: 'Thrift',
      image: 'https://storage.googleapis.com/a1aa/image/2b85bfd1-1b5a-42a8-dfca-64632a001bb1.jpg'
    },
    {
      id: 5,
      productId: 17567,
      name: 'Custom T-Shirt Design',
      variations: 5,
      inStock: 25,
      price: 'N25,000.00',
      status: 'Published',
      category: 'Designs',
      image: 'https://storage.googleapis.com/a1aa/image/2b85bfd1-1b5a-42a8-dfca-64632a001bb1.jpg'
    },
    {
      id: 6,
      productId: 17568,
      name: 'Bohemian Maxi Dress',
      variations: 2,
      inStock: 12,
      price: 'N80,000.00',
      status: 'Published',
      category: 'Thrift',
      image: 'https://storage.googleapis.com/a1aa/image/2b85bfd1-1b5a-42a8-dfca-64632a001bb1.jpg'
    },
    {
      id: 7,
      productId: 17569,
      name: 'Elegant Evening Gown',
      variations: 3,
      inStock: 5,
      price: 'N200,000.00',
      status: 'Published',
      category: 'Designs',
      image: 'https://storage.googleapis.com/a1aa/image/2b85bfd1-1b5a-42a8-dfca-64632a001bb1.jpg'
    },
    {
      id: 8,
      productId: 17570,
      name: 'Casual Summer Top',
      variations: 4,
      inStock: 18,
      price: 'N30,000.00',
      status: 'Published',
      category: 'Thrift',
      image: 'https://storage.googleapis.com/a1aa/image/2b85bfd1-1b5a-42a8-dfca-64632a001bb1.jpg'
    }
  ];

  // Filter products based on search and category
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.productId.toString().includes(searchQuery);
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Get current page products
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);

  // Check if all current page products are selected
  useEffect(() => {
    const currentPageProducts = getCurrentPageProducts();
    const allCurrentSelected = currentPageProducts.length > 0 && 
      currentPageProducts.every(product => selectedProducts.includes(product.id));
    setSelectAll(allCurrentSelected);
  }, [selectedProducts, currentPage, filteredProducts, rowsPerPage]);

  const themeClasses = {
    bg: isDarkMode ? 'bg-[#0B0B0B]' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-black',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-400',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    cardBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    sidebarBg: isDarkMode ? 'bg-[#0B0B0B]' : 'bg-white',
    headerBg: isDarkMode ? 'bg-[#0B0B0B]' : 'bg-white',
    inputBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-100',
    buttonPrimary: isDarkMode ? 'bg-[#054643] hover:bg-[#043330]' : 'bg-[#1B4B48] hover:bg-[#153633]',
    buttonSecondary: isDarkMode ? 'border-[#054643] text-[#054643] hover:bg-[#054643]' : 'border-[#1B4B48] text-[#1B4B48] hover:bg-[#1B4B48]',
    activeTab: isDarkMode ? 'bg-[#054643] text-white' : 'bg-[#D9FBFF] text-[#1B4B48]',
    tableBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    tableHeaderBg: isDarkMode ? 'bg-gray-700' : 'bg-[#D9DEE3]',
    tableRowBorder: isDarkMode ? 'border-gray-600' : 'border-gray-300',
    overlay: isDarkMode ? 'bg-black bg-opacity-60' : 'bg-black bg-opacity-40',
    modal: isDarkMode ? 'bg-gray-900' : 'bg-white',
    dropdown: isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200',
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`${themeClasses.bg} ${themeClasses.text} min-h-screen transition-colors duration-300`}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} ${themeClasses.sidebarBg} ${themeClasses.border} border-r flex flex-col justify-between py-8 px-6 transition-all duration-300 ease-in-out overflow-hidden lg:relative absolute z-20 h-full min-h-screen`}>
          <div className={`${sidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
            {/* Logo and Theme Toggle */}
            <div className="flex items-center justify-between mb-14">
              <div className="flex items-center space-x-2">
                <img 
                  alt="Feather icon in green" 
                  className="w-8 h-8 flex-shrink-0" 
                  src="https://storage.googleapis.com/a1aa/image/57c2a8ef-4ad3-419d-b891-467c129c6c6e.jpg"
                />
                <span className={`text-xl font-normal ${isDarkMode ? 'text-[#054643]' : 'text-[#1B4B48]'} select-none whitespace-nowrap`}>
                  Skyis
                </span>
              </div>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-md transition-colors flex-shrink-0 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-6">
              <h2 className={`text-sm font-semibold ${themeClasses.text} mb-3 select-none`}>
                Quick Actions
              </h2>
              <ul className="space-y-6">
                <li>
                  <button className={`flex items-center space-x-2 ${themeClasses.textSecondary} cursor-not-allowed select-none w-full`} disabled>
                    <i className="fas fa-th-large text-lg"></i>
                    <span className="text-sm font-normal whitespace-nowrap">Dashboard</span>
                  </button>
                </li>
                <li>
                  <button className={`flex items-center space-x-2 ${themeClasses.activeTab} rounded-md px-4 py-2 w-full font-normal text-sm`}>
                    <i className="fas fa-briefcase text-lg"></i>
                    <span className="whitespace-nowrap">Products</span>
                    <ChevronDown className="w-4 h-4 ml-auto flex-shrink-0" />
                  </button>
                </li>
                <li>
                  <button className={`flex items-center space-x-2 ${themeClasses.textSecondary} cursor-not-allowed select-none w-full`} disabled>
                    <i className="fas fa-calendar-alt text-lg"></i>
                    <span className="text-sm font-normal whitespace-nowrap">Orders</span>
                  </button>
                </li>
                <li>
                  <button className={`flex items-center space-x-2 ${themeClasses.textSecondary} cursor-not-allowed select-none w-full`} disabled>
                    <i className="fas fa-store text-lg"></i>
                    <span className="text-sm font-normal whitespace-nowrap">My store</span>
                  </button>
                </li>
                <li>
                  <button className={`flex items-center space-x-2 ${themeClasses.textSecondary} cursor-not-allowed select-none w-full`} disabled>
                    <i className="fas fa-cog text-lg"></i>
                    <span className="text-sm font-normal whitespace-nowrap">Settings</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className={`flex items-center justify-between ${themeClasses.headerBg} ${themeClasses.border} border-b px-4 lg:px-8 py-4`}>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-md transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className={`inline-flex items-center gap-1 rounded-md ${themeClasses.inputBg} px-4 py-2 text-sm font-normal ${themeClasses.text}`}
                >
                  <span className="select-none">User:</span>
                  <span className={`${isDarkMode ? 'text-[#054643]' : 'text-[#1B4B48]'} font-semibold select-none`}>
                    {currentUser.role}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showRoleDropdown && (
                  <div className={`absolute top-full left-0 mt-2 w-48 ${themeClasses.dropdown} border rounded-md shadow-lg z-30`}>
                    {userRoles.map((role) => (
                      <button
                        key={role}
                        onClick={() => handleRoleChange(role)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${
                          currentUser.role === role ? `${isDarkMode ? 'bg-[#054643]' : 'bg-[#D9FBFF]'}` : ''
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 lg:space-x-6">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors relative`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className={`absolute top-full right-0 mt-2 w-80 ${themeClasses.dropdown} border rounded-md shadow-lg z-30 max-h-96 overflow-y-auto`}>
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                    </div>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification.id)}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-opacity-10 hover:bg-gray-500 transition-colors ${
                          notification.read ? 'opacity-60' : ''
                        }`}
                      >
                        <p className={`text-sm ${notification.read ? themeClasses.textSecondary : themeClasses.text} font-medium`}>
                          {notification.message}
                        </p>
                        <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className={`p-2 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                <Target className="w-5 h-5" />
              </button>
              
              {/* User Profile Dropdown */}
              <div className="relative">
                <div 
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-3 cursor-pointer select-none"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F9D94A] flex items-center justify-center text-black font-semibold text-sm">
                    PG
                  </div>
                  <div className="hidden sm:flex flex-col leading-tight">
                    <span className={`text-sm font-normal ${themeClasses.text}`}>{currentUser.name}</span>
                    <span className={`text-xs font-normal ${themeClasses.textSecondary} select-none`}>{currentUser.role}</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </div>
                
                {showUserDropdown && (
                  <div className={`absolute top-full right-0 mt-2 w-48 ${themeClasses.dropdown} border rounded-md shadow-lg z-30`}>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-opacity-10 hover:bg-gray-500 transition-colors flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-opacity-10 hover:bg-gray-500 transition-colors flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <hr className={`border-t ${themeClasses.border} my-1`} />
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-opacity-10 hover:bg-gray-500 transition-colors flex items-center gap-2 text-red-500">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Content */}
          <main className={`flex-1 overflow-auto p-4 lg:p-8 ${themeClasses.bg} border ${themeClasses.border} m-4 lg:m-8 rounded-lg`}>
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
              <h1 className={`text-lg font-semibold ${themeClasses.text} select-none`}>Products</h1>
              <div className="flex gap-4 flex-wrap">
                <button className={`flex items-center gap-2 border ${themeClasses.buttonSecondary} rounded-md px-4 py-2 text-sm font-normal hover:text-white transition`}>
                  <Plus className="w-5 h-5" />
                  Export Csv
                </button>
                <button 
                  onClick={() => setShowAddProduct(true)}
                  className={`flex items-center gap-2 ${themeClasses.buttonPrimary} text-white rounded-md px-6 py-3 text-sm font-normal transition`}
                >
                  <Plus className="w-5 h-5" />
                  Add Product
                </button>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
              <div className="flex gap-4 flex-wrap">
                {['All', 'Thrift', 'Designs'].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`rounded-md px-4 py-2 text-sm font-normal transition ${
                      activeCategory === category
                        ? `${themeClasses.cardBg} border ${themeClasses.border} ${isDarkMode ? 'text-[#054643]' : 'text-[#1B4B48]'} font-semibold`
                        : `${themeClasses.inputBg} border ${themeClasses.border} ${themeClasses.textSecondary}`
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="flex-1 max-w-xs">
                <div className="relative">
                  <input
                    className={`w-full rounded-md border ${themeClasses.border} ${themeClasses.inputBg} py-3 pl-10 pr-4 text-sm font-normal ${themeClasses.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B4B48]`}
                    placeholder="Search products..."
                    type="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-[#FFE6DD] rounded-md p-4 flex-1 min-w-[240px] select-none">
                <p className="text-base font-semibold text-black mb-1">N8,000,000.00</p>
                <p className="text-xs font-normal text-[#4B4B4B]">Total Product Value</p>
              </div>
              <div className="bg-[#FFF1B8] rounded-md p-4 flex-1 min-w-[160px] select-none">
                <p className="text-base font-semibold text-black mb-1">30</p>
                <p className="text-xs font-normal text-[#4B4B4B]">Product Sold</p>
              </div>
              <div className="bg-[#B6D7FF] rounded-md p-4 flex-1 min-w-[160px] select-none">
                <p className="text-base font-semibold text-black mb-1">5</p>
                <p className="text-xs font-normal text-[#4B4B4B]">Out of Stock</p>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className={`w-full border-collapse text-sm ${themeClasses.tableBg} rounded-lg overflow-hidden`}>
                <thead>
                  <tr className={`${themeClasses.tableHeaderBg} ${themeClasses.text} select-none`}>
                    <th className="p-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="p-3 font-semibold">Image</th>
                    <th className="p-3 font-semibold">Product ID</th>
                    <th className="p-3 font-semibold">Product Name</th>
                    <th className="p-3 font-semibold">Variation</th>
                    <th className="p-3 font-semibold">In Stock</th>
                    <th className="p-3 font-semibold">Price</th>
                    <th className="p-3 font-semibold flex items-center gap-1">
                      Status
                      <ChevronDown className="w-4 h-4" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getCurrentPageProducts().map((product) => (
                    <tr key={product.id} className={`border-b ${themeClasses.tableRowBorder}`}>
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleProductSelect(product.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="p-3">
                        <img
                          alt="Product image"
                          className="rounded-md w-10 h-10 object-cover"
                          src={product.image}
                        />
                      </td>
                      <td className="p-3 text-center">{product.productId}</td>
                      <td className="p-3">{product.name}</td>
                      <td className="p-3 text-center">{product.variations}</td>
                      <td className="p-3 text-center">{product.inStock}</td>
                      <td className="p-3 text-center">{product.price}</td>
                      <td className="p-3 text-center">
                        <span className={`inline-flex items-center gap-1 rounded-md border px-3 py-1 text-xs font-normal ${
                          product.status === 'Published' 
                            ? 'border-[#3DD230] bg-[#E6F9E8] text-[#3DD230]'
                            : 'border-orange-400 bg-orange-50 text-orange-600'
                        }`}>
                          <span className={`w-2 h-2 rounded-full block ${
                            product.status === 'Published' ? 'bg-[#3DD230]' : 'bg-orange-400'
                          }`}></span>
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Results info */}
            {filteredProducts.length > 0 && (
              <div className={`mt-4 text-sm ${themeClasses.textSecondary} flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4`}>
                <div>
                  Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredProducts.length)} of {filteredProducts.length} results
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span>Rows per page:</span>
                    <select
                      value={rowsPerPage}
                      onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className={`${themeClasses.inputBg} border ${themeClasses.border} rounded-md px-2 py-1 text-sm`}
                    >
                      {[6, 10, 20, 50].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''} ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* No results message */}
            {filteredProducts.length === 0 && (
              <div className={`text-center py-8 ${themeClasses.textSecondary}`}>
                <p className="text-lg">No products found</p>
                <p className="text-sm mt-2">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className={`fixed inset-0 z-50 ${themeClasses.overlay} flex items-center justify-center p-4`}>
          <div className={`${themeClasses.modal} rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Add New Product</h2>
                <button
                  onClick={() => setShowAddProduct(false)}
                  className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${themeClasses.text}`}>
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className={`w-full rounded-md border ${themeClasses.border} ${themeClasses.inputBg} px-3 py-2 text-sm ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[#1B4B48]`}
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${themeClasses.text}`}>
                    Price
                  </label>
                  <input
                    type="text"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className={`w-full rounded-md border ${themeClasses.border} ${themeClasses.inputBg} px-3 py-2 text-sm ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[#1B4B48]`}
                    placeholder="Enter price"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${themeClasses.text}`}>
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={newProduct.inStock}
                    onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.value })}
                    className={`w-full rounded-md border ${themeClasses.border} ${themeClasses.inputBg} px-3 py-2 text-sm ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[#1B4B48]`}
                    placeholder="Enter stock quantity"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${themeClasses.text}`}>
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className={`w-full rounded-md border ${themeClasses.border} ${themeClasses.inputBg} px-3 py-2 text-sm ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[#1B4B48]`}
                  >
                    <option value="Thrift">Thrift</option>
                    <option value="Designs">Designs</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${themeClasses.text}`}>
                    Description
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className={`w-full rounded-md border ${themeClasses.border} ${themeClasses.inputBg} px-3 py-2 text-sm ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-[#1B4B48]`}
                    placeholder="Enter product description"
                    rows={3}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${themeClasses.text}`}>
                    Product Image
                  </label>
                  <div className="flex items-center gap-4">
                    <label className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed ${themeClasses.border} rounded-md p-4 cursor-pointer hover:bg-opacity-10 hover:bg-gray-500 transition`}>
                      <Upload className="w-6 h-6 mb-2" />
                      <span className="text-sm">Click to upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {newProduct.image && (
                      <div className="w-16 h-16 rounded-md overflow-hidden">
                        <img
                          src={URL.createObjectURL(newProduct.image)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowAddProduct(false)}
                    className={`px-4 py-2 text-sm font-medium rounded-md border ${themeClasses.border} ${themeClasses.text} hover:bg-opacity-10 hover:bg-gray-500 transition`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProduct}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${themeClasses.buttonPrimary} text-white transition`}
                  >
                    <div className="flex items-center gap-2">
                      <Save className="w-4 h-4" />
                      Save Product
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;