// ==========================================
// 1. UPDATED API UTILITY (utils/api.js)
// ==========================================

const API_BASE_URL = 'http://localhost:8000/api';

// CSRF token setup
export const setupCSRF = async () => {
  try {
    const baseUrl = 'http://localhost:8000';
    const csrfUrl = `${baseUrl}/sanctum/csrf-cookie`;
    
    await fetch(csrfUrl, {
      method: 'GET',
      credentials: 'include',
    });
  } catch (error) {
    console.warn('CSRF setup failed:', error);
  }
};

// API request helper
export const apiRequest = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };

  const token = localStorage.getItem('auth_token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: 'include',
    });

    const contentType = response.headers.get('content-type');
    let data = {};

    if (contentType?.includes('application/json')) {
      const text = await response.text();
      if (text.trim()) {
        data = JSON.parse(text);
      }
    }

    if (!response.ok) {
      // Create detailed error for validation failures
      const error = new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      error.response = { status: response.status, data };
      throw error;
    }

    return { data, response };
  } catch (error) {
    console.error('API Request failed:', {
      url,
      error: error.message,
      response: error.response
    });
    throw error;
  }
};