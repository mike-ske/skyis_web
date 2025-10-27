import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import MarketFooter from '../marketlayout/MarketFooter';
import CartModal from '../CartModal';
import { useCart } from '../../../../contexts/CartContext';
import FilterSystem from '../shared/FilterSystem';

import { 
  Search, 
  User, 
  ShoppingCart, 
  Heart, 
  ChevronDown, 
  ArrowRight,
  Star
} from 'lucide-react';

const BridalAccessories = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart } = useCart();


  const [activeFilters, setActiveFilters] = useState({
    color: false,
    price: false,
    size: false
  });

  const products = [
    {
      id: 1,
      image: "https://storage.googleapis.com/a1aa/image/0ed8adf9-0d00-4cb6-a338-07880d69f3c0.jpg",
      alt: "Diamond ring set on white background with white rose blurred behind",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦250,000.00",
      name: "The Royal Solitaire Set",
      title: "The Royal Solitaire Set",
      description: "Vintage-inspired bridal jewelry set with intricate filigree work and precious gemstones"
    },
    {
      id: 3,
      image: "https://storage.googleapis.com/a1aa/image/0ed8adf9-0d00-4cb6-a338-07880d69f3c0.jpg",
      alt: "Diamond ring set on white background with white rose blurred behind",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦45,000.00",
      name: "The Classic Trio",
      title: "The Classic Trio",
      description: "Timeless three-piece bridal set with engagement ring, wedding band, and eternity ring"
    },
    {
      id: 4,
      image: "https://storage.googleapis.com/a1aa/image/daf1fb26-c4db-4037-9d1b-2d7870dcffa4.jpg",
      alt: "Bridal sets and accessories displayed on beige velvet pads with gold background",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦320,000.00",
      name: "The Empress Suite",
      title: "The Empress Suite",
      description: "Luxury bridal jewelry collection with necklace, earrings, bracelet, and tiara"
    },
    {
      id: 5,
      image: "https://storage.googleapis.com/a1aa/image/0ed8adf9-0d00-4cb6-a338-07880d69f3c0.jpg",
      alt: "Diamond ring set on white background with white rose blurred behind",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦195,000.00",
      name: "The Infinity Set",
      title: "The Infinity Set",
      description: "Modern infinity-design bridal rings with continuous diamond settings"
    },
    {
      id: 6,
      image: "https://storage.googleapis.com/a1aa/image/daf1fb26-c4db-4037-9d1b-2d7870dcffa4.jpg",
      alt: "Bridal sets and accessories displayed on beige velvet pads with gold background",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦55,000.00",
      name: "The Glamour Package",
      title: "The Glamour Package",
      description: "Complete bridal accessories set including jewelry, hair accessories, and keepsake box"
    },
    {
      id: 7,
      image: "https://storage.googleapis.com/a1aa/image/0ed8adf9-0d00-4cb6-a338-07880d69f3c0.jpg",
      alt: "Diamond ring set on white background with white rose blurred behind",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦420,000.00",
      name: "The Princess Collection",
      title: "The Princess Collection",
      description: "Exquisite princess-cut diamond bridal set with cathedral setting and matching band"
    },
    {
      id: 8,
      image: "https://storage.googleapis.com/a1aa/image/daf1fb26-c4db-4037-9d1b-2d7870dcffa4.jpg",
      alt: "Bridal sets and accessories displayed on beige velvet pads with gold background",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦275,000.00",
      name: "The Vintage Romance",
      title: "The Vintage Romance",
      description: "Art deco inspired bridal jewelry with sapphire accents and milgrain detailing"
    },
    {
      id: 9,
      image: "https://storage.googleapis.com/a1aa/image/0ed8adf9-0d00-4cb6-a338-07880d69f3c0.jpg",
      alt: "Diamond ring set on white background with white rose blurred behind",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦38,000.00",
      name: "The Delicate Set",
      title: "The Delicate Set",
      description: "Minimalist bridal rings with delicate diamond accents perfect for modern brides"
    },
    {
      id: 10,
      image: "https://storage.googleapis.com/a1aa/image/daf1fb26-c4db-4037-9d1b-2d7870dcffa4.jpg",
      alt: "Bridal sets and accessories displayed on beige velvet pads with gold background",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦380,000.00",
      name: "The Regal Ensemble",
      title: "The Regal Ensemble",
      description: "Majestic bridal jewelry suite with emerald accents and gold filigree work"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/0ed8adf9-0d00-4cb6-a338-07880d69f3c0.jpg",
      alt: "Diamond ring set on white background with white rose blurred behind",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦165,000.00",
      name: "The Eternal Bond",
      title: "The Eternal Bond",
      description: "Matching his and hers wedding bands with engraved infinity symbols"
    },
    {
      id: 12,
      image: "https://storage.googleapis.com/a1aa/image/daf1fb26-c4db-4037-9d1b-2d7870dcffa4.jpg",
      alt: "Bridal sets and accessories displayed on beige velvet pads with gold background",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦42,000.00",
      name: "The Complete Bridal",
      title: "The Complete Bridal",
      description: "Full bridal accessory package including jewelry, veil accessories, and garter set"
    }
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
      {/* Top green nav */}
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      {/* Hero section */}
      <section className="relative mx-auto">
        <div className="relative overflow-hidden group">
            <img 
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756580100/image_50_ihd57b.png"
                alt="Close-up of wedding dress lace and buttons showing intricate floral embroidery and pearl buttons"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent flex flex-col justify-end px-6 pb-16 max-w-[100rem] mx-auto w-full">
          <nav className="text-xs text-gray-100 mb-2 font-semibold">
            <a className="hover:underline cursor-pointer">Weddings</a>
            <span className="mx-1">/</span>
            <span className="text-gray-300">Bridal sets & accessories</span>
          </nav>
          <h1 className="text-3xl text-white sm:text-4xl md:text-5xl font-semibold leading-tight">
           Bridal sets & accessories
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-100">
            Find the perfect wedding dress to make your special day memorable
          </p>
        </div>
      </section>

      {/* Listings header */}
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

        {/* Listings grid */}
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
                      <ShoppingCart size={12} className="w-3 h-3 text-gray-600"  />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-[100rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-10 pt-10">
        <MarketFooter />
      </footer>

      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />


    <FilterSystem
        products={products}
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

export default BridalAccessories;