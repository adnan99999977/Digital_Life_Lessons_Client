import React from "react";
import { motion } from "framer-motion";
import { Heart, BookOpen, PlusCircle } from "lucide-react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardHome = () => {
  // Sample user stats (replace with API/DB)
  const stats = {
    totalLessons: 12,
    totalFavorites: 34,
    recentLessons: [
      { id: 1, title: "Mindfulness", category: "Personal Growth" },
      { id: 2, title: "Time Management", category: "Career" },
      { id: 3, title: "Gratitude Practice", category: "Mindset" },
    ],
    weeklyData: [5, 8, 6, 10, 7, 12, 9],
  };

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Lessons Added",
        data: stats.weeklyData,
        backgroundColor: "#6366f1",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Weekly Lessons Overview" },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Stats Cards */}
      <motion.div
        className="grid md:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
          <BookOpen size={32} className="text-indigo-500" />
          <div>
            <h3 className="text-xl font-bold">{stats.totalLessons}</h3>
            <p className="text-gray-500">Total Lessons</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
          <Heart size={32} className="text-red-500" />
          <div>
            <h3 className="text-xl font-bold">{stats.totalFavorites}</h3>
            <p className="text-gray-500">Total Favorites</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 cursor-pointer hover:bg-indigo-50 transition">
          <PlusCircle size={32} className="text-green-500" />
          <div>
            <h3 className="text-xl font-bold">Add New</h3>
            <p className="text-gray-500">Quick Shortcut</p>
          </div>
        </div>
      </motion.div>

      {/* Recently Added Lessons */}
      <motion.div
        className="max-w-5xl mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-4">Recently Added Lessons</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {stats.recentLessons.map((lesson) => (
            <div key={lesson.id} className="bg-white rounded-xl shadow-md p-4 hover:scale-105 transition-transform cursor-pointer">
              <h3 className="font-semibold">{lesson.title}</h3>
              <p className="text-gray-500 text-sm">{lesson.category}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Chart */}
      <motion.div
        className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Bar data={data} options={options} />
      </motion.div>
    </div>
  );
};

export default DashboardHome;
