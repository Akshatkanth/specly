import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
        Welcome to{" "}
        <span className="text-cyan-400" >Specly</span>
      </h1>
      <p className="text-lg text-gray-300 text-center max-w-xl mb-8">
        Instantly scan your PC or laptop, discover bottlenecks, outdated parts,
        and get upgrade suggestions.
      </p>
      <a
        href="/scan"
        className="bg-cyan-400 text-gray-900 font-bold px-8 py-4 rounded-xl shadow-xl hover:bg-cyan-300 transition-colors text-lg"
      >
        Start Scan
      </a>
    </div>
  );
};

export default Home;
