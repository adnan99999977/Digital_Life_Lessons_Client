import React from "react";
import { Link } from "react-router-dom";

const lessons = [
  {
    id: 1,
    title: "Overcoming Fear",
    description: "Learn how to overcome fear and achieve your goals.",
    category: "Motivation",
    tone: "Inspirational",
    creator: { name: "John Doe", photo: "/default-avatar.png" },
    accessLevel: "Public",
    createdAt: "2025-12-01",
  },
  {
    id: 2,
    title: "Mindfulness Basics",
    description: "Discover the power of mindfulness for everyday life.",
    category: "Wellness",
    tone: "Calm",
    creator: { name: "Alice", photo: "/default-avatar.png" },
    accessLevel: "Premium",
    createdAt: "2025-12-02",
  },
  {
    id: 3,
    title: "Time Management Tips",
    description: "Simple tips to manage your time effectively.",
    category: "Productivity",
    tone: "Practical",
    creator: { name: "Bob", photo: "/default-avatar.png" },
    accessLevel: "Public",
    createdAt: "2025-12-03",
  },
];

const PublicLessons = () => {
  const currentUser = { isPremium: false }; // example: current user is not premium

  return (
    <div className="max-w-7xl mx-auto p-6 grid gap-8 md:grid-cols-3">
      {lessons.map((lesson) => {
        const isLocked =
          lesson.accessLevel === "Premium" && !currentUser.isPremium;
        return (
          <div
            key={lesson.id}
            className={`relative bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-6 flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-2xl border border-gray-200`}
          >
            {/* Locked overlay */}
            {isLocked && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl">
                <span className="text-4xl animate-pulse">🔒</span>
                <p className="mt-2 font-semibold text-gray-700 text-center text-sm">
                  Premium Lesson – Upgrade to view
                </p>
              </div>
            )}

            {/* Lesson Content */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
                {lesson.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-3">
                {lesson.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                  {lesson.category}
                </span>
                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {lesson.tone}
                </span>
              </div>
            </div>

            {/* Creator & Date */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <img
                  src={lesson.creator.photo}
                  alt={lesson.creator.name}
                  className="w-9 h-9 rounded-full object-cover border border-gray-200"
                />
                <span className="text-sm font-medium text-gray-800">
                  {lesson.creator.name}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(lesson.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* CTA Button */}
            <Link
              to={"/public-lessons-details"}
              className={`mt-5 w-full py-3 rounded-xl font-semibold text-center text-white transition-colors ${
                isLocked
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              }`}
            >
              {isLocked ? "Locked" : "See Details"}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PublicLessons;
