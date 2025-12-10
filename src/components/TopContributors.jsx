import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosApi from "../api/axiosInstansce";

const TopContributors = () => {
  const { data: contributors, isLoading, isError, error } = useQuery({
    queryKey: ["topContributors"],
    queryFn: async () => {
      const res = await axiosApi.get("/users/top-contributors");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 grid md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-gray-200 animate-pulse h-48 rounded-2xl shadow"
          ></div>
        ))}
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 py-12">
        Failed to load top contributors: {error.message}
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Top Contributors of the Week
      </h2>
      <div className="grid md:grid-cols-4 gap-6">
        {contributors?.length > 0 ? (
          contributors.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-shadow text-center"
            >
              <img
                src={user.photo || "/default-avatar.png"}
                alt={user.name}
                className="w-20 h-20 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-500 text-sm">
                {user.lessonsContributed} Lessons
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-4">
            No contributors found.
          </p>
        )}
      </div>
    </div>
  );
};

export default TopContributors;
