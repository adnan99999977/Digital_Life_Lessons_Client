import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminProfile = () => {
  const [name, setName] = useState("Admin");
  const [photo, setPhoto] = useState("/default-avatar.png");

  const activityData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Lessons Moderated",
        data: [12, 19, 15, 10, 20, 18],
        backgroundColor: "#3B82F6",
      },
      {
        label: "Actions Taken",
        data: [5, 7, 6, 3, 10, 4],
        backgroundColor: "#60A5FA",
      },
    ],
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Profile</h1>

      {/* Top Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-shadow cursor-pointer"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">256</p>
        </motion.div>
        <motion.div
          className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-shadow cursor-pointer"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-lg font-semibold text-gray-700">Total Lessons</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">128</p>
        </motion.div>
        <motion.div
          className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-shadow cursor-pointer"
          whileHover={{ scale: 1.03 }}
        >
          <h2 className="text-lg font-semibold text-gray-700">Flagged Lessons</h2>
          <p className="text-3xl font-bold text-red-500 mt-2">5</p>
        </motion.div>
      </div>

      {/* Main Profile + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow flex flex-col items-center gap-4"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={photo}
            alt="Admin Avatar"
            className="w-36 h-36 rounded-full border-4 border-blue-500 shadow-md object-cover"
          />
          <label className="mt-2 cursor-pointer text-blue-600 font-medium hover:underline">
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            Update Photo
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3 w-full text-center border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
          <span className="mt-2 px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
            Admin
          </span>
        </motion.div>

        {/* Activity Summary */}
        <motion.div
          className="lg:col-span-2 bg-white p-6 rounded-2xl shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Activity Summary</h2>
          <div className="h-64">
            <Bar
              data={activityData}
              options={{
                responsive: true,
                plugins: { legend: { position: "top" }, title: { display: true, text: "Activity Overview" } },
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProfile;
