import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, CreditCard, Calendar } from 'lucide-react';
import Navbar from './Navbar';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrder(data.order);
      } else {
        if (response.status === 401) {
          navigate('/login');
        } else {
          setError('Failed to load order details');
        }
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'processing':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B7A72] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700 mb-4">{error || 'Order not found'}</p>
            <button
              onClick={() => navigate('/orders')}
              className="bg-[#0B7A72] text-white px-6 py-2 rounded-full hover:bg-[#096860] transition-colors"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center text-gray-600 hover:text-[#0B7A72] mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Orders
        </button>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Order #{order.order_number}
              </h1>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={14} className="mr-1" />
                <span>Placed on {order.created_at}</span>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center mb-3">
                <MapPin className="text-[#0B7A72] mr-2" size={20} />
                <h3 className="font-semibold text-gray-900">Shipping Address</h3>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{order.shipping_address?.name || 'N/A'}</p>
                <p>{order.shipping_address?.address || 'N/A'}</p>
                <p>{order.shipping_address?.city || ''} {order.shipping_address?.state || ''}</p>
                <p>{order.shipping_address?.phone || 'N/A'}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center mb-3">
                <CreditCard className="text-[#0B7A72] mr-2" size={20} />
                <h3 className="font-semibold text-gray-900">Payment Summary</h3>
              </div>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₦{parseFloat(order.subtotal).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (7.5%)</span>
                  <span className="font-semibold">₦{parseFloat(order.tax).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-[#0B7A72] text-lg">₦{parseFloat(order.total).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center mb-6">
            <Package className="text-[#0B7A72] mr-2" size={20} />
            <h2 className="text-xl font-semibold text-gray-900">Order Items</h2>
          </div>

          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all">
                <img
                  src={item.image}
                  alt={item.product_name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.product_name}
                  </h3>
                  <div className="flex items-center space-x-3 text-xs text-gray-600">
                    {item.selected_color && (
                      <span className="flex items-center">
                        <span 
                          className="w-4 h-4 rounded-full border border-gray-300 mr-1"
                          style={{ backgroundColor: item.selected_color }}
                        ></span>
                        Color
                      </span>
                    )}
                    {item.selected_size && (
                      <span>Size: {item.selected_size}</span>
                    )}
                    <span>Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ₦{parseFloat(item.total).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-gray-500">
                    ₦{parseFloat(item.price).toLocaleString('en-NG', { minimumFractionDigits: 2 })} each
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;