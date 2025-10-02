import React from "react";
import bgStars from "./assets/bg.jpg"; // Make sure the image is named bg.jpg in src/pages/assets/

const Home = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgStars})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#272B2B"
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #272B2B 60%, #202296 100%)",
          opacity: 0.85
        }}
      ></div>
      <div className="relative w-full flex flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center justify-center py-20">
          {/* Hero Image Placeholder */}
          <div className="w-40 h-40 bg-gradient-to-tr from-[#00E375] via-[#202296] to-[#272B2B] rounded-full flex items-center justify-center mb-8 shadow-2xl">
            <span className="text-4xl text-white/70 font-bold">Image</span>
          </div>
          <h1
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00E375] via-[#202296] to-[#272B2B] text-center drop-shadow-lg mb-6"
            style={{ fontFamily: "'Space Grotesk', 'Manufacturing Consent', sans-serif" }}
          >
            Specly: Your PC, Upgraded
          </h1>
          <p
            className="text-xl text-gray-200 text-center max-w-2xl mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Scan your PC or laptop, detect bottlenecks, outdated components, and get instant upgrade recommendations.
            <br />
            <span className="text-[#00E375] font-semibold">Specly</span> makes
            optimizing your system effortless.
          </p>
          <a
            href="/scan"
            className="px-10 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-[#00E375] via-[#202296] to-[#272B2B] text-white shadow-lg hover:scale-105 transition-transform"
          >
            Start Scan
          </a>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 mb-10 px-4">
          {/* Feature Card 1 */}
          <div className="bg-[#00E375]/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col items-center border border-[#00E375]/40 hover:border-[#00E375] transition-all">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#00E375] to-[#202296] rounded-full flex items-center justify-center mb-4">
              <span className="text-xl text-white/80">Image</span>
            </div>
            <h3 className="text-2xl font-bold text-[#00E375] mb-2 text-center">
              Instant Hardware Scan
            </h3>
            <p className="text-gray-200 text-center">
              Detect CPU, RAM, GPU, and storage in seconds.
            </p>
          </div>
          {/* Feature Card 2 */}
          <div className="bg-[#202296]/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col items-center border border-[#202296]/40 hover:border-[#202296] transition-all">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#202296] to-[#00E375] rounded-full flex items-center justify-center mb-4">
              <span className="text-xl text-white/80">Image</span>
            </div>
            <h3 className="text-2xl font-bold text-[#202296] mb-2 text-center">
              Bottleneck Detection
            </h3>
            <p className="text-gray-200 text-center">
              Find out which parts are slowing down your system.
            </p>
          </div>
          {/* Feature Card 3 */}
          <div className="bg-[#272B2B]/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col items-center border border-[#272B2B]/40 hover:border-[#272B2B] transition-all">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#272B2B] to-[#00E375] rounded-full flex items-center justify-center mb-4">
              <span className="text-xl text-white/80">Image</span>
            </div>
            <h3 className="text-2xl font-bold text-[#272B2B] mb-2 text-center">
              Upgrade Suggestions
            </h3>
            <p className="text-gray-200 text-center">
              Get recommendations for the latest PC parts.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="w-full max-w-3xl bg-[#202296]/10 backdrop-blur-lg rounded-2xl shadow-xl p-10 mt-10 mb-20">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00E375] via-[#202296] to-[#272B2B] mb-6 text-center">
            About Specly
          </h2>
          <p className="text-gray-200 text-lg text-center mb-4">
            Specly is your personal PC upgrade assistant. With a single click, you
            can:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-center">
            <li>Scan and analyze your hardware instantly</li>
            <li>Detect bottlenecks and outdated components</li>
            <li>
              Get personalized upgrade suggestions with direct shopping links
            </li>
            <li>Check compatibility for software and games</li>
            <li>
              Save and review your scan history for ongoing optimization
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Home;
