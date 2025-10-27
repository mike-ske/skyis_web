
class GoogleAuthService {
  constructor() {
    this.clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    this.isInitialized = false;
    this.authCallback = null;
    this.navigate = null; // Store navigate function
  }

  setAuthCallback(callback) {
    this.authCallback = callback;
  }

  setNavigate(navigateFunc) {
    this.navigate = navigateFunc;
  }

  initialize() {
    return new Promise((resolve, reject) => {
      if (!this.clientId) {
        console.error('Google Client ID is missing');
        reject(new Error('Missing Google Client ID'));
        return;
      }

      console.log('🔐 Initializing Google Auth');

      if (window.google) {
        this.setupGoogle();
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.setupGoogle();
        resolve();
      };
      script.onerror = () => {
        console.error('Failed to load Google Identity Services');
        reject(new Error('Failed to load Google SDK'));
      };
      
      document.head.appendChild(script);
    });
  }

  setupGoogle() {
    if (!window.google || !this.clientId) {
      console.error('Cannot initialize Google Sign-In');
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleAuthResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      this.isInitialized = true;
      console.log('✅ Google Sign-In initialized');
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
    }
  }

  async handleAuthResponse(response) {
    console.log('🔐 Google auth response received');
    
    try {
      const result = await this.sendToBackend(response.credential);
      
      if (result.success && result.data) {
        console.log('✅ Google auth backend successful');
        
        // Update AuthContext state
        if (this.authCallback) {
          const updated = await this.authCallback(result.data);
          
          if (updated) {
            console.log('✅ Auth state updated');
            
            // Navigate using window.location to ensure clean state
            setTimeout(() => {
              window.location.href = '/shopperdashboard/overview';
            }, 100);
          }
        } else {
          console.warn('⚠️ No auth callback registered');
          // Fallback navigation
          setTimeout(() => {
            window.location.href = '/shopperdashboard/overview';
          }, 100);
        }
      } else {
        alert('Authentication failed: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('❌ Google auth error:', error);
      alert('Authentication error: ' + error.message);
    }
  }

  async sendToBackend(credential) {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      
      console.log('📤 Sending credential to backend');
      
      const response = await fetch(`${backendUrl}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
        body: JSON.stringify({ credential }),
      });

      const data = await response.json();
      
      console.log('📥 Backend response:', { success: response.ok, hasToken: !!data.token });

      if (response.ok && data.token && data.user) {
        // Store auth data
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_data', JSON.stringify(data.user));
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userName', data.user.name || '');
        localStorage.setItem('isLoggedIn', 'true');
        
        console.log('✅ Auth data stored in localStorage');
        
        return { 
          success: true, 
          data: {
            token: data.token,
            user: data.user
          }
        };
      } else {
        return { 
          success: false, 
          message: data.message || 'Authentication failed' 
        };
      }
    } catch (error) {
      console.error('❌ Backend request failed:', error);
      return { 
        success: false, 
        message: error.message 
      };
    }
  }

  renderButton(elementId) {
    if (!window.google) {
      console.warn('Google not loaded yet');
      return false;
    }

    const container = document.getElementById(elementId);
    if (!container) {
      console.error('Container element not found:', elementId);
      return false;
    }

    try {
      container.innerHTML = '';

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'w-full py-3 px-4 rounded-[50px] font-medium transition-all duration-200 flex rounded-full items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 shadow-sm hover:shadow-md';
      
      button.innerHTML = `
        <svg class="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span>Continue with Google</span>
      `;

      button.addEventListener('click', () => {
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            console.log('One Tap not displayed, showing alternative');
            this.showGoogleSignInPopup();
          }
        });
      });

      container.appendChild(button);
      return true;
    } catch (error) {
      console.error('Failed to render custom Google button:', error);
      return false;
    }
  }

  showGoogleSignInPopup() {
    const popup = document.createElement('div');
    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      z-index: 9999;
    `;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 9998;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: #666;
    `;
    
    const title = document.createElement('h3');
    title.textContent = 'Sign in with Google';
    title.style.cssText = 'margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600;';
    
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'google-popup-button';
    buttonContainer.style.cssText = 'display: flex; justify-content: center;';

    popup.appendChild(closeBtn);
    popup.appendChild(title);
    popup.appendChild(buttonContainer);
    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    window.google.accounts.id.renderButton(
      buttonContainer,
      {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
      }
    );

    const closePopup = () => {
      document.body.removeChild(overlay);
      document.body.removeChild(popup);
    };

    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
  }
}

export const googleAuthService = new GoogleAuthService();