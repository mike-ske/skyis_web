import React, { useState } from 'react';
import CategoryPageTemplate from '../shared/CategoryPageTemplate';
import FilterSystem from '../shared/FilterSystem';

const Collections = () => {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const products = [
    {
      id: 100,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808935/image_59_don465.png",
      alt: "Gray long coat on mannequin",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦350,000.00",
      name: "The Executive Coat",
      title: "The Executive Coat",
      description: "Elegant gray long coat with modern tailoring and premium fabric"
    },
    {
      id: 101,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808935/image_59_don465.png",
      alt: "Gray long coat variant",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦85,000.00",
      name: "The Classic Overcoat",
      title: "The Classic Overcoat",
      description: "Timeless charcoal overcoat perfect for formal occasions"
    },
    {
      id: 102,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808935/image_59_don465.png",
      alt: "Designer coat",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦420,000.00",
      name: "The Heritage Collection",
      title: "The Heritage Collection",
      description: "Limited edition designer coat with bespoke detailing"
    },
    {
      id: 103,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808935/image_59_don465.png",
      alt: "Premium wool coat",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦280,000.00",
      name: "The Urban Elite",
      title: "The Urban Elite",
      description: "Contemporary wool blend coat for the modern professional"
    },
    {
      id: 104,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808935/image_59_don465.png",
      alt: "Tailored coat",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦65,000.00",
      name: "The Gentleman's Choice",
      title: "The Gentleman's Choice",
      description: "Refined tailored coat with classic silhouette"
    },
    {
      id: 105,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808935/image_59_don465.png",
      alt: "Designer wool coat",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦380,000.00",
      name: "The Signature Piece",
      title: "The Signature Piece",
      description: "Exclusive designer coat with custom embellishments"
    },
    {
      id: 106,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808935/image_59_don465.png",
      alt: "Business coat",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦320,000.00",
      name: "The Corporate",
      title: "The Corporate",
      description: "Sleek business coat with modern fit and premium finish"
    },
    {
      id: 107,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808935/image_59_don465.png",
      alt: "Formal overcoat",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦75,000.00",
      name: "The Distinguished",
      title: "The Distinguished",
      description: "Formal overcoat with sophisticated styling"
    },
    {
      id: 108,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808935/image_59_don465.png",
      alt: "Luxury coat",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦450,000.00",
      name: "The Prestige",
      title: "The Prestige",
      description: "Ultra-luxury coat with premium materials and craftsmanship"
    },
    {
      id: 109,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808935/image_59_don465.png",
      alt: "Modern coat",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦295,000.00",
      name: "The Contemporary",
      title: "The Contemporary",
      description: "Modern interpretation of classic coat design"
    },
    {
      id: 110,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808935/image_59_don465.png",
      alt: "Rental coat",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦55,000.00",
      name: "The Occasion",
      title: "The Occasion",
      description: "Perfect rental piece for special events"
    },
    {
      id: 111,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808935/image_59_don465.png",
      alt: "Premium designer coat",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦500,000.00",
      name: "The Masterpiece",
      title: "The Masterpiece",
      description: "Rare designer coat with exceptional detailing"
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
      categoryName="Wear & Style Collections"
      breadcrumbParent="Luxury"
      heroImage="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808967/image_56_frjxmy.png"
      heroDescription="Discover our curated collection of premium wear and sophisticated style pieces"
      products={products}
    />
    
    
  );
  
};

export default Collections;