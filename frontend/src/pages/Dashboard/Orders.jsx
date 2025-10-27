import React, { useState } from 'react';
import { Eye } from 'lucide-react';

const Orders = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample orders data
  const [orders] = useState([
    {
      id: '#1045',
      customer: 'Fiyinfolu Idamiebi',
      item: 'Leather bag',
      status: 'Delivered',
      orderDate: 'Aug 23, 2025',
      amount: '₦45,000',
      statusColor: 'delivered'
    },
    {
      id: '#1046',
      customer: 'Amarachi Anigbogu',
      item: 'Denim jacket',
      status: 'Delivered',
      orderDate: 'Aug 23, 2025',
      amount: '₦32,000',
      statusColor: 'delivered'
    },
    {
      id: '#1047',
      customer: 'Damiete Gbobo',
      item: 'French tuxedo',
      status: 'Delivered',
      orderDate: 'Aug 22, 2025',
      amount: '₦42,000',
      statusColor: 'delivered'
    },
    {
      id: '#1048',
      customer: 'Ekisagha Diongoli',
      item: 'French tuxedo',
      status: 'Delivered',
      orderDate: 'Aug 22, 2025',
      amount: '₦42,000',
      statusColor: 'delivered'
    },
    {
      id: '#1049',
      customer: 'Nneka Anigbogu',
      item: 'French tuxedo',
      status: 'Delivered',
      orderDate: 'Aug 22, 2025',
      amount: '₦42,000',
      statusColor: 'delivered'
    },
    {
      id: '#1050',
      customer: 'Seyi Alade',
      item: 'French tuxedo',
      status: 'Delivered',
      orderDate: 'Aug 22, 2025',
      amount: '₦42,000',
      statusColor: 'delivered'
    },
    {
      id: '#1051',
      customer: 'Somtochukwu Nwankwo',
      item: 'French tuxedo',
      status: 'Pending',
      orderDate: 'Aug 22, 2025',
      amount: '₦42,000',
      statusColor: 'pending'
    },
    {
      id: '#1052',
      customer: 'Hafsat Idris',
      item: 'French tuxedo',
      status: 'Pending',
      orderDate: 'Aug 22, 2025',
      amount: '₦42,000',
      statusColor: 'pending'
    }
  ]);

  // Filter orders based on search term
  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle individual checkbox selection
  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => {
      if (prev.includes(orderId)) {
        return prev.filter(id => id !== orderId);
      } else {
        return [...prev, orderId];
      }
    });
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
    setSelectAll(!selectAll);
  };

  // Update select all state when individual selections change
  React.useEffect(() => {
    setSelectAll(selectedOrders.length === filteredOrders.length && filteredOrders.length > 0);
  }, [selectedOrders, filteredOrders]);

  // Get status styling
  const getStatusStyles = (statusColor) => {
    switch (statusColor) {
      case 'delivered':
        return 'bg-[#D1F2DC] text-[#065F46]';
      case 'pending':
        return 'bg-[#FDE6D0] text-[#B45309]';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Handle view order
  const handleViewOrder = (orderId) => {
    console.log('Viewing order:', orderId);
    // Add your view order logic here
  };

  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className=" px-8 py-6 border-b border-gray-200">
        <h1 className="text-black text-xl font-semibold leading-tight">
          Track and Fulfill Orders
        </h1>
        <p className="text-gray-500 text-sm mt-1 max-w-xl">
          View all incoming orders, completed sales, and disputes in one place.
        </p>
      </section>

      {/* Orders table container */}
      <section className="p-6 max-w-full overflow-x-auto">
        <div className="bg-white rounded-lg p-6 max-w-full min-w-[720px] md:min-w-[900px] lg:min-w-[1000px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-black font-semibold text-sm">
              My orders
            </h2>
            <input
              className="bg-[#F3F4F6] text-gray-700 text-xs rounded-md px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#065F46] w-40"
              placeholder="Search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-600 text-sm border-separate border-spacing-y-2">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pl-4 pr-3 py-2 w-8">
                    <input
                      aria-label="Select all orders"
                      className="w-4 h-4 text-[#065F46] border-gray-300 rounded focus:ring-[#065F46]"
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="py-2 pr-6 font-normal text-left">Order ID</th>
                  <th className="py-2 pr-6 font-normal text-left">Customer</th>
                  <th className="py-2 pr-6 font-normal text-left">Item</th>
                  <th className="py-2 pr-6 font-normal text-left">Status</th>
                  <th className="py-2 pr-6 font-normal text-left">Order date</th>
                  <th className="py-2 pr-6 font-normal text-left">Amount</th>
                  <th className="py-2 pr-4 font-normal text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="pl-4 pr-3 py-3">
                      <input
                        aria-label={`Select order ${order.id}`}
                        className="w-4 h-4 text-[#065F46] border-gray-300 rounded focus:ring-[#065F46]"
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                      />
                    </td>
                    <td className="py-3 pr-6 font-semibold text-gray-900">
                      {order.id}
                    </td>
                    <td className="py-3 pr-6">
                      {order.customer}
                    </td>
                    <td className="py-3 pr-6">
                      {order.item}
                    </td>
                    <td className="py-3 pr-6">
                      <span className={`inline-block ${getStatusStyles(order.statusColor)} text-[10px] font-semibold rounded-full px-2 py-0.5 select-none`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 pr-6">
                      {order.orderDate}
                    </td>
                    <td className="py-3 pr-6 line-through">
                      {order.amount}
                    </td>
                    <td className="py-3 pr-4 text-center">
                      <button
                        onClick={() => handleViewOrder(order.id)}
                        className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer p-1 rounded"
                        aria-label={`View order ${order.id}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* No results message */}
            {filteredOrders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">
                  No orders found matching your search.
                </p>
              </div>
            )}
          </div>

          {/* Selected orders info */}
          {selectedOrders.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                {selectedOrders.length} order{selectedOrders.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Orders;