import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function EmailVerifyHandler() {
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      // Get verification parameters from URL
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      const hash = params.get('hash');
      const expires = params.get('expires');
      const signature = params.get('signature');

      if (!id || !hash || !expires || !signature) {
        setStatus('error');
        setMessage('Invalid verification link');
        return;
      }

      const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
      
      const response = await fetch(
        `${apiUrl}/api/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include',
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Email verified successfully!');
        
        // Store auth data if provided
        if (data.token && data.user) {
          localStorage.setItem('auth_token', data.token);
          localStorage.setItem('user_data', JSON.stringify(data.user));
          localStorage.setItem('userEmail', data.user.email);
          localStorage.setItem('userName', data.user.name || '');
          localStorage.setItem('isLoggedIn', 'true');
        }

        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = data.redirect || '/verification-success';
        }, 2000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Verification failed');
        
        // Redirect to error page after 3 seconds
        setTimeout(() => {
          window.location.href = data.redirect || '/invalid-token';
        }, 3000);
      }
    } catch (error) {
      console.error('Verification error:', error);
      setStatus('error');
      setMessage('An error occurred during verification');
      
      setTimeout(() => {
        window.location.href = '/invalid-token';
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {status === 'verifying' && (
          <>
            <Loader2 className="w-16 h-16 text-teal-600 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verifying Your Email
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your email address...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Email Verified!
            </h2>
            <p className="text-gray-600 mb-4">
              {message}
            </p>
            <p className="text-sm text-gray-500">
              Redirecting you to your dashboard...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-4">
              {message}
            </p>
            <p className="text-sm text-gray-500">
              Redirecting you...
            </p>
          </>
        )}
      </div>
    </div>
  );
}