import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, CreditCard, Check, AlertCircle } from 'lucide-react';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import MarketFooter from './marketlayout/MarketFooter';
import { useCart } from '../../../contexts/CartContext';
import { useAuth } from '../../../contexts/AuthContext';
import PaymentProcessor from './shared/PaymentProcessor';
import CartModal from './CartModal';

const Checkout = () => {
  const navigate = useNavigate();
  const { 
      cartItems, 
      getCartTotal, 
      clearCart,
      updateQuantity, 
      removeItem, 
      cartCount 
    } = useCart();
  const { user } = useAuth();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Lagos',
    zipCode: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Calculate totals
  const subtotal = getCartTotal();
  const tax = subtotal * 0.075;
  const shipping = 5000;
  const total = subtotal + tax + shipping;

  // Load Paystack script
  useEffect(() => {
    const loadPaystackScript = () => {
      return new Promise((resolve, reject) => {
        if (window.PaystackPop) {
          resolve(window.PaystackPop);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        script.onload = () => resolve(window.PaystackPop);
        script.onerror = () => reject(new Error('Failed to load Paystack script'));
        document.head.appendChild(script);
      });
    };

    loadPaystackScript();
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && step !== 3) {
      Swal.fire({
        title: 'Empty Cart',
        text: 'Your cart is empty. Please add items before checkout.',
        icon: 'warning',
        confirmButtonText: 'Continue Shopping',
        confirmButtonColor: '#0B7A72'
      }).then(() => {
        navigate('/marketplace');
      });
    }
  }, [cartItems.length, step, navigate]);

  // Validation functions
  const validateShipping = () => {
    const newErrors = {};

    if (!shippingInfo.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!shippingInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!shippingInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(shippingInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!shippingInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!shippingInfo.city.trim()) {
      newErrors.city = 'City is required';
    }

    return newErrors;
  };

  const validatePayment = () => {
    const newErrors = {};

    if (!paymentInfo.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!paymentInfo.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }

    if (!paymentInfo.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }

    if (!paymentInfo.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    return newErrors;
  };

  // Input formatting functions
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return value;
  };

  // Handle input changes with formatting
  const handleShippingChange = (field, value) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePaymentChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setPaymentInfo(prev => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleShippingContinue = () => {
    const shippingErrors = validateShipping();
    
    if (Object.keys(shippingErrors).length === 0) {
      setStep(2);
      setErrors({});
    } else {
      setErrors(shippingErrors);
      setTouched(Object.keys(shippingErrors).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {}));
      
      // Show first error field
      const firstErrorField = Object.keys(shippingErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }
  };

  // Paystack payment handler
  const handlePaystackPayment = () => {
    if (!window.PaystackPop) {
      Swal.fire({
        title: 'Payment Error',
        text: 'Payment service is temporarily unavailable. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#0B7A72'
      });
      return;
    }

    const paystack = window.PaystackPop.setup({
      key: 'pk_test_your_public_key_here',
      email: shippingInfo.email || user?.email || 'customer@skyis.com',
      amount: Math.floor(total * 100), // Convert to kobo
      currency: 'NGN',
      ref: `SKY-${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: shippingInfo.fullName
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: shippingInfo.phone
          },
          {
            display_name: "Order Items",
            variable_name: "order_items",
            value: cartItems.map(item => item.name || item.title).join(', ')
          }
        ]
      },
      callback: function(response) {
        // Payment successful
        setIsProcessing(false);
        const orderNum = `SKY-${Date.now().toString().slice(-6)}`;
        setOrderNumber(orderNum);
        setStep(3);
        
        // Clear cart on successful payment
        clearCart();
        
        Swal.fire({
          title: 'Payment Successful! 🎉',
          html: `
            <div class="text-center">
              <div class="text-green-500 text-6xl mb-4">✓</div>
              <h3 class="text-xl font-semibold mb-2">Thank you for your purchase!</h3>
              <p class="text-gray-600 mb-4">Your order #${orderNum} has been confirmed.</p>
              <p class="text-sm text-gray-500 mb-4">Transaction Reference: ${response.reference}</p>
              <p class="text-sm text-gray-500">A confirmation email has been sent to ${shippingInfo.email}</p>
            </div>
          `,
          confirmButtonText: 'Continue Shopping',
          confirmButtonColor: '#0B7A72',
          showCancelButton: true,
          cancelButtonText: 'View Order Details',
          cancelButtonColor: '#6B7280'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/marketplace');
          } else {
            // Navigate to order details page
            navigate('/orders');
          }
        });
      },
      onClose: function() {
        // Payment modal closed
        setIsProcessing(false);
        Swal.fire({
          title: 'Payment Cancelled',
          text: 'You cancelled the payment process. Your order has been saved.',
          icon: 'info',
          confirmButtonText: 'Continue',
          confirmButtonColor: '#0B7A72'
        });
      },
      onError: function(error) {
        // Payment failed
        setIsProcessing(false);
        Swal.fire({
          title: 'Payment Failed',
          text: error.message || 'Payment processing failed. Please try again.',
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#0B7A72'
        });
      }
    });
    
    paystack.openIframe();
  };

  const handlePayment = () => {
    const paymentErrors = validatePayment();
    
    if (Object.keys(paymentErrors).length === 0) {
      setIsProcessing(true);
      
      // Show payment confirmation
      Swal.fire({
        title: 'Confirm Payment',
        html: `
          <div class="text-center">
            <div class="text-4xl mb-4">💳</div>
            <p class="mb-2">You are about to pay:</p>
            <h3 class="text-2xl font-bold text-[#0B7A72] mb-4">₦${Math.floor(total).toLocaleString()}</h3>
            <p class="text-sm text-gray-600">Click "Pay Now" to proceed to secure payment with Paystack.</p>
          </div>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Pay Now',
        cancelButtonText: 'Review Order',
        confirmButtonColor: '#0B7A72',
        cancelButtonColor: '#6B7280',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          // Initialize Paystack payment
          handlePaystackPayment();
        } else {
          setIsProcessing(false);
        }
      });
    } else {
      setErrors(paymentErrors);
      setTouched(Object.keys(paymentErrors).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {}));
      
      // Show first error field
      const firstErrorField = Object.keys(paymentErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/marketplace');
    }
  };

  // Error animation variants
  const errorVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { opacity: 1, y: 0, height: 'auto' }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <Navbar cartItems={cartCount} onCartClick={() => setIsCartOpen(true)}  />
      
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Button */}
        <button 
          onClick={goBack}
          className="flex items-center text-[#0B7A72] hover:text-[#096860] mb-6 transition-all transform hover:-translate-x-1"
        >
          <ArrowLeft size={20} className="mr-2" />
          {step === 1 ? 'Back to Shopping' : 'Back to Shipping'}
        </button>

        <h1 className="text-4xl font-normal mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-12 flex items-center justify-center space-x-4">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold transition-all duration-300 ${
                step >= s ? 'bg-[#0B7A72] text-white scale-110' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s ? <Check size={20} /> : s}
              </div>
              {s < 3 && (
                <div className={`h-1 w-24 transition-all duration-500 ${
                  step > s ? 'bg-[#0B7A72]' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
              >
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <MapPin size={24} className="mr-3 text-[#0B7A72]" />
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={(e) => handleShippingChange('fullName', e.target.value)}
                      onBlur={() => handleBlur('fullName')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent transition-all ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    <AnimatePresence>
                      {errors.fullName && touched.fullName && (
                        <motion.div
                          variants={errorVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="flex items-center space-x-1 text-red-500 text-sm mt-1"
                        >
                          <AlertCircle size={14} />
                          <span>{errors.fullName}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleShippingChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent transition-all ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your@email.com"
                      />
                      <AnimatePresence>
                        {errors.email && touched.email && (
                          <motion.div
                            variants={errorVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="flex items-center space-x-1 text-red-500 text-sm mt-1"
                          >
                            <AlertCircle size={14} />
                            <span>{errors.email}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => handleShippingChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent transition-all ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+234 XXX XXX XXXX"
                      />
                      <AnimatePresence>
                        {errors.phone && touched.phone && (
                          <motion.div
                            variants={errorVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="flex items-center space-x-1 text-red-500 text-sm mt-1"
                          >
                            <AlertCircle size={14} />
                            <span>{errors.phone}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={(e) => handleShippingChange('address', e.target.value)}
                      onBlur={() => handleBlur('address')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent transition-all ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Street address"
                    />
                    <AnimatePresence>
                      {errors.address && touched.address && (
                        <motion.div
                          variants={errorVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="flex items-center space-x-1 text-red-500 text-sm mt-1"
                        >
                          <AlertCircle size={14} />
                          <span>{errors.address}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={(e) => handleShippingChange('city', e.target.value)}
                        onBlur={() => handleBlur('city')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent transition-all ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="City"
                      />
                      <AnimatePresence>
                        {errors.city && touched.city && (
                          <motion.div
                            variants={errorVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="flex items-center space-x-1 text-red-500 text-sm mt-1"
                          >
                            <AlertCircle size={14} />
                            <span>{errors.city}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">State</label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) => handleShippingChange('state', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Zip Code</label>
                      <input
                        type="text"
                        value={shippingInfo.zipCode}
                        onChange={(e) => handleShippingChange('zipCode', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent transition-all"
                        placeholder="100001"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={handleShippingContinue}
                    className="w-full bg-[#0B7A72] text-white py-3 rounded-full font-semibold hover:bg-[#096860] transition-all duration-200 transform hover:scale-105 mt-6"
                  >
                    Continue to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Payment Information */}
            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
              >
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <CreditCard size={24} className="mr-3 text-[#0B7A72]" />
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                      onBlur={() => handleBlur('cardNumber')}
                      maxLength={19}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent transition-all ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <AnimatePresence>
                      {errors.cardNumber && touched.cardNumber && (
                        <motion.div
                          variants={errorVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="flex items-center space-x-1 text-red-500 text-sm mt-1"
                        >
                          <AlertCircle size={14} />
                          <span>{errors.cardNumber}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Cardholder Name *</label>
                    <input
                      type="text"
                      name="cardName"
                      value={paymentInfo.cardName}
                      onChange={(e) => handlePaymentChange('cardName', e.target.value)}
                      onBlur={() => handleBlur('cardName')}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent transition-all ${
                        errors.cardName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Name on card"
                    />
                    <AnimatePresence>
                      {errors.cardName && touched.cardName && (
                        <motion.div
                          variants={errorVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="flex items-center space-x-1 text-red-500 text-sm mt-1"
                        >
                          <AlertCircle size={14} />
                          <span>{errors.cardName}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                        onBlur={() => handleBlur('expiryDate')}
                        maxLength={5}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent transition-all ${
                          errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <AnimatePresence>
                        {errors.expiryDate && touched.expiryDate && (
                          <motion.div
                            variants={errorVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="flex items-center space-x-1 text-red-500 text-sm mt-1"
                          >
                            <AlertCircle size={14} />
                            <span>{errors.expiryDate}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                        onBlur={() => handleBlur('cvv')}
                        maxLength={4}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent transition-all ${
                          errors.cvv ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <AnimatePresence>
                        {errors.cvv && touched.cvv && (
                          <motion.div
                            variants={errorVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="flex items-center space-x-1 text-red-500 text-sm mt-1"
                          >
                            <AlertCircle size={14} />
                            <span>{errors.cvv}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700 text-center">
                      💳 You'll be redirected to Paystack's secure payment page to complete your payment
                    </p>
                  </div>

                  <button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-[#0B7A72] text-white py-3 rounded-full font-semibold hover:bg-[#096860] transition-all duration-200 transform hover:scale-105 mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processing Payment...
                      </>
                    ) : (
                      `Pay ₦${Math.floor(total).toLocaleString()}`
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Order Confirmation */}
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <Check size={40} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Thank you for your purchase. Your order has been successfully placed.
                </p>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <p className="text-sm text-gray-600 mb-2">Order Number</p>
                  <p className="text-2xl font-bold">#{orderNumber}</p>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  A confirmation email has been sent to {shippingInfo.email}
                </p>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => navigate('/marketplace')}
                    className="bg-[#0B7A72] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#096860] transition-all duration-200"
                  >
                    Shop More Items
                  </button>
                  <button 
                    onClick={() => navigate('/orders')}
                    className="border border-[#0B7A72] text-[#0B7A72] px-6 py-3 rounded-full font-semibold hover:bg-[#0B7A72] hover:text-white transition-all duration-200"
                  >
                    View Orders
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img 
                      src={item.image} 
                      alt={item.title || item.name} 
                      className="w-16 h-16 object-cover rounded-lg" 
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">{item.title || item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold">
                        {typeof item.price === 'string' ? item.price : `₦${item.price.toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₦{Math.floor(subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (7.5%)</span>
                  <span className="font-semibold">₦{Math.floor(tax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">₦{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>₦{Math.floor(total).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="max-w-[100rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-10 pt-10">
        <MarketFooter />
      </footer>

      <PaymentProcessor
        amount={total}
        onSuccess={(paymentResult) => {
          // Handle successful payment
          console.log('Payment successful:', paymentResult);
          navigate('/order-confirmation');
        }}
        onCancel={() => {
          // Handle cancellation
          console.log('Payment cancelled');
        }}
      />

      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />

    </div>
  );
};

export default Checkout;