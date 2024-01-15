import React, { useState, useEffect } from "react";
import axios from "axios";

function MainPage() {
  const [balance, setBalance] = useState(0);
  const [referralLink, setReferralLink] = useState("");

  useEffect(async () => {
    try {
      const response = await axios.get("/api/user/data");
      setBalance(response.data.balance);
      setReferralLink(response.data.referralLink);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  }, []);

  const handleGenerateLink = async () => {
    try {
      const response = await axios.post("/api/generate-referral-link");
      setReferralLink(response.data.link);
    } catch (err) {
      // Handle errors
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-4/5">
        <h2 className="text-2xl font-bold mb-6 text-center">Main Page</h2>
        <div className="text-2xl font-bold mb-4">Your Balance: {balance}</div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleGenerateLink}
        >
          Generate Referral Link
        </button>
        {referralLink && (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            onClick={() => {
              /* Implement share functionality */
            }}
          >
            Share Link
          </button>
        )}
      </div>
    </div>
  );
}

export default MainPage;
