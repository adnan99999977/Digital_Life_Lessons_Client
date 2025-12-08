import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";

const Pricing = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Conditional rendering: Only Free users see pricing
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p>Please login to view pricing.</p>
      </div>
    );
  }

  if (user.isPremium) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-xl font-semibold">
          You are already a Premium ⭐ member!
        </p>
      </div>
    );
  }

  // Features comparison
  const features = [
    { name: "Number of Lessons", free: "10", premium: "Unlimited" },
    { name: "Create Premium Lessons", free: <X size={18} />, premium: <Check size={18} /> },
    { name: "Ad-free Experience", free: <X size={18} />, premium: <Check size={18} /> },
    { name: "Priority Listing", free: <X size={18} />, premium: <Check size={18} /> },
    { name: "Access to Premium Lessons", free: <X size={18} />, premium: <Check size={18} /> },
    { name: "Save Favorites", free: <Check size={18} />, premium: <Check size={18} /> },
    { name: "Analytics Dashboard", free: <X size={18} />, premium: <Check size={18} /> },
    { name: "Support Access", free: "Basic", premium: "Priority" },
  ];

  const handleUpgrade = () => {
    // Redirect to your backend Stripe route
    navigate("/create-checkout-session");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Upgrade to Premium ⭐
      </motion.h1>

      <motion.div
        className="grid md:grid-cols-2 gap-6 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Free Plan Card */}
        <motion.div
          className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Free Plan</h2>
          <p className="text-3xl font-bold mb-6">৳0</p>
          <ul className="space-y-2 w-full">
            {features.map((f, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{f.name}</span>
                <span>{f.free}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Premium Plan Card */}
        <motion.div
          className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-xl rounded-xl p-6 flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Premium Plan</h2>
          <p className="text-3xl font-bold mb-6">৳1500</p>
          <ul className="space-y-2 w-full">
            {features.map((f, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{f.name}</span>
                <span>{f.premium}</span>
              </li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUpgrade}
            className="mt-6 bg-white text-indigo-600 font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
          >
            Upgrade to Premium
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Pricing;
