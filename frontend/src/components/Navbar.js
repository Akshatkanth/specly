import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        {/* Home is always visible */}
        <Link to="/" className="text-xl font-bold">
          Home
        </Link>

        {/* Only show Scan & Compatibility if user exists */}
        {user ? (
          <>
            <Link to="/scan">Scan</Link>
            <Link to="/compatibility">Compatibility</Link>
          </>
        ) : null}
      </div>

      <div className="space-x-4">
        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
