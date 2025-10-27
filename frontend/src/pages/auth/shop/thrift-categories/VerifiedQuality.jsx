import React from 'react';
import CategoryPageTemplate from '../shared/CategoryPageTemplate';
import FilterSystem from '../shared/FilterSystem';

const VerifiedQuality = () => {
  const products = [
    {
      id: 1200,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808949/image_77_ht7j4i.png",
      alt: "Verified thrift item",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦25,000.00",
      name: "The Verified Classic",
      title: "The Verified Classic",
      description: "Quality verified thrift item in excellent condition"
    },
    {
      id: 1201,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808949/image_77_ht7j4i.png",
      alt: "Verified rental",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦8,000.00",
      name: "The Verified Rental",
      title: "The Verified Rental",
      description: "Verified quality thrift available for rental"
    },
    {
      id: 1202,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808949/image_77_ht7j4i.png",
      alt: "Premium verified",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦45,000.00",
      name: "The Premium Verified",
      title: "The Premium Verified",
      description: "Premium verified thrift with quality guarantee"
    },
    {
      id: 1203,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808949/image_77_ht7j4i.png",
      alt: "Verified vintage",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦32,000.00",
      name: "The Verified Vintage",
      title: "The Verified Vintage",
      description: "Authentic vintage piece with verification"
    },
    {
      id: 1204,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808949/image_77_ht7j4i.png",
      alt: "Verified dress",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦12,000.00",
      name: "The Verified Dress",
      title: "The Verified Dress",
      description: "Quality verified dress from thrift collection"
    },
    {
      id: 1205,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808949/image_77_ht7j4i.png",
      alt: "Rare verified",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦65,000.00",
      name: "The Rare Verified",
      title: "The Rare Verified",
      description: "Rare verified thrift find with documentation"
    },
    {
      id: 1206,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808949/image_77_ht7j4i.png",
      alt: "Verified jacket",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦28,000.00",
      name: "The Verified Jacket",
      title: "The Verified Jacket",
      description: "Quality verified jacket from thrift collection"
    },
    {
      id: 1207,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808949/image_77_ht7j4i.png",
      alt: "Seasonal verified",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦6,500.00",
      name: "The Seasonal Verified",
      title: "The Seasonal Verified",
      description: "Seasonal verified thrift item"
    },
    {
      id: 1208,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808949/image_77_ht7j4i.png",
      alt: "Collector verified",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦85,000.00",
      name: "The Collector Verified",
      title: "The Collector Verified",
      description: "Collector's verified thrift piece"
    },
    {
      id: 1209,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808949/image_77_ht7j4i.png",
      alt: "Verified accessories",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦15,000.00",
      name: "The Verified Accessory",
      title: "The Verified Accessory",
      description: "Quality verified thrift accessory"
    },
    {
      id: 1210,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808949/image_77_ht7j4i.png",
      alt: "Basic verified",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦4,500.00",
      name: "The Basic Verified",
      title: "The Basic Verified",
      description: "Essential verified thrift item"
    },
    {
      id: 1211,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808949/image_77_ht7j4i.png",
      alt: "Ultimate verified",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦95,000.00",
      name: "The Ultimate Verified",
      title: "The Ultimate Verified",
      description: "Ultimate verified thrift masterpiece"
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
      categoryName="Verified Quality"
      breadcrumbParent="Thrift & Pre-Loved"
      heroImage="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808967/image_78_zaacta.png"
      heroDescription="Quality-guaranteed thrift items with full verification and condition reports"
      products={products}
    />
  );
};

export default VerifiedQuality;