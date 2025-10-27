import React from 'react';
import { useState } from 'react';
import CategoryPageTemplate from '../shared/CategoryPageTemplate';
import FilterSystem from '../shared/FilterSystem';

const MechStreetwear = () => {
  const products = [
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
      categoryName="Mech Streetwear"
      breadcrumbParent="Bespoke"
      heroImage="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808977/image_65_sltoh8.png"
      heroDescription="Urban-inspired custom streetwear with mechanical and contemporary aesthetics"
      products={products}
    />
  );
};

export default MechStreetwear;