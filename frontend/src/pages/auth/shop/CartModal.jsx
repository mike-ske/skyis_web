// components/CartModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext'; // ✅ Import useCart
import { useAuth } from '../../../contexts/AuthContext'; // ✅ Import useAuth

const CartModal = ({ isOpen, onClose }) => { // ✅ Removed props, using context instead
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  
  // ✅ Get cart data and methods from context
  const { 
    cartItems, 
    updateQuantity, 
    removeItem, 
    getCartTotal,
    isLoading 
  } = useCart();
  
  // ✅ Get user from auth context
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  const token = localStorage.getItem('auth_token');

  // Helper function to parse price strings
  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      return parseFloat(price.replace(/[₦,]/g, '')) || 0;
    }
    return 0;
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parsePrice(item.price);
    return sum + (price * item.quantity);
  }, 0);
  
  const tax = subtotal * 0.075;
  const total = subtotal + tax;

  const handleCheckout = () => {
    handleClose();
    navigate('/checkout');
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isAnimating ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Cart Panel - Slides from Right */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold">Shopping Cart</h2>
            <button 
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90"
              aria-label="Close cart"
            >
              <X size={24} />
            </button>
          </div>

          {/* Login Banner */}
          {!token && !user && (
            <div className="bg-yellow-50 border-b border-yellow-200 p-4">
              <p className="text-yellow-800 text-sm">
                <Link 
                  to="/login" 
                  className="font-medium text-yellow-700 hover:text-yellow-600 underline"
                  onClick={handleClose}
                >
                  Sign in
                </Link>
                {' '}to save your cart and access order history
              </p>
            </div>
          )}

          {/* User Info Banner */}
          {user && (
            <div className="bg-green-50 border-b border-green-200 p-4">
              <p className="text-green-800 text-sm">
                👋 Welcome back, <span className="font-semibold">{user.email}</span>!
                
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          )}

          {/* Cart Items */}
          {!isLoading && (
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <ShoppingCart size={64} className="mb-4 animate-pulse" />
                  <p className="text-lg">Your cart is empty</p>
                  <button
                    onClick={() => {
                      handleClose();
                      navigate('/marketplace');
                    }}
                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
                      style={{ 
                        animation: `slideInRight 0.3s ease-out ${index * 0.05}s both`
                      }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.title || item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                          {item.title || item.name || 'Product'}
                        </h3>
                        <p className="text-xs text-gray-500 mb-2">{item.type}</p>
                        <p className="font-semibold text-sm mb-2">
                          ₦{parsePrice(item.price).toLocaleString()}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 border border-gray-300 rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-gray-100 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm w-8 text-center font-semibold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-gray-100 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition-all hover:scale-110"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Footer with Totals */}
          {!isLoading && cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₦{subtotal.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (7.5%)</span>
                  <span className="font-semibold">₦{tax.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t border-gray-200">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">₦{total.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-[#0B7A72] text-white py-3 rounded-full font-semibold hover:bg-[#096860] transition-all duration-200 transform hover:scale-105"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default CartModal;