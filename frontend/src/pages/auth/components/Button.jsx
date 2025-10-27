import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button',
  disabled = false,
  loading = false,
  icon,
  className = ''
}) => {
  const baseClasses = 'w-full py-3 px-4 rounded-[50px] font-medium transition-all duration-200 flex rounded-full items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-emerald-900 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg',
    google: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 shadow-sm hover:shadow-md'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && <i className={icon} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;