import React from 'react';
import { useState } from 'react';
import CategoryPageTemplate from '../shared/CategoryPageTemplate';
import FilterSystem from '../shared/FilterSystem';
const OccasionalWear = () => {
  const products = [
    {
      id: 700,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808948/image_76_ayq9vq.png",
      alt: "Cocktail dress",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦65,000.00",
      name: "The Cocktail Dress",
      title: "The Cocktail Dress",
      description: "Elegant cocktail dress for evening events and parties"
    },
    {
      id: 701,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808948/image_76_ayq9vq.png",
      alt: "Event dress",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦18,000.00",
      name: "The Party Dress",
      title: "The Party Dress",
      description: "Stylish dress perfect for parties and social events"
    },
    {
      id: 702,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808948/image_76_ayq9vq.png",
      alt: "Limited occasion",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦95,000.00",
      name: "The Gala Gown",
      title: "The Gala Gown",
      description: "Limited edition gown for formal galas and events"
    },
    {
      id: 703,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808948/image_76_ayq9vq.png",
      alt: "Evening wear",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦78,000.00",
      name: "The Evening Ensemble",
      title: "The Evening Ensemble",
      description: "Sophisticated evening wear for special occasions"
    },
    {
      id: 704,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808948/image_76_ayq9vq.png",
      alt: "Formal rental",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦22,000.00",
      name: "The Formal Dress",
      title: "The Formal Dress",
      description: "Elegant formal dress for weddings and ceremonies"
    },
    {
      id: 705,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808948/image_76_ayq9vq.png",
      alt: "Designer occasion",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦120,000.00",
      name: "The Designer Evening",
      title: "The Designer Evening",
      description: "Designer occasion wear for exclusive events"
    },
    {
      id: 706,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808948/image_76_ayq9vq.png",
      alt: "Party wear",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦55,000.00",
      name: "The Celebration Dress",
      title: "The Celebration Dress",
      description: "Vibrant party wear for celebrations and events"
    },
    {
      id: 707,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808948/image_76_ayq9vq.png",
      alt: "Event rental",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦15,000.00",
      name: "The Event Outfit",
      title: "The Event Outfit",
      description: "Perfect outfit for various social events"
    },
    {
      id: 708,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808948/image_76_ayq9vq.png",
      alt: "Special occasion",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦85,000.00",
      name: "The Special Occasion",
      title: "The Special Occasion",
      description: "Exclusive wear for milestone celebrations"
    },
    {
      id: 709,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808948/image_76_ayq9vq.png",
      alt: "Dinner dress",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦62,000.00",
      name: "The Dinner Dress",
      title: "The Dinner Dress",
      description: "Chic dress for dinner dates and evening outings"
    },
    {
      id: 710,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808948/image_76_ayq9vq.png",
      alt: "Rental occasion",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦20,000.00",
      name: "The Weekend Event",
      title: "The Weekend Event",
      description: "Versatile outfit for weekend events and gatherings"
    },
    {
      id: 711,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808948/image_76_ayq9vq.png",
      alt: "Premium occasion",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦110,000.00",
      name: "The Premium Event",
      title: "The Premium Event",
      description: "Premium occasion wear for high-profile events"
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
      categoryName="Occasional Wear"
      breadcrumbParent="Ready-to-wear"
      heroImage="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808976/image_73_gwsvdg.png"
      heroDescription="Perfect outfits for every special occasion and memorable event"
      products={products}
    />
  );
};

export default OccasionalWear;