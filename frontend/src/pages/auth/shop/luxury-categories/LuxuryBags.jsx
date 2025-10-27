import React from 'react';
import CategoryPageTemplate from '../shared/CategoryPageTemplate';
import FilterSystem from '../shared/FilterSystem';

const LuxuryBags = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const products = [
    {
      id: 300,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808937/image_60_ukvx0j.png",
      alt: "Designer handbag",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦650,000.00",
      name: "The Signature Tote",
      title: "The Signature Tote",
      description: "Premium leather tote with gold hardware and spacious interior"
    },
    {
      id: 301,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808937/image_60_ukvx0j.png",
      alt: "Evening clutch",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦45,000.00",
      name: "The Evening Clutch",
      title: "The Evening Clutch",
      description: "Elegant evening clutch perfect for formal events"
    },
    {
      id: 302,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808937/image_60_ukvx0j.png",
      alt: "Limited edition bag",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦1,200,000.00",
      name: "The Collector's Bag",
      title: "The Collector's Bag",
      description: "Limited edition designer bag from exclusive collection"
    },
    {
      id: 303,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808937/image_60_ukvx0j.png",
      alt: "Crossbody bag",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦420,000.00",
      name: "The Urban Crossbody",
      title: "The Urban Crossbody",
      description: "Versatile crossbody bag for everyday luxury"
    },
    {
      id: 304,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808937/image_60_ukvx0j.png",
      alt: "Designer backpack",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦35,000.00",
      name: "The Luxury Backpack",
      title: "The Luxury Backpack",
      description: "Designer backpack combining style and functionality"
    },
    {
      id: 305,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808937/image_60_ukvx0j.png",
      alt: "Vintage handbag",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦850,000.00",
      name: "The Vintage Treasure",
      title: "The Vintage Treasure",
      description: "Rare vintage designer bag in excellent condition"
    },
    {
      id: 306,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808937/image_60_ukvx0j.png",
      alt: "Weekend bag",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦580,000.00",
      name: "The Weekender",
      title: "The Weekender",
      description: "Spacious weekend travel bag in premium leather"
    },
    {
      id: 307,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808937/image_60_ukvx0j.png",
      alt: "Designer wallet",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦25,000.00",
      name: "The Executive Wallet",
      title: "The Executive Wallet",
      description: "Premium leather wallet with multiple compartments"
    },
    {
      id: 308,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808937/image_60_ukvx0j.png",
      alt: "Limited clutch",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦950,000.00",
      name: "The Runway Clutch",
      title: "The Runway Clutch",
      description: "Limited edition clutch seen on fashion runways"
    },
    {
      id: 309,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808937/image_60_ukvx0j.png",
      alt: "Satchel bag",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦520,000.00",
      name: "The Professional Satchel",
      title: "The Professional Satchel",
      description: "Structured satchel perfect for business occasions"
    },
    {
      id: 310,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808937/image_60_ukvx0j.png",
      alt: "Beach bag",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦28,000.00",
      name: "The Resort Tote",
      title: "The Resort Tote",
      description: "Stylish beach tote for vacation and resort wear"
    },
    {
      id: 311,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808937/image_60_ukvx0j.png",
      alt: "Collector's item",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦1,500,000.00",
      name: "The Heritage Piece",
      title: "The Heritage Piece",
      description: "Iconic designer bag from heritage collection"
    }
  ];

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
      categoryName="Luxury Bags"
      breadcrumbParent="Luxury"
      heroImage="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808967/image_56_frjxmy.png"
      heroDescription="Discover exquisite luxury bags from premier designers and exclusive collections"
      products={products}
    />
  );
};

export default LuxuryBags;