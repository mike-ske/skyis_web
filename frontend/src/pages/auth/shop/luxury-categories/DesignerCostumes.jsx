import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, ChevronDown, Star } from 'lucide-react';

import Navbar from '../Navbar';
import MarketFooter from '../marketlayout/MarketFooter';
import CartModal from '../CartModal';
import { useCart } from '../../../../contexts/CartContext';
import FilterSystem from '../shared/FilterSystem';

const DesignerCostumes = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());
  const { addToCart } = useCart();
  
  const [activeFilters, setActiveFilters] = useState({
    color: false,
    price: false,
    size: false
  });

  const products = [
    {
      id: 13,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808939/image_61_xajmcw.png",
      alt: "Designer costume white and red",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦850,000.00",
      name: "The Couture Statement",
      title: "The Couture Statement",
      description: "Exquisite designer costume with intricate detailing and premium fabrics"
    },
    {
      id: 14,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808939/image_61_xajmcw.png",
      alt: "Designer evening wear",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦150,000.00",
      name: "The Gala Ensemble",
      title: "The Gala Ensemble",
      description: "Stunning designer costume perfect for high-profile events"
    },
    {
      id: 15,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808939/image_61_xajmcw.png",
      alt: "Haute couture costume",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦1,200,000.00",
      name: "The Runway Icon",
      title: "The Runway Icon",
      description: "Limited edition designer costume from exclusive collection"
    },
    // Add 9 more products to make 12 total
  ];
  const [filteredProducts, setFilteredProducts] = useState(products);
  const toggleWishlist = (e, productId) => {
    e.stopPropagation();
    e.preventDefault();
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    setIsCartOpen(true);
  };

  const toggleFilter = (filterType) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

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
    <div className="bg-white text-gray-900 font-sans">
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      <section className="relative mx-auto">
        <div className="relative overflow-hidden group">
          <img 
            src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808967/image_56_frjxmy.png"
            alt="Designer costumes collection"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent flex flex-col justify-end px-6 pb-16 max-w-[100rem] mx-auto w-full">
          <nav className="text-xs text-gray-100 mb-2 font-semibold">
            <a className="hover:underline cursor-pointer">Luxury</a>
            <span className="mx-1">/</span>
            <span className="text-gray-300">Designer costumes</span>
          </nav>
          <h1 className="text-3xl text-white sm:text-4xl md:text-5xl font-semibold leading-tight">
            Designer Costumes
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-100">
            Explore exclusive designer costumes and haute couture pieces
          </p>
        </div>
      </section>

      <section className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <p className="text-xs text-gray-500 font-semibold tracking-widest mb-1 select-none">
              LISTINGS
            </p>
            <h2 className="text-xl font-semibold">Available Listings</h2>
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0 text-sm text-gray-900 font-semibold">
            <button 
              className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
              onClick={() => toggleFilter('color')}
            >
              <span>Color</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${activeFilters.color ? 'rotate-180' : ''}`} />
            </button>
            <button 
              className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
              onClick={() => toggleFilter('price')}
            >
              <span>Price</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${activeFilters.price ? 'rotate-180' : ''}`} />
            </button>
            <button 
              className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
              onClick={() => toggleFilter('size')}
            >
              <span>Size</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${activeFilters.size ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const routePath =
              product.type === "Rent"
                ? `/productdetail-rent/${product.id}`
                : product.type === "Auction"
                ? `/productdetail-auction/${product.id}`
                : `/productdetail-buy/${product.id}`;

            return (
              <Link
                key={product.id}
                to={routePath}
                state={{ product }}
                className="block"
              >
                <article className="border border-gray-200 rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow">
                  <div className="relative rounded-lg overflow-hidden">
                    <img 
                      alt={product.alt}
                      className="w-full h-80 object-cover rounded-lg" 
                      src={product.image}
                    />
                    <span className={`absolute top-2 left-2 text-xs font-semibold rounded-full px-2 py-0.5 select-none ${product.typeColor}`}>
                      {product.type}
                    </span>
                  </div>
                  
                  <div className="mt-3 flex items-center space-x-1 mb-1">
                    {renderStars(product.rating)}
                    <span className="text-gray-500 text-xs ml-1">({product.rating})</span>
                  </div>
                  
                  <p className="mt-1 font-semibold text-lg leading-tight">{product.price}</p>
                  <h3 className="mt-1 font-semibold text-sm">{product.name}</h3>
                  <p className="mt-1 text-gray-600 text-sm flex-grow">{product.description}</p>
                  
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
                      className="flex items-center space-x-1 border border-gray-300 rounded px-3 py-1 text-xs hover:bg-gray-100 transition-colors"
                    >
                      <ShoppingCart size={12} className="w-3 h-3 text-gray-600" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="max-w-[100rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-10 pt-10">
        <MarketFooter />
      </footer>

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <FilterSystem
        products={filteredProducts}
        onFilterChange={setFilteredProducts}
        availableFilters={{
          categories: ['Wedding', 'Casual', 'Formal'],
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['Black', 'White', 'Blue']
        }}
      />
    </div>
  );
};

export default DesignerCostumes;