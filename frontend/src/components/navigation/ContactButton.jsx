import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AnimatedContactButton = () => {
  return (
    <div className="flex items-start justify-start bg-white">
      <button className="relative flex items-center gap-16 rounded-[30px] pr-8 pl-4 py-3 bg-gray-100 text-black overflow-hidden min-w-[180px] transition-colors duration-500 group">
        {/* Sliding Fill Effect */}
        <span className="absolute top-0 left-[-100%] w-full h-full bg-[#00403F] rounded-full transition-all duration-700 ease-in-out group-hover:left-0 z-0"></span>

        {/* Icon Circle */}
        <span
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00403F] transition-colors duration-700 ease-in-out group-hover:bg-transparent relative z-10"
          aria-hidden="true"
        >
          <i className="fas fa-arrow-right text-white text-base"></i>
        </span>

        {/* Text */}
        <span className="text-base font-normal relative z-10 transition-colors duration-500 group-hover:text-white">
          Contact now
        </span>
      </button>
    </div>
  );
};

export default AnimatedContactButton;
