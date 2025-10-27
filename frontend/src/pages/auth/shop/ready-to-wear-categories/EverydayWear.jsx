import React from 'react';
import CategoryPageTemplate from '../shared/CategoryPageTemplate';
import FilterSystem from '../shared/FilterSystem';
const EverydayWear = () => {
  const products = [
    {
      id: 500,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808946/image_74_uhpzd9.png",
      alt: "Casual t-shirt",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦15,000.00",
      name: "The Essential Tee",
      title: "The Essential Tee",
      description: "Comfortable cotton t-shirt for everyday wear"
    },
    {
      id: 501,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808946/image_74_uhpzd9.png",
      alt: "Casual jeans",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦8,000.00",
      name: "The Daily Denim",
      title: "The Daily Denim",
      description: "Perfect fitting jeans for casual everyday use"
    },
    {
      id: 502,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808946/image_74_uhpzd9.png",
      alt: "Basic hoodie",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦25,000.00",
      name: "The Comfort Hoodie",
      title: "The Comfort Hoodie",
      description: "Cozy hoodie for relaxed everyday styling"
    },
    {
      id: 503,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808946/image_74_uhpzd9.png",
      alt: "Casual shirt",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦22,000.00",
      name: "The Weekend Shirt",
      title: "The Weekend Shirt",
      description: "Versatile casual shirt for weekend outings"
    },
    {
      id: 504,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808946/image_74_uhpzd9.png",
      alt: "Everyday dress",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦12,000.00",
      name: "The Day Dress",
      title: "The Day Dress",
      description: "Comfortable everyday dress for casual occasions"
    },
    {
      id: 505,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808946/image_74_uhpzd9.png",
      alt: "Limited casual",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦35,000.00",
      name: "The Street Style",
      title: "The Street Style",
      description: "Limited edition casual streetwear collection"
    },
    {
      id: 506,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808946/image_74_uhpzd9.png",
      alt: "Casual pants",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦18,000.00",
      name: "The Comfort Pants",
      title: "The Comfort Pants",
      description: "Relaxed fit pants for everyday comfort"
    },
    {
      id: 507,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808946/image_74_uhpzd9.png",
      alt: "Rental casual",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦6,500.00",
      name: "The Casual Top",
      title: "The Casual Top",
      description: "Versatile top for everyday casual wear"
    },
    {
      id: 508,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808946/image_74_uhpzd9.png",
      alt: "Auction casual",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦28,000.00",
      name: "The Urban Essential",
      title: "The Urban Essential",
      description: "Premium casual wear for urban lifestyle"
    },
    {
      id: 509,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808946/image_74_uhpzd9.png",
      alt: "Basic sweater",
      type: "Buy",
      typeColor: "bg-white text-gray-900",
      rating: 4.5,
      price: "₦20,000.00",
      name: "The Cozy Sweater",
      title: "The Cozy Sweater",
      description: "Warm and comfortable sweater for daily wear"
    },
    {
      id: 510,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808946/image_74_uhpzd9.png",
      alt: "Rental basics",
      type: "Rent",
      typeColor: "bg-yellow-300 text-gray-900",
      rating: 4.5,
      price: "₦7,000.00",
      name: "The Basic Collection",
      title: "The Basic Collection",
      description: "Essential basics for everyday wardrobe"
    },
    {
      id: 511,
      image: "https://res.cloudinary.com/drgk8rmny/image/upload/v1756808946/image_74_uhpzd9.png",
      alt: "Limited basics",
      type: "Auction",
      typeColor: "bg-teal-900 text-white",
      rating: 4.5,
      price: "₦32,000.00",
      name: "The Premium Basic",
      title: "The Premium Basic",
      description: "Limited edition premium everyday essential"
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
      categoryName="Everyday Wear"
      breadcrumbParent="Ready-to-wear"
      heroImage="https://res.cloudinary.com/drgk8rmny/image/upload/v1756808976/image_73_gwsvdg.png"
      heroDescription="Comfortable and stylish everyday essentials for your daily wardrobe"
      products={products}
    />
  );
};

export default EverydayWear;