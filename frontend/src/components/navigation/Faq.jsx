import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQSection() {
  const [openItem, setOpenItem] = useState(null);

  const faqs = [
    {
      id: 1,
      number: "01",
      question: "What is Skyis?",
      answer: "Skyis is a revolutionary fashion-tech ecosystem that bridges the gap between creativity and commerce. We empower designers, tailors, creators, and fashion enthusiasts to connect, collaborate, and thrive in the digital fashion landscape through our integrated platform."
    },
    {
      id: 2,
      number: "02",
      question: "Who can join Skyis?",
      answer: "Anyone passionate about fashion can join Skyis! Whether you're a fashion designer, tailor, boutique owner, creator, or fashion enthusiast looking to shop unique pieces, our platform welcomes all members of the fashion community from around the world."
    },
    {
      id: 3,
      number: "03",
      question: "How do I start selling on Skyis?",
      answer: "Getting started is easy! Simply sign up, choose your role (creator, designer, tailor, or retailer), build your profile, showcase your work or products, and start connecting with potential customers. Our intuitive tools guide you through the entire process."
    },
    {
      id: 4,
      number: "04",
      question: "Does Skyis charge any fees?",
      answer: "Skyis operates on a transparent fee structure. We charge a small commission on successful sales to maintain and improve our platform. There are no upfront costs or hidden fees - you only pay when you make money. Detailed pricing information is available in your seller dashboard."
    },
    {
      id: 5,
      number: "05",
      question: "Can I buy directly from designers on Skyis?",
      answer: "Absolutely! Skyis enables direct connections between buyers and creators. You can browse exclusive designs, communicate directly with designers, place custom orders, and purchase unique fashion pieces that aren't available anywhere else."
    },
    {
      id: 6,
      number: "06",
      question: "Is Skyis available internationally?",
      answer: "Yes! Skyis is a global platform serving fashion professionals and enthusiasts worldwide. We support international shipping, multiple currencies, and have community members from every continent, creating a truly diverse and inclusive fashion ecosystem."
    },
    {
      id: 7,
      number: "07",
      question: "How does Skyis ensure product quality?",
      answer: "We maintain high quality standards through our community-driven review system, verified seller badges, detailed product descriptions, and customer feedback mechanisms. Additionally, we provide dispute resolution services and work closely with our community to maintain trust and excellence."
    },
    {
      id: 8,
      number: "08",
      question: "Do I need to be a professional to sell on Skyis?",
      answer: "Not at all! Skyis welcomes creators at every level, from hobbyists and emerging designers to established fashion professionals. Whether you're just starting your fashion journey or you're an experienced designer, our platform provides tools and support to help you succeed."
    }
  ];

  const toggleItem = (itemId) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mb-16">
            <div className="flex items-center">
                <div className="w-6 h-6 bg-teal-800 rounded-md mr-3"></div>
                <span style={{ letterSpacing: '-0.04rem' }}  className="text-gray-700 font-medium">FAQ</span>
            </div>
        </div>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
    

        {/* FAQ Items */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div key={faq.id} className={`border-b border-gray-200 ${index === 0 ? 'border-t' : ''}`}>
              <button
                className="w-full flex items-center justify-between py-6 sm:py-8 text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-lg"
                onClick={() => toggleItem(faq.id)}
              >
                <div className="flex items-center space-x-4 sm:space-x-6 flex-1">
                  <span className="text-2xl sm:text-3xl font-light text-gray-400 min-w-[3rem]">
                    {faq.number}
                  </span>
                  <h3 style={{ letterSpacing: '-0.04rem' }} className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {openItem === faq.id ? (
                    <Minus className="w-6 h-6 text-gray-600" />
                  ) : (
                    <Plus className="w-6 h-6 text-gray-600" />
                  )}
                </div>
              </button>
              
              {/* Answer - Animated */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openItem === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pb-6 sm:pb-8 pl-4 sm:pl-16 pr-4">
                  <p style={{ letterSpacing: '-0.04rem' }}  className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}