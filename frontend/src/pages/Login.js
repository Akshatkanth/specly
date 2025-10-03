import React, { useState, useContext } from "react";
import axios from "../utils/axios"; // <-- Fix this import
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await login(form.email, form.password);
      setMessage("Login successful!");
      navigate("/"); // Redirect to home
    } catch (err) {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="w-full max-w-md bg-[#181A1B] rounded-xl shadow-xl p-8 border border-[#2176FF]/30">
        <h2 className="text-3xl font-bold text-[#2176FF] mb-6 text-center">Login</h2>
        {message && <p className="text-center text-[#2176FF] mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#181A1B] to-[#2176FF] text-white font-semibold py-3 rounded-lg shadow hover:from-[#2176FF] hover:to-[#181A1B] border-2 border-[#2176FF] transition-all"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#2176FF] hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
