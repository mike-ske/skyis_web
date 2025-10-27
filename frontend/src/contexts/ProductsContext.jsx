import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock product data - replace with actual API call
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: 'The "Da Vinci" Charcoal Black Tuxedo',
        title: 'The "Da Vinci" charcoal black, metallic jacquard, single lapel, mid cut intersect strap tuxedo suit',
        description: 'Premium charcoal black tuxedo with metallic jacquard detailing',
        price: '₦500,000.00',
        rating: 4.5,
        type: 'Buy',
        category: 'luxury',
        image: 'https://storage.googleapis.com/a1aa/image/37b3af0e-9926-4d7e-feb6-f9344b6deaee.jpg'
      },
      {
        id: 2,
        name: 'October 1st Green Tuxedo',
        title: 'The "October 1st" castleton green covered peak lapel jacquard tuxedo suit',
        description: 'Elegant castleton green tuxedo with peak lapel',
        price: '₦450,000.00',
        rating: 4.6,
        type: 'Buy',
        category: 'luxury',
        image: 'https://storage.googleapis.com/a1aa/image/e8f8d812-539b-431b-c910-19ef27d934ca.jpg'
      },
      {
        id: 3,
        name: 'Yohji Cream Suit',
        title: 'A "Yohji", 2 buttons, Irish cream, deconstructed 3-layered knitted peak lapel suit',
        description: 'Irish cream deconstructed suit with unique design',
        price: '₦380,000.00',
        rating: 4.4,
        type: 'Rent',
        category: 'bespoke',
        image: 'https://storage.googleapis.com/a1aa/image/f0644fb1-424e-4861-678b-e15687175b11.jpg'
      },
      {
        id: 800,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808942/image_66_mq3aa7.png",
        alt: "Custom designed dress",
        type: "Buy",
        typeColor: "bg-white text-gray-900",
        rating: 4.5,
        price: "₦250,000.00",
        name: "The Bespoke Gown",
        title: "The Bespoke Gown",
        description: "Custom-designed evening gown tailored to your measurements"
        },
        {
        id: 801,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808942/image_66_mq3aa7.png",
        alt: "Custom suit",
        type: "Rent",
        typeColor: "bg-yellow-300 text-gray-900",
        rating: 4.5,
        price: "₦75,000.00",
        name: "The Tailored Suit",
        title: "The Tailored Suit",
        description: "Custom-tailored suit for special occasions"
        },
        {
        id: 802,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808942/image_66_mq3aa7.png",
        alt: "Limited custom",
        type: "Auction",
        typeColor: "bg-teal-900 text-white",
        rating: 4.5,
        price: "₦350,000.00",
        name: "The Couture Creation",
        title: "The Couture Creation",
        description: "Limited edition custom couture piece"
        },
        {
        id: 803,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808942/image_66_mq3aa7.png",
        alt: "Bespoke dress",
        type: "Buy",
        typeColor: "bg-white text-gray-900",
        rating: 4.5,
        price: "₦180,000.00",
        name: "The Custom Dress",
        title: "The Custom Dress",
        description: "Beautiful custom-made dress for special events"
        },
        {
        id: 804,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808942/image_66_mq3aa7.png",
        alt: "Rental custom",
        type: "Rent",
        typeColor: "bg-yellow-300 text-gray-900",
        rating: 4.5,
        price: "₦60,000.00",
        name: "The Bespoke Rental",
        title: "The Bespoke Rental",
        description: "Custom-designed outfit available for rental"
        },
        {
        id: 805,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808942/image_66_mq3aa7.png",
        alt: "Auction custom",
        type: "Auction",
        typeColor: "bg-teal-900 text-white",
        rating: 4.5,
        price: "₦420,000.00",
        name: "The Artisan Piece",
        title: "The Artisan Piece",
        description: "Handcrafted custom design by master artisan"
        },
        {
        id: 806,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808942/image_66_mq3aa7.png",
        alt: "Custom formal",
        type: "Buy",
        typeColor: "bg-white text-gray-900",
        rating: 4.5,
        price: "₦220,000.00",
        name: "The Formal Custom",
        title: "The Formal Custom",
        description: "Custom formal wear for business and events"
        },
        {
        id: 807,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808942/image_66_mq3aa7.png",
        alt: "Designer custom",
        type: "Rent",
        typeColor: "bg-yellow-300 text-gray-900",
        rating: 4.5,
        price: "₦85,000.00",
        name: "The Designer Custom",
        title: "The Designer Custom",
        description: "Custom design by renowned fashion designer"
        },
        {
        id: 808,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808942/image_66_mq3aa7.png",
        alt: "Heritage custom",
        type: "Auction",
        typeColor: "bg-teal-900 text-white",
        rating: 4.5,
        price: "₦380,000.00",
        name: "The Heritage Custom",
        title: "The Heritage Custom",
        description: "Custom piece incorporating traditional techniques"
        },
        {
        id: 809,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808942/image_66_mq3aa7.png",
        alt: "Modern custom",
        type: "Buy",
        typeColor: "bg-white text-gray-900",
        rating: 4.5,
        price: "₦195,000.00",
        name: "The Modern Bespoke",
        title: "The Modern Bespoke",
        description: "Contemporary custom design with modern aesthetics"
        },
        {
        id: 810,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808942/image_66_mq3aa7.png",
        alt: "Event custom",
        type: "Rent",
        typeColor: "bg-yellow-300 text-gray-900",
        rating: 4.5,
        price: "₦70,000.00",
        name: "The Event Custom",
        title: "The Event Custom",
        description: "Custom-designed outfit for specific events"
        },
        {
        id: 811,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808942/image_66_mq3aa7.png",
        alt: "Premium custom",
        type: "Auction",
        typeColor: "bg-teal-900 text-white",
        rating: 4.5,
        price: "₦500,000.00",
        name: "The Ultimate Custom",
        title: "The Ultimate Custom",
        description: "Premium custom design with exclusive materials"
        },
        {
        id: 900,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808943/image_67_jxqg0b.png",
        alt: "Streetwear hoodie",
        type: "Buy",
        typeColor: "bg-white text-gray-900",
        rating: 4.5,
        price: "₦45,000.00",
        name: "The Urban Hoodie",
        title: "The Urban Hoodie",
        description: "Custom streetwear hoodie with urban aesthetic"
        },
        {
        id: 901,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808943/image_67_jxqg0b.png",
        alt: "Streetwear pants",
        type: "Rent",
        typeColor: "bg-yellow-300 text-gray-900",
        rating: 4.5,
        price: "₦15,000.00",
        name: "The Street Pants",
        title: "The Street Pants",
        description: "Custom streetwear pants for urban fashion"
        },
        {
        id: 902,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808943/image_67_jxqg0b.png",
        alt: "Limited streetwear",
        type: "Auction",
        typeColor: "bg-teal-900 text-white",
        rating: 4.5,
        price: "₦85,000.00",
        name: "The Limited Drop",
        title: "The Limited Drop",
        description: "Limited edition streetwear collection piece"
        },
        {
        id: 903,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808943/image_67_jxqg0b.png",
        alt: "Streetwear jacket",
        type: "Buy",
        typeColor: "bg-white text-gray-900",
        rating: 4.5,
        price: "₦65,000.00",
        name: "The Urban Jacket",
        title: "The Urban Jacket",
        description: "Custom streetwear jacket with unique design"
        },
        {
        id: 904,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808943/image_67_jxqg0b.png",
        alt: "Rental streetwear",
        type: "Rent",
        typeColor: "bg-yellow-300 text-gray-900",
        rating: 4.5,
        price: "₦18,000.00",
        name: "The Street Style",
        title: "The Street Style",
        description: "Custom streetwear for temporary urban looks"
        },
        {
        id: 905,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808943/image_67_jxqg0b.png",
        alt: "Designer streetwear",
        type: "Auction",
        typeColor: "bg-teal-900 text-white",
        rating: 4.5,
        price: "₦120,000.00",
        name: "The Designer Street",
        title: "The Designer Street",
        description: "Designer streetwear piece from exclusive collection"
        },
        {
        id: 906,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808943/image_67_jxqg0b.png",
        alt: "Streetwear set",
        type: "Buy",
        typeColor: "bg-white text-gray-900",
        rating: 4.5,
        price: "₦55,000.00",
        name: "The Complete Set",
        title: "The Complete Set",
        description: "Full streetwear set for complete urban look"
        },
        {
        id: 907,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808943/image_67_jxqg0b.png",
        alt: "Event streetwear",
        type: "Rent",
        typeColor: "bg-yellow-300 text-gray-900",
        rating: 4.5,
        price: "₦20,000.00",
        name: "The Event Street",
        title: "The Event Street",
        description: "Streetwear for urban events and gatherings"
        },
        {
        id: 908,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808943/image_67_jxqg0b.png",
        alt: "Premium streetwear",
        type: "Auction",
        typeColor: "bg-teal-900 text-white",
        rating: 4.5,
        price: "₦95,000.00",
        name: "The Premium Street",
        title: "The Premium Street",
        description: "Premium streetwear with exclusive materials"
        },
        {
        id: 909,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808943/image_67_jxqg0b.png",
        alt: "Custom street tee",
        type: "Buy",
        typeColor: "bg-white text-gray-900",
        rating: 4.5,
        price: "₦35,000.00",
        name: "The Custom Tee",
        title: "The Custom Tee",
        description: "Custom streetwear t-shirt with unique graphics"
        },
        {
        id: 910,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808943/image_67_jxqg0b.png",
        alt: "Seasonal streetwear",
        type: "Rent",
        typeColor: "bg-yellow-300 text-gray-900",
        rating: 4.5,
        price: "₦12,000.00",
        name: "The Seasonal Street",
        title: "The Seasonal Street",
        description: "Seasonal streetwear collection for temporary use"
        },
        {
        id: 911,
        image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808943/image_67_jxqg0b.png",
        alt: "Collector streetwear",
        type: "Auction",
        typeColor: "bg-teal-900 text-white",
        rating: 4.5,
        price: "₦150,000.00",
        name: "The Collector Street",
        title: "The Collector Street",
        description: "Collector's edition streetwear piece"
        }

    ];

    setAllProducts(mockProducts);
    setIsLoading(false);
  }, []);

  const getProductById = (id) => {
    return allProducts.find(product => product.id === parseInt(id));
  };

  const getProductsByCategory = (category) => {
    return allProducts.filter(product => product.category === category);
  };

  const value = {
    allProducts,
    isLoading,
    getProductById,
    getProductsByCategory
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;