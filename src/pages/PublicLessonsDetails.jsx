import React from "react";
import { Link } from "react-router-dom";

const lesson = {
  id: 1,
  title: "Overcoming Fear",
  description: `This is the full detailed story of overcoming fear. 
  It includes insights, personal experiences, and lessons learned over time.`,
  category: "Personal Growth",
  tone: "Motivational",
  featuredImage: "/lesson-featured.jpg",
  accessLevel: "Premium",
  createdAt: "2025-12-01",
  updatedAt: "2025-12-05",
  creator: {
    name: "John Doe",
    photo: "/default-avatar.png",
    totalLessons: 5,
  },
  likesCount: 1200,
  favoritesCount: 342,
  viewsCount: Math.floor(Math.random() * 10000),
};

const similarLessons = [
  { id: 2, title: "Mindfulness Basics", category: "Wellness", tone: "Calm" },
  { id: 3, title: "Time Management Tips", category: "Productivity", tone: "Practical" },
  { id: 4, title: "Confidence Building", category: "Personal Growth", tone: "Motivational" },
  { id: 5, title: "Stress Management", category: "Wellness", tone: "Calm" },
  { id: 6, title: "Leadership Lessons", category: "Career", tone: "Motivational" },
  { id: 7, title: "Gratitude Practice", category: "Mindset", tone: "Gratitude" },
];

const PublicLessonsDetails = () => {
  const currentUser = { isPremium: true }; 
  const isLocked = lesson.accessLevel === "Premium" && !currentUser.isPremium;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Premium Lock Banner */}
      {isLocked && (
        <div className="relative bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
            <span className="text-5xl mb-4">🔒</span>
            <p className="text-xl font-semibold text-gray-700 mb-4">
              Premium Lesson – Upgrade to view
            </p>
            <Link to={'/dashboard/pricing'} className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Go to Pricing Page
            </Link>
          </div>
          <div className="opacity-30">{/* Content blurred */}</div>
        </div>
      )}

      {/* Lesson Information */}
      {!isLocked && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={lesson.featuredImage}
            alt={lesson.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
            <p className="text-gray-700">{lesson.description}</p>
            <p className="text-sm text-gray-500">
              Category: {lesson.category} | Emotional Tone: {lesson.tone}
            </p>

            {/* Metadata */}
            <div className="flex gap-4 text-xs text-gray-400">
              <span>Created: {lesson.createdAt}</span>
              <span>Last Updated: {lesson.updatedAt}</span>
              <span>Visibility: Public</span>
              <span>Reading: ~5 min</span>
            </div>

            {/* Author Info */}
            <div className="flex items-center justify-between mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <img
                  src={lesson.creator.photo}
                  alt={lesson.creator.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{lesson.creator.name}</p>
                  <p className="text-sm text-gray-500">
                    Total Lessons: {lesson.creator.totalLessons}
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                View all lessons by this author
              </button>
            </div>

            {/* Stats & Engagement */}
            <div className="flex gap-6 mt-4 text-gray-600 items-center">
              <span>❤️ {lesson.likesCount} Likes</span>
              <span>🔖 {lesson.favoritesCount} Favorites</span>
              <span>👀 {lesson.viewsCount} Views</span>
            </div>

            {/* Interaction Buttons */}
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                ❤️ Like
              </button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                🔖 Save to Favorites
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                🚩 Report Lesson
              </button>
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Similar Lessons */}
      {!isLocked && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Similar Lessons</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {similarLessons.map((l) => (
              <div key={l.id} className="bg-white p-4 shadow rounded-lg">
                <h3 className="font-semibold">{l.title}</h3>
                <p className="text-sm text-gray-500">
                  {l.category} | {l.tone}
                </p>
                <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  See Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicLessonsDetails;
