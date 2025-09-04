import React from 'react';
import Header from '../navigation/Header';
import Footer from '../navigation/Footer';
const Contact = () => {
  return (
    <div className="bg-white text-black font-inter">
      {/* Navbar */}
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-20 md:py-24 flex flex-col md:flex-row md:space-x-20">
        <section className="md:w-full mb-12 md:mb-0">
          <h1 className="text-4xl font-extrabold leading-tight mb-6">Contact Us</h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-md">
            Got a question? We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible
          </p>
        </section>

        <section className="md:w-full max-w-xl">
          <form className="space-y-6">
            <InputField label="Full Name" name="fullName" placeholder="John Doe" type="text" />
            <InputField label="Email" name="email" placeholder="johndoe@gmail.com" type="email" />
            <div>
              <label className="block text-xs font-bold mb-1" htmlFor="category">Select Category</label>
              <select
                name="category"
                id="category"
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-teal-900"
                defaultValue=""
              >
                <option value="" disabled></option>
                <option value="general">General</option>
                <option value="support">Support</option>
                <option value="sales">Sales</option>
              </select>
            </div>
            <InputField label="What is your enquiry about" name="subject" placeholder="Enter subject" type="text" />
            <div>
              <label className="block text-xs font-bold mb-1" htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                rows="6"
                placeholder="Type something"
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs placeholder-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-teal-900"
              />
            </div>
            <div>
              <button className="w-full bg-teal-900 text-white rounded-full py-3 text-sm font-normal hover:bg-teal-800" type="submit">
                Send Message
              </button>
            </div>
          </form>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Reusable form input component
const InputField = ({ label, name, placeholder, type }) => (
  <div>
    <label className="block text-xs font-bold mb-1" htmlFor={name}>{label}</label>
    <input
      name={name}
      id={name}
      type={type}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded px-3 py-2 text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-900"
    />
  </div>
);

  // Reusable footer column component

    

export default Contact;
