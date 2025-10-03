import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-xl shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-[#2176FF] drop-shadow-lg">
          Specly
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/scan" className="text-white/90 hover:text-[#2176FF] font-medium transition-colors">
            Scan
          </Link>
          <Link to="/compatibility" className="text-white/90 hover:text-[#2176FF] font-medium transition-colors">
            Compatibility
          </Link>
          <Link to="/shop" className="text-white/90 hover:text-[#2176FF] font-medium transition-colors">
            Shop
          </Link>
          {!user ? (
            <>
              <Link to="/signup" className="px-4 py-2 rounded-lg bg-[#2176FF] text-white font-semibold shadow hover:bg-white hover:text-[#2176FF] border-2 border-[#2176FF] transition-colors">
                Sign Up
              </Link>
              <Link to="/login" className="px-4 py-2 rounded-lg border border-white/30 text-white font-semibold hover:bg-[#2176FF] hover:text-white transition-colors">
                Login
              </Link>
            </>
          ) : (
            <button className="bg-cyan-400 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow hover:bg-cyan-300 transition-colors">
              My Account
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
