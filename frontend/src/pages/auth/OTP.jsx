import React, { useState, useEffect, useRef } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

export default function SkyisOTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds countdown
  const inputRefs = useRef([]);

  // Initialize refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleInputChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) return;
    
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous input and clear it
        setActiveIndex(index - 1);
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    
    // Focus on the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 5);
    setActiveIndex(nextIndex);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      alert('Please enter all 6 digits');
      return;
    }

    setIsSubmitting(true);
    console.log('Verifying OTP:', otpString);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('OTP verification successful');
      // Handle success - redirect or show success message
    }, 1500);
  };

  const handleResendCode = async () => {
    if (timeLeft > 0) return;

    setIsResending(true);
    console.log('Resending OTP code...');
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setTimeLeft(60); // Reset timer
      setOtp(['', '', '', '', '', '']); // Clear OTP
      setActiveIndex(0);
      inputRefs.current[0]?.focus();
      console.log('OTP code resent');
    }, 1000);
  };

  const handleBackToLogin = () => {
    console.log('Navigate back to login');
    // Handle navigation back to login page
  };

  const isOtpComplete = otp.every(digit => digit !== '');
  const canResend = timeLeft === 0;

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-6 font-sans">
      <div className="min-h-screen w-dvw flex flex-col md:flex-row items-center justify-center md:justify-between max-w-7xl mx-auto px-6 py-12 gap-12 md:gap-24">
        {/* Left Image Section */}
        <div className="hidden flex-1 sm:flex flex-shrink-0 w-full md:max-w-lg lg:max-w-2xl rounded-3xl overflow-hidden relative">
            <img
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756222176/Frame_1686553286_qxegrh.png"
                alt="Person holding a green umbrella with a black bag hanging on their shoulder, standing near a black metal fence"
                className="w-full h-auto object-cover rounded-3xl"
            />
        </div>

        {/* Right OTP Form Section */}
        <div className="md:flex-1 flex flex-col items-center justify-center px-6 md:px-0 mt-10 md:mt-0">
          {/* Mail Icon */}
          <div className="flex items-center justify-center w-12 h-12 rounded-lg border border-gray-200 mb-6">
            <Mail className="text-gray-600 w-5 h-5" />
          </div>

          {/* Header */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            OTP
          </h2>
          <p className="text-center text-gray-600 max-w-xs mb-8">
            We've sent a 6-digit code to your email. Enter it below to verify and continue.
          </p>

          {/* OTP Input Fields */}
          <div className="flex space-x-3 md:space-x-6 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={() => setActiveIndex(index)}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full border text-gray-900 text-xl font-semibold flex items-center justify-center text-center focus:outline-none transition-all ${
                  activeIndex === index
                    ? 'border-4 border-purple-200 bg-purple-50'
                    : digit
                    ? 'border-2 border-emerald-300 bg-emerald-50'
                    : 'border border-gray-300 hover:border-gray-400'
                }`}
                placeholder=""
              />
            ))}
          </div>

          {/* Verify Button */}
          <button 
            className="w-full max-w-md bg-emerald-900 hover:bg-emerald-800 text-white py-3 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-700" 
            type="button"
            onClick={handleVerify}
            disabled={!isOtpComplete || isSubmitting}
          >
            {isSubmitting ? 'Verifying...' : 'Verify mail'}
          </button>

          {/* Resend Code */}
          <p className="text-gray-600 text-sm mt-6 max-w-md text-center">
            Didn't receive the code?{' '}
            {canResend ? (
              <button 
                className="font-semibold cursor-pointer hover:text-gray-800 focus:outline-none focus:underline transition-colors disabled:opacity-50"
                onClick={handleResendCode}
                disabled={isResending}
              >
                {isResending ? 'Resending...' : 'Click to resend'}
              </button>
            ) : (
              <span className="text-gray-400">
                Resend in {timeLeft}s
              </span>
            )}
          </p>

          {/* Back to Login */}
          <button 
            className="text-gray-500 text-sm mt-6 flex items-center space-x-2 cursor-pointer hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded px-2 py-1 transition-colors"
            onClick={handleBackToLogin}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to login</span>
          </button>
        </div>
      </div>
    </div>
  );
}