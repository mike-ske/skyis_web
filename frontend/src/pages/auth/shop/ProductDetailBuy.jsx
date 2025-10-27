import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, Info, Star, CheckCircle, Plus, Minus, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import MarketFooter from "./marketlayout/MarketFooter";
import CartModal from "./CartModal";
import { useCart } from "../../../contexts/CartContext";
import { useProducts } from "../../../contexts/ProductsContext";
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

const ProductDetailBuy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, cartItems, cartCount } = useCart();
  const { allProducts, getProductById } = useProducts();
  
  const productFromState = location.state?.product;

  const [product, setProduct] = useState(productFromState || null);
  const [selectedColor, setSelectedColor] = useState("#1F2D3D");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [showAlert, setShowAlert] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Load product if not in state
  useEffect(() => {
    if (!product && id) {
      const foundProduct = getProductById(parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [id, product, getProductById]);

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    { id: "light-gray", color: "#D9D9D9", name: "Light Gray" },
    { id: "dark-gray-blue", color: "#4B5563", name: "Dark Gray Blue" },
    { id: "beige", color: "#D6CEC3", name: "Beige" },
    { id: "dark-gray", color: "#3F3F3F", name: "Dark Gray" },
  ];

  const productImages = [
    product?.image || "https://via.placeholder.com/400",
    product?.image || "https://via.placeholder.com/400",
    product?.image || "https://via.placeholder.com/400",
    product?.image || "https://via.placeholder.com/400",
  ];

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

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    if (!product || !selectedSize) {
      alert('Please select a size');
      return;
    }

    const price = parseFloat(product?.price?.replace(/[₦,]/g, '')) || 0;

    const item = {
      id: `${product.id}_buy_${selectedSize}_${selectedColor}`,
      productId: product.id,
      title: product.title,
      name: product.title,
      price: price,
      image: product.image,
      type: 'buy',
      quantity: quantity,
      selectedColor: selectedColor,
      selectedSize: selectedSize,
      description: product.description || 'High-quality item crafted to perfection.'
    };

    addToCart(item);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2500);
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++)
      stars.push(
        <Star key={i} size={14} className="fill-orange-400 text-orange-400" />
      );
    if (rating % 1)
      stars.push(<Star key="half" size={14} className="text-orange-400" />);
    return stars;
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
    <div
      className="bg-white text-gray-900"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      <Navbar cartItems={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <AnimatedAlert message="Item added to cart successfully 🎉" show={showAlert} />
      

      <nav className="max-w-[100rem] mx-auto px-6 text-xs text-gray-600 py-3 flex flex-wrap gap-1">
        <button
          onClick={() => navigate("/marketplace")}
          className="text-[#0B7A72] hover:underline"
        >
          Marketplace
        </button>
        <span>/</span>
        <span className="truncate max-w-[60vw]">{product.title}</span>
      </nav>

      <main className="max-w-[100rem] mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row lg:space-x-16 mb-16">
          {/* Left Image Section */}
          <div className="flex flex-col items-center lg:items-start space-y-6 mb-8 lg:mb-0">
            <div className="relative">
              <img
                src={productImages[selectedImageIndex]}
                alt={product.title}
                className="rounded-2xl w-full max-w-[420px] lg:w-[500px] h-[550px] lg:h-[650px] object-cover shadow-lg"
              />
              <span className="absolute top-4 left-4 bg-gray-200 text-gray-700 text-sm px-3 py-1.5 rounded-lg font-semibold shadow-md">
                {product.type || "Buy"}
              </span>
            </div>
            
            <div className="flex space-x-4">
              {productImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`rounded-lg w-[90px] h-[90px] object-cover border-2 cursor-pointer transition-all duration-300 hover:border-[#0B7A72] hover:shadow-md transform hover:scale-105 ${
                    selectedImageIndex === i
                      ? "border-[#0B7A72] ring-2 ring-[#0B7A72] ring-offset-2 shadow-md scale-105"
                      : "border-gray-200"
                  }`}
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

          {/* Product Details */}
          <section className="flex-1 max-w-2xl">
            <h1 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900">
              {product.title}
            </h1>
            <p className="text-sm text-gray-500 mb-3 leading-relaxed">
              {product.description || "High-quality item crafted to perfection."}
            </p>

            <div className="flex items-center text-orange-400 mb-3">
              {renderStars(product.rating || 4.5)}
              <span className="text-sm text-gray-500 ml-2">
                ({product.rating || 4.5})
              </span>
            </div>

            <p className="font-bold text-3xl mb-6 text-gray-900">{product.price}</p>
            <hr className="mb-8" />

            {/* Colors */}
            <div className="mb-8">
              <p className="text-sm font-semibold mb-3 text-gray-900">Choose a Color</p>
              <div className="flex space-x-4">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.color)}
                    style={{ backgroundColor: c.color }}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === c.color
                        ? "border-[#0B7A72] ring-2 ring-[#0B7A72] ring-offset-2"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector with Tooltip */}
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
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`text-sm border-2 rounded-lg px-4 py-2 font-medium transition-all ${
                    selectedSize === s
                      ? "border-[#0B7A72] bg-[#0B7A72] text-white shadow-md"
                      : "border-gray-300 hover:border-[#0B7A72] text-gray-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Quantity */}
            <p className="text-sm font-semibold mb-3 text-gray-900">Quantity</p>
            <div className="flex items-center mb-8">
              <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-3 transition"
                >
                  <Minus size={16} />
                </button>
                <input
                  className="w-16 text-center outline-none text-base font-semibold"
                  type="number"
                  value={quantity}
                  readOnly
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-3 transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              className="w-full bg-[#0B7A72] text-white rounded-full py-4 text-base font-bold flex items-center justify-center hover:bg-[#096860] transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              <ShoppingCart size={20} />
              <span className="ml-2">Buy Now</span>
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
        <MarketFooter />
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
    </div>
  );
};

export default ProductDetailBuy;