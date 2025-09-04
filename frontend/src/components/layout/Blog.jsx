import React, { useState } from 'react';
import StickyNavbar from '../navigation/StickyNavbar';
import Footer from '../navigation/Footer';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Company', 'Fashion Story', 'Product update', 'Tips & Hacks'];

  const blogPosts = [
    {
      id: 1,
      image: "https://storage.googleapis.com/a1aa/image/2c63b08a-ec21-44f0-3359-0af689da9ad5.jpg",
      category: "All",
      title: "The Hidden Struggles in The Fashion Industry",
      description: "Behind the glam and fabric lies a world of unseen struggles—unpaid work, poor visibility, and disconnected creators. The fashion industry hides battles few talk about. It's time to bring light, connection, and opportunity to every role.",
      date: "Jun 27, 2025"
    },
    {
      id: 2,
      image: "https://storage.googleapis.com/a1aa/image/47321b9c-770b-44d0-9d8d-2cdf3a8b116b.jpg",
      category: "All",
      title: "The Hidden Struggles in The Fashion Industry",
      description: "Behind the glam and fabric lies a world of unseen struggles—unpaid work, poor visibility, and disconnected creators. The fashion industry hides battles few talk about. It's time to bring light, connection, and opportunity to every role.",
      date: "Jun 27, 2025"
    },
    {
      id: 3,
      image: "https://storage.googleapis.com/a1aa/image/034c514b-34a2-4dd8-4849-8400c31a4bf7.jpg",
      category: "All",
      title: "The Hidden Struggles in The Fashion Industry",
      description: "Behind the glam and fabric lies a world of unseen struggles—unpaid work, poor visibility, and disconnected creators. The fashion industry hides battles few talk about. It's time to bring light, connection, and opportunity to every role.",
      date: "Jun 27, 2025"
    },
    {
      id: 4,
      image: "https://storage.googleapis.com/a1aa/image/ddd0c3e0-3bf3-4b8b-6c12-e889c273ed99.jpg",
      category: "All",
      title: "The Hidden Struggles in The Fashion Industry",
      description: "Behind the glam and fabric lies a world of unseen struggles—unpaid work, poor visibility, and disconnected creators. The fashion industry hides battles few talk about. It's time to bring light, connection, and opportunity to every role.",
      date: "Jun 27, 2025"
    }
  ];

  return (
    <div className="bg-white text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Navbar */}
      
      {/* Navbar */}
      <div className="top-0 left-0 w-full z-50 absolute" style={{ 
          backgroundImage: 'linear-gradient(180deg, #0a0a07 100%, #0e1007 100%)',
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
      <section
          className="relative bg-gradient-to-b from-gray-900 to-black text-center px-6 pt-[9%] pb-[9rem] sm:pb-[12rem] mb-[10rem] sm:mb-[16rem]"
          style={{
            backgroundImage: 'linear-gradient(180deg, #0a0a07 0%, #0e1007 100%)',
            minHeight: 'clamp(24rem, 55vw, 40rem)',
          }}
        >
          <h1 className="text-white font-extrabold mb-2 text-[clamp(1.75rem,4vw,3rem)]">
            Skyis Blog
          </h1>

          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-[clamp(0.75rem,1.5vw,1rem)]">
            The latest updates, stories, ideas and guides from the Skyis team.
          </p>

          <nav className="inline-flex flex-wrap justify-center gap-3 max-w-2xl mx-auto mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`text-[clamp(0.7rem,1vw,0.875rem)] font-normal rounded-full px-5 py-2 transition-colors ${
                  activeCategory === category
                    ? 'bg-white text-teal-900'
                    : 'bg-white/90 text-teal-900 hover:bg-white'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </nav>

          {/* ✅ FIXED: Overlapping and centered properly */}
          <div className="absolute bottom-[-6rem] sm:bottom-[-10rem] md:mx-[2rem] left-0 right-0 flex justify-center px-4 sm:px-0">
            <article className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl z-10">
              <img
                src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753177607/Frame_1321315330_lntcdv.svg"
                alt="Black silky fabric background with texture"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 md:max-w-[65%]  m-auto p-6 sm:p-10 flex flex-col justify-center items-start">
                <h2 className="text-left text-white m-auto font-extrabold max-w-[90%] text-[clamp(1.75rem,6vw,4.5rem)] leading-tight">
                  <span className="text-yellow-700">The </span>
                  <span className="text-yellow-700 opacity-30">Hidden </span>
                  <br />
                  <span className="text-white">Struggles </span>
                  <span className="text-yellow-700">in The Fashion Industry</span>
                </h2>
              </div>
            </article>
          </div>
        </section>




      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <article className="max-w-4xl mx-auto mb-12">
          <p className="text-xs text-teal-900 font-semibold uppercase mb-1">All</p>
          <h3 className="text-xl sm:text-2xl font-extrabold mb-2">
            The Hidden Struggles in The Fashion Industry
          </h3>
          <p className="text-xs text-gray-700 mb-4 leading-relaxed">
            Behind the glam and fabric lies a world of unseen struggles—unpaid
            work, poor visibility, and disconnected creators. The fashion industry
            hides battles few talk about. It's time to bring light, connection, and
            opportunity to every role.
          </p>
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <time dateTime="2025-06-27">Jun 27, 2025</time>
          </div>
        </article>

        {/* Blog grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="space-y-3">
              <img 
                src={post.image}
                alt={`Blog post ${post.id} image`}
                className="rounded-lg w-full h-auto object-cover"
              />
              <p className="text-xs text-teal-900 font-semibold uppercase">
                {post.category}
              </p>
              <h4 className="text-lg font-extrabold">
                {post.title}
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                {post.description}
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <time dateTime="2025-06-27">{post.date}</time>
              </div>
            </article>
          ))}
        </section>

        <div className="flex justify-center">
          <button className="bg-teal-900 text-white text-xs font-normal rounded-full px-6 py-2 hover:bg-teal-800 transition-colors">
            Read More
          </button>
        </div>
      </main>

          {/* Footer */}
      <footer className=" text-white ">
        <Footer/> 
      </footer>
    </div>
  );
};

export default BlogPage;