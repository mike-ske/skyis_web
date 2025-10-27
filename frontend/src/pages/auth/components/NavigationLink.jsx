import React from 'react';

const NavigationLink = ({ 
  onClick, 
  children, 
  className = '' 
}) => (
  <button onClick={onClick} className={`text-emerald-900 hover:text-emerald-700 ${className}`}>
    {children}
  </button>
);

export default NavigationLink;