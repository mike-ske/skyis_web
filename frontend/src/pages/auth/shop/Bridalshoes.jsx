import React, { useState } from 'react';
import Navbar from './Navbar';
import MarketFooter from './marketlayout/MarketFooter';

import { 
  Search, 
  User, 
  ShoppingCart, 
  Heart, 
  ChevronDown, 
  ArrowRight,
  Star
} from 'lucide-react';

const BridalShoes = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState(new Set());
  const [activeFilters, setActiveFilters] = useState({
    color: false,
    price: false,
    size: false
  });

  const products = [
    {
      id: 1,
      image: "https://storage.googleapis.com/a1aa/image/1e41eae0-a591-44e8-6fe3-8e42ecf8a04b.jpg",
      alt: "Gold bridal high heel shoes with beadwork on white background",
      type: "Buy",
      rating: 4.5,
      price: "₦125,000.00",
      name: "The Elegance",
      description: "Gold metallic bridal heels with intricate beadwork and rhinestone details"
    },
    {
      id: 2,
      image: "https://storage.googleapis.com/a1aa/image/7c61d2c2-2e8a-44c2-6591-0bc477476ce9.jpg",
      alt: "White high heel shoes on white lace fabric background",
      type: "Auction",
      rating: 4.5,
      price: "₦95,000.00",
      name: "The Classic",
      description: "Pure white satin bridal pumps with delicate lace accents"
    },
    {
      id: 3,
      image: "https://storage.googleapis.com/a1aa/image/3d2d7aba-3485-4241-8e28-13f72ad44bb5.jpg",
      alt: "Ivory bridal high heel shoes with floral decorations on wooden table",
      type: "Rent",
      rating: 4.5,
      price: "₦45,000.00",
      name: "The Garden",
      description: "Ivory heels adorned with delicate floral appliques and pearl details"
    },
    {
      id: 4,
      image: "https://storage.googleapis.com/a1aa/image/1e41eae0-a591-44e8-6fe3-8e42ecf8a04b.jpg",
      alt: "Gold bridal high heel shoes with beadwork on white background",
      type: "Buy",
      rating: 4.5,
      price: "₦135,000.00",
      name: "The Duchess",
      description: "Champagne gold heels with crystal embellishments and satin finish"
    },
    {
      id: 5,
      image: "https://storage.googleapis.com/a1aa/image/7c61d2c2-2e8a-44c2-6591-0bc477476ce9.jpg",
      alt: "White high heel shoes on white lace fabric background",
      type: "Auction",
      rating: 4.5,
      price: "₦110,000.00",
      name: "The Belle",
      description: "Snow white bridal heels with vintage lace overlay design"
    },
    {
      id: 6,
      image: "https://storage.googleapis.com/a1aa/image/3d2d7aba-3485-4241-8e28-13f72ad44bb5.jpg",
      alt: "Ivory bridal high heel shoes with floral decorations on wooden table",
      type: "Rent",
      rating: 4.5,
      price: "₦55,000.00",
      name: "The Bloom",
      description: "Soft ivory heels featuring hand-crafted silk flower details"
    },
    {
      id: 7,
      image: "https://storage.googleapis.com/a1aa/image/1e41eae0-a591-44e8-6fe3-8e42ecf8a04b.jpg",
      alt: "Gold bridal high heel shoes with beadwork on white background",
      type: "Buy",
      rating: 4.5,
      price: "₦150,000.00",
      name: "The Royalty",
      description: "Luxurious gold heels with premium beadwork and ankle strap"
    },
    {
      id: 8,
      image: "https://storage.googleapis.com/a1aa/image/7c61d2c2-2e8a-44c2-6591-0bc477476ce9.jpg",
      alt: "White high heel shoes on white lace fabric background",
      type: "Auction",
      rating: 4.5,
      price: "₦88,000.00",
      name: "The Grace",
      description: "Pristine white satin pumps with subtle texture and pointed toe"
    },
    {
      id: 9,
      image: "https://storage.googleapis.com/a1aa/image/3d2d7aba-3485-4241-8e28-13f72ad44bb5.jpg",
      alt: "Ivory bridal high heel shoes with floral decorations on wooden table",
      type: "Rent",
      rating: 4.5,
      price: "₦42,000.00",
      name: "The Petal",
      description: "Romantic ivory heels with 3D floral embellishments"
    },
    {
      id: 10,
      image: "https://storage.googleapis.com/a1aa/image/1e41eae0-a591-44e8-6fe3-8e42ecf8a04b.jpg",
      alt: "Gold bridal high heel shoes with beadwork on white background",
      type: "Buy",
      rating: 4.5,
      price: "₦175,000.00",
      name: "The Majesty",
      description: "Statement gold heels with extensive beadwork and metallic accents"
    },
    {
      id: 11,
      image: "https://storage.googleapis.com/a1aa/image/7c61d2c2-2e8a-44c2-6591-0bc477476ce9.jpg",
      alt: "White high heel shoes on white lace fabric background",
      type: "Auction",
      rating: 4.5,
      price: "₦105,000.00",
      name: "The Serenity",
      description: "Minimalist white bridal heels with clean lines and comfort sole"
    },
    {
      id: 12,
      image: "https://storage.googleapis.com/a1aa/image/3d2d7aba-3485-4241-8e28-13f72ad44bb5.jpg",
      alt: "Ivory bridal high heel shoes with floral decorations on wooden table",
      type: "Rent",
      rating: 4.5,
      price: "₦38,000.00",
      name: "The Whisper",
      description: "Delicate ivory heels with subtle floral motifs and pearl accents"
    }
  ];

  const toggleWishlist = (productId) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
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
    <div className="bg-white text-gray-900 font-sans  min-h-screen">
      {/* Top green nav */}
      <Navbar />

      {/* Hero image with text overlay */}
      <section className="relative mx-auto">
        <div className="relative overflow-hidden group">
            <img 
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756580100/image_47_bplvyp.png"
                alt="Close-up of wedding dress lace and buttons showing intricate floral embroidery and pearl buttons"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent flex flex-col justify-end px-6 pb-16 max-w-[100rem] mx-auto w-full">
          <nav className="text-xs text-gray-100 mb-2 font-semibold">
            <a className="hover:underline cursor-pointer">Weddings</a>
            <span className="mx-1">/</span>
            <span className="text-gray-300">Bridal shoes</span>
          </nav>
          <h1 className="text-3xl text-white sm:text-4xl md:text-5xl font-semibold max-w-lg leading-tight">
           Bridal shoes
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-100">
            Find the perfect wedding dress to make your special day memorable
          </p>
        </div>
      </section>

      {/* Listings section */}
      <section className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 mt-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">LISTINGS</p>
            <h2 className="text-xl font-semibold">Available Listings</h2>
          </div>
          <div className="flex space-x-6 text-sm text-gray-700 font-semibold">
            <button 
              className="flex items-center space-x-1 hover:text-gray-900"
              onClick={() => toggleFilter('color')}
            >
              <span>Color</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${activeFilters.color ? 'rotate-180' : ''}`} />
            </button>
            <button 
              className="flex items-center space-x-1 hover:text-gray-900"
              onClick={() => toggleFilter('price')}
            >
              <span>Price</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${activeFilters.price ? 'rotate-180' : ''}`} />
            </button>
            <button 
              className="flex items-center space-x-1 hover:text-gray-900"
              onClick={() => toggleFilter('size')}
            >
              <span>Size</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${activeFilters.size ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Grid of listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow">
              <div className="relative mb-3">
                <img 
                  alt={product.alt}
                  className="rounded-lg w-full h-80 object-cover" 
                  src={product.image}
                />
                <span className="absolute top-2 left-2 bg-gray-200 text-gray-700 text-xs font-semibold rounded px-2 py-0.5">
                  {product.type}
                </span>
              </div>
              
              <div className="flex items-center space-x-1 mb-1">
                {renderStars(product.rating)}
                <span className="text-gray-500 text-xs ml-1">({product.rating})</span>
              </div>
              
              <p className="font-semibold text-base mb-1">{product.price}</p>
              <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
              <p className="text-xs text-gray-600 mb-4 leading-tight flex-grow">
                {product.description}
              </p>
              
              <div className="mt-auto flex justify-between items-center text-gray-500 text-sm">
                <button 
                  aria-label="Add to wishlist" 
                  className="hover:text-gray-900 transition-colors"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart className={`w-4 h-4 ${wishlist.has(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
                <button 
                  className="flex items-center space-x-1 border border-gray-300 rounded px-3 py-1 text-xs hover:bg-gray-100 transition-colors"
                  onClick={addToCart}
                >
                  <ShoppingCart className="w-3 h-3 text-gray-600" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stay connected section */}
        <footer className="max-w-[100rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-10 pt-10">
            <MarketFooter />
        </footer>
    </div>
  );
};

export default BridalShoes;