import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';

const PaymentContext = createContext();

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const { user } = useAuth();
  const { cartItems, clearCart, getCartTotal } = useCart();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Process payment
  const processPayment = useCallback(async (paymentData) => {
    setPaymentLoading(true);
    setPaymentError(null);
    setPaymentSuccess(false);

    try {
      // Simulate API call to payment gateway
      const response = await simulatePaymentAPI(paymentData, cartItems);
      
      if (response.success) {
        setPaymentSuccess(true);
        // Clear cart on successful payment
        clearCart();
        // Save order to localStorage or send to backend
        saveOrderToHistory(response.order);
      } else {
        setPaymentError(response.error || 'Payment failed. Please try again.');
      }
    } catch (error) {
      setPaymentError('Payment processing failed. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  }, [cartItems, clearCart]);

  // Simulate payment API (Replace with actual payment gateway integration)
  const simulatePaymentAPI = async (paymentData, items) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate 90% success rate
        const isSuccess = Math.random() > 0.1;
        
        if (isSuccess) {
          resolve({
            success: true,
            order: {
              id: `ORD-${Date.now()}`,
              items: items,
              total: getCartTotal(),
              paymentMethod: paymentData.method,
              status: 'completed',
              date: new Date().toISOString()
            }
          });
        } else {
          resolve({
            success: false,
            error: 'Payment declined. Please check your payment details.'
          });
        }
      }, 2000);
    });
  };

  // Save order to localStorage (Replace with actual backend API)
  const saveOrderToHistory = (order) => {
    const orders = JSON.parse(localStorage.getItem('user_orders') || '[]');
    orders.push(order);
    localStorage.setItem('user_orders', JSON.stringify(orders));
  };

  const value = {
    paymentLoading,
    paymentError,
    paymentSuccess,
    processPayment,
    clearPaymentStatus: () => {
      setPaymentError(null);
      setPaymentSuccess(false);
    }
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;