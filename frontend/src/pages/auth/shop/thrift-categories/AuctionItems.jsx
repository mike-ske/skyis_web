import React from 'react';
import { useState } from 'react';
import CategoryPageTemplate from '../shared/CategoryPageTemplate';
import FilterSystem from '../shared/FilterSystem';
const AuctionItems = () => {
  const products = [
    {
      id: 1300,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808950/image_70_evqj1j.png",
      alt: "Auction thrift item",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦35,000.00",
      name: "The Auction Find",
      title: "The Auction Find",
      description: "Unique thrift item available through auction"
    },
    {
      id: 1301,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808950/image_70_evqj1j.png",
      alt: "Rental auction",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦15,000.00",
      name: "The Auction Rental",
      title: "The Auction Rental",
      description: "Auction thrift item available for rental"
    },
    {
      id: 1302,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808950/image_70_evqj1j.png",
      alt: "Premium auction",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦75,000.00",
      name: "The Premium Auction",
      title: "The Premium Auction",
      description: "Premium thrift item in live auction"
    },
    {
      id: 1303,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808950/image_70_evqj1j.png",
      alt: "Vintage auction",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦42,000.00",
      name: "The Vintage Auction",
      title: "The Vintage Auction",
      description: "Vintage thrift piece in auction"
    },
    {
      id: 1304,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808950/image_70_evqj1j.png",
      alt: "Auction dress",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦18,000.00",
      name: "The Auction Dress",
      title: "The Auction Dress",
      description: "Beautiful thrift dress in auction"
    },
    {
      id: 1305,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808950/image_70_evqj1j.png",
      alt: "Rare auction",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦95,000.00",
      name: "The Rare Auction",
      title: "The Rare Auction",
      description: "Rare thrift find in exclusive auction"
    },
    {
      id: 1306,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808950/image_70_evqj1j.png",
      alt: "Auction jacket",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦38,000.00",
      name: "The Auction Jacket",
      title: "The Auction Jacket",
      description: "Quality thrift jacket in auction"
    },
    {
      id: 1307,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808950/image_70_evqj1j.png",
      alt: "Seasonal auction",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦12,000.00",
      name: "The Seasonal Auction",
      title: "The Seasonal Auction",
      description: "Seasonal thrift item in auction"
    },
    {
      id: 1308,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808950/image_70_evqj1j.png",
      alt: "Collector auction",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦120,000.00",
      name: "The Collector Auction",
      title: "The Collector Auction",
      description: "Collector's thrift piece in auction"
    },
    {
      id: 1309,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808950/image_70_evqj1j.png",
      alt: "Auction accessories",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦22,000.00",
      name: "The Auction Accessory",
      title: "The Auction Accessory",
      description: "Unique thrift accessory in auction"
    },
    {
      id: 1310,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808950/image_70_evqj1j.png",
      alt: "Basic auction",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦8,500.00",
      name: "The Basic Auction",
      title: "The Basic Auction",
      description: "Essential thrift item in auction"
    },
    {
      id: 1311,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808950/image_70_evqj1j.png",
      alt: "Ultimate auction",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦150,000.00",
      name: "The Ultimate Auction",
      title: "The Ultimate Auction",
      description: "Ultimate thrift masterpiece in auction"
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
      categoryName="Auction Items"
      breadcrumbParent="Thrift & Pre-Loved"
      heroImage="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808967/image_78_zaacta.png"
      heroDescription="Exciting auction items with competitive bidding and unique thrift discoveries"
      products={products}
    />
  );
};

export default AuctionItems;