import React, { useState, useEffect } from "react";

const OnboardingSuccess = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // In a real app, you would use navigate('/dashboard') here
          window.location.href = "/dashboard";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const goToDashboard = () => {
    // In a real app, you would use navigate('/dashboard') here
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          🎉 Onboarding Complete!
        </h1>
        <p className="text-gray-600 mb-6">
          You’ll be redirected to your dashboard in{" "}
          <span className="font-semibold">{countdown}</span> seconds.
        </p>
        <button
          onClick={goToDashboard}
          className="px-6 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
        >
          Go to Dashboard Now
        </button>
      </div>
    </div>
  );
};

export default OnboardingSuccess;
