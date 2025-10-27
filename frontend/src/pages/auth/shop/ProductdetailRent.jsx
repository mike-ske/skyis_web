import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Star, Info, ShoppingCart, CheckCircle, X, Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import MarketFooter from './marketlayout/MarketFooter';
import CartModal from './CartModal';
import { useCart } from '../../../contexts/CartContext';
import { useProducts } from '../../../contexts/ProductsContext'; // ✅ FIX: Added useProducts import
import SimilarProducts from './shared/SimilarProducts';
import ReviewsSection from './shared/ReviewsSection';

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
              <div className="bg-orange-500 z-10 rounded-full w-24 h-24 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white">
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

const ProductDetailRent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const productFromState = location.state?.product;

  const [product, setProduct] = useState(productFromState || null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rentalDays, setRentalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#1F2D3D');
  const [selectedSize, setSelectedSize] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { addToCart, cartCount } = useCart();
  const { allProducts, getProductById } = useProducts(); // ✅ FIX: Added useProducts hook

  const productImages = [
    product?.image || 'https://via.placeholder.com/400',
    product?.image || 'https://via.placeholder.com/400',
    product?.image || 'https://via.placeholder.com/400',
    product?.image || 'https://via.placeholder.com/400',
  ];

  const colors = [
    { id: 'navy', color: '#1F2D3D', name: 'Navy Blue' },
    { id: 'light-gray', color: '#D9D9D9', name: 'Light Gray' },
    { id: 'dark-gray', color: '#4B5563', name: 'Dark Gray' },
    { id: 'beige', color: '#D6CEC3', name: 'Beige' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const reviews = [
    {
      id: 1,
      initial: 'B',
      name: 'Ayodele Ilesanmi',
      rating: 4.5,
      text: 'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
      date: 'August 21, 2025',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700'
    },
    {
      id: 2,
      initial: 'B',
      name: 'Binaebi Taribo',
      rating: 4.5,
      text: 'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
      date: 'August 21, 2025',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700'
    },
    {
      id: 3,
      initial: 'B',
      name: 'Iheduego Akinyemi',
      rating: 4.5,
      text: 'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
      date: 'August 21, 2025',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-700'
    },
    {
      id: 4,
      initial: 'B',
      name: 'Gbegle Ekuegle',
      rating: 4.3,
      text: 'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
      date: 'August 21, 2025',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700'
    },
    {
      id: 5,
      initial: 'U',
      name: 'Nnameka Nwenu',
      rating: 4.5,
      text: 'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
      date: 'August 21, 2025',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-700'
    }
  ];

  const similarItems = [
    {
      id: 1,
      title: 'The "Da Vinci" charcoal black, metallic jacquard, single lapel, mid cut intersect strap tuxedo suit.',
      price: 'N500,000,000.00',
      rating: 4.6,
      image: 'https://via.placeholder.com/300',
      type: 'Buy'
    },
    {
      id: 2,
      title: 'The "October" 3-piece grey peak lapel jacquard tuxedo suit',
      price: 'N500,000,000.00',
      rating: 4.6,
      image: 'https://via.placeholder.com/300',
      type: 'Buy'
    },
    {
      id: 3,
      title: 'The "October" 3-piece white, deep-v-neck 3-button in-front-peak lapel suit.',
      price: 'N500,000,000.00',
      rating: 4.5,
      image: 'https://via.placeholder.com/300',
      type: 'Buy'
    }
  ];

  // ✅ FIX: Added useEffect to load product if not in state
  useEffect(() => {
    if (!product && id) {
      const foundProduct = getProductById(parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id, product, getProductById]);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      
      if (days > 0) {
        setRentalDays(days);
        const dailyRate = parseFloat(product?.price?.replace(/[₦,]/g, '')) || 500000;
        setTotalPrice(dailyRate * days);
      } else {
        setRentalDays(0);
        setTotalPrice(0);
      }
    }
  }, [startDate, endDate, product]);

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

  const handleRent = () => {
    if (!startDate || !endDate || rentalDays <= 0 || !selectedSize) return;

    const dailyRate = parseFloat(product?.price?.replace(/[₦,]/g, '')) || 500000;
    
    const rentalItem = {
      id: `${product.id}_rent_${Date.now()}`,
      productId: product.id,
      name: product.title,
      title: product.title,
      image: product.image,
      type: 'rent',
      selectedColor,
      selectedSize,
      startDate,
      endDate,
      rentalDays,
      dailyRate,
      price: totalPrice,
      quantity: 1,
      description: `Rental: ${rentalDays} day${rentalDays > 1 ? 's' : ''} (${startDate} to ${endDate})`
    };

    addToCart(rentalItem);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2500);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setIsCartOpen(true);
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
    <div className="bg-white text-gray-900 relative" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <Navbar cartItems={cartCount} onCartClick={() => setIsCartOpen(true)}/>
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
          <div className="flex flex-col items-center lg:items-start space-y-6 mb-8 lg:mb-0">
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={productImages[selectedImageIndex]} 
                alt={product.title} 
                className="rounded-2xl w-full max-w-[420px] lg:w-[500px] h-[550px] lg:h-[650px] object-cover transition-all duration-500 shadow-lg" 
              />
              <span className="absolute top-4 left-4 bg-blue-100 text-blue-700 text-sm px-3 py-1.5 rounded-lg font-semibold shadow-md">
                Rent
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

          <section className="flex-1 max-w-2xl">
            <h1 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900">{product.title}</h1>
            <p className="text-sm text-gray-500 mb-3 leading-relaxed">
              {product.description || 'Premium rental item available for your special occasions.'}
            </p>
            
            <div className="flex items-center text-orange-400 mb-3">
              {renderStars(product.rating || 4.5)}
              <span className="text-sm text-gray-500 ml-2">({product.rating || 4.5})</span>
            </div>
            
            <p className="font-bold text-3xl mb-6 text-gray-900">{product.price}/per day</p>
            <hr className="mb-8" />

            <div className="mb-6">
              <p className="text-sm font-semibold mb-3 text-gray-900">Choose a Color</p>
              <div className="flex space-x-4">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    aria-label={`Color option ${color.name}`}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.color 
                        ? 'border-[#0B7A72] ring-2 ring-[#0B7A72] ring-offset-2' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.color }}
                    onClick={() => setSelectedColor(color.color)}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mb-4 relative">
              <p className="text-sm font-semibold text-gray-900">Select Size</p>
              <div
                className="flex items-center text-sm text-gray-500 space-x-1 cursor-pointer relative"
                onMouseEnter={() => setShowSizeGuide(true)}
                onMouseLeave={() => setShowSizeGuide(false)}
              >
                <span>Size Guide</span>
                <Info size={14} />
                <SizeGuideTooltip show={showSizeGuide} />
              </div>
            </div>
            
            <div className="flex space-x-3 mb-8">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`text-sm border-2 rounded-lg px-4 py-2 font-medium transition-all ${
                    selectedSize === size 
                      ? 'border-[#0B7A72] bg-[#0B7A72] text-white shadow-md' 
                      : 'border-gray-300 hover:border-[#0B7A72] text-gray-700'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="mb-8 bg-gray-50 rounded-xl p-6">
              <p className="text-base font-semibold mb-4 flex items-center text-gray-900">
                <Calendar size={18} className="mr-2 text-[#0B7A72]" />
                Select Rental Period
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={getTodayDate()}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-2">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || getTodayDate()}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B7A72] focus:border-transparent"
                  />
                </div>
              </div>

              {rentalDays > 0 && (
                <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-600">Rental Duration:</span>
                    <span className="font-semibold">{rentalDays} day{rentalDays > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between text-base pt-3 border-t border-gray-200">
                    <span className="font-semibold">Total Price:</span>
                    <span className="font-bold text-[#0B7A72] text-lg">₦{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            <button
              className="w-full bg-[#0B7A72] text-white rounded-full py-4 text-base font-bold flex items-center justify-center space-x-2 hover:bg-[#096860] transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              onClick={handleRent}
              disabled={loading || !startDate || !endDate || rentalDays <= 0 || !selectedSize}
            >
              <ShoppingCart size={20} />
              <span>{loading ? 'Adding...' : 'Add To Cart'}</span>
            </button>
          </section>
        </div>

        {/* Product Reviews Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-start mb-3">
                  <div className={`${review.bgColor} rounded-full w-12 h-12 flex items-center justify-center ${review.textColor} font-bold text-lg mr-3`}>
                    {review.initial}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <div className="flex text-orange-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < Math.floor(review.rating) ? "fill-orange-400" : ""} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({review.rating})</span>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{review.text}</p>
                <p className="text-xs text-gray-400">{review.date}</p>
              </div>
            ))}
          </div>
        </section>

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

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={[]}
        updateQuantity={() => {}}
        removeItem={() => {}}
        onCheckout={() => navigate('/checkout')}
      />
    </div>
  );
};

export default ProductDetailRent;