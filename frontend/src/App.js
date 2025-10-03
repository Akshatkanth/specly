import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Import actual pages
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Compatibility from "./pages/Compatibility";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";
import Account from "./pages/Account";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/compatibility" element={<Compatibility />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
