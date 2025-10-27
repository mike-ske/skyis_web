import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  icon: IconComponent, 
  error, 
  label,
  required = false 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;

  return (
    <motion.div 
      className="space-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {IconComponent && (
          <span className="absolute top-0 inset-y-0 left-0 flex items-center pl-3 pr-2 rounded-tl-lg rounded-bl-lg bg-gray-100 text-gray-400">
            <IconComponent className="w-4 h-4" />
          </span>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full text-gray-600 py-3 px-10 ${IconComponent ? 'pl-10' : ''} ${isPasswordType ? 'pr-10' : ''} border rounded-[10px] transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
            error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
          }`}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.div 
            className="flex items-center gap-1 text-sm text-red-600"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <span>⚠️</span>
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default Input; 