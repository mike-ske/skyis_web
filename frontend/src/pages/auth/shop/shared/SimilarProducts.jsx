import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../../../../contexts/CartContext';

const SimilarProducts = ({ currentProduct, allProducts, products }) => {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState(new Set());
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const productsList = products || allProducts || [];

  // Get all products except current one
  const getSimilarProducts = () => {
    if (!currentProduct || !productsList || productsList.length === 0) {
      return [];
    }

    // Filter out current product and return ALL others
    const filtered = productsList.filter(product => {
      return product.id !== currentProduct.id && 
             product.product_id !== currentProduct.id &&
             product.id !== currentProduct.product_id;
    });

    // Sort by: matching type first, then by category, then by price similarity
    const sorted = filtered.sort((a, b) => {
      const aTypeMatch = a.type?.toLowerCase() === currentProduct.type?.toLowerCase() ? 1 : 0;
      const bTypeMatch = b.type?.toLowerCase() === currentProduct.type?.toLowerCase() ? 1 : 0;
      
      if (aTypeMatch !== bTypeMatch) return bTypeMatch - aTypeMatch;
      
      const aCategoryMatch = a.category?.toLowerCase() === currentProduct.category?.toLowerCase() ? 1 : 0;
      const bCategoryMatch = b.category?.toLowerCase() === currentProduct.category?.toLowerCase() ? 1 : 0;
      
      return bCategoryMatch - aCategoryMatch;
    });

    return sorted;
  };

  const similarProducts = getSimilarProducts();

  // Check scroll position
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, [similarProducts]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  if (similarProducts.length === 0) {
    return null;
  }

  const toggleWishlist = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-3 h-3">
          <Star className="w-3 h-3 text-yellow-400" />
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 absolute top-0 left-0" style={{clipPath: 'inset(0 50% 0 0)'}} />
        </div>
      );
    }

    return stars;
  };

  return (
    <section className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 mt-16 mb-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">You May Also Like</h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {similarProducts.length} {similarProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full border-2 transition-all ${
              canScrollLeft 
                ? 'border-gray-300 hover:border-[#0B7A72] hover:bg-[#0B7A72] hover:text-white text-gray-700' 
                : 'border-gray-200 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-full border-2 transition-all ${
              canScrollRight 
                ? 'border-gray-300 hover:border-[#0B7A72] hover:bg-[#0B7A72] hover:text-white text-gray-700' 
                : 'border-gray-200 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {similarProducts.map((product, index) => {
          const routePath =
            product.type === "Rent"
              ? `/productdetail-rent/${product.id}`
              : product.type === "Auction"
              ? `/productdetail-auction/${product.id}`
              : `/productdetail-buy/${product.id}`;

          return (
            <Link
              key={`${product.id}-${index}`}
              to={routePath}
              state={{ product }}
              className="block flex-shrink-0 w-[280px] sm:w-[320px] animate-slide-in"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <article className="border border-gray-200 rounded-lg p-4 flex flex-col h-full hover:shadow-lg hover:scale-105 transition-all duration-300">
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    alt={product.alt || product.name || product.title}
                    className="w-full h-64 object-cover rounded-lg" 
                    src={product.image}
                  />
                  <span className={`absolute top-2 left-2 text-xs font-semibold rounded-full px-2 py-0.5 select-none ${
                    product.type === 'Rent' ? 'bg-blue-100 text-blue-700' :
                    product.type === 'Auction' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {product.type}
                  </span>
                </div>
                
                <div className="mt-3 flex items-center space-x-1 mb-1">
                  {renderStars(product.rating)}
                  <span className="text-gray-500 text-xs ml-1">({product.rating || 0})</span>
                </div>
                
                <p className="mt-1 font-semibold text-base leading-tight">{product.price}</p>
                <h3 className="mt-1 font-medium text-sm line-clamp-2 flex-grow">{product.title || product.name}</h3>
                
                <div className="mt-3 flex items-center justify-between text-gray-500 text-sm">
                  <button 
                    aria-label="Add to wishlist" 
                    className="hover:text-gray-900 transition-colors"
                    onClick={(e) => toggleWishlist(e, product.id)}
                  >
                    <Heart className={`w-4 h-4 ${wishlist.has(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="flex items-center space-x-1 border border-gray-300 rounded px-2 py-1 text-xs hover:bg-gray-100 transition-colors"
                  >
                    <ShoppingCart size={12} className="w-3 h-3 text-gray-600" />
                    <span>Add To Cart</span>
                  </button>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default SimilarProducts;