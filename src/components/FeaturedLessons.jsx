import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "../api/axiosInstansce";

const FeaturedLessons = () => {
  const { data: lessons, isLoading, isError, error } = useQuery({
    queryKey: ["featuredLessons"],
    queryFn: async () => {
      const res = await axiosApi.get("/lessons/featured");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gray-200 animate-pulse h-64 rounded-2xl shadow"
          ></div>
        ))}
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 py-12">
        Failed to load featured lessons: {error.message}
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Featured Life Lessons
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {lessons?.length > 0 ? (
          lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-shadow cursor-pointer"
            >
              <img
                src={lesson.thumbnail || "/default-lesson.jpg"}
                alt={lesson.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
              <p className="text-gray-500 text-sm">{lesson.shortDescription}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No featured lessons found.
          </p>
        )}
      </div>
    </div>
  );
};

export default FeaturedLessons;
