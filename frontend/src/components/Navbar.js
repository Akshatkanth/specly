import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 px-6 py-4 flex items-center justify-between shadow-lg">
      <a href="/" className="text-2xl font-bold text-cyan-400">Specly</a>
      <div className="flex items-center space-x-6">
        <a href="/scan" className="text-white hover:text-cyan-400">Scan</a>
        <a href="/compatibility" className="text-white hover:text-cyan-400">Compatibility</a>
        {!user ? (
          <>
            <a href="/signup" className="bg-cyan-400 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow hover:bg-cyan-300 transition-colors">
              Sign Up
            </a>
            <a href="/login" className="bg-gray-800 text-cyan-400 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition-colors border border-cyan-400">
              Login
            </a>
          </>
        ) : (
          <button className="bg-cyan-400 text-gray-900 font-semibold px-4 py-2 rounded-lg shadow hover:bg-cyan-300 transition-colors">
            My Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
