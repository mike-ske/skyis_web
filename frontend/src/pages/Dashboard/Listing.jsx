import React, { useState } from 'react';
import { Search, Bell, Home, Package, ShoppingCart, Clock, Users, Settings, Plus, Edit, Eye, Menu, X } from 'lucide-react';



const ListingsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableSearchTerm, setTableSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [editingItem, setEditingItem] = useState(null);
  const [notifications, setNotifications] = useState(3);

  const [listings, setListings] = useState([
    { id: 1, product: 'Leather bag', category: 'Luxury', price: 45000, status: 'Live', stock: 12, lastUpdated: 'Aug 23, 2025' },
    { id: 2, product: 'Denim jacket', category: 'Thrift & pre-loved', price: 32000, status: 'Live', stock: 12, lastUpdated: 'Aug 23, 2025' },
    { id: 3, product: 'Heels (Red)', category: 'Luxury', price: 42000, status: 'Live', stock: 12, lastUpdated: 'Aug 23, 2025' },
    { id: 4, product: 'French tuxedo', category: 'Wedding', price: 42000, status: 'Live', stock: 12, lastUpdated: 'Aug 23, 2025' },
    { id: 5, product: 'Ankara Dress', category: 'Bespoke', price: 42000, status: 'Live', stock: 12, lastUpdated: 'Aug 23, 2025' },
    { id: 6, product: 'French tuxedo', category: 'Bespoke', price: 42000, status: 'Live', stock: 12, lastUpdated: 'Aug 23, 2025' },
    { id: 7, product: 'Denim jacket', category: 'Luxury', price: 42000, status: 'Pending', stock: 12, lastUpdated: 'Aug 23, 2025' },
    { id: 8, product: 'Leather bag', category: 'Bespoke', price: 42000, status: 'Sold out', stock: 0, lastUpdated: 'Aug 23, 2025' }
  ]);

  const navItems = [
    { icon: Home, label: 'Dashboard', active: false },
    { icon: Package, label: 'Listings', active: true },
    { icon: ShoppingCart, label: 'Orders', active: false },
    { icon: Clock, label: 'Auctions', active: false },
    { icon: Users, label: 'Hire & Collaborate', active: false },
    { icon: Bell, label: 'Notifications', active: false },
    { icon: Settings, label: 'Settings', active: false }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'Sold out':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredListings = listings.filter(listing =>
    listing.product.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
    listing.category.toLowerCase().includes(tableSearchTerm.toLowerCase())
  );

  const handleAddNewListing = () => {
    const newId = Math.max(...listings.map(l => l.id)) + 1;
    const newListing = {
      id: newId,
      product: 'New Product',
      category: 'Luxury',
      price: 0,
      status: 'Pending',
      stock: 0,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setListings([...listings, newListing]);
    setEditingItem(newId);
  };

  const handleEdit = (id) => {
    setEditingItem(id);
  };

  const handleSaveEdit = (id, updatedData) => {
    setListings(listings.map(listing =>
      listing.id === id ? { ...listing, ...updatedData } : listing
    ));
    setEditingItem(null);
  };

  const handleStatusChange = (id, newStatus) => {
    setListings(listings.map(listing =>
      listing.id === id ? { ...listing, status: newStatus } : listing
    ));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
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

  return (
    <div className="bg-gray-50 min-h-screen flex relative">
 
      {/* Main content */}
      <main className="flex-1 p-4 lg:p-6 xl:p-10 space-y-6 lg:space-y-8">

        {/* Content */}
        <section className="p-6 space-y-6">
          <div>
            <h1 className="text-black text-xl font-semibold leading-tight">
              Manage Your Store Listings
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Keep track of all your store listings from one place.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 space-y-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-black text-sm font-normal">
                All store listings ({filteredListings.length})
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <input
                  className="bg-gray-50 text-xs text-gray-600 placeholder-gray-400 rounded-md py-2 pl-8 pr-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 w-40 transition-all duration-200"
                  placeholder="Search listings"
                  type="search"
                  value={tableSearchTerm}
                  onChange={(e) => setTableSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 font-normal">
                    <th className="py-3 px-4 rounded-l-lg">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Last updated</th>
                    <th className="py-3 px-4 rounded-r-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.map((listing) => (
                    <tr
                      key={listing.id}
                      className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-3 px-4 font-medium">
                        {editingItem === listing.id ? (
                          <input
                            type="text"
                            defaultValue={listing.product}
                            className="border rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            onBlur={(e) => handleSaveEdit(listing.id, { product: e.target.value })}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveEdit(listing.id, { product: e.target.value });
                              }
                            }}
                            autoFocus
                          />
                        ) : (
                          listing.product
                        )}
                      </td>
                      <td className="py-3 px-4">{listing.category}</td>
                      <td className="py-3 px-4">
                        <span className="text-gray-400">₦</span>
                        {listing.price.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={listing.status}
                          onChange={(e) => handleStatusChange(listing.id, e.target.value)}
                          className={`text-xs font-semibold px-2 py-1 rounded cursor-pointer border-none outline-none ${getStatusColor(listing.status)} transition-colors duration-200`}
                        >
                          <option value="Live">Live</option>
                          <option value="Pending">Pending</option>
                          <option value="Sold out">Sold out</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">{listing.stock}</td>
                      <td className="py-3 px-4 text-gray-500">{listing.lastUpdated}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-3 text-gray-400">
                          <button
                            onClick={() => handleEdit(listing.id)}
                            className="hover:text-green-600 transition-colors duration-200 p-1 rounded hover:bg-green-50"
                            title="Edit listing"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="hover:text-blue-600 transition-colors duration-200 p-1 rounded hover:bg-blue-50"
                            title="View listing"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAddNewListing}
              className="inline-flex items-center space-x-2 bg-green-800 hover:bg-green-700 text-white text-sm font-semibold rounded-full py-3 px-6 transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95"
              type="button"
            >
              <Plus className="w-4 h-4" />
              <span>Add new listing</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ListingsDashboard;