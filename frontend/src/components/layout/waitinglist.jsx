import React from 'react';

const WaitingList = () => {
  return (
    <div className="bg-white text-black">
      {/* Header */}
      <header className="flex justify-between items-center px-6 sm:px-10 md:px-16 py-6">
        <div className="flex items-center space-x-2">
          <img
            src="https://storage.googleapis.com/a1aa/image/ca7816ea-a996-428a-0883-4c0eb4e3b208.jpg"
            alt="Skyis logo"
            className="w-6 h-6"
          />
          <span className="text-[#06403b] font-normal text-lg select-none">Skyis</span>
        </div>
        <button className="bg-[#06403b] text-white text-xs font-semibold px-4 py-2 rounded-md flex items-center space-x-1 hover:bg-[#052a27] transition">
          <span>Get early access</span>
          <i className="fas fa-chevron-right text-[10px]" />
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-6 sm:px-10 md:px-16 text-center max-w-5xl mx-auto">
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight max-w-4xl mx-auto">
          The Future of <em className="italic font-semibold">Fashion</em> Commerce <br />
          Has Arrived Bold, Seamless, Global.
        </h1>
        <p className="text-[10px] sm:text-xs text-gray-600 mt-3 max-w-[520px] mx-auto">
          Skyis is an all-in-one fashion ecosystem connecting designers, fashion creatives, tailors,
          shop owners, and shoppers—designed to simplify how fashion is created, discovered, sold,
          rented, and worn.
        </p>
        <button className="bg-[#06403b] text-white text-xs font-semibold px-5 py-2 rounded-md mt-6 inline-flex items-center space-x-1 hover:bg-[#052a27] transition">
          <span>Join the waitlist</span>
          <i className="fas fa-chevron-right text-[10px]" />
        </button>
        <div className="mt-8 max-w-[700px] mx-auto rounded-xl overflow-hidden">
          <img
            src="https://storage.googleapis.com/a1aa/image/55bc7d4d-3b4c-49a5-9ecd-28170254c831.jpg"
            alt="UI mockup"
            className="w-full h-auto rounded-xl"
          />
        </div>
      </section>

      {/* Fashion Creative Section */}
      <section className="relative mt-16 bg-black bg-opacity-90 text-white px-6 sm:px-10 md:px-16 py-12 max-w-6xl mx-auto rounded-md overflow-hidden">
        <img
          src="https://storage.googleapis.com/a1aa/image/8e6720dd-54bd-4e17-e191-821110be6edf.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 -z-10 rounded-md"
        />
        <h2 className="text-xl font-semibold mb-2">Fashion Creative</h2>
        <p className="text-xs max-w-lg">
          Showcase your talent, connect with top designers, collaborate on projects, and monetize your
          unique skills in a thriving, tech-driven fashion ecosystem built for you.
        </p>
        <div className="flex space-x-2 mt-4">
          {[true, false, false, false].map((active, idx) => (
            <span
              key={idx}
              className={`w-2.5 h-2.5 rounded-full inline-block ${
                active ? 'bg-[#06403b]' : 'bg-white opacity-50'
              }`}
              aria-label={active ? 'Active slide' : 'Inactive slide'}
            />
          ))}
        </div>
      </section>

      {/* Why Skyis Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 mt-16">
        <p className="text-xs font-semibold text-[#06403b] text-center uppercase tracking-widest mb-1">
          Why Skyis
        </p>
        <h2 className="text-center font-semibold text-xl sm:text-2xl max-w-3xl mx-auto leading-tight">
          Powering <em className="not-italic font-semibold">Fashion</em> Through Connection, Creativity, and Commerce
        </h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto text-xs text-gray-700">
          {[
            {
              title: 'Creative Freedom',
              desc: 'Design, collaborate, and express yourself without limits in a platform built to elevate fashion talents globally.'
            },
            {
              title: 'Smart Monetization',
              desc: 'Turn your skills, services, and designs into income through tools that support rentals, bookings, and direct sales.'
            },
            {
              title: 'Endless Collaboration',
              desc: 'Work with stylists, photographers, designers, and more to create iconic pieces and grow your fashion network effortlessly.'
            },
            {
              title: 'Unified Platform',
              desc: 'Access tools for showcasing, selling, renting, and managing—all in one place, designed for fashion professionals.'
            },
            {
              title: 'Talent Discovery',
              desc: 'Be seen and booked by shoppers, brands, and collaborators actively seeking emerging fashion talent like you.'
            },
            {
              title: 'Seamless Commerce',
              desc: 'Experience smooth transactions, secure payments, and flexible delivery options tailored for modern fashion commerce.'
            },
            {
              title: 'Tech Empowerment',
              desc: 'Leverage technology to streamline your fashion business, from order tracking to customer engagement and performance insights.'
            },
            {
              title: 'Global Reach',
              desc: 'Expand your brand beyond borders and connect with a wider audience ready to engage with your fashion.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-100 rounded-lg p-4">
              <h3 className="text-[#06403b] font-semibold mb-1 text-[11px] sm:text-xs md:text-sm">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Join Waitlist */}
      <section className="mt-20 bg-black text-white max-w-7xl mx-auto rounded-md px-6 sm:px-10 md:px-16 py-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <div className="max-w-lg md:max-w-xl">
          <h2 className="text-2xl font-bold mb-4">
            Why Join the <em className="not-italic">Waitlist</em>?
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm max-w-md">
            {[
              'Early access to the platform before public launch',
              'Exclusive fashion drops & offers from top designers',
              'Get featured as one of our pioneer users',
              'Help shape the future of African fashion tech'
            ].map((text, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <i className="far fa-check-circle mt-1 text-white" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <button className="mt-6 bg-[#06403b] text-white text-xs font-semibold px-6 py-2 rounded-md hover:bg-[#052a27] transition">
            Learn More
          </button>
        </div>
        <div className="relative w-full max-w-sm md:max-w-md h-48 md:h-56 rounded-md overflow-hidden">
          <img
            src="https://storage.googleapis.com/a1aa/image/cebe0e90-ad62-4a93-3182-eb8fb9bb40fd.jpg"
            alt="Woman with shopping bags"
            className="absolute right-0 bottom-0 w-48 h-48 md:w-56 md:h-56 object-cover rounded-md shadow-lg"
          />
          <div className="absolute top-2 left-2 bg-white rounded-md shadow-md px-3 py-1 flex items-center space-x-2 text-[10px] font-semibold text-gray-700">
            <img
              src="https://storage.googleapis.com/a1aa/image/e417b09d-1023-49db-a341-adf57c6941cb.jpg"
              alt="Watch"
              className="w-6 h-6 rounded-full"
            />
            <div>
              <div>Rolex G-3000</div>
              <div className="text-[8px] font-normal text-gray-400">Payment completed</div>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 bg-white rounded-md shadow-md p-2 w-36 text-[10px] font-semibold text-gray-700">
            <img
              src="https://storage.googleapis.com/a1aa/image/d528b63a-28dd-4a96-0b44-cda73d811fae.jpg"
              alt="Dress"
              className="w-full h-20 object-cover rounded-md mb-1"
            />
            <div>Luxury Wedding Gown</div>
            <div className="flex justify-between items-center text-[9px] font-normal mt-0.5">
              <span>$120.00</span>
              <span className="text-orange-400 flex items-center space-x-1">
                <i className="fas fa-star" />
                <span>4.5</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Launch CTA */}
      <section className="mt-20 max-w-7xl mx-auto rounded-md overflow-hidden relative" style={{ backgroundColor: '#02201f' }}>
        <img
          src="https://storage.googleapis.com/a1aa/image/c904da17-7727-48cc-250f-30874206cab2.jpg"
          alt="Abstract background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        />
        <div className="relative flex flex-col sm:flex-row justify-between items-center px-6 sm:px-10 md:px-16 py-8 gap-4">
          <h2 className="text-white font-bold text-xl max-w-lg leading-tight text-center sm:text-left">
            Be The First to Know
            <br />
            When we <em className="not-italic">Launch.</em>
          </h2>
          <button className="bg-white text-[#06403b] text-xs font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition">
            Join the waitlist
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#06403b] text-white mt-20 px-6 sm:px-10 md:px-16 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-xs">
            <div className="flex items-center space-x-2 mb-3">
              <img
                src="https://storage.googleapis.com/a1aa/image/421bb89c-d7d1-47b1-48e2-bff907ad3bec.jpg"
                alt="Skyis logo"
                className="w-6 h-6"
              />
              <span className="text-white font-normal text-lg select-none">Skyis</span>
            </div>
            <p className="text-[10px] leading-tight max-w-[280px]">
              Skyis is an all-in-one fashion commerce platform that connects designers, creatives,
              tailors, shop owners, and shoppers—enabling them to create, sell, rent, hire, and
              collaborate seamlessly.
            </p>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <span className="text-[10px] font-semibold mb-1">Follow us on</span>
            <div className="flex space-x-3">
              {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map((icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-7 h-7 rounded-full bg-white text-[#06403b] flex items-center justify-center hover:bg-gray-200 transition"
                  aria-label={icon}
                >
                  <i className={`fab fa-${icon} text-xs`} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="text-[9px] text-center mt-10 select-none">©2025 Skyis Technologies</p>
      </footer>
    </div>
  );
};

export default WaitingList;
