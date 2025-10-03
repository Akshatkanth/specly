import React from "react";
import bgStars from "./assets/bg.jpg";
import hardwareScanImg from "./assets/hardwarescan.png";
import bottleneckImg from "./assets/bottleneck.jpg"; 
import logo from "./assets/main.jpg"

const accentBlue = "#2176FF";

const Home = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden z-0"
      style={{
        backgroundImage: `url(${bgStars})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000"
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.95) 80%, " + accentBlue + " 120%)",
          opacity: 0.85
        }}
      ></div>
      <div className="relative w-full flex flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center justify-center py-20">
          {/* Hero Image Placeholder */}
          <div className="w-40 h-40 rounded-full flex items-center justify-center mb-5 shadow-2xl border-4 border-[#181A1B] bg-gradient-to-tr from-black to-[#2176FF]">
            <img
              src={logo}
              alt="Specly Logo"
              className="w-full h-full object-cover rounded-full"
              style={{ boxShadow: "0 4px 24px 0 rgba(2, 18, 42, 1)" }}
            />
          </div>
          <h1
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2176FF] to-white text-center drop-shadow-lg mb-2"
            style={{ fontFamily: "'Space Grotesk', 'Manufacturing Consent', sans-serif" }}
          >
            Specly: Your PC, Upgraded!
          </h1>
          <p
            className="text-xl text-gray-200 text-center max-w-2xl mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Scan your PC or laptop, detect bottlenecks, outdated components, and get instant upgrade recommendations.
            <br />
            <span className="text-[#2176FF] font-semibold">Specly</span> makes optimizing your system effortless.
          </p>
          <a
            href="/scan"
            className="px-10 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-[#181A1B] to-[#232526] text-white shadow-xl border-2 border-[#2176FF] hover:from-[#232526] hover:to-[#181A1B] hover:text-[#2176FF] hover:bg-white transition-all focus:outline-none focus:ring-4 focus:ring-[#2176FF]/40"
            style={{
              boxShadow: "0 4px 24px 0 rgba(33, 118, 255, 0.3), 0 1.5px 4px 0 rgba(0,0,0,0.5)"
            }}
          >
            Start Scan
          </a>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 mb-10 px-4">
          {/* Feature Card 1 */}
          <div className="bg-black/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col items-center border border-[#2176FF]/40 hover:border-[#2176FF] transition-all">
            <img
              src={hardwareScanImg}
              alt="Instant Hardware Scan"
              className="w-24 h-24 object-cover rounded-xl mb-4 border-2 border-black shadow-lg"
            />
            <h3 className="text-2xl font-bold text-[#2176FF] mb-2 text-center">
              Instant Hardware Scan
            </h3>
            <p className="text-gray-200 text-center">
              Detect CPU, RAM, GPU, and storage in seconds.
            </p>
          </div>
          {/* Feature Card 2 */}
          <div className="bg-black/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col items-center border border-[#2176FF]/40 hover:border-[#2176FF] transition-all">
            <img
              src={bottleneckImg}
              alt="Bottleneck Detection"
              className="w-24 h-24 object-cover rounded-xl mb-4 border-2 border-black shadow-lg"
            />
            <h3 className="text-2xl font-bold text-[#2176FF] mb-2 text-center">
              Bottleneck Detection
            </h3>
            <p className="text-gray-200 text-center">
              Find out which parts are slowing down your system.
            </p>
          </div>
          {/* Feature Card 3 - Upgrade Suggestions */}
          <div className="bg-black/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col items-center border border-[#2176FF]/40 hover:border-[#2176FF] transition-all">
            <img
              src={require("./assets/upgrade.jpg")} // Use your new image file name and path
              alt="Upgrade Suggestions"
              className="w-24 h-24 object-cover rounded-xl mb-4 border-2 border-black shadow-lg"
            />
            <h3 className="text-2xl font-bold text-[#2176FF] mb-2 text-center">
              Upgrade Suggestions
            </h3>
            <p className="text-gray-200 text-center">
              Get recommendations for the latest PC parts.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="w-full max-w-3xl bg-black/80 backdrop-blur-lg rounded-2xl shadow-xl p-10 mt-10 mb-20 border border-[#2176FF]/40">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2176FF] to-white mb-6 text-center">
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
