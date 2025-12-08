import React from "react";
import axiosApi from "../api/axiosInstansce";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const getLessonsData = async () => {
  const res = await axiosApi.get("/lessons");
  return res.data;
};

const PublicLessons = () => {
  const currentUser = { isPremium: false }; // Replace with real auth context

  const {
    data: lessons,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: getLessonsData,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 font-semibold text-xl">
        Loading lessons...
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 font-semibold text-xl">
        Error loading lessons
      </div>
    );

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center">
        Explore Life Lessons
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {lessons.map((lesson) => {
          const isLocked =
            lesson.accessLevel === "Premium" && !currentUser.isPremium;

          return (
            <div
              key={lesson._id}
              className={`relative flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ${
                isLocked ? "filter blur-sm brightness-90" : ""
              }`}
            >
              {/* Lesson Image */}
              <div className="w-full h-44 overflow-hidden">
                {lesson.userImage ? (
                  <img
                    src={lesson.userImage}
                    alt="lesson image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-semibold">
                    No Image
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <h2
                    className={`font-semibold text-lg text-gray-800 mb-2 cursor-pointer hover:text-blue-600 ${
                      isLocked ? "cursor-not-allowed" : ""
                    }`}
                  >
                    {lesson.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-3">
                    {lesson.description.slice(0, 100)}...
                  </p>
                </div>

                {/* Metadata */}
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {lesson.category}
                  </span>
                  {lesson.accessLevel === "Premium" && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                      Premium ⭐
                    </span>
                  )}
                </div>
              </div>

              {/* Footer Section */}
              <div className="p-5 border-t border-gray-100 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={lesson.creatorPhotoURL || "/default-avatar.png"}
                      alt={lesson.creatorName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-600 text-sm">
                      {lesson.creatorName}
                    </span>
                  </div>
                  <span className="text-gray-400 text-xs">
                    {new Date(lesson.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <Link to={"/public-lessons-details"}>
                  <button
                    className={`w-full py-2 rounded-xl font-semibold transition-colors ${
                      isLocked
                        ? "bg-yellow-500 text-white cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={isLocked}
                  >
                    {isLocked ? "Upgrade to Premium" : "See Details"}
                  </button>
                </Link>
              </div>

              {/* Lock Overlay */}
              {isLocked && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-bold text-sm rounded-2xl pointer-events-none">
                  Premium Lesson 🔒
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PublicLessons;
