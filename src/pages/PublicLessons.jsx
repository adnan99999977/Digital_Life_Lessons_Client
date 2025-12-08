import React from 'react';
import { Link } from 'react-router-dom';

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
    <div className="max-w-6xl mx-auto p-6 grid gap-6 md:grid-cols-3">
      {lessons.map((lesson) => {
        const isLocked = lesson.accessLevel === "Premium" && !currentUser.isPremium;
        return (
          <div
            key={lesson.id}
            className={`relative bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between transition-transform hover:scale-105 ${
              isLocked ? "filter blur-sm" : ""
            }`}
          >
            {isLocked && (
              <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center rounded-lg">
                <span className="text-3xl">🔒</span>
                <p className="mt-2 font-semibold text-gray-700 text-center">
                  Premium Lesson – Upgrade to view
                </p>
              </div>
            )}
            <div className="space-y-2">
              <h2 className="text-xl font-bold">{lesson.title}</h2>
              <p className="text-gray-600 text-sm">{lesson.description}</p>
              <p className="text-gray-500 text-xs">
                Category: {lesson.category} | Tone: {lesson.tone}
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <img
                  src={lesson.creator.photo}
                  alt={lesson.creator.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium">{lesson.creator.name}</span>
              </div>
              <span className="text-xs text-gray-400">{lesson.createdAt}</span>
            </div>
            <Link to={'/public-lessons-details'}
              className={`mt-4 w-full py-2 rounded-md font-semibold transition-colors ${
                isLocked
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              disabled={isLocked}
            >
              See Details
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PublicLessons;
