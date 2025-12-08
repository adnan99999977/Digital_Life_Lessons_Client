import React from "react";
import { motion } from "framer-motion";
import { Heart, BookOpen, PlusCircle, TrendingUp } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardHome = () => {
  // Static user stats
  const stats = {
    totalLessons: 12,
    totalFavorites: 34,
    weeklyData: [5, 8, 6, 10, 7, 12, 9],
    recentLessons: [
      { id: 1, title: "Mindfulness", category: "Personal Growth" },
      { id: 2, title: "Time Management", category: "Career" },
      { id: 3, title: "Gratitude Practice", category: "Mindset" },
    ],
  };

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Lessons Added",
        data: stats.weeklyData,
        backgroundColor: "#6366f1",
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Weekly Lesson Activity",
        font: { size: 16 },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">
          Track your life lessons, engagement & growth
        </p>
      </motion.div>

      {/* STATS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-10"
      >
        <StatCard
          icon={<BookOpen size={30} />}
          label="Total Lessons"
          value={stats.totalLessons}
          color="from-indigo-500 to-indigo-600"
        />

        <StatCard
          icon={<Heart size={30} />}
          label="Favorites"
          value={stats.totalFavorites}
          color="from-pink-500 to-rose-500"
        />

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white border-2 border-dashed border-indigo-200 rounded-2xl p-6 flex items-center gap-4 cursor-pointer hover:bg-indigo-50 transition"
        >
          <PlusCircle size={36} className="text-indigo-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Create New Lesson
            </h3>
            <p className="text-sm text-gray-500">
              Share a new life experience
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* RECENT LESSONS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto mb-10"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Recently Added Lessons
          </h2>
          <TrendingUp className="text-indigo-500" />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stats.recentLessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-md p-5 cursor-pointer hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg text-gray-800 mb-1">
                {lesson.title}
              </h3>
              <span className="inline-block text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
                {lesson.category}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CHART */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6"
      >
        <Bar data={chartData} options={chartOptions} />
      </motion.div>
    </div>
  );
};

/* Stat Card */
const StatCard = ({ icon, label, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-lg`}
  >
    <div className="flex items-center gap-4">
      <div className="bg-white/20 p-3 rounded-xl">{icon}</div>
      <div>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-sm opacity-90">{label}</p>
      </div>
    </div>
  </motion.div>
);

export default DashboardHome;
