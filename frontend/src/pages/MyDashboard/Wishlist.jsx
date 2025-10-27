import React, { useState } from 'react';
import { Heart, ShoppingCart, Filter, Search, Star } from 'lucide-react';

const Wishlist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [likedItems, setLikedItems] = useState(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]));
  const [cartItems, setCartItems] = useState(new Set());

  const wishlistData = [
    {
      id: 1,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      name: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
      price: "₦500,000,000.00",
      rating: 4.5,
      type: "Auction",
      outOfStock: false,
      color: "black",
      category: "Bridal Wear"
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      name: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
      price: "₦500,000,000.00",
      rating: 4.5,
      type: "Buy",
      outOfStock: true,
      color: "black",
      category: "Bridal Wear"
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      name: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
      price: "₦500,000,000.00",
      rating: 4.5,
      type: "Rent",
      outOfStock: false,
      color: "floral",
      category: "Bridal Wear"
    },
    {
      id: 4,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      name: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
      price: "₦500,000,000.00",
      rating: 4.5,
      type: "Auction",
      outOfStock: false,
      color: "black",
      category: "Bridal Wear"
    },
    {
      id: 5,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      name: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
      price: "₦500,000,000.00",
      rating: 4.5,
      type: "Buy",
      outOfStock: false,
      color: "beige",
      category: "Bridal Wear"
    },
    {
      id: 6,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      name: "A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress",
      price: "₦500,000,000.00",
      rating: 4.5,
      type: "Rent",
      outOfStock: false,
      color: "floral",
      category: "Bridal Wear"
    },
    {
      id: 7,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      name: "Traditional Ankara Print Evening Gown with Beaded Embellishments",
      price: "₦250,000,000.00",
      rating: 4.7,
      type: "Buy",
      outOfStock: false,
      color: "ankara",
      category: "Traditional Wear"
    },
    {
      id: 8,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      name: "Luxury Aso Oke Formal Dress with Gold Threading",
      price: "₦350,000,000.00",
      rating: 4.6,
      type: "Rent",
      outOfStock: true,
      color: "gold",
      category: "Traditional Wear"
    },
    {
      id: 9,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      name: "Contemporary African Print Cocktail Dress",
      price: "₦180,000,000.00",
      rating: 4.4,
      type: "Auction",
      outOfStock: false,
      color: "multicolor",
      category: "Contemporary"
    },
    {
      id: 10,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      name: "Vintage Inspired Lace Wedding Gown with Pearl Details",
      price: "₦450,000,000.00",
      rating: 4.8,
      type: "Buy",
      outOfStock: false,
      color: "white",
      category: "Bridal Wear"
    },
    {
      id: 11,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      name: "Modern Nigerian Designer Jumpsuit with Embroidery",
      price: "₦120,000,000.00",
      rating: 4.3,
      type: "Rent",
      outOfStock: false,
      color: "navy",
      category: "Contemporary"
    },
    {
      id: 12,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      name: "Handwoven Kente Formal Dress with Silk Lining",
      price: "₦300,000,000.00",
      rating: 4.9,
      type: "Auction",
      outOfStock: true,
      color: "kente",
      category: "Traditional Wear"
    }
  ];

  const toggleLike = (id) => {
    const newLiked = new Set(likedItems);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedItems(newLiked);
  };

  const addToCart = (id) => {
    const newCart = new Set(cartItems);
    if (newCart.has(id)) {
      newCart.delete(id);
    } else {
      newCart.add(id);
    }
    setCartItems(newCart);
  };

  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-1 mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-3 h-3 ${star <= rating ? 'text-orange-400 fill-current' : 'text-gray-300'}`} />
      ))}
      <span className="text-xs text-gray-600 ml-1">({rating})</span>
    </div>
  );

  

  const filteredData = wishlistData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = item.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(filterTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(filterTerm.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const WishlistCard = ({ item }) => (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm relative">
      <div className="relative">
        <div className="aspect-[3/3] bg-white relative overflow-hidden">
          {/* Mock dress display */}
          <div className="absolute p-2 inset-0 flex items-center justify-center">
            <div className="relative">
                {/* Dress details */}
                  <img src={item.image} 
                      alt={item.name} 
                      className='w-full h-full object-cover rounded-xl' 
                  />
            </div>
          </div>
        </div>
        
        <span className={`absolute top-2 left-2 text-xs px-2 py-1 rounded ${
          item.type === 'Auction' ? 'bg-yellow-100 text-yellow-800' :
          item.type === 'Buy' ? 'bg-blue-100 text-blue-800' :
          'bg-green-100 text-green-800'
        }`}>
          {item.type}
        </span>
        
        {item.outOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm font-medium">
              Out of stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <StarRating rating={item.rating} />
        <h3 className="font-bold text-lg text-gray-900 mb-2">{item.price}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.name}</p>
        
        <div className="flex items-center justify-between gap-2">
          <button 
            onClick={() => toggleLike(item.id)}
            className={`p-3 rounded-full transition-all duration-200 ${
              likedItems.has(item.id) 
                ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`w-5 h-5 ${likedItems.has(item.id) ? 'fill-current' : ''}`} />
          </button>
          
          <button 
            onClick={() => addToCart(item.id)}
            disabled={item.outOfStock}
            className={`flex-1 flex items-center max-w-[50%] justify-center gap-2 py-3 px-2 rounded-full text-sm font-medium transition-all duration-200 ${
              item.outOfStock 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : cartItems.has(item.id)
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {item.outOfStock ? 'Add to Cart' : cartItems.has(item.id) ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-8 flex flex-1 justify-between mx-auto px-1 py-4">
          <div className="relative flex-1 max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My wishlist</h1>
            <p className="text-gray-600 mb-6">Save items for later and never miss a deal</p>
          </div>
          {/* Search and Filter */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md flex justify-center items-center">
                <Search className="absolute left-3 top-[70%] text-gray-800 transform -translate-y-1/2  w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 border border-gray-200 py-2 bg-gray-100 text-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white"
                />
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-full bg-white hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
              
              {showFilter && (
                <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-20">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filter by name, type, or category
                    </label>
                    <input
                      type="text"
                      placeholder="Enter filter term..."
                      value={filterTerm}
                      onChange={(e) => setFilterTerm(e.target.value)}
                      className="w-full px-3 text-gray-500 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilterTerm('')}
                      className="flex-1 text-xs rounded-2xl text-gray-600 border border-gray-300 px-3 py-2 hover:bg-gray-50"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setShowFilter(false)}
                      className="flex-1 text-xs rounded-2xl bg-orange-400 text-white px-3 py-2 hover:bg-orange-500"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Header */}
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Saved items ({filteredData.length})
            </h2>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {filteredData.map((item) => (
              <WishlistCard key={item.id} item={item} />
            ))}
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Heart className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">Try adjusting your search or filter terms</p>
            </div>
          )}
        </div>
      </div>

      {/* Click outside overlay for filter */}
      {showFilter && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowFilter(false)}
        />
      )}
    </div>
  );
};

export default Wishlist;