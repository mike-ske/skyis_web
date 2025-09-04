import React from 'react'
import SocialMediaIcons from './SocialMediaIcons.jsx'
const Footer = () => {
  return (
    <>
        <footer className="bg-[#0F5B54] text-white py-12">
          <div className="max-w-[90rem] mx-auto px-6 sm:px-10 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3 space-y-6">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <img
                  src="https://res.cloudinary.com/drgk8rmny/image/upload/e_sharpen:50/v1751692518/logo_ny12dm.png" // Adjust the path as necessary
                  alt="Skyis logo"
                  className=""
                />
               
              </div>
              <ul className="text-xs space-y-2 text-gray-300 font-light">
                <li>
                  <a className="hover:underline" href="#">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#">
                    Terms & Condition
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:col-span-3 space-y-6">
              <h5 className="text-sm font-semibold">Product</h5>
              <ul className="text-xs space-y-2 text-gray-300 font-light">
                <li>
                  <a className="hover:underline" href="#">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#">
                    Terms & Condition
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:col-span-3 space-y-6">
              <h5 className="text-sm font-semibold">Support</h5>
              <ul className="text-xs space-y-2 text-gray-300 font-light">
                <li>
                  <a className="hover:underline" href="#">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#">
                    Terms & Condition
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:col-span-3 space-y-4">
              <p className="text-xs font-semibold">Follow us on</p>
              <SocialMediaIcons />  
            </div>
          </div>
          <div className="mt-12 text-center text-xs text-gray-300 font-light">
            © {new Date().getFullYear()}, Skyis. Powered by Skyis.
          </div>
        </footer>
    </>
  )
}

export default Footer
