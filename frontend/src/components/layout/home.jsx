import React, { useState } from 'react';
import { 
  Search, 
  User, 
  ShoppingBag, 
  Star, 
  ChevronDown,
  Send,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  Home as HomeIcon
} from 'lucide-react';
import AboutUsComp from '../navigation/aboutUsComp';
import HowItWorksSection from '../navigation/howItWorks';
import CommunityShowcaseSection from '../navigation/CommunityShowcaseSection';
import TestimonialsSection from '../navigation/Testimonials';
import FAQSection from '../navigation/Faq';
import ContactUsSection from '../navigation/Contact';
import LandingFooter from '../navigation/LandingFooter';
import HeroSection from '../navigation/HeroSection';
import Navbar from '../../pages/auth/shop/Navbar';
import { Menu } from 'iconsax-reactjs';
import Blog from '../navigation/Blog';
import CartModal from '../../pages/auth/shop/CartModal';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext'; // ✅ Import useCart


const Home = () =>  {
  const [openFAQ, setOpenFAQ] = useState(null);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart } = useCart(); // ✅ Get addToCart from context
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // const addToCart = (product) => {
  //   const existingItem = cartItems.find(item => item.id === product.id);
  //   if (existingItem) {
  //     updateQuantity(product.id, 1);
  //   } else {
  //     setCartItems([...cartItems, { ...product, quantity: 1 }]);
  //   }
  //   setIsCartOpen(true);
  // };

  
  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleAddToCart = (product) => {
    addToCart(product); // ✅ Use context method
    setIsCartOpen(true); // Open cart modal
  };


  const updateQuantity = (itemId, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const testimonials = [
    {
      name: "Amanda O.",
      title: "Fashion Designer",
      text: "Skyis has truly helped me engage a growing audience and improve my designs. The platform is intuitive and supportive.",
      avatar: "https://storage.googleapis.com/a1aa/image/30b7813c-d0b8-463e-27b3-fdb57ad6358e.jpg"
    },
    {
      name: "John Fitzgerald",
      title: "Boutique Owner",
      text: "I was able to find the demand for fashion pieces and connect with talented designers. Skyis is a game changer.",
      avatar: "https://storage.googleapis.com/a1aa/image/f5c9bfe4-8e75-490b-deb3-c05bfd44416c.jpg"
    },
    {
      name: "Mike Jensen",
      title: "Accessories Brand Founder",
      text: "Skyis has revolutionized how I reach customers and manage my brand. The tools are easy to use and very effective.",
      avatar: "https://storage.googleapis.com/a1aa/image/10bbd3de-1142-4e9e-5b4e-eb01a9338b49.jpg"
    },
    {
      name: "Karen Goldsmith",
      title: "Tailor",
      text: "The platform has helped me connect with designers and customers alike. It's a wonderful community to be part of.",
      avatar: "https://storage.googleapis.com/a1aa/image/d1e7a2ba-030e-4fb3-819a-6ab27a5bd353.jpg"
    },
    {
      name: "Tina Roswell",
      title: "Textile Artist",
      text: "Skyis has opened new doors for my textile art. The exposure and collaboration opportunities are unmatched.",
      avatar: "https://storage.googleapis.com/a1aa/image/ff8b092e-393b-46e1-47fa-b4450ce26828.jpg"
    },
    {
      name: "Tina Roswell",
      title: "Sustainable Designer",
      text: "The community and tools have helped me grow my sustainable fashion brand and reach a wider audience.",
      avatar: "https://storage.googleapis.com/a1aa/image/544b8d5a-c67e-4e45-bac4-7888491e685e.jpg"
    }
  ];

  const faqs = [
    {
      question: "How do I join Skyis?",
      answer: "You can sign up on our website by creating an account and selecting your role in the fashion ecosystem."
    },
    {
      question: "Are there any fees to join?",
      answer: "Joining Skyis is free. Some premium features and services may require a subscription."
    },
    {
      question: "Can I sell my designs on Skyis?",
      answer: "Yes, Skyis provides a marketplace for creators to sell their designs and products directly to customers."
    },
    {
      question: "How do I collaborate with other creators?",
      answer: "Use our community features to connect, message, and collaborate with other designers, tailors, and creators."
    },
    {
      question: "Can I buy products from designers on Skyis?",
      answer: "Yes, our marketplace allows you to browse and purchase unique fashion items directly from creators."
    },
    {
      question: "Is Skyis suitable for beginners?",
      answer: "Absolutely! Skyis supports creators at all levels, from beginners to professionals."
    },
    {
      question: "How can I contact support?",
      answer: "You can reach out to our support team via the contact form below or email us directly."
    }
  ];

  return (
    <div className="bg-white text-black font-family-sans">
       <Navbar onCartClick={handleCartClick}  /> 
      
      {/* Hero Image */}
      <section>
        <HeroSection addToCart={addToCart} />
      </section>
      <div className="sm:w-full mt-20">
            <p className="text-base font-normal sm:text-sm w-full text-center leading-relaxed font-lg text-gray-600 max-w-full">
              We work with these creative designers
            </p>
      </div>
      {/* Brand names line */}
      <section className="max-w-[50rem] mx-auto px-4 sm:px-6 py-6 text-center text-xs sm:text-sm text-gray-700 font-semibold tracking-widest">
        <img 
          alt="Man wearing dark green coat and brown cap, side profile, moody lighting" 
          className="w-full object-cover" 
          height="" 
          src="https://res.cloudinary.com/drgk8rmny/image/upload/v1755986193/Logo_marquee_pvtno8.svg" 
          width=""
        />
      </section>

      {/* Who We Are */}
      <section className="max-w-[1553px] mx-auto px-4 sm:px-6 py-6">
        <AboutUsComp />
      </section>

      {/* How it works */}
      <section className="max-w-[1553px] mx-auto px-4 sm:px-6 py-6">
        <HowItWorksSection />
      </section>

      {/* Every Pixel Clicked */}
      <section className="max-w-[1553px] mx-auto px-4 sm:px-6 py-12">
        <CommunityShowcaseSection />
      </section>

      {/* Large image */}
      <section>
        <img 
          alt="Woman in light pink dress holding fabric, surrounded by green foliage" 
          className="w-full object-cover" 
          height="480" 
          src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756764104/Image_xz8vpa.png" 
          width="1280"
        />
      </section>

      {/* Trusted By Experts */}
      <section className="max-w-[1553px] mx-auto px-4 sm:px-6 py-12">
        <TestimonialsSection />
      </section>
      {/* Trusted By Experts */}
      <section className="max-w-[1553px] mx-auto px-4 sm:px-6 py-12">
        <Blog />
      </section>

      {/* FAQ */}
      <section className="max-w-[1553px] mx-auto px-4 sm:px-6 py-12">
        <FAQSection />
      </section>

      {/* Contact Us */}
      <section className="max-w-[1553px] mx-auto px-4 sm:px-6 py-12">
        <ContactUsSection />
      </section>

      {/* Footer */}
      <footer className="max-w-[1553px] mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0">
        <LandingFooter />
      </footer>

        <CartModal 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
        />
      
    </div>
  );
};
export default Home;