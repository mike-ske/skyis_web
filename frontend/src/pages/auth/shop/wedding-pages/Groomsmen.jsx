import React, { useState } from 'react';
import { ShoppingCart, Heart, ChevronDown } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import MarketFooter from '../marketlayout/MarketFooter';
import CartModal from '../CartModal';
import { useCart } from '../../../../contexts/CartContext';

const Groomsmen = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    addToCart, 
    updateQuantity, 
    removeItem, 
    cartCount 
  } = useCart();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  
  const tuxedos = [
    {
      id: 25,
      name: 'Da Vinci',
      title: 'The "Da Vinci" Charcoal Black Tuxedo',
      description: 'charcoal black, metallic jacquard, single lapel, mid cut intersect strap tuxedo suit',
      price: '₦500,000.00',
      rating: 4.5,
      type: 'Buy',
      typeColor: 'bg-white text-gray-900',
      image: 'https://storage.googleapis.com/a1aa/image/37b3af0e-9926-4d7e-feb6-f9344b6deaee.jpg',
      color: 'Charcoal Black',
      size: 'M',
      category: 'Groom Wear',
      inStock: true,
      images: [
        'https://storage.googleapis.com/a1aa/image/37b3af0e-9926-4d7e-feb6-f9344b6deaee.jpg'
      ]
    },
    {
      id: 26,
      name: 'October 1st',
      title: 'The "October 1st" Castleton Green Tuxedo',
      description: 'castleton green covered peak lapel jacquard tuxedo suit',
      price: '₦450,000.00',
      rating: 4.5,
      type: 'Buy',
      typeColor: 'bg-white text-gray-900',
      image: 'https://storage.googleapis.com/a1aa/image/e8f8d812-539b-431b-c910-19ef27d934ca.jpg',
      color: 'Castleton Green',
      size: 'L',
      category: 'Groom Wear',
      inStock: true,
      images: [
        'https://storage.googleapis.com/a1aa/image/e8f8d812-539b-431b-c910-19ef27d934ca.jpg'
      ]
    },
    {
      id: 27,
      name: 'Yohji',
      title: 'The "Yohji" Irish Cream Suit',
      description: '2 buttons, Irish cream, deconstructed 3-layered knitted peak lapel suit',
      price: '₦75,000.00',
      rating: 4.5,
      type: 'Rent',
      typeColor: 'bg-yellow-300 text-gray-900',
      image: 'https://storage.googleapis.com/a1aa/image/f0644fb1-424e-4861-678b-e15687175b11.jpg',
      color: 'Irish Cream',
      size: 'M',
      category: 'Groom Wear',
      inStock: true,
      images: [
        'https://storage.googleapis.com/a1aa/image/f0644fb1-424e-4861-678b-e15687175b11.jpg'
      ]
    },
    {
      id: 28,
      name: 'Royal Blue',
      title: 'The "Royal Blue" Velvet Tuxedo',
      description: 'royal blue velvet peak lapel tuxedo with satin trim',
      price: '₦550,000.00',
      rating: 4.7,
      type: 'Buy',
      typeColor: 'bg-white text-gray-900',
      image: 'https://storage.googleapis.com/a1aa/image/37b3af0e-9926-4d7e-feb6-f9344b6deaee.jpg',
      color: 'Royal Blue',
      size: 'L',
      category: 'Groom Wear',
      inStock: true,
      images: [
        'https://storage.googleapis.com/a1aa/image/37b3af0e-9926-4d7e-feb6-f9344b6deaee.jpg'
      ]
    },
    {
      id: 29,
      name: 'Classic Black',
      title: 'The "Classic Black" Tuxedo',
      description: 'classic black notch lapel tuxedo for formal occasions',
      price: '₦85,000.00',
      rating: 4.6,
      type: 'Rent',
      typeColor: 'bg-yellow-300 text-gray-900',
      image: 'https://storage.googleapis.com/a1aa/image/e8f8d812-539b-431b-c910-19ef27d934ca.jpg',
      color: 'Classic Black',
      size: 'M',
      category: 'Groom Wear',
      inStock: true,
      images: [
        'https://storage.googleapis.com/a1aa/image/e8f8d812-539b-431b-c910-19ef27d934ca.jpg'
      ]
    },
    {
      id: 30,
      name: 'Burgundy',
      title: 'The "Burgundy" Wedding Suit',
      description: 'burgundy slim fit wedding suit with modern cut',
      price: '₦480,000.00',
      rating: 4.4,
      type: 'Buy',
      typeColor: 'bg-white text-gray-900',
      image: 'https://storage.googleapis.com/a1aa/image/f0644fb1-424e-4861-678b-e15687175b11.jpg',
      color: 'Burgundy',
      size: 'S',
      category: 'Groom Wear',
      inStock: true,
      images: [
        'https://storage.googleapis.com/a1aa/image/f0644fb1-424e-4861-678b-e15687175b11.jpg'
      ]
    },
    {
      id: 31,
      name: 'Silver Gray',
      title: 'The "Silver Gray" Tuxedo',
      description: 'silver gray sharkskin tuxedo with peak lapel',
      price: '₦95,000.00',
      rating: 4.8,
      type: 'Rent',
      typeColor: 'bg-yellow-300 text-gray-900',
      image: 'https://storage.googleapis.com/a1aa/image/37b3af0e-9926-4d7e-feb6-f9344b6deaee.jpg',
      color: 'Silver Gray',
      size: 'L',
      category: 'Groom Wear',
      inStock: true,
      images: [
        'https://storage.googleapis.com/a1aa/image/37b3af0e-9926-4d7e-feb6-f9344b6deaee.jpg'
      ]
    },
    {
      id: 32,
      name: 'Navy Blue',
      title: 'The "Navy Blue" Classic Suit',
      description: 'navy blue classic fit suit for wedding ceremonies',
      price: '₦420,000.00',
      rating: 4.5,
      type: 'Buy',
      typeColor: 'bg-white text-gray-900',
      image: 'https://storage.googleapis.com/a1aa/image/e8f8d812-539b-431b-c910-19ef27d934ca.jpg',
      color: 'Navy Blue',
      size: 'M',
      category: 'Groom Wear',
      inStock: true,
      images: [
        'https://storage.googleapis.com/a1aa/image/e8f8d812-539b-431b-c910-19ef27d934ca.jpg'
      ]
    },
    {
      id: 33,
      name: 'White Dinner',
      title: 'The "White Dinner" Jacket',
      description: 'white dinner jacket for tropical wedding themes',
      price: '₦65,000.00',
      rating: 4.3,
      type: 'Rent',
      typeColor: 'bg-yellow-300 text-gray-900',
      image: 'https://storage.googleapis.com/a1aa/image/f0644fb1-424e-4861-678b-e15687175b11.jpg',
      color: 'White',
      size: 'M',
      category: 'Groom Wear',
      inStock: true,
      images: [
        'https://storage.googleapis.com/a1aa/image/f0644fb1-424e-4861-678b-e15687175b11.jpg'
      ]
    },
    {
      id: 34,
      name: 'Charcoal',
      title: 'The "Charcoal" Slim Fit',
      description: 'charcoal gray slim fit tuxedo with modern styling',
      price: '₦520,000.00',
      rating: 4.7,
      type: 'Buy',
      typeColor: 'bg-white text-gray-900',
      image: 'https://storage.googleapis.com/a1aa/image/37b3af0e-9926-4d7e-feb6-f9344b6deaee.jpg',
      color: 'Charcoal Gray',
      size: 'S',
      category: 'Groom Wear',
      inStock: true,
      images: [
        'https://storage.googleapis.com/a1aa/image/37b3af0e-9926-4d7e-feb6-f9344b6deaee.jpg'
      ]
    },
    {
      id: 35,
      name: 'Midnight Black',
      title: 'The "Midnight Black" Tuxedo',
      description: 'midnight black tuxedo with satin lapel for formal weddings',
      price: '₦78,000.00',
      rating: 4.6,
      type: 'Rent',
      typeColor: 'bg-yellow-300 text-gray-900',
      image: 'https://storage.googleapis.com/a1aa/image/e8f8d812-539b-431b-c910-19ef27d934ca.jpg',
      color: 'Midnight Black',
      size: 'L',
      category: 'Groom Wear',
      inStock: true,
      images: [
        'https://storage.googleapis.com/a1aa/image/e8f8d812-539b-431b-c910-19ef27d934ca.jpg'
      ]
    },
    {
      id: 36,
      name: 'Platinum',
      title: 'The "Platinum" Wedding Suit',
      description: 'platinum colored wedding suit with contemporary design',
      price: '₦580,000.00',
      rating: 4.9,
      type: 'Auction',
      typeColor: 'bg-teal-900 text-white',
      image: 'https://storage.googleapis.com/a1aa/image/f0644fb1-424e-4861-678b-e15687175b11.jpg',
      color: 'Platinum',
      size: 'M',
      category: 'Groom Wear',
      inStock: true,
      images: [
        'https://storage.googleapis.com/a1aa/image/f0644fb1-424e-4861-678b-e15687175b11.jpg'
      ]
    }
  ];

  const handleAddToCart = (e, tuxedo) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    e.preventDefault();
    
    const cartProduct = {
      id: tuxedo.id,
      name: tuxedo.name,
      title: tuxedo.title,
      price: tuxedo.price,
      image: tuxedo.image,
      type: tuxedo.type,
      description: tuxedo.description,
    };
    addToCart(cartProduct);
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const toggleFavorite = (e, tuxedoId) => {
    e.stopPropagation(); // Prevent navigation when clicking favorite
    e.preventDefault();
    
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(tuxedoId)) {
        newFavorites.delete(tuxedoId);
      } else {
        newFavorites.add(tuxedoId);
      }
      return newFavorites;
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-orange-400">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-orange-400">☆</span>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar cartItems={cartCount} onCartClick={() => setIsCartOpen(true)} />

      {/* Hero section */}
      <section className="relative bg-gray-900 text-white">
        <div className="relative overflow-hidden group">
          <img 
            src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756576986/image_39_t9ydnv.png"
            alt="Groom wear and tuxedos collection"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent flex flex-col justify-end px-6 pb-16 max-w-[100rem] mx-auto w-full">
          <nav className="text-xs text-gray-300 mb-2 font-semibold">
            <a className="hover:underline cursor-pointer">Weddings</a>
            <span className="mx-1">/</span>
            <span className="text-gray-400">Groom wear & tuxedos</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold max-w-lg leading-tight">
            Groom wear & tuxedos
          </h1>
          <p className="mt-2 max-w-md text-sm sm:text-base text-gray-300">
            Find the perfect tuxedos to make your special day memorable
          </p>
        </div>
      </section>

      {/* Listings header */}
      <section className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <p className="text-xs font-semibold text-gray-500 tracking-widest mb-1">
              LISTINGS
            </p>
            <h2 className="text-2xl font-semibold">
              Available Listings
            </h2>
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0 text-sm font-semibold text-gray-900">
            {['Color', 'Price', 'Size'].map((filter) => (
              <button 
                key={filter}
                className="flex items-center space-x-1 hover:text-teal-600 cursor-pointer"
                onClick={() => console.log(`Filter by ${filter}`)}
              >
                <span>{filter}</span>
                <ChevronDown size={12} />
              </button>
            ))}
          </div>
        </div>

        {/* Listings grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tuxedos.map((tuxedo) => {
            // Determine route based on type
            const routePath =
              tuxedo.type === "Rent"
                ? `/productdetail-rent/${tuxedo.id}`
                : tuxedo.type === "Auction"
                ? `/productdetail-auction/${tuxedo.id}`
                : `/productdetail-buy/${tuxedo.id}`;

            return (
              <Link
                key={tuxedo.id}
                to={routePath}
                state={{ product: tuxedo }}
                className="block"
              >
                <article 
                  className="border border-gray-200 rounded-lg p-4 flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative rounded-lg overflow-hidden mb-3">
                    <img 
                      alt={`${tuxedo.name} tuxedo`} 
                      className="w-full h-80 object-cover object-center rounded-lg" 
                      src={tuxedo.image}
                    />
                    <span className={`absolute top-2 left-2 text-xs font-semibold rounded-full px-2 py-0.5 ${tuxedo.typeColor}`}>
                      {tuxedo.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-1">
                    <div className="flex text-orange-400 text-sm">
                      {renderStars(tuxedo.rating)}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({tuxedo.rating})
                    </span>
                  </div>
                  
                  <p className="font-semibold text-lg mb-1">
                    {tuxedo.price}
                  </p>
                  
                  <p className="text-xs text-gray-600 mb-3 leading-tight">
                    {tuxedo.title}
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <button 
                      className="flex items-center space-x-2 text-xs text-gray-700 border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100 transition-colors"
                      onClick={(e) => handleAddToCart(e, tuxedo)}
                      aria-label={`Add ${tuxedo.name} tuxedo to cart`}
                    >
                      <ShoppingCart size={12} />
                      <span>Add to Cart</span>
                    </button>
                    
                    <button 
                      className={`transition-colors ${
                        favorites.has(tuxedo.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                      }`}
                      onClick={(e) => toggleFavorite(e, tuxedo.id)}
                      aria-label="Add to favorites"
                    >
                      <Heart 
                        size={16} 
                        fill={favorites.has(tuxedo.id) ? 'currentColor' : 'none'} 
                      />
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
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Groomsmen;