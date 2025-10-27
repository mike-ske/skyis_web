import React from 'react';
import CategoryPageTemplate from '../shared/CategoryPageTemplate';
import FilterSystem from '../shared/FilterSystem';

const FashionToOrder = () => {
  const products = [
    {
      id: 1000,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808944/image_68_bfgq7t.png",
      alt: "Made to order dress",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦180,000.00",
      name: "The Made-to-Order",
      title: "The Made-to-Order",
      description: "Beautiful dress made to your exact specifications"
    },
    {
      id: 1001,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808944/image_68_bfgq7t.png",
      alt: "Order suit",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦55,000.00",
      name: "The Tailored Order",
      title: "The Tailored Order",
      description: "Made-to-order suit available for rental"
    },
    {
      id: 1002,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808944/image_68_bfgq7t.png",
      alt: "Limited order",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦280,000.00",
      name: "The Exclusive Order",
      title: "The Exclusive Order",
      description: "Limited made-to-order exclusive piece"
    },
    {
      id: 1003,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808944/image_68_bfgq7t.png",
      alt: "Custom order",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦220,000.00",
      name: "The Custom Order",
      title: "The Custom Order",
      description: "Fully customizable made-to-order outfit"
    },
    {
      id: 1004,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808944/image_68_bfgq7t.png",
      alt: "Rental order",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦45,000.00",
      name: "The Rental Order",
      title: "The Rental Order",
      description: "Made-to-order piece available for special events"
    },
    {
      id: 1005,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808944/image_68_bfgq7t.png",
      alt: "Premium order",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦350,000.00",
      name: "The Premium Order",
      title: "The Premium Order",
      description: "Premium made-to-order with luxury materials"
    },
    {
      id: 1006,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808944/image_68_bfgq7t.png",
      alt: "Formal order",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦195,000.00",
      name: "The Formal Order",
      title: "The Formal Order",
      description: "Made-to-order formal wear for business"
    },
    {
      id: 1007,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808944/image_68_bfgq7t.png",
      alt: "Event order",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦65,000.00",
      name: "The Event Order",
      title: "The Event Order",
      description: "Made-to-order for specific event requirements"
    },
    {
      id: 1008,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808944/image_68_bfgq7t.png",
      alt: "Designer order",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦420,000.00",
      name: "The Designer Order",
      title: "The Designer Order",
      description: "Made-to-order by renowned fashion designer"
    },
    {
      id: 1009,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808944/image_68_bfgq7t.png",
      alt: "Modern order",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦175,000.00",
      name: "The Modern Order",
      title: "The Modern Order",
      description: "Contemporary made-to-order design"
    },
    {
      id: 1010,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808944/image_68_bfgq7t.png",
      alt: "Seasonal order",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦38,000.00",
      name: "The Seasonal Order",
      title: "The Seasonal Order",
      description: "Seasonal made-to-order collection piece"
    },
    {
      id: 1011,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808944/image_68_bfgq7t.png",
      alt: "Ultimate order",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦500,000.00",
      name: "The Ultimate Order",
      title: "The Ultimate Order",
      description: "Ultimate made-to-order luxury piece"
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
      categoryName="Fashion to Order"
      breadcrumbParent="Bespoke"
      heroImage="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808977/image_65_sltoh8.png"
      heroDescription="Exclusive made-to-order fashion pieces crafted to your precise measurements and style"
      products={products}
    />
  );
};

export default FashionToOrder;