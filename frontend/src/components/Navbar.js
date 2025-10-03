import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-xl shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center">
        <div className="flex-1 flex items-center">
          <Link
            to="/"
            className="text-3xl font-extrabold text-[#2176FF] drop-shadow-lg tracking-tight"
            style={{
              fontWeight: 900,
              letterSpacing: "-1px",
              textShadow: "0 2px 12px #2176FF55",
            }}
          >
            Specly
          </Link>
        </div>
        <div className="flex items-center space-x-6 justify-end flex-1">
          <Link
            to="/scan"
            className="text-white/90 hover:text-[#2176FF] font-medium transition-colors"
          >
            Scan
          </Link>
          <Link
            to="/compatibility"
            className="text-white/90 hover:text-[#2176FF] font-medium transition-colors"
          >
            Compatibility
          </Link>
          <Link
            to="/shop"
            className="text-white/90 hover:text-[#2176FF] font-medium transition-colors"
          >
            Shop
          </Link>
          {!user ? (
            <>
              <Link
                to="/signup"
                className="text-white/90 hover:text-[#2176FF] font-medium transition-colors"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="text-white/90 hover:text-[#2176FF] font-medium transition-colors"
              >
                Login
              </Link>
            </>
          ) : (
            <Link
              to="/account"
              className="px-6 py-2 rounded-xl font-bold bg-black border-2 border-[#2176FF] text-white shadow hover:bg-[#2176FF] hover:text-white transition-colors"
              style={{ boxShadow: "0 2px 8px #2176FF33" }}
            >
              My Account
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
