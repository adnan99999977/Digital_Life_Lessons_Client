import React from "react";
import { motion } from "framer-motion";
import {
  UserIcon,
  BookOpenIcon,
  FlagIcon,
  StarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboardHome = () => {
  const lessonGrowthData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Lessons Created",
        data: [12, 19, 10, 15, 22, 30, 18],
        fill: true,
        backgroundColor: "rgba(99, 102, 241, 0.2)", // indigo-500 / 20%
        borderColor: "rgba(99, 102, 241, 1)", // indigo-500
        tension: 0.3,
      },
    ],
  };

  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "New Users",
        data: [5, 12, 9, 20, 15, 25, 18],
        fill: true,
        backgroundColor: "rgba(16, 185, 129, 0.2)", // green-500 / 20%
        borderColor: "rgba(16, 185, 129, 1)", // green-500
        tension: 0.3,
      },
    ],
  };

  const cards = [
    { icon: <UserIcon className="w-10 h-10 text-blue-500" />, title: "Total Users", value: "1,245" },
    { icon: <BookOpenIcon className="w-10 h-10 text-green-500" />, title: "Total Public Lessons", value: "3,456" },
    { icon: <FlagIcon className="w-10 h-10 text-red-500" />, title: "Reported Lessons", value: "78" },
    { icon: <StarIcon className="w-10 h-10 text-yellow-500" />, title: "Top Contributors", value: "12" },
    { icon: <CalendarIcon className="w-10 h-10 text-purple-500" />, title: "New Lessons Today", value: "24" },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-8 text-indigo-700 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Admin Dashboard
      </motion.h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-md bg-white/70 border border-white/30 shadow-lg rounded-2xl p-5 flex items-center gap-4 transition-shadow duration-300"
          >
            {card.icon}
            <div>
              <p className="text-gray-500">{card.title}</p>
              <p className="text-xl md:text-2xl font-semibold text-gray-900">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="backdrop-blur-md bg-white/80 border border-white/30 shadow-lg rounded-2xl p-6 transition-shadow duration-300"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Lesson Growth (This Week)</h2>
          <Line data={lessonGrowthData} />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="backdrop-blur-md bg-white/80 border border-white/30 shadow-lg rounded-2xl p-6 transition-shadow duration-300"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">User Growth (Monthly)</h2>
          <Line data={userGrowthData} />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
