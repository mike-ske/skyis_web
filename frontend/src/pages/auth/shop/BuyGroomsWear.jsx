import React, { useState } from 'react';
import { Search, User, ShoppingCart, Info, Heart, ChevronRight } from 'lucide-react';
import Navbar from './Navbar';
import MarketFooter from './marketlayout/MarketFooter';




const ProductPage = () => {
  const [selectedColor, setSelectedColor] = useState('#1F2D3D');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(4);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState([]);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { id: 'light-gray', color: '#D9D9D9', name: 'Light Gray' },
    { id: 'dark-gray-blue', color: '#4B5563', name: 'Dark Gray Blue' },
    { id: 'beige', color: '#D6CEC3', name: 'Beige' },
    { id: 'dark-gray', color: '#3F3F3F', name: 'Dark Gray' }
  ];

  const productImages = [
    'https://storage.googleapis.com/a1aa/image/8bca4948-8d28-4b63-7900-6071f477e98c.jpg',
    'https://storage.googleapis.com/a1aa/image/f72c34f3-2ea9-4b87-ecd8-517cede1fd32.jpg',
    'https://storage.googleapis.com/a1aa/image/9b96d8c9-312e-4021-2682-d8d1ece70292.jpg',
    'https://storage.googleapis.com/a1aa/image/c4e3c2cc-5a18-4832-d2ca-a57bd39132cf.jpg',
    'https://storage.googleapis.com/a1aa/image/c8aa09eb-1100-4d9e-f341-7e45cd1a6028.jpg'
  ];

  const reviews = [
    {
      id: 1,
      name: 'Ayodele Ilesanmi',
      avatar: 'A',
      color: '#3B82F6',
      rating: 4.5,
      comment: 'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
      date: 'August 21, 2025'
    },
    {
      id: 2,
      name: 'Binaebi Taribo',
      avatar: 'B',
      color: '#FCA5A5',
      rating: 4.5,
      comment: 'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
      date: 'August 21, 2025'
    },
    {
      id: 3,
      name: 'Yusuf Maiwada',
      avatar: 'Y',
      color: '#BBF7D0',
      textColor: '#065F46',
      rating: 4.5,
      comment: 'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
      date: 'August 21, 2025'
    },
    {
      id: 4,
      name: 'Ifedolapo Akinyemi',
      avatar: 'I',
      color: '#FCD9D9',
      textColor: '#B45309',
      rating: 4.5,
      comment: 'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
      date: 'August 21, 2025'
    },
    {
      id: 5,
      name: 'Gbegba Ekisagha',
      avatar: 'G',
      color: '#DDD6FE',
      textColor: '#6B21A8',
      rating: 4.5,
      comment: 'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
      date: 'August 21, 2025'
    },
    {
      id: 6,
      name: 'Nnaemeka Nwosu',
      avatar: 'N',
      color: '#6B7280',
      textColor: '#ffffff',
      rating: 4.5,
      comment: 'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
      date: 'August 21, 2025'
    }
  ];

  const similarItems = [
    {
      id: 1,
      image: 'https://storage.googleapis.com/a1aa/image/7eab4aca-9413-4e70-2f18-62624db22458.jpg',
      price: '₦500,000,000.00',
      title: 'The "Da Vinci" charcoal black, metallic jacquard, single lapel, mid cut intersect strap tuxedo suit.',
      name: 'Da Vinci Tuxedo',
      rating: 4.5
    },
    {
      id: 2,
      image: 'https://storage.googleapis.com/a1aa/image/3165642d-8984-4896-dde5-3d4a0461c91b.jpg',
      price: '₦500,000,000.00',
      title: 'The "October 1st" castleton green covered peak lapel jacquard tuxedo suit',
      name: 'October 1st Tuxedo',
      rating: 4.5
    },
    {
      id: 3,
      image: 'https://storage.googleapis.com/a1aa/image/1e5924c7-bd23-4cfb-5ea9-007677061c5e.jpg',
      price: '₦500,000,000.00',
      title: 'A "Yohji", 2 buttons, Irish cream, deconstructed 3-layered knitted peak lapel suit',
      name: 'Yohji Suit',
      rating: 4.5
    }
  ];

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const addToCart = (itemId) => {
    const item = similarItems.find(item => item.id === itemId) || {
      id: 'main-product',
      name: 'Da Vinci Tuxedo Suit',
      price: '₦500,000.00',
      selectedColor,
      selectedSize,
      quantity
    };
    
    setCart(prev => [...prev, { ...item, quantity: 1 }]);
    // You could show a toast notification here
    console.log('Added to cart:', item);
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-orange-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-orange-400">☆</span>);
    }

    return stars;
  };

  const getMainImage = () => {
    // Create a filter overlay based on selected color
    const filterStyle = {
      filter: `hue-rotate(${selectedColor === '#1F2D3D' ? '0deg' : 
               selectedColor === '#D9D9D9' ? '180deg' : 
               selectedColor === '#4B5563' ? '90deg' : 
               selectedColor === '#D6CEC3' ? '45deg' : '270deg'})`
    };

    return (
      <div className="relative overflow-hidden rounded-lg">
        <img
          alt="Main charcoal black double-breasted tuxedo suit"
          className="rounded-lg w-[320px] md:w-[400px] object-cover transition-all duration-500 ease-in-out transform"
          height="500"
          src={productImages[selectedImageIndex]}
          width="400"
          style={filterStyle}
          key={selectedImageIndex} // Force re-render for smooth transition
        />
      </div>
    );
  };

  return (
    <div className="bg-white text-gray-900" style={{ fontFamily: 'Product Sans, Inter, sans-serif' }}>
      {/* Top Marquee */}
      <Navbar />

      {/* Breadcrumb */}
      <nav className="max-w-[100rem] mx-auto px-6 text-xs text-gray-600 py-3 flex flex-wrap gap-1">
        <span>...</span>
        <a className="text-[#0B7A72] hover:underline" href="/wedding">Weddings</a>
        <span>/</span>
        <a className="text-[#0B7A72] hover:underline" href="/groomsmen">Grooms wear & tuxedo</a>
        <span>/</span>
        <span className="truncate max-w-[60vw]">
          The "Da Vinci" charcoal black, metallic jacquard...
        </span>
      </nav>

      {/* Main Product Section */}
      <main className="max-w-[100rem] mx-auto px-6 pb-20">
        <div className="flex flex-col md:flex-row md:space-x-12">
          {/* Left Images */}
          <div className="flex flex-col items-center md:items-start space-y-3 md:space-y-4 mb-8 md:mb-0">
            {getMainImage()}
            
            <div className="flex space-x-3">
              {productImages.slice(1).map((image, index) => (
                <img
                  key={index + 1}
                  alt={`Thumbnail image ${index + 1}`}
                  className={`rounded-md w-[70px] h-[70px] object-cover cursor-pointer border-2 transition-all duration-300 hover:border-[#0B7A72] hover:shadow-md transform hover:scale-105 ${
                    selectedImageIndex === index + 1 
                      ? 'border-[#0B7A72] ring-2 ring-[#0B7A72] ring-offset-1 shadow-md scale-105' 
                      : 'border-gray-200'
                  }`}
                  height="70"
                  src={image}
                  width="70"
                  onClick={() => setSelectedImageIndex(index + 1)}
                />
              ))}
            </div>

            {/* Seller info */}
            <div className="flex items-center space-x-3 mt-6">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F97316] text-white font-semibold text-sm">
                T
              </div>
              <div className="text-xs text-gray-600">
                <p className="font-semibold text-gray-900">Tena Gopregha</p>
                <div className="flex items-center space-x-1 text-[#F97316] text-xs">
                  {renderStars(4.5)}
                  <span className="text-gray-400">(4.5) • 40 reviews</span>
                </div>
              </div>
              <a className="text-xs text-[#F87171] hover:underline ml-auto" href="#">
                View profile <ChevronRight className="inline" size={12} />
              </a>
            </div>
          </div>

          {/* Right Product Info */}
          <section className="flex-1 max-w-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs bg-gray-300 text-gray-600 rounded px-2 py-0.5 select-none">
                Buy
              </span>
            </div>
            
            <h1 className="text-lg md:text-xl font-semibold leading-tight mb-2">
              The "Da Vinci" charcoal black, metallic jacquard, single lapel, mid cut intersect strap tuxedo suit.
            </h1>
            
            <p className="text-xs text-gray-400 mb-2 leading-snug">
              The "Da Vinci" charcoal black, metallic jacquard, single lapel, mid-cut intersect strap tuxedo suit, gold and red metallic wire patch, bow tie, and tuxedo pants
            </p>
            
            <div className="flex items-center space-x-1 text-[#F97316] mb-1">
              {renderStars(4.5)}
              <span className="text-xs text-gray-400">(4.5)</span>
            </div>
            
            <p className="font-semibold mb-4">₦500,000.00</p>
            <hr className="mb-6" />

            {/* Choose a Color */}
            <div className="mb-6">
              <p className="text-xs font-semibold mb-2">Choose a Color</p>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    aria-label={`Color option ${color.name}`}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color.color 
                        ? 'border-[#0B7A72] ring-2 ring-[#0B7A72] ring-offset-1' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.color }}
                    onClick={() => setSelectedColor(color.color)}
                  />
                ))}
              </div>
            </div>

            {/* Select Size */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs font-semibold">Select Size</p>
              <p className="text-xs font-semibold text-gray-400 flex items-center space-x-1 cursor-pointer hover:text-gray-600">
                <span>Size Guide</span>
                <Info size={12} />
              </p>
            </div>
            
            <div className="flex space-x-3 mb-6">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`text-xs border rounded px-3 py-1 transition-colors ${
                    selectedSize === size 
                      ? 'border-[#0B7A72] bg-[#0B7A72] text-white' 
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Quantity */}
            <p className="text-xs font-semibold mb-2">Quantity</p>
            <div className="flex items-center space-x-3 mb-2">
              <button 
                aria-label="Decrease quantity" 
                className="border border-gray-300 rounded px-3 py-1 text-lg font-semibold hover:bg-gray-100"
                onClick={() => handleQuantityChange(-1)}
              >
                −
              </button>
              <input 
                aria-label="Quantity input" 
                className="w-12 text-center border border-gray-300 rounded py-1 text-xs" 
                min="1" 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button 
                aria-label="Increase quantity" 
                className="border border-gray-300 rounded px-3 py-1 text-lg font-semibold hover:bg-gray-100"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
            
            <p className="text-[10px] text-gray-400 mb-6">
              Only <span className="font-semibold text-gray-700">12 Items</span> Left! Don't miss it
            </p>

            {/* Add to Cart Button */}
            <button 
              aria-label="Add to Cart" 
              className="w-full border border-gray-700 rounded-full py-2 text-xs font-semibold flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
              onClick={() => addToCart('main-product')}
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </button>
          </section>
        </div>

        {/* Product Reviews */}
        <section className="max-w-[100rem] mx-auto mt-16 px-6">
          <h2 className="text-lg font-semibold mb-6">Product Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <article key={review.id} className="flex space-x-4">
                <div 
                  className="flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm"
                  style={{ 
                    backgroundColor: review.color, 
                    color: review.textColor || '#ffffff' 
                  }}
                >
                  {review.avatar}
                </div>
                <div>
                  <div className="flex items-center space-x-1 text-[#F97316] text-sm mb-1">
                    {renderStars(review.rating)}
                    <span className="text-xs text-gray-400">({review.rating})</span>
                  </div>
                  <p className="font-semibold text-sm mb-1">{review.name}</p>
                  <p className="text-xs text-gray-700 mb-2">{review.comment}</p>
                  <time className="text-xs text-gray-400">{review.date}</time>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Similar Items */}
        <section className="max-w-[100rem] mx-auto mt-20 px-6">
          <h3 className="text-lg font-semibold mb-6">Similar items you might like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {similarItems.map((item) => (
              <article key={item.id} className="border border-gray-200 rounded-lg p-4 relative hover:shadow-lg transition-shadow">
                <span className="absolute top-3 left-3 text-xs bg-gray-300 text-gray-600 rounded px-2 py-0.5 select-none">
                  Buy
                </span>
                <img 
                  alt={item.title}
                  className="rounded-lg mb-3 object-cover w-full h-96" 
                  height="" 
                  src={item.image}
                  width=""
                />
                <div className="flex items-center space-x-1 text-[#F97316] text-sm mb-1">
                  {renderStars(item.rating)}
                  <span className="text-xs text-gray-400">({item.rating})</span>
                </div>
                <p className="font-semibold mb-1">{item.price}</p>
                <p className="text-xs text-gray-600 mb-3">{item.title}</p>
                <div className="flex justify-between items-center mt-auto">
                  <button 
                    className="flex items-center space-x-2 text-xs text-gray-700 border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100 transition-colors"
                    onClick={() => addToCart(item.id)}
                    aria-label={`Add ${item.name} to cart`}
                  >
                    <ShoppingCart size={12} />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button 
                    className={`transition-colors ${
                      favorites.has(item.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    }`}
                    onClick={() => toggleFavorite(item.id)}
                    aria-label="Add to favorites"
                  >
                    <Heart 
                      size={16} 
                      fill={favorites.has(item.id) ? 'currentColor' : 'none'} 
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Stay Connected Section */}
        <footer className="max-w-[100rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-10 pt-10">
          <MarketFooter />
        </footer>
      </main>
    </div>
  );
};

export default ProductPage;