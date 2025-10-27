import React from 'react';
import CategoryPageTemplate from '../shared/CategoryPageTemplate';
import FilterSystem from '../shared/FilterSystem';
const CrowdsourcedListings = () => {
  const products = [
    {
      id: 1100,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808945/image_69_n2hszm.png",
      alt: "Community thrift item",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦12,000.00",
      name: "The Community Find",
      title: "The Community Find",
      description: "Quality thrift item from community seller"
    },
    {
      id: 1101,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808945/image_69_n2hszm.png",
      alt: "Rental thrift",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦4,000.00",
      name: "The Thrift Rental",
      title: "The Thrift Rental",
      description: "Affordable thrift item available for rental"
    },
    {
      id: 1102,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808945/image_69_n2hszm.png",
      alt: "Auction thrift",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦25,000.00",
      name: "The Thrift Treasure",
      title: "The Thrift Treasure",
      description: "Rare thrift find from community collection"
    },
    {
      id: 1103,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808945/image_69_n2hszm.png",
      alt: "Vintage thrift",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦18,000.00",
      name: "The Vintage Thrift",
      title: "The Vintage Thrift",
      description: "Authentic vintage piece from community"
    },
    {
      id: 1104,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808945/image_69_n2hszm.png",
      alt: "Thrift dress",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦5,500.00",
      name: "The Thrift Dress",
      title: "The Thrift Dress",
      description: "Stylish thrift dress from community seller"
    },
    {
      id: 1105,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808945/image_69_n2hszm.png",
      alt: "Rare thrift",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦35,000.00",
      name: "The Rare Thrift",
      title: "The Rare Thrift",
      description: "Rare community thrift find with history"
    },
    {
      id: 1106,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808945/image_69_n2hszm.png",
      alt: "Thrift jacket",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦15,000.00",
      name: "The Thrift Jacket",
      title: "The Thrift Jacket",
      description: "Quality thrift jacket from community"
    },
    {
      id: 1107,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808945/image_69_n2hszm.png",
      alt: "Seasonal thrift",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦3,500.00",
      name: "The Seasonal Thrift",
      title: "The Seasonal Thrift",
      description: "Seasonal thrift item from community"
    },
    {
      id: 1108,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808945/image_69_n2hszm.png",
      alt: "Collector thrift",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦45,000.00",
      name: "The Collector Thrift",
      title: "The Collector Thrift",
      description: "Collector's thrift item from community"
    },
    {
      id: 1109,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808945/image_69_n2hszm.png",
      alt: "Thrift accessories",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦8,000.00",
      name: "The Thrift Accessory",
      title: "The Thrift Accessory",
      description: "Unique thrift accessory from community"
    },
    {
      id: 1110,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808945/image_69_n2hszm.png",
      alt: "Basic thrift",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦2,500.00",
      name: "The Basic Thrift",
      title: "The Basic Thrift",
      description: "Essential thrift item from community"
    },
    {
      id: 1111,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808945/image_69_n2hszm.png",
      alt: "Premium thrift",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦55,000.00",
      name: "The Premium Thrift",
      title: "The Premium Thrift",
      description: "Premium thrift find from community"
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
      categoryName="Crowdsourced Listings"
      breadcrumbParent="Thrift & Pre-Loved"
      heroImage="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808967/image_78_zaacta.png"
      heroDescription="Discover unique thrift finds from our community of verified sellers"
      products={products}
    />
  );
};

export default CrowdsourcedListings;