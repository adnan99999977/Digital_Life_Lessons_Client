import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  User,
  Star,
  Heart,
  BookOpen,
  Crown,
  Eye,
  Calendar,
  Mail,
} from "lucide-react";
import { AuthContext } from "../../auth/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  // Static demo data (DB ready structure)
  const userData = {
    name: user?.displayName || "John Doe",
    email: user?.email || "john@example.com",
    photoURL: user?.photoURL || "https://i.pravatar.cc/300?img=12",
    role: "User",
    isPremium: true,
    joinedDate: "March 2024",
    stats: {
      totalLessons: 12,
      totalLikes: 1200,
      totalFavorites: 340,
      totalViews: 8900,
    },
    lessons: [
      {
        id: 1,
        title: "Learning from Failure",
        category: "Mindset",
        emotionalTone: "Realization",
        image: "https://source.unsplash.com/400x300/?failure",
      },
      {
        id: 2,
        title: "Power of Daily Discipline",
        category: "Personal Growth",
        emotionalTone: "Motivational",
        image: "https://source.unsplash.com/400x300/?discipline",
      },
      {
        id: 3,
        title: "Gratitude Changes Everything",
        category: "Mindset",
        emotionalTone: "Gratitude",
        image: "https://source.unsplash.com/400x300/?gratitude",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* PROFILE HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-6"
      >
        {/* Avatar */}
        <div className="flex justify-center">
          <img
            src={userData.photoURL}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-indigo-500 shadow-md"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h1 className="text-3xl font-bold text-gray-800">
              {userData.name}
            </h1>
            {userData.isPremium && (
              <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 text-xs rounded-full">
                <Crown size={14} /> Premium
              </span>
            )}
          </div>

          <p className="text-gray-500 flex items-center justify-center md:justify-start gap-1 mt-1">
            <Mail size={14} /> {userData.email}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4 text-gray-600">
            <span className="flex items-center gap-1">
              <User size={16} /> Role: {userData.role}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} /> Joined {userData.joinedDate}
            </span>
          </div>
        </div>
      </motion.div>

      {/* STATS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
      >
        <StatCard icon={<BookOpen />} label="Lessons" value={userData.stats.totalLessons} />
        <StatCard icon={<Heart />} label="Likes" value="1.2K" />
        <StatCard icon={<Star />} label="Favorites" value="340" />
        <StatCard icon={<Eye />} label="Views" value="8.9K" />
      </motion.div>

      {/* USER LESSONS */}
      <div className="max-w-6xl mx-auto mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Your Public Lessons
          </h2>
          <button className="text-indigo-600 hover:underline text-sm">
            View All
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {userData.lessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-1">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {lesson.category} • {lesson.emotionalTone}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/* Stat Card Component */
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-xl shadow-md p-5 text-center hover:shadow-lg transition">
    <div className="flex justify-center text-indigo-600 mb-2">{icon}</div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

export default Profile;
