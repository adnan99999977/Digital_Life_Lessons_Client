import React, { useContext } from "react";
import { motion } from "framer-motion";
import { User, Star, Heart, BookOpen } from "lucide-react";
import { AuthContext } from "../../auth/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  // Sample user data (replace with DB fetch)
  const userData = {
    name: user?.displayName || "John Doe",
    email: user?.email || "john@example.com",
    photoURL: user?.photoURL || "https://i.pravatar.cc/150?img=12",
    isPremium: user?.isPremium || false,
    totalLessons: 12,
    totalFavorites: 34,
    lessons: [
      {
        id: 1,
        title: "Learn Mindfulness",
        category: "Personal Growth",
        emotionalTone: "Motivational",
        image: "https://source.unsplash.com/300x200/?mindfulness",
      },
      {
        id: 2,
        title: "Time Management Tips",
        category: "Career",
        emotionalTone: "Productivity",
        image: "https://source.unsplash.com/300x200/?time-management",
      },
      {
        id: 3,
        title: "Gratitude Practice",
        category: "Mindset",
        emotionalTone: "Gratitude",
        image: "https://source.unsplash.com/300x200/?gratitude",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <motion.div
        className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={userData.photoURL}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-indigo-500"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold flex items-center gap-2 justify-center md:justify-start">
            {userData.name}{" "}
            {userData.isPremium && <Star size={24} className="text-yellow-400" />}
          </h1>
          <p className="text-gray-600">{userData.email}</p>
          <div className="flex justify-center md:justify-start gap-6 mt-4">
            <div className="flex items-center gap-1 text-gray-700">
              <BookOpen size={20} /> {userData.totalLessons} Lessons
            </div>
            <div className="flex items-center gap-1 text-gray-700">
              <Heart size={20} /> {userData.totalFavorites} Favorites
            </div>
          </div>
        </div>
      </motion.div>

      {/* User Lessons */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Public Lessons</h2>
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {userData.lessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={lesson.image}
                alt={lesson.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
                <p className="text-sm text-gray-500">
                  {lesson.category} | {lesson.emotionalTone}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
