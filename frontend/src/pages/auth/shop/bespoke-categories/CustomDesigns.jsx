import React from 'react';
import CategoryPageTemplate from '../shared/CategoryPageTemplate';
import FilterSystem from '../shared/FilterSystem';

const CustomDesigns = () => {
  const products = [
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
    }
  ];



    const [filteredProducts, setFilteredProducts] = useState(products);

    <FilterSystem
        products={products}
        onFilterChange={setFilteredProducts}
        availableFilters={{
            categories: ['Wedding', 'Casual', 'Formal'],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Black', 'White', 'Blue']
        }}
    />
  return (
    <CategoryPageTemplate
      categoryName="Custom Designs"
      breadcrumbParent="Bespoke"
      heroImage="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808977/image_65_sltoh8.png"
      heroDescription="Commission unique designs crafted exclusively for you with personalized attention"
      products={products}
    />
  );
};

export default CustomDesigns;