import React, { useState } from 'react';
import Header from '../navigation/Header';
import StickyNavbar from '../navigation/StickyNavbar';
import Footer from '../navigation/Footer';

const SkyisFAQ = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = {
    general: [
      {
        id: 1,
        question: "What is Skyis and how does it work?",
        answer: "Skyis is a cutting-edge platform designed to revolutionize the fashion industry by connecting designers, buyers, and sellers in a seamless marketplace."
      },
      {
        id: 2,
        question: "Who can use Skyis — is it for individuals or businesses too?",
        answer: "Both individuals and businesses can use Skyis to showcase and sell their fashion products, making it a versatile platform for all users."
      },
      {
        id: 3,
        question: "What makes Skyis different from other fashion platforms?",
        answer: "Skyis offers unique features such as rental options, auctions, and a community-driven approach that sets it apart from traditional fashion marketplaces."
      },
      {
        id: 4,
        question: "What kind of fashion products and services can I offer on Skyis?",
        answer: "You can offer a wide range of fashion products including clothing, accessories, and even styling services to cater to diverse customer needs."
      },
      {
        id: 5,
        question: "Can I list items for rent, auction, or only for sale?",
        answer: "Yes, Skyis supports multiple listing types including rent, auction, and direct sale to provide flexibility for sellers."
      },
      {
        id: 6,
        question: "Is Skyis available in all countries or just selected regions?",
        answer: "Currently, Skyis is available in select regions, with plans to expand globally in the near future."
      }
    ],
    payment: [
      {
        id: 7,
        question: "How do payments work on Skyis?",
        answer: "Payments are processed securely through integrated payment gateways, ensuring fast and safe transactions for all users."
      },
      {
        id: 8,
        question: "Is it safe to make payments on the platform?",
        answer: "Yes, Skyis uses advanced encryption and security protocols to protect your payment information."
      },
      {
        id: 9,
        question: "What payment methods are supported?",
        answer: "Skyis supports credit cards, debit cards, and popular digital wallets for convenient payments."
      },
      {
        id: 10,
        question: "When do sellers receive their funds after a buyer makes payment?",
        answer: "Sellers typically receive funds within 3-5 business days after payment confirmation."
      },
      {
        id: 11,
        question: "Are there any transaction fees or service charges on payments?",
        answer: "A small transaction fee is applied to cover payment processing and platform maintenance."
      },
      {
        id: 12,
        question: "What happens if a buyer makes a payment but cancels or doesn't receive the item?",
        answer: "Skyis has a dispute resolution process to handle cancellations and delivery issues fairly."
      }
    ],
    account: [
      {
        id: 13,
        question: "How do I create a Skyis account?",
        answer: "You can sign up using your email or social media accounts in just a few easy steps."
      },
      {
        id: 14,
        question: "Can I have multiple roles (e.g., designer and buyer) in one account?",
        answer: "Yes, Skyis allows you to switch between roles seamlessly within a single account."
      },
      {
        id: 15,
        question: "How do I reset my password if I forget it?",
        answer: "Use the \"Forgot Password\" link on the login page to receive reset instructions via email."
      },
      {
        id: 16,
        question: "How do I update my profile information or shop settings?",
        answer: "Access your account settings to update your profile, preferences, and shop details anytime."
      },
      {
        id: 17,
        question: "Is my personal data secure on Skyis?",
        answer: "Skyis employs industry-standard security measures to protect your personal and payment data."
      },
      {
        id: 18,
        question: "Can I delete or deactivate my account if I no longer want to use the platform?",
        answer: "Yes, you can deactivate or delete your account from the settings page. Please note this action is irreversible."
      }
    ]
  };

  const toggleQuestion = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality can be implemented here
    console.log('Searching for:', searchQuery);
  };

  const getAllQuestions = () => {
    return [...faqData.general, ...faqData.payment, ...faqData.account];
  };

  const getFilteredQuestions = () => {
    const allQuestions = activeTab === 'all' ? getAllQuestions() : faqData[activeTab];
    if (!searchQuery) return allQuestions;
    
    return allQuestions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getCategoryInfo = (category) => {
    const info = {
      general: {
        title: "General",
        description: "Still, wondering what Skyis is about? Or, perhaps you're still confused about how to use the product? The answers are here, get in."
      },
      payment: {
        title: "Payments",
        description: "Have you encountered an error during payments? Don't worry, let's guide you through it."
      },
      account: {
        title: "Account",
        description: "Everything you need to know about managing your Skyis account, from sign-up to profile updates and security."
      }
    };
    return info[category];
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Navbar */}
     
      <div className="top-0 left-0 w-full z-50 absolute" style={{ 
          backgroundImage: '#000',
          backgroundColor: '#000',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className="invisible">
           <StickyNavbar />
        </div>
      </div>

      <StickyNavbar />
      {/* Hero Section */}
      <section className="bg-black max-h-[700px] text-white py-20 px-6 text-center max-w-full" style={{ 
        height: '700px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <h1 className="font-extrabold text-3xl md:text-4xl mb-6">
          Frequently Asked Questions
        </h1>
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <label className="sr-only" htmlFor="search">
            Search for questions
          </label>
          <div className="relative text-gray-400">
            <i className="top-6 fas fa-search absolute left-4 -translate-y-1/2 pointer-events-none"></i>
            <input
              className="w-full rounded-full py-2 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B3B36]"
              id="search"
              placeholder="Search for questions"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </section>

      {/* Tabs */}
      <section className="max-w-[1200px] mx-auto px-6 mt-12 flex justify-center space-x-6">
        {['general', 'payment', 'account'].map((tab) => (
          <button
            key={tab}
            className={`text-xs font-normal rounded-full px-5 py-2 transition ${
              activeTab === tab
                ? 'bg-[#0B3B36] text-white'
                : 'bg-[#F5F5F5] text-[#0B3B36] hover:bg-[#e0e0e0]'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </section>

      {/* FAQ Content */}
      <section className="max-w-[1200px] mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left column with categories and descriptions */}
        <div className="space-y-16">
          {['general', 'payment', 'account'].map((category) => {
            const info = getCategoryInfo(category);
            return (
              <div key={category}>
                <h2 className="font-extrabold text-2xl mb-3">{info.title}</h2>
                <p className="text-xs text-gray-500 max-w-[280px]">
                  {info.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right column with questions */}
        <div className="md:col-span-2 space-y-6 text-xs text-[#12120F]">
          {getFilteredQuestions().map((faq, index) => (
            <div key={faq.id} className={`${index === getFilteredQuestions().length - 1 ? '' : 'border-b border-gray-200'} pb-3`}>
              <button
                aria-expanded={expandedQuestion === faq.id}
                className="w-full flex justify-between items-center cursor-pointer"
                onClick={() => toggleQuestion(faq.id)}
              >
                <p className="text-left">{faq.question}</p>
                <i className={`fas ${expandedQuestion === faq.id ? 'fa-minus' : 'fa-plus'} text-sm transition-transform duration-200`}></i>
              </button>
              <div className={`mt-2 text-gray-700 ${expandedQuestion === faq.id ? 'block' : 'hidden'}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className=" text-white mt-20 pt-12">
        <Footer /> 
      </footer>
    </div>
  );
};

export default SkyisFAQ;