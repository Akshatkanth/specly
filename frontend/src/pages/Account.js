import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

const Account = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("speclyUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setLoading(false);
  }, [user, setUser]);

  const handleLogout = () => {
    localStorage.removeItem("speclyUser");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-[#181A1B] rounded-xl shadow-xl p-8 border border-[#2176FF]/30 text-center">
          <h2 className="text-2xl font-bold text-[#2176FF] mb-4">Account</h2>
          <p className="text-white">You are not logged in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#181A1B] rounded-xl shadow-xl p-8 border border-[#2176FF]/30 text-center">
        <h2 className="text-2xl font-bold text-[#2176FF] mb-4">My Account</h2>
        <p className="text-white mb-2"><span className="font-semibold text-[#2176FF]">Name:</span> {user.name}</p>
        <p className="text-white mb-6"><span className="font-semibold text-[#2176FF]">Email:</span> {user.email}</p>
        <button
          onClick={handleLogout}
          className="px-6 py-2 rounded-xl font-bold bg-black border-2 border-[#2176FF] text-white shadow hover:bg-[#2176FF] hover:text-white transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;