import React, { useState } from "react";
import { motion } from "framer-motion";

const sampleLessons = [
  {
    id: 1,
    title: "React Basics",
    creator: "John Doe",
    category: "Frontend",
    visibility: "Public",
    flags: 2,
    featured: false,
    reviewed: false,
  },
  {
    id: 2,
    title: "Node.js Advanced",
    creator: "Alice",
    category: "Backend",
    visibility: "Private",
    flags: 0,
    featured: true,
    reviewed: true,
  },
];

const ManageLessons = () => {
  const [lessons, setLessons] = useState(sampleLessons);

  const deleteLesson = (id) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      setLessons(lessons.filter((lesson) => lesson.id !== id));
    }
  };

  const toggleFeatured = (id) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === id ? { ...lesson, featured: !lesson.featured } : lesson
      )
    );
  };

  const markReviewed = (id) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === id ? { ...lesson, reviewed: true } : lesson
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Manage Lessons</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <motion.div
            key={lesson.id}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{lesson.title}</h2>
              <p className="text-gray-500">
                Creator: <span className="font-medium">{lesson.creator}</span>
              </p>
              <p className="text-gray-500">
                Category: <span className="font-medium">{lesson.category}</span>
              </p>
              <p className="text-gray-500">
                Visibility: <span className="font-medium">{lesson.visibility}</span>
              </p>
              <p className="text-gray-500">
                Flags: <span className="font-medium">{lesson.flags}</span>
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                  lesson.featured ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
                }`}
                onClick={() => toggleFeatured(lesson.id)}
              >
                {lesson.featured ? "Unfeature" : "Feature"}
              </button>

              <button
                className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                  lesson.reviewed ? "bg-green-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
                }`}
                onClick={() => markReviewed(lesson.id)}
                disabled={lesson.reviewed}
              >
                {lesson.reviewed ? "Reviewed" : "Mark Reviewed"}
              </button>

              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                onClick={() => deleteLesson(lesson.id)}
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageLessons;
