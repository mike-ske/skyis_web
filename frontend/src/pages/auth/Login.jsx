import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function SkyisLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error as user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const defaultEmail = "micahalumona@gmail.com";
    const defaultPassword = "Alumona@124";

    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (
      formData.email &&
      formData.password &&
      (formData.email !== defaultEmail || formData.password !== defaultPassword)
    ) {
      newErrors.email = "Invalid email or password";
      newErrors.password = "Invalid email or password";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ Successful login
    setErrors({});
    navigate("/dashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-6 font-sans">
      <main className="min-h-screen w-dvw flex flex-col md:flex-row items-center justify-center md:justify-between max-w-7xl mx-auto px-6 py-12 gap-12 md:gap-24">
        {/* Left Image Section */}
        <div className="hidden flex-1 sm:flex flex-shrink-0 w-full md:max-w-lg lg:max-w-2xl rounded-3xl overflow-hidden relative">
          <img
            src="https://res.cloudinary.com/drgk8rmny/image/upload/v1756222176/Frame_1686553286_qxegrh.png"
            alt="Login illustration"
            className="w-full h-auto object-cover rounded-3xl"
          />
        </div>

        {/* Right Login Form Section */}
        <section className="flex-1 max-w-md w-full">
          <div className="flex justify-end mb-6">
            <Link
              className="text-[#0B3B38] text-sm font-normal hover:underline"
              to="/register"
            >
              Sign up
            </Link>
          </div>

          <div className="flex flex-col items-center mb-6 space-y-2">
            
            <div className="hidden flex-1 sm:flex justify-center items-center flex-shrink-0 w-full md:max-w-lg lg:max-w-2xl rounded-3xl overflow-hidden relative">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg"
                  alt="Skyis Logo"
                  className="w-full h-auto object-cover rounded-3xl cursor-pointer hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>
            <h1 className="text-2xl font-semibold text-[#0B3B38]">
              Welcome back
            </h1>
            <p className="text-sm text-gray-600 text-center px-4">
              Log in and reconnect with fashion's most creative ecosystem.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                className="block mb-1 text-sm font-normal text-gray-900"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  className={`w-full border rounded-xl py-2.5 pl-10 pr-4 text-gray-500 placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                    errors.email
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-300 focus:ring-1 focus:ring-[#0B3B38] focus:border-[#0B3B38]"
                  }`}
                  id="email"
                  name="email"
                  placeholder="johndoe@example.com"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block mb-1 text-sm font-normal text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  className={`w-full border rounded-xl py-2.5 pl-10 pr-10 text-gray-500 placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                    errors.password
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-300 focus:ring-1 focus:ring-[#0B3B38] focus:border-[#0B3B38]"
                  }`}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer hover:text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </span>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    className="text-red-500 text-sm mt-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.password}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Login Button */}
            <button
              className="w-full bg-[#0B3B38] text-white rounded-xl py-3 font-normal text-base hover:bg-[#0a2f2d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={!formData.email || !formData.password}
            >
              Login
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-3 text-right">
            <Link
              className="text-[#0B3B38] text-sm font-normal hover:underline"
              to="/forgot-password"
            >
              Forgot password
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
