import { useState, useEffect } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

export default function SkyisCheckMail() {
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [resendError, setResendError] = useState('');

  useEffect(() => {
    // Get email from localStorage or location state
    const userEmail = localStorage.getItem('userEmail') || 'your email';
    setEmail(userEmail);
  }, []);

  const handleOpenMailApp = () => {
    window.open('mailto:', '_blank');
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendMessage('');
    setResendError('');
    
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
      
      const response = await fetch(`${apiUrl}/api/email/resend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setResendMessage(data.message || 'Verification email sent successfully!');
      } else {
        setResendError(data.message || 'Failed to resend email. Please try again.');
      }
    } catch (error) {
      console.error('Resend error:', error);
      setResendError('An error occurred. Please try again later.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-6 font-sans">
      <main className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center md:justify-between max-w-7xl mx-auto px-6 py-12 gap-12 md:gap-24">
        <section className="md:flex-1 flex flex-col items-center justify-center text-center px-6 md:px-0 mt-12 md:mt-0 max-w-md md:max-w-none mx-auto md:mx-0">
          <button 
            aria-label="Mail icon" 
            className="mb-6 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            type="button"
          >
            <Mail className="text-gray-700 w-5 h-5" />
          </button>

          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Check your mail
          </h1>

          <p className="text-gray-600 mb-8 max-w-xs">
            We sent a verification link to{' '}
            <span className="font-semibold">
              {email}
            </span>
          </p>

          <button 
            className="w-full max-w-xs bg-teal-900 hover:bg-teal-800 text-white py-3 rounded-full border-4 border-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-700"
            onClick={handleOpenMailApp}
          >
            Open mail app
          </button>

          {resendMessage && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm max-w-xs">
              ✓ {resendMessage}
            </div>
          )}

          {resendError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm max-w-xs">
              ⚠ {resendError}
            </div>
          )}

          <p className="text-gray-600 mt-6 text-sm max-w-xs">
            Didn't receive the email?{' '}
            <button 
              className="font-bold cursor-pointer hover:text-gray-800 focus:outline-none focus:underline transition-colors disabled:opacity-50"
              onClick={handleResendEmail}
              disabled={isResending}
            >
              {isResending ? 'Resending...' : 'Click to resend'}
            </button>
          </p>

          <a 
            href="/login"
            className="mt-6 text-gray-500 text-sm flex items-center space-x-2 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded px-2 py-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[#0B3B38] hover:underline">
              Back to login
            </span>
          </a>
        </section>
      </main>
    </div>
  );
}