// contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const saveTimeoutRef = useRef(null);
  const previousUserIdRef = useRef(null);

  // Get the cart key based on user status
  const getCartKey = useCallback((userId = null) => {
    if (userId) {
      return `cart_items_${userId}`;
    }
    return 'cart_items_guest';
  }, []);

  // Get current user ID
  const getCurrentUserId = useCallback(() => {
    if (!user) return null;
    return user.id || user.user_id || user._id || user.email;
  }, [user]);

  // Load cart from localStorage
  const loadCartFromStorage = useCallback((userId = null) => {
    try {
      const cartKey = getCartKey(userId);
      const savedCart = localStorage.getItem(cartKey);
      
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        console.log(`📦 Loaded cart from ${cartKey}:`, parsed.length, 'items');
        return Array.isArray(parsed) ? parsed : [];
      }
      
      console.log(`📦 No cart found for ${cartKey}`);
      return [];
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return [];
    }
  }, [getCartKey]);

  // Save cart to localStorage with debouncing
  const saveCartToStorage = useCallback((items, userId = null) => {
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce save by 500ms
    saveTimeoutRef.current = setTimeout(() => {
      try {
        const cartKey = getCartKey(userId);
        localStorage.setItem(cartKey, JSON.stringify(items));
        console.log(`💾 Saved cart to ${cartKey}:`, items.length, 'items');
      } catch (error) {
        console.error('Error saving cart to storage:', error);
      }
    }, 500);
  }, [getCartKey]);

  // Sync cart with backend (optional)
  const syncCartWithBackend = useCallback(async (items, userId) => {
    if (!userId) return;

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return;

      const response = await fetch('/api/cart/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Cart synced with backend:', data);
        return data.cart || items;
      }
    } catch (error) {
      console.error('❌ Failed to sync cart with backend:', error);
    }

    return items;
  }, []);

  // Load cart from backend (optional)
  const loadCartFromBackend = useCallback(async (userId) => {
    if (!userId) return null;

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return null;

      const response = await fetch('/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Loaded cart from backend:', data);
        return data.cart || [];
      }
    } catch (error) {
      console.error('❌ Failed to load cart from backend:', error);
    }

    return null;
  }, []);

  // Merge guest cart into user cart
  const mergeGuestCart = useCallback((guestCart, userCart) => {
    console.log('🔀 Merging guest cart into user cart...');
    
    const mergedCart = [...userCart];
    
    guestCart.forEach(guestItem => {
      const existingItemIndex = mergedCart.findIndex(
        item => item.id === guestItem.id
      );
      
      if (existingItemIndex >= 0) {
        // Item exists, add quantities
        mergedCart[existingItemIndex].quantity += guestItem.quantity;
        console.log(`  ➕ Merged ${guestItem.name}: ${guestItem.quantity} + ${mergedCart[existingItemIndex].quantity - guestItem.quantity}`);
      } else {
        // New item, add to cart
        mergedCart.push(guestItem);
        console.log(`  ✨ Added ${guestItem.name} from guest cart`);
      }
    });

    return mergedCart;
  }, []);

  // Initialize cart on mount and user change
  useEffect(() => {
    const initializeCart = async () => {
      setIsLoading(true);
      const userId = getCurrentUserId();
      const previousUserId = previousUserIdRef.current;

      console.log('🚀 Initializing cart...', { userId, previousUserId });

      // Case 1: User just logged in (guest → user)
      if (!previousUserId && userId) {
        console.log('📝 User logged in, merging carts...');
        
        const guestCart = loadCartFromStorage(null);
        let userCart = loadCartFromStorage(userId);
        
        // Try to load from backend first
        const backendCart = await loadCartFromBackend(userId);
        if (backendCart && backendCart.length > 0) {
          userCart = backendCart;
          console.log('✅ Using backend cart');
        }
        
        const mergedCart = mergeGuestCart(guestCart, userCart);
        setCartItems(mergedCart);
        saveCartToStorage(mergedCart, userId);
        
        // Sync with backend
        await syncCartWithBackend(mergedCart, userId);
        
        // Clear guest cart
        localStorage.removeItem(getCartKey(null));
        console.log('🧹 Cleared guest cart');
      }
      // Case 2: User logged out (user → guest)
      else if (previousUserId && !userId) {
        console.log('👋 User logged out, loading guest cart...');
        const guestCart = loadCartFromStorage(null);
        setCartItems(guestCart);
      }
      // Case 3: User switched accounts
      else if (previousUserId && userId && previousUserId !== userId) {
        console.log('🔄 User switched accounts...');
        let newUserCart = loadCartFromStorage(userId);
        
        const backendCart = await loadCartFromBackend(userId);
        if (backendCart && backendCart.length > 0) {
          newUserCart = backendCart;
        }
        
        setCartItems(newUserCart);
      }
      // Case 4: Initial load
      else {
        console.log('📂 Loading cart from storage...');
        let cart = loadCartFromStorage(userId);
        
        // If user is logged in, try backend
        if (userId) {
          const backendCart = await loadCartFromBackend(userId);
          if (backendCart && backendCart.length > 0) {
            cart = backendCart;
            saveCartToStorage(cart, userId);
          }
        }
        
        setCartItems(cart);
      }

      previousUserIdRef.current = userId;
      setIsLoading(false);
    };

    initializeCart();
  }, [
    user, 
    getCurrentUserId, 
    loadCartFromStorage, 
    saveCartToStorage, 
    mergeGuestCart,
    loadCartFromBackend,
    syncCartWithBackend,
    getCartKey
  ]);

  // Save cart whenever it changes
  useEffect(() => {
    if (!isLoading) {
      const userId = getCurrentUserId();
      saveCartToStorage(cartItems, userId);
      
      // Optionally sync with backend
      if (userId) {
        syncCartWithBackend(cartItems, userId);
      }
    }
  }, [cartItems, isLoading, getCurrentUserId, saveCartToStorage, syncCartWithBackend]);

  // Listen for storage events from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      const userId = getCurrentUserId();
      const cartKey = getCartKey(userId);
      
      if (e.key === cartKey && e.newValue) {
        try {
          const updatedCart = JSON.parse(e.newValue);
          console.log('🔄 Cart updated from another tab');
          setCartItems(updatedCart);
        } catch (error) {
          console.error('Error parsing cart from storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [getCurrentUserId, getCartKey]);

  // Add item to cart
  const addToCart = useCallback((item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        console.log(`➕ Increased quantity for ${item.name || item.title}`);
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        console.log(`✨ Added ${item.name || item.title} to cart`);
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((itemId, change) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + change);
          console.log(`🔢 Updated quantity for item ${itemId}: ${newQuantity}`);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  }, []);

  // Remove item from cart
  const removeItem = useCallback((itemId) => {
    setCartItems(prevItems => {
      const item = prevItems.find(i => i.id === itemId);
      if (item) {
        console.log(`🗑️ Removed ${item.name || item.title} from cart`);
      }
      return prevItems.filter(item => item.id !== itemId);
    });
  }, []);

  // Clear entire cart
  const clearCart = useCallback(() => {
    console.log('🧹 Clearing cart');
    setCartItems([]);
    const userId = getCurrentUserId();
    const cartKey = getCartKey(userId);
    localStorage.removeItem(cartKey);
  }, [getCurrentUserId, getCartKey]);

  // Get cart total
  const getCartTotal = useCallback(() => {
    return cartItems.reduce((sum, item) => {
      const price = typeof item.price === 'number' 
        ? item.price 
        : parseFloat(String(item.price).replace(/[₦,]/g, '')) || 0;
      return sum + (price * item.quantity);
    }, 0);
  }, [cartItems]);

  // Get cart count
  const getCartCount = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    isLoading,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    getCartTotal,
    getCartCount,
    cartCount: getCartCount(),
    cartTotal: getCartTotal()
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;