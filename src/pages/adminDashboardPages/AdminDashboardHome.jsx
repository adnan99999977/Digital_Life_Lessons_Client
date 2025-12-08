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
  // Dummy data for charts
  const lessonGrowthData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Lessons Created",
        data: [12, 19, 10, 15, 22, 30, 18],
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.2)", // blue-500 / 20%
        borderColor: "rgba(59, 130, 246, 1)", // blue-500
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow p-5 flex items-center gap-4"
        >
          <UserIcon className="w-10 h-10 text-blue-500" />
          <div>
            <p className="text-gray-500">Total Users</p>
            <p className="text-xl font-semibold">1,245</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow p-5 flex items-center gap-4"
        >
          <BookOpenIcon className="w-10 h-10 text-green-500" />
          <div>
            <p className="text-gray-500">Total Public Lessons</p>
            <p className="text-xl font-semibold">3,456</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow p-5 flex items-center gap-4"
        >
          <FlagIcon className="w-10 h-10 text-red-500" />
          <div>
            <p className="text-gray-500">Reported Lessons</p>
            <p className="text-xl font-semibold">78</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow p-5 flex items-center gap-4"
        >
          <StarIcon className="w-10 h-10 text-yellow-500" />
          <div>
            <p className="text-gray-500">Top Contributors</p>
            <p className="text-xl font-semibold">12</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg shadow p-5 flex items-center gap-4"
        >
          <CalendarIcon className="w-10 h-10 text-purple-500" />
          <div>
            <p className="text-gray-500">New Lessons Today</p>
            <p className="text-xl font-semibold">24</p>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Lesson Growth (This Week)</h2>
          <Line data={lessonGrowthData} />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-semibold mb-4">User Growth (Monthly)</h2>
          <Line data={userGrowthData} />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
