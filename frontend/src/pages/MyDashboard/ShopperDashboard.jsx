// ==================== FILE 3: ShopperDashboard.jsx ====================
// REPLACE YOUR ENTIRE ShopperDashboard.jsx WITH THIS:

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  SearchNormal,
  ShoppingCart,
  Location
} from 'iconsax-reactjs';
import { 
  Star,
  Heart
} from 'lucide-react';

const ShopperDashboardOverview = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(new Set());

  const toggleWishlist = (productId) => {
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

  const addToCart = (productId) => {
    console.log('Added product to cart:', productId);
    // Add your cart logic here
  };

  const statsCards = [
    {
      title: 'Active Orders',
      value: '3',
      change: '+12.5%',
      subtitle: 'from last month',
      color: 'bg-blue-50'
    },
    {
      title: 'Complete Orders',
      value: '23',
      change: '+5.2%',
      subtitle: 'from last month',
      color: 'bg-green-50'
    },
    {
      title: 'Active Rentals',
      value: '0',
      change: '+8.2%',
      subtitle: 'from last month',
      color: 'bg-purple-50'
    },
    {
      title: 'Auctions',
      value: '0',
      change: '+15.3%',
      subtitle: 'from last month',
      color: 'bg-orange-50'
    }
  ];

  const quickActions = [
    {
      icon: SearchNormal,
      label: 'Browse marketplace',
      action: () => navigate('/marketplace')
    },
    {
      icon: ShoppingCart,
      label: 'View cart',
      action: () => navigate('/marketplace')
    },
    {
      icon: Location,
      label: 'Track order',
      action: () => navigate('/shopperdashboard/orders')
    }
  ];

  const products = [
    {
      id: 1,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      type: 'Auction',
      title: 'A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress',
      price: '₦500,000,000.00',
      rating: 4.5,
      typeColor: 'bg-red-100 text-red-800'
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      type: 'Buy',
      title: 'A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress',
      price: '₦500,000,000.00',
      rating: 4.5,
      typeColor: 'bg-green-100 text-green-800'
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      type: 'Rent',
      title: 'A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress',
      price: '₦500,000,000.00',
      rating: 4.5,
      typeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 4,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      type: 'Auction',
      title: 'Elegant Evening Gown with Crystal Details',
      price: '₦300,000,000.00',
      rating: 4.0,
      typeColor: 'bg-red-100 text-red-800'
    },
    {
      id: 5,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      type: 'Buy',
      title: 'Designer Wedding Dress Collection',
      price: '₦750,000,000.00',
      rating: 4.8,
      typeColor: 'bg-green-100 text-green-800'
    },
    {
      id: 6,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png",
      type: 'Rent',
      title: 'Luxury Bridal Accessories Set',
      price: '₦150,000,000.00',
      rating: 4.3,
      typeColor: 'bg-blue-100 text-blue-800'
    }
  ];

  console.log('✅ ShopperDashboardOverview rendered');

  return (
    <div className="space-y-8 p-6">
      {/* Dashboard header */}
      <div className='flex justify-between items-center'>
        <section className="space-y-1">
          <h1 className="text-black text-xl lg:text-2xl font-semibold">Dashboard</h1>
          <p className="text-gray-600 text-sm font-normal">
            Welcome back, Tena. 
          </p>
        </section>

        <div className="flex justify-end">
          <button 
            onClick={() => navigate('/marketplace')}
            className="bg-[#00403F] text-white rounded-full px-4 lg:px-6 py-2 flex items-center space-x-2 text-sm font-medium hover:bg-[#00332f] transition-all"
          >
            <ShoppingCart variant="Bulk" size={16} />
            <span className="hidden sm:inline">View cart</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
              <div className={`w-3 h-3 rounded-full ${card.color}`}></div>
            </div>
            <div className="mb-3">
              <span className="text-3xl font-bold text-gray-900">{card.value}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-green-600 font-medium">{card.change}</span>
              <span className="text-gray-500">{card.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <section className="bg-white rounded-lg p-4 lg:p-6">
        <h2 className="text-black font-semibold mb-4 text-sm lg:text-base">Quick actions</h2>
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
          {quickActions.map((action, index) => (
            <button 
              key={index}
              onClick={action.action}
              className="flex items-center justify-center space-x-2 rounded-md px-4 py-3 text-sm bg-gray-50 text-gray-700 hover:bg-gray-200 transition-all"
            >
              <action.icon size={20} variant='Linear' />
              <span className="text-base font-medium text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <div className='p-4 bg-white rounded-xl'>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">You might also like</h2>
          <button 
            onClick={() => navigate('/marketplace')}
            className="text-sm text-[#0B3B38] hover:underline font-medium"
          >
            View all →
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <article key={product.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="relative m-4">
                <img 
                  src={product.image}
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-2xl"
                />
                <span className={`absolute top-3 left-3 ${product.typeColor} text-xs font-semibold px-2 py-1 rounded`}>
                  {product.type}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-1 mb-1">
                  <div className="flex text-orange-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.rating})</span>
                </div>
                <p className="font-semibold text-lg text-gray-600 mb-1">{product.price}</p>
                <p className="text-xs text-gray-600 mb-4 leading-tight">{product.title}</p>
                <div className="flex justify-between items-center text-gray-700 text-sm">
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="hover:text-gray-900 transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <Heart 
                      size={16} 
                      className={wishlist.has(product.id) ? "fill-red-500 text-red-500" : ""}
                    />
                  </button>
                  <button 
                    onClick={() => addToCart(product.id)}
                    className="flex items-center space-x-1 border border-gray-300 rounded px-3 py-1 text-xs hover:bg-gray-100 transition-colors"
                  >
                    <ShoppingCart size={12} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopperDashboardOverview;

// // ==================== END OF FILE ====================