import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6">Welcome to Specly</h1>
      <p className="text-lg text-gray-600 text-center max-w-xl mb-6">
        Instantly scan your PC or laptop, discover bottlenecks, outdated parts, and get upgrade suggestions.
      </p>
      <a
        href="/scan"
        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        Start Scan
      </a>
    </div>
  );
};

export default Home;
