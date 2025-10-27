import React from 'react';
import { useState } from 'react';
import CategoryPageTemplate from '../shared/CategoryPageTemplate';
import FilterSystem from '../shared/FilterSystem';

const CulturalWear = () => {
  const products = [
    {
      id: 600,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808947/image_75_ajvjvq.png",
      alt: "Traditional attire",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦85,000.00",
      name: "The Heritage Attire",
      title: "The Heritage Attire",
      description: "Authentic traditional cultural wear with intricate details"
    },
    {
      id: 601,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808947/image_75_ajvjvq.png",
      alt: "Cultural dress",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦25,000.00",
      name: "The Ceremonial Dress",
      title: "The Ceremonial Dress",
      description: "Beautiful cultural dress for traditional ceremonies"
    },
    {
      id: 602,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808947/image_75_ajvjvq.png",
      alt: "Limited cultural",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦120,000.00",
      name: "The Royal Ensemble",
      title: "The Royal Ensemble",
      description: "Limited edition royal cultural attire"
    },
    {
      id: 603,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808947/image_75_ajvjvq.png",
      alt: "Traditional gown",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦95,000.00",
      name: "The Traditional Gown",
      title: "The Traditional Gown",
      description: "Elegant traditional gown for special occasions"
    },
    {
      id: 604,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808947/image_75_ajvjvq.png",
      alt: "Cultural rental",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦30,000.00",
      name: "The Festival Wear",
      title: "The Festival Wear",
      description: "Vibrant cultural wear for festivals and celebrations"
    },
    {
      id: 605,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808947/image_75_ajvjvq.png",
      alt: "Vintage cultural",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦150,000.00",
      name: "The Ancestral Piece",
      title: "The Ancestral Piece",
      description: "Vintage cultural wear with historical significance"
    },
    {
      id: 606,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808947/image_75_ajvjvq.png",
      alt: "Modern traditional",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦75,000.00",
      name: "The Modern Traditional",
      title: "The Modern Traditional",
      description: "Contemporary take on traditional cultural wear"
    },
    {
      id: 607,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808947/image_75_ajvjvq.png",
      alt: "Wedding cultural",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦35,000.00",
      name: "The Wedding Attire",
      title: "The Wedding Attire",
      description: "Traditional wedding attire for cultural ceremonies"
    },
    {
      id: 608,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808947/image_75_ajvjvq.png",
      alt: "Rare cultural",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦180,000.00",
      name: "The Cultural Treasure",
      title: "The Cultural Treasure",
      description: "Rare and exquisite cultural masterpiece"
    },
    {
      id: 609,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808947/image_75_ajvjvq.png",
      alt: "Cultural accessories",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦45,000.00",
      name: "The Cultural Set",
      title: "The Cultural Set",
      description: "Complete cultural wear set with accessories"
    },
    {
      id: 610,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808947/image_75_ajvjvq.png",
      alt: "Event cultural",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦28,000.00",
      name: "The Celebration Outfit",
      title: "The Celebration Outfit",
      description: "Traditional outfit for cultural celebrations"
    },
    {
      id: 611,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808947/image_75_ajvjvq.png",
      alt: "Heritage piece",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦200,000.00",
      name: "The Heritage Masterpiece",
      title: "The Heritage Masterpiece",
      description: "Exceptional heritage cultural wear piece"
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
      categoryName="Cultural Wear"
      breadcrumbParent="Ready-to-wear"
      heroImage="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808976/image_73_gwsvdg.png"
      heroDescription="Celebrate heritage with authentic cultural wear and traditional attire"
      products={products}
    />
  );
};

export default CulturalWear;