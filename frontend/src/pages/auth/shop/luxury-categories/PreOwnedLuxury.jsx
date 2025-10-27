import { useState } from 'react';
import CategoryPageTemplate from '../shared/CategoryPageTemplate';
import FilterSystem from '../shared/FilterSystem';

const PreOwnedLuxury = () => {
  const products = [
    {
      id: 400,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808940/image_62_gnp4yf.png",
      alt: "Pre-owned designer dress",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦180,000.00",
      name: "The Vintage Gown",
      title: "The Vintage Gown",
      description: "Authentic pre-owned designer gown in excellent condition"
    },
    {
      id: 401,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808940/image_62_gnp4yf.png",
      alt: "Pre-owned luxury coat",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦35,000.00",
      name: "The Classic Coat",
      title: "The Classic Coat",
      description: "Premium pre-owned coat with timeless elegance"
    },
    {
      id: 402,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808940/image_62_gnp4yf.png",
      alt: "Vintage designer piece",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦320,000.00",
      name: "The Retro Find",
      title: "The Retro Find",
      description: "Rare vintage designer piece from iconic collection"
    },
    {
      id: 403,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808940/image_62_gnp4yf.png",
      alt: "Pre-owned handbag",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦250,000.00",
      name: "The Pre-Loved Tote",
      title: "The Pre-Loved Tote",
      description: "Authentic pre-owned designer tote, well maintained"
    },
    {
      id: 404,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808940/image_62_gnp4yf.png",
      alt: "Second-hand luxury",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦42,000.00",
      name: "The Evening Dress",
      title: "The Evening Dress",
      description: "Designer evening dress available for special occasions"
    },
    {
      id: 405,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808940/image_62_gnp4yf.png",
      alt: "Collector's vintage",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦480,000.00",
      name: "The Archive Piece",
      title: "The Archive Piece",
      description: "Collector's vintage item from designer archive"
    },
    {
      id: 406,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808940/image_62_gnp4yf.png",
      alt: "Pre-owned suit",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦120,000.00",
      name: "The Executive Suit",
      title: "The Executive Suit",
      description: "Quality pre-owned business suit, perfect condition"
    },
    {
      id: 407,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808940/image_62_gnp4yf.png",
      alt: "Luxury rental",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦28,000.00",
      name: "The Cocktail Dress",
      title: "The Cocktail Dress",
      description: "Designer cocktail dress for evening events"
    },
    {
      id: 408,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808940/image_62_gnp4yf.png",
      alt: "Vintage auction",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦380,000.00",
      name: "The Time Capsule",
      title: "The Time Capsule",
      description: "Perfectly preserved vintage designer item"
    },
    {
      id: 409,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808940/image_62_gnp4yf.png",
      alt: "Pre-owned accessories",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦95,000.00",
      name: "The Luxury Scarf",
      title: "The Luxury Scarf",
      description: "Authentic pre-owned designer silk scarf"
    },
    {
      id: 410,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808940/image_62_gnp4yf.png",
      alt: "Rental luxury",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦22,000.00",
      name: "The Formal Jacket",
      title: "The Formal Jacket",
      description: "Premium pre-owned formal jacket for events"
    },
    {
      id: 411,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808940/image_62_gnp4yf.png",
      alt: "Rare vintage",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦550,000.00",
      name: "The Iconic Piece",
      title: "The Iconic Piece",
      description: "Rare iconic vintage item from famous collection"
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
      categoryName="Pre-Owned Luxury"
      breadcrumbParent="Luxury"
      heroImage="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808967/image_56_frjxmy.png"
      heroDescription="Authentic pre-owned luxury items with verified quality and heritage"
      products={products}
    />
  );
};

export default PreOwnedLuxury;