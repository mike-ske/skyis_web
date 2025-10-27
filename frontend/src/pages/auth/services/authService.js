

// // ==========================================
// // 2. FIXED AUTH SERVICE WITH COMPLETE TOKEN HANDLING
// // ==========================================

// // File: services/authService.js
// import { apiRequest, setupCSRF } from '../utils/api';

// export const authService = {
//   // Login user
//   async login(credentials) {
//     await setupCSRF();
    
//     try {
//       const { data } = await apiRequest('/login', {
//         method: 'POST',
//         body: JSON.stringify(credentials),
//       });
      
//       if (data.token && data.user) {
//         this.setAuthData(data);
//         return data;
//       }
      
//       throw new Error('Invalid login response from server');
//     } catch (error) {
//       console.error('Login service error:', error);
//       throw error;
//     }
//   },

//     // Initiate Google authentication
//   initiateGoogleAuth() {
//     const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
//     const googleAuthUrl = `${backendUrl}/auth/google`;
//     window.location.href = googleAuthUrl;
//   },

//   // Handle Google auth callback
//   handleGoogleCallback(token, userData) {
//     if (token && userData) {
//       this.setAuthData({
//         token,
//         user: typeof userData === 'string' ? JSON.parse(userData) : userData
//       });
//       return true;
//     }
//     return false;
//   },


//   // Register user
//   async register(userData) {
//     await setupCSRF();
    
//     try {
//       const { data } = await apiRequest('/register', {
//         method: 'POST',
//         body: JSON.stringify(userData),
//       });
      
//       if (data.token && data.user) {
//         this.setAuthData(data);
//       }
      
//       return data;
//     } catch (error) {
//       console.error('Registration service error:', error);
//       throw error;
//     }
//   },

//   // Logout user
//   async logout() {
//     try {
//       const token = localStorage.getItem('auth_token');
      
//       if (token) {
//         await apiRequest('/logout', { method: 'POST' });
//       }
//     } catch (error) {
//       console.warn('Logout API call failed:', error);
//     } finally {
//       // Always clear local data even if API fails
//       this.clearAuthData();
//     }
//   },

//   // Get current user
//   async getCurrentUser() {
//     try {
//       const { data } = await apiRequest('/user');
//       return data;
//     } catch (error) {
//       console.error('Get user failed:', error);
//       this.clearAuthData();
//       throw error;
//     }
//   },


//   // Send password reset email
//   async forgotPassword(email) {
//     await setupCSRF();
//     const { data } = await apiRequest('/forgot-password', {
//       method: 'POST',
//       body: JSON.stringify({ email }),
//     });
//     return data;
//   },

//   // Reset password
//   async resetPassword(resetData) {
//     await setupCSRF();
//     const { data } = await apiRequest('/reset-password', {
//       method: 'POST',
//       body: JSON.stringify(resetData),
//     });
//     return data;
//   },

//   // Verify email
//   async verifyEmail(verificationUrl) {
//     const { data } = await apiRequest(verificationUrl);
//     if (data.token) {
//       this.setAuthData(data);
//     }
//     return data;
//   },

//   // Resend verification email
//   async resendVerification(email) {
//     const { data } = await apiRequest('/email/verification-notification', {
//       method: 'POST',
//       body: JSON.stringify({ email }),
//     });
//     return data;
//   },

//   // Update profile
//   async updateProfile(profileData) {
//     const { data } = await apiRequest('/user', {
//       method: 'PUT',
//       body: JSON.stringify(profileData),
//     });
//     return data;
//   },

//   // Change password
//   async changePassword(passwordData) {
//     const { data } = await apiRequest('/change-password', {
//       method: 'POST',
//       body: JSON.stringify(passwordData),
//     });
    
//     if (data.token) {
//       localStorage.setItem('auth_token', data.token);
//     }
//     return data;
//   },


//   // Check authentication status
//   async checkAuthStatus() {
//     try {
//       const token = localStorage.getItem('auth_token');
      
//       if (!token) {
//         return null;
//       }

//       const { data } = await apiRequest('/user');
//       return data;
//     } catch (error) {
//       console.error('Auth status check failed:', error);
//       this.clearAuthData();
//       return null;
//     }
//   },

//   // Set authentication data
//   setAuthData(authData) {
//     localStorage.setItem('isLoggedIn', 'true');
//     localStorage.setItem('auth_token', authData.token);
//     localStorage.setItem('user_data', JSON.stringify(authData.user));
    
//     if (authData.user.email) {
//       localStorage.setItem('userEmail', authData.user.email);
//     }
//     if (authData.user.name) {
//       localStorage.setItem('userName', authData.user.name);
//     }
//   },

//   // Clear all authentication data
//   clearAuthData() {
//     const keysToRemove = [
//       'isLoggedIn',
//       'auth_token',
//       'user_data',
//       'userEmail',
//       'userName',
//       'auth_user',
//       'authUser',
//       'user'
//     ];
    
//     keysToRemove.forEach(key => localStorage.removeItem(key));
//   },

//   // Check if authenticated
//   isAuthenticated() {
//     const token = localStorage.getItem('auth_token');
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     return token && isLoggedIn === 'true';
//   },

//   // Get user from localStorage
//   getUser() {
//     const userData = localStorage.getItem('user_data');
//     return userData ? JSON.parse(userData) : null;
//   }
// };

// services/authService.js
import { apiRequest, setupCSRF } from '../utils/api';


// Main authService object
export const authService = {
  // Register user
  async register(userData) {
    await setupCSRF();
    
    try {
      const response = await apiRequest('/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      
      return response.data;
    } catch (error) {
      if (error.message.includes('409')) {
        throw new Error('An account with this email already exists');
      } else if (error.message.includes('422')) {
        throw new Error('Please check your input and try again');
      } else {
        throw error;
      }
    }
  },

  // Login user
  async login(credentials) {
    await setupCSRF();
    
    try {
      const response = await apiRequest('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      const data = response.data;
      
      if (data.token) {
        this.setAuthData(data);
      }
      
      return data;
    } catch (error) {
      this.clearAuthData();
      
      if (error.message?.includes('401')) {
        throw new Error('Invalid email or password');
      } else if (error.message?.includes('422')) {
        throw new Error('Please check your input and try again');
      } else {
        throw new Error('Login failed. Please check your connection.');
      }
    }
  },

  // Logout user
  async logout() {
    try {
      await apiRequest('/logout', { 
        method: 'POST',
      });
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      this.clearAuthData();
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const response = await apiRequest('/user');
      return response.data.user || response.data;
    } catch (error) {
      this.clearAuthData();
      throw error;
    }
  },

  // Check auth status
  async checkAuthStatus() {
    try {
      const user = await this.getCurrentUser();
      return { user, authenticated: true };
    } catch (error) {
      return { user: null, authenticated: false };
    }
  },

  // ========== HELPER METHODS ==========
  
  // Set authentication data
  setAuthData(authData) {
    if (authData.token && authData.user) {
      localStorage.setItem('auth_token', authData.token);
      localStorage.setItem('user_data', JSON.stringify(authData.user));
      localStorage.setItem('auth_timestamp', Date.now().toString());
    }
  },

  // Clear all authentication data
  clearAuthData() {
    const itemsToRemove = [
      'auth_token',
      'user_data', 
      'auth_timestamp',
      'isLoggedIn',
      'userEmail',
      'userName'
    ];
    
    itemsToRemove.forEach(item => localStorage.removeItem(item));
    console.log('🧹 All auth data cleared from storage');
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  },

  // Get user token
  getToken() {
    return localStorage.getItem('auth_token');
  },

  // Get user data
  getUser() {
    try {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      this.clearAuthData();
      return null;
    }
  }
};