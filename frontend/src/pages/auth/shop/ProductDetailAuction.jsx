import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Clock, Star, CheckCircle, XCircle, AlertCircle, Loader, X, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import MarketFooter from './marketlayout/MarketFooter';
import { useAuth } from '../../../contexts/AuthContext';
import { useProducts } from '../../../contexts/ProductsContext';
import { AnimatePresence, motion } from 'framer-motion';
import SimilarProducts from './shared/SimilarProducts';
import ReviewsSection from './shared/ReviewsSection';
import { useCart } from '../../../contexts/CartContext';
import CartModal from './CartModal';

// ✅ Animated Alert Component
const AnimatedAlert = ({ message, show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-[#0B7A72] text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 z-[9999]"
      >
        <CheckCircle size={18} />
        <span className="text-sm font-medium">{message}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

// ✅ Tooltip for Size Guide
const SizeGuideTooltip = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3 }}
        className="absolute top-5 right-0 bg-white border border-gray-200 text-gray-600 text-xs p-3 rounded-lg shadow-lg w-48 z-10"
      >
        <p className="font-semibold text-gray-700 mb-1">Size Guide</p>
        <p>XS – Extra Small</p>
        <p>S – Small</p>
        <p>M – Medium</p>
        <p>L – Large</p>
        <p>XL – Extra Large</p>
        <p>XXL – Double Extra Large</p>
      </motion.div>
    )}
  </AnimatePresence>
);

// ✅ Profile Modal Component
const ProfileModal = ({ isOpen, onClose, profile }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[9999] overflow-y-auto"
        >
          {/* Header with Background Image */}
          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800" 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-700" />
            </button>
          </div>

          {/* Profile Content */}
          <div className="px-6 pb-8">
            {/* Profile Avatar & Info */}
            <div className="flex items-start z-10 -mt-12 mb-6">
              <div className="bg-orange-500 rounded-full w-24 h-24 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white">
                T
              </div>
              <div className="ml-auto mt-16 flex gap-2">
                <button className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Message
                </button>
                <button className="px-6 py-2 bg-[#0B7A72] text-white rounded-lg text-sm font-medium hover:bg-[#096860] transition-colors">
                  Follow
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Tena Gopregha</h2>
              <p className="text-gray-600 mb-2">Fashion Designer based in Lagos.</p>
              <button className="text-[#0B7A72] text-sm font-medium underline hover:text-[#096860]">
                View my catalogue
              </button>
            </div>

            {/* Experience Section */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Experience</h3>
              <p className="text-sm text-gray-600">
                I specialise in UX/UI design, brand strategy, and Webflow development.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-gray-900 mb-1">20</p>
                <p className="text-sm text-gray-600">Active listings</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-gray-900 mb-1">6</p>
                <p className="text-sm text-gray-600">Sold</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-gray-900 mb-1">89</p>
                <p className="text-sm text-gray-600">Reviews</p>
              </div>
            </div>

            {/* Top Review */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Top review</h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-start mb-3">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-blue-700 font-semibold text-sm mr-3">
                    B
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <div className="flex text-orange-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < 4 ? "fill-orange-400" : ""} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">(4.5)</span>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">Ayodele Ilesanmi</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.
                </p>
                <p className="text-xs text-gray-400">August 21, 2025</p>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// Alert Modal Component
const AlertModal = ({ type, title, message, onClose, onConfirm, showCancel = false }) => {
  const icons = {
    success: <CheckCircle className="w-16 h-16 text-green-500" />,
    error: <XCircle className="w-16 h-16 text-red-500" />,
    warning: <AlertCircle className="w-16 h-16 text-amber-500" />,
    loading: <Loader className="w-16 h-16 text-blue-500 animate-spin" />
  };

  const bgColors = {
    success: 'from-green-50 to-emerald-50',
    error: 'from-red-50 to-rose-50',
    warning: 'from-amber-50 to-yellow-50',
    loading: 'from-blue-50 to-sky-50'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
      onClick={type !== 'loading' ? onClose : undefined}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: -50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 50 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className={`relative bg-white ${bgColors[type]} rounded-2xl shadow-2xl max-w-md w-full p-8`}
        onClick={(e) => e.stopPropagation()}
      >
        {type !== 'loading' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          {icons[type]}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-800 text-center mb-3"
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-center mb-6"
          dangerouslySetInnerHTML={{ __html: message }}
        />

        {type !== 'loading' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3 justify-center"
          >
            {showCancel && (
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Cancel
              </button>
            )}
            <button
              onClick={onConfirm || onClose}
              className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg ${
                type === 'success' 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : type === 'error'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : type === 'warning'
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-[#0B7A72] hover:bg-[#096860] text-white'
              }`}
            >
              {showCancel ? 'Confirm' : 'Okay'}
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Success Toast Component
const SuccessToast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className="fixed top-6 right-6 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl max-w-md flex items-center gap-3"
    >
      <CheckCircle className="w-6 h-6 flex-shrink-0" />
      <div dangerouslySetInnerHTML={{ __html: message }} />
      <button onClick={onClose} className="ml-4 hover:bg-white/20 rounded-full p-1 transition-colors">
        <X className="w-4 h-4" />
      </button>
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 3, ease: "linear" }}
        className="absolute bottom-0 left-0 h-1 bg-white/30"
      />
    </motion.div>
  );
};

const ProductDetailAuction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const productFromState = location.state?.product;
  const [alert, setAlert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [product, setProduct] = useState(productFromState || null);
  const [auction, setAuction] = useState(null);
  const [bid, setBid] = useState('');
  const { 
      cartItems, 
      getCartTotal, 
      clearCart,
      updateQuantity, 
      removeItem, 
      cartCount 
    } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [bids, setBids] = useState([
    { name: 'Binaebi Taribo', amount: 512000, date: 'August 21, 12:30' },
    { name: 'Ifedolapo Akinyemi', amount: 512000, date: 'August 21, 12:25' },
    { name: 'Ayodele Ilesanmi', amount: 501000, date: 'August 21, 12:21' }
  ]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { isAuthenticated, isInitialized, user } = useAuth();
  const { allProducts, getProductById } = useProducts(); // ✅ FIX: Added useProducts hook
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({ days: 2, hours: 5, minutes: 30 });

  const productImages = [
    product?.image || 'https://via.placeholder.com/400',
    product?.image || 'https://via.placeholder.com/400',
    product?.image || 'https://via.placeholder.com/400',
    product?.image || 'https://via.placeholder.com/400',
  ];
  const API_BASE_URL = 'http://127.0.0.1:8000';
 
  // Load product if not in state - ✅ FIX: Added this useEffect to load product
  useEffect(() => {
    if (!product && id) {
      const foundProduct = getProductById(parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id, product, getProductById]);

  // Fetch auction data when component mounts
  useEffect(() => {
    const fetchAuctionData = async () => {
      if (!id) return;

      const token = localStorage.getItem('auth_token');
      if (!token) return;

      try {
        // Fetch auction details from backend
        const response = await fetch(`${API_BASE_URL}/api/auctions/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (response.ok) {
          const data = await response.json();
          setAuction(data);
          
          // If auction has bids, update the bids list
          if (data.bids && data.bids.length > 0) {
            const formattedBids = data.bids.map(b => ({
              name: b.user?.name || 'Anonymous',
              amount: b.amount,
              date: new Date(b.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) + ', ' + 
                    new Date(b.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
            }));
            setBids(formattedBids);
          }
        }
      } catch (error) {
        console.error('Error fetching auction:', error);
      }
    };

    fetchAuctionData();
  }, [id]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate('/login');
    }
  }, [isInitialized, isAuthenticated, navigate]);

  if (!isInitialized) {
    return <div className="text-center py-10">Checking authentication...</div>;
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={14} className="fill-orange-400 text-orange-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" size={14} className="text-orange-400" />);
    }

    return stars;
  };

  const placeBid = async () => {
    if (!isAuthenticated) {
      setAlert({
        type: 'warning',
        title: 'Login Required',
        message: 'Please login to place a bid on this item',
        showCancel: true,
        onConfirm: () => {
          localStorage.setItem('redirectAfterLogin', location.pathname);
          setAlert(null);
          navigate('/login', { 
            state: { 
              message: 'Please login to place a bid',
              from: location.pathname 
            } 
          });
        }
      });
      return;
    }

    const token = localStorage.getItem('auth_token');
    if (!token) {
      setAlert({
        type: 'error',
        title: 'Session Expired',
        message: 'Your session has expired. Please login again to continue bidding.',
        onConfirm: () => {
          setAlert(null);
          navigate('/login');
        }
      });
      return;
    }

    const bidAmount = Number(bid);
    const currentHighest = bids[0]?.amount || 0;
    const minimumBid = currentHighest + 1000;

    // Validate bid amount
    if (!bid || bid === '' || isNaN(bidAmount) || bidAmount <= 0) {
      setAlert({
        type: 'error',
        title: 'Invalid Bid Amount',
        message: '<p class="text-lg">Please enter a valid bid amount</p>',
        onConfirm: () => setAlert(null)
      });
      return;
    }

    if (Number(bidAmount) < minimumBid) {
      setAlert({
        type: 'error',
        title: 'Bid Too Low',
        message: `<p class="text-lg">Your bid must be at least <strong class="text-red-600">₦${minimumBid.toLocaleString()}</strong></p><p class="text-sm text-gray-500 mt-2">Current highest bid: ₦${currentHighest.toLocaleString()}</p>`,
        onConfirm: () => setAlert(null)
      });
      return;
    }

    // Get product ID - try multiple sources
    const productId = id || product?.id || product?.product_id || auction?.product_id;
    
    console.log('🔍 Debug Info:', {
      urlId: id,
      product: product,
      auction: auction,
      productId: productId,
      bidAmount: bidAmount
    });

    if (!productId) {
      setAlert({
        type: 'error',
        title: 'Product Error',
        message: 'Unable to identify the product. Please refresh the page and try again.',
        onConfirm: () => setAlert(null)
      });
      return;
    }

    // Show loading state
    setAlert({
      type: 'loading',
      title: 'Placing Your Bid...',
      message: 'Please wait while we process your bid'
    });

    setLoading(true);

    try {
      const requestBody = {
        product_id: parseInt(productId),
        amount: parseFloat(bidAmount)
      };

      console.log('📤 Sending bid request:', requestBody);
      console.log('🔑 Token:', token ? 'Present' : 'Missing');

      const response = await fetch(`${API_BASE_URL}/api/auctions/bid`, {
        method: 'POST', // ✅ FIX: Changed from GET to POST
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      console.log('📥 Response Status:', response.status);
      console.log('📥 Response Data:', responseData);

      if (response.ok) {
        const now = new Date();
        const newBid = {
          name: 'You',
          amount: bidAmount,
          date: now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) + ', ' + 
                now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
        };
        setBids([newBid, ...bids]);
        setBid('');
        
        // Show success toast
        setAlert({
          type: 'success',
          title: 'Bid Placed Successfully!',
          message: `<p class="text-lg">Your bid of <strong class="text-white">₦${bidAmount.toLocaleString()}</strong> has been placed successfully!</p>`,
          isToast: true
        });
      } else {
        // Handle validation errors
        let errorMessage = responseData.message || 'Failed to place bid. Please try again.';
        
        if (responseData.errors) {
          // Format validation errors nicely
          const errorsList = Object.entries(responseData.errors)
            .map(([field, messages]) => {
              const msgs = Array.isArray(messages) ? messages : [messages];
              return msgs.join(', ');
            })
            .join('<br>');
          
          errorMessage = `<p class="text-base mb-2">${responseData.message}</p><p class="text-sm text-gray-600">${errorsList}</p>`;
        }

        // Special handling for auction not found
        if (response.status === 404) {
          errorMessage = '<p class="text-lg">This product is not available for auction.</p><p class="text-sm text-gray-600 mt-2">The auction may have ended or been removed.</p>';
        }

        setAlert({
          type: 'error',
          title: response.status === 404 ? 'Auction Not Found' : 'Bid Failed',
          message: errorMessage,
          onConfirm: () => setAlert(null)
        });
      }
    } catch (error) {
      console.error('❌ Bid error:', error);
      setAlert({
        type: 'error',
        title: 'Connection Error',
        message: 'Failed to place bid. Please check your internet connection and try again.',
        onConfirm: () => setAlert(null)
      });
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B7A72] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900" style={{ fontFamily: 'system-ui, sans-serif' }}>
      
      <Navbar cartItems={cartCount} onCartClick={() => setIsCartOpen(true)}  />
      <AnimatedAlert message="Item added to cart successfully 🎉" show={showAlert} />
      

      <nav className="max-w-[100rem] mx-auto px-6 text-xs text-gray-600 py-3 flex flex-wrap gap-1">
        <button onClick={() => navigate('/marketplace')} className="text-[#0B7A72] hover:underline">
          Marketplace
        </button>
        <span>/</span>
        <span className="truncate max-w-[60vw]">{product.title}</span>
      </nav>

      <main className="max-w-[100rem] mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row lg:space-x-16 mb-16">
          {/* Left Images */}
          <div className="flex flex-col items-center lg:items-start space-y-6 mb-8 lg:mb-0">
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={productImages[selectedImageIndex]} 
                alt={product.title} 
                className="rounded-2xl w-full max-w-[420px] lg:w-[500px] h-[550px] lg:h-[650px] object-cover shadow-lg" 
              />
              <span className="absolute top-4 left-4 bg-orange-100 text-orange-700 text-sm px-3 py-1.5 rounded-lg font-semibold shadow-md">
                Auction
              </span>
            </div>
            
            <div className="flex space-x-4">
              {productImages.slice(1).map((img, i) => (
                <img 
                  key={i + 1} 
                  src={img} 
                  onClick={() => setSelectedImageIndex(i + 1)} 
                  className={`rounded-lg w-[90px] h-[90px] object-cover border-2 cursor-pointer transition-all duration-300 hover:border-[#0B7A72] hover:shadow-md transform hover:scale-105 ${
                    selectedImageIndex === i + 1 
                      ? 'border-[#0B7A72] ring-2 ring-[#0B7A72] ring-offset-2 shadow-md scale-105' 
                      : 'border-gray-200'
                  }`}
                  alt={`Thumbnail ${i + 1}`}
                />
              ))}
            </div>

            {/* Vendor Profile Card */}
            <div className="bg-orange-50 rounded-xl p-5 w-full max-w-[420px] lg:w-[500px] mt-6">
              <div className="flex items-center mb-3">
                <div className="bg-orange-500 rounded-full w-14 h-14 flex items-center justify-center text-white text-xl font-bold mr-4">
                  T
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-base">Tena Gopregha</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="flex text-orange-400 mr-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-orange-400" />
                      ))}
                    </span>
                    <span>(4.3) • 40 reviews</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsProfileOpen(true)}
                className="text-[#0B7A72] text-sm font-medium hover:underline flex items-center"
              >
                View profile
                <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>

          {/* Right Product Info */}
          <section className="flex-1 max-w-2xl">
            <h1 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900">{product.title}</h1>
            <p className="text-sm text-gray-500 mb-3 leading-relaxed">
              {product.description || 'Exclusive auction item with limited availability.'}
            </p>
            
            <div className="flex items-center text-orange-400 mb-3">
              {renderStars(product.rating || 4.5)}
              <span className="text-sm text-gray-500 ml-2">({product.rating || 4.5})</span>
            </div>
            
            <p className="font-bold text-3xl mb-6 text-gray-900">
              Current bid: ₦{bids[0]?.amount?.toLocaleString()}
            </p>

            <div className="flex items-center text-red-600 mb-6 bg-red-50 rounded-lg px-4 py-3">
              <Clock size={18} className="mr-2" />
              <span className="text-base font-semibold">
                Auction ends in {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m
              </span>
            </div>
            
            <hr className="mb-8" />

            <div className="mb-8">
              <label className="text-sm font-semibold mb-3 block text-gray-900">Place Your Bid</label>
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₦</span>
                  <input
                    type="number"
                    placeholder={`Minimum ₦${((bids[0]?.amount || 0) + 1000).toLocaleString()}`}
                    value={bid}
                    onChange={(e) => setBid(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-xl px-10 py-4 text-base focus:outline-none focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent"
                  />
                </div>
                <button 
                  className="bg-[#0B7A72] text-white rounded-xl px-8 py-4 text-base font-semibold hover:bg-[#096860] transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg whitespace-nowrap"
                  onClick={placeBid}
                  disabled={loading}
                >
                  {loading ? 'Placing...' : 'Place Bid'}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Next minimum bid: ₦{((bids[0]?.amount || 0) + 1000).toLocaleString()}
              </p>
            </div>

            <div className="mt-8 bg-gray-50 rounded-xl p-6">
              <h3 className="text-base font-semibold mb-4 flex items-center text-gray-900">
                <span className="bg-[#0B7A72] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3">
                  {bids.length}
                </span>
                Recent Bids
              </h3>
              <ul className="space-y-4 max-h-[300px] overflow-y-auto">
                {bids.map((b, i) => (
                  <li key={i} className="flex justify-between items-center text-sm border-b border-gray-200 pb-3 last:border-0">
                    <div>
                      <span className={`font-semibold ${b.name === 'You' ? 'text-[#0B7A72]' : 'text-gray-700'}`}>
                        {b.name}
                      </span>
                      <p className="text-gray-400 text-xs mt-1">{b.date}</p>
                    </div>
                    <span className="font-bold text-gray-900 text-base">₦{b.amount.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <ReviewsSection productId={product.id} />        

        {/* Similar Products Section */}
        {allProducts.length > 0 && (
          <SimilarProducts 
            currentProduct={product} 
            products={allProducts} 
          />
        )}

        <footer className="max-w-[100rem] mx-auto pt-20">
          <MarketFooter />
        </footer>
      </main>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)}
        profile={{
          name: 'Tena Gopregha',
          title: 'Fashion Designer based in Lagos.',
          initial: 'T'
        }}
      />

     {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={() => {}}
        removeItem={() => {}}
        onCheckout={() => navigate("/checkout", { state: { cartItems } })}
      />
      {/* Alert Modals */}
      <AnimatePresence>
        {alert && (
          alert.isToast ? (
            <SuccessToast
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          ) : (
            <AlertModal
              type={alert.type}
              title={alert.title}
              message={alert.message}
              showCancel={alert.showCancel}
              onClose={() => setAlert(null)}
              onConfirm={alert.onConfirm}
            />
          )
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailAuction;