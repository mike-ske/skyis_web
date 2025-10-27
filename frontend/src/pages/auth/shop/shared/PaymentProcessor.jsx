import React, { useState } from 'react';
import { CreditCard, Smartphone, Building, Lock, AlertCircle } from 'lucide-react';

const PaymentProcessor = ({ amount, onSuccess, onCancel }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    phone: '',
    bankCode: ''
  });

  const paymentMethods = [
    {
      id: 'card',
      name: 'Card Payment',
      icon: CreditCard,
      description: 'Pay with Debit or Credit Card'
    },
    {
      id: 'transfer',
      name: 'Bank Transfer',
      icon: Building,
      description: 'Direct bank transfer'
    },
    {
      id: 'ussd',
      name: 'USSD',
      icon: Smartphone,
      description: 'Pay with USSD code'
    }
  ];

  const nigerianBanks = [
    { code: '044', name: 'Access Bank' },
    { code: '063', name: 'Access Bank (Diamond)' },
    { code: '050', name: 'Ecobank Nigeria' },
    { code: '070', name: 'Fidelity Bank' },
    { code: '011', name: 'First Bank of Nigeria' },
    { code: '214', name: 'First City Monument Bank' },
    { code: '058', name: 'Guaranty Trust Bank' },
    { code: '030', name: 'Heritage Bank' },
    { code: '301', name: 'Jaiz Bank' },
    { code: '082', name: 'Keystone Bank' },
    { code: '526', name: 'Parallex Bank' },
    { code: '076', name: 'Polaris Bank' },
    { code: '101', name: 'Providus Bank' },
    { code: '221', name: 'Stanbic IBTC Bank' },
    { code: '068', name: 'Standard Chartered Bank' },
    { code: '232', name: 'Sterling Bank' },
    { code: '100', name: 'Suntrust Bank' },
    { code: '032', name: 'Union Bank of Nigeria' },
    { code: '033', name: 'United Bank For Africa' },
    { code: '215', name: 'Unity Bank' },
    { code: '035', name: 'Wema Bank' },
    { code: '057', name: 'Zenith Bank' }
  ];

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19);
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const validateCardNumber = (number) => {
    const cleaned = number.replace(/\s/g, '');
    return /^\d{16}$/.test(cleaned);
  };

  const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const validateExpiryDate = (date) => {
    const [month, year] = date.split('/');
    if (!month || !year) return false;

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const expMonth = parseInt(month);
    const expYear = parseInt(year);

    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;

    return true;
  };

  const handleInputChange = (field, value) => {
    setError(null);

    if (field === 'cardNumber') {
      value = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      value = formatExpiryDate(value);
    } else if (field === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 4);
    } else if (field === 'phone') {
      value = value.replace(/\D/g, '').substring(0, 11);
    }

    setPaymentDetails(prev => ({ ...prev, [field]: value }));
  };

  const validatePayment = () => {
    if (selectedMethod === 'card') {
      if (!paymentDetails.cardName.trim()) {
        setError('Please enter cardholder name');
        return false;
      }
      if (!validateCardNumber(paymentDetails.cardNumber)) {
        setError('Please enter a valid 16-digit card number');
        return false;
      }
      if (!validateExpiryDate(paymentDetails.expiryDate)) {
        setError('Please enter a valid expiry date');
        return false;
      }
      if (!validateCVV(paymentDetails.cvv)) {
        setError('Please enter a valid CVV');
        return false;
      }
    } else if (selectedMethod === 'transfer') {
      if (!paymentDetails.bankCode) {
        setError('Please select a bank');
        return false;
      }
    } else if (selectedMethod === 'ussd') {
      if (!paymentDetails.phone || paymentDetails.phone.length !== 11) {
        setError('Please enter a valid phone number');
        return false;
      }
      if (!paymentDetails.bankCode) {
        setError('Please select a bank');
        return false;
      }
    }

    return true;
  };

  const processPayment = async () => {
    if (!validatePayment()) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In production, integrate with payment gateway
      // Example: Paystack, Flutterwave, etc.
      
      const paymentResult = {
        success: true,
        transactionId: `TXN${Date.now()}`,
        method: selectedMethod,
        amount: amount,
        timestamp: new Date().toISOString()
      };

      onSuccess(paymentResult);
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Payment Amount */}
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Amount</span>
            <span className="text-2xl font-bold text-teal-700">
              ₦{parseFloat(amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => {
                    setSelectedMethod(method.id);
                    setError(null);
                  }}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedMethod === method.id
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon size={32} className={`mx-auto mb-2 ${
                    selectedMethod === method.id ? 'text-teal-600' : 'text-gray-400'
                  }`} />
                  <p className="font-semibold text-sm">{method.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{method.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Payment Forms */}
        <div className="mb-6">
          {selectedMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={paymentDetails.cardName}
                  onChange={(e) => handleInputChange('cardName', e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    placeholder="123"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
          )}

          {selectedMethod === 'transfer' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Bank
                </label>
                <select
                  value={paymentDetails.bankCode}
                  onChange={(e) => handleInputChange('bankCode', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Choose a bank</option>
                  {nigerianBanks.map((bank) => (
                    <option key={bank.code} value={bank.code}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  After clicking "Pay Now", you will receive account details to complete your transfer.
                </p>
              </div>
            </div>
          )}

          {selectedMethod === 'ussd' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={paymentDetails.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="08012345678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Bank
                </label>
                <select
                  value={paymentDetails.bankCode}
                  onChange={(e) => handleInputChange('bankCode', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Choose a bank</option>
                  {nigerianBanks.map((bank) => (
                    <option key={bank.code} value={bank.code}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  You will receive a USSD code to dial on your phone to complete the payment.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start space-x-2">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <Lock size={16} className="text-gray-500" />
            <span>Your payment information is encrypted and secure</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={processPayment}
            disabled={isProcessing}
            className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <span>Pay Now</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessor;