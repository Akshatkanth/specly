import React, { useState, useContext } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import bgStars from "./assets/bg.jpg"; // Add this import

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("/auth/signup", form);
      if (res.data && res.data.token) {
        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage("Signup failed. Please try again.");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.msg ||
          err.response?.data?.message ||
          "Signup failed. Please try again."
      );
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 relative"
      style={{
        backgroundImage: `url(${bgStars})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.95) 80%, #2176FF 120%)",
          opacity: 0.85,
        }}
      ></div>
      <div className="relative w-full max-w-md bg-[#181A1B] rounded-xl shadow-xl p-8 border border-[#2176FF]/30">
        <h2 className="text-3xl font-bold text-[#2176FF] mb-6 text-center">
          Sign Up
        </h2>
        {message && (
          <p className="text-center text-[#2176FF] mb-4">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-black text-white border border-[#2176FF] focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-black text-white border border-[#2176FF] focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-black text-white border border-[#2176FF] focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-black border-2 border-[#2176FF] text-white font-bold py-3 rounded-lg shadow hover:bg-[#2176FF] hover:text-white transition-all"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#2176FF] hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
