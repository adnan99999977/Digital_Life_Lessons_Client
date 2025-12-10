import { useContext } from "react";
import { motion } from "framer-motion";
import {
  UserIcon,
  BookOpenIcon,
  FlagIcon,
  StarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LoadingPage from "../../components/shared/LoadingPage";
import { AuthContext } from "../../auth/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboardHome = () => {
  const { loading } = useContext(AuthContext);
  // Charts data
  const lessonGrowthData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Lessons Created",
        data: [12, 19, 10, 15, 22, 30, 18],
        fill: true,
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(99, 102, 241, 1)",
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
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "rgba(16, 185, 129, 1)",
        tension: 0.3,
      },
    ],
  };

  // Static cards data
  const cards = [
    {
      icon: <UserIcon className="w-10 h-10 text-blue-500" />,
      title: "Total Users",
      value: "1,245",
    },
    {
      icon: <BookOpenIcon className="w-10 h-10 text-green-500" />,
      title: "Total Public Lessons",
      value: "3,456",
    },
    {
      icon: <FlagIcon className="w-10 h-10 text-red-500" />,
      title: "Reported Lessons",
      value: "78",
      viewDetails: true,
    },
    {
      icon: <StarIcon className="w-10 h-10 text-yellow-500" />,
      title: "Top Contributors",
      value: "12",
    },
    {
      icon: <CalendarIcon className="w-10 h-10 text-purple-500" />,
      title: "New Lessons Today",
      value: "24",
    },
  ];

  const topContributors = [
    { name: "Alice Johnson", lessons: 34 },
    { name: "Bob Smith", lessons: 29 },
    { name: "Carol Lee", lessons: 25 },
    { name: "David Kim", lessons: 20 },
  ];

  if (loading) {
    <div>
      <LoadingPage />
    </div>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      {/* Title */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-8 text-indigo-700 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Admin Dashboard
      </motion.h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-md bg-white/70 border border-white/30 shadow-lg rounded-2xl p-5 flex flex-col items-start gap-3 transition-shadow duration-300"
          >
            {card.icon}
            <p className="text-gray-500">{card.title}</p>
            <p className="text-xl md:text-2xl font-semibold text-gray-900">
              {card.value}
            </p>
            {card.viewDetails && (
              <button className="mt-2 text-indigo-600 text-sm hover:underline">
                View Details
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="backdrop-blur-md bg-white/80 border border-white/30 shadow-lg rounded-2xl p-6 transition-shadow duration-300"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
            Lesson Growth (This Week)
          </h2>
          <Line
            data={lessonGrowthData}
            options={{
              responsive: true,
              plugins: { tooltip: { mode: "index", intersect: false } },
            }}
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="backdrop-blur-md bg-white/80 border border-white/30 shadow-lg rounded-2xl p-6 transition-shadow duration-300"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
            User Growth (Monthly)
          </h2>
          <Line
            data={userGrowthData}
            options={{
              responsive: true,
              plugins: { tooltip: { mode: "index", intersect: false } },
            }}
          />
        </motion.div>
      </div>

      {/* Top Contributors */}
      <div className="mt-10 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Most Active Contributors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {topContributors.map((user, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-800 font-bold text-lg">
                {user.name[0]}
              </div>
              <p className="mt-2 font-semibold text-gray-700 text-center">
                {user.name}
              </p>
              <p className="text-sm text-gray-500">{user.lessons} Lessons</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
