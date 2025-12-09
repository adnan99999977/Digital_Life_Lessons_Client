import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Eye } from "lucide-react";

const MyFavorites = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [toneFilter, setToneFilter] = useState("");

  // Static favorite lessons
  const favorites = [
    { id: 1, title: "Mindfulness", category: "Personal Growth", emotionalTone: "Motivational", createdAt: "2025-12-08" },
    { id: 2, title: "Time Management", category: "Career", emotionalTone: "Realization", createdAt: "2025-12-07" },
    { id: 3, title: "Gratitude Practice", category: "Mindset", emotionalTone: "Gratitude", createdAt: "2025-12-06" },
    { id: 4, title: "Avoiding Mistakes", category: "Mistakes Learned", emotionalTone: "Sad", createdAt: "2025-12-05" },
  ];

  const filteredFavorites = favorites.filter((lesson) => {
    return (
      (!categoryFilter || lesson.category === categoryFilter) &&
      (!toneFilter || lesson.emotionalTone === toneFilter)
    );
  });

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-2">My Favorites ⭐</h1>
        <p className="text-gray-600">View your saved lessons in one place.</p>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto flex flex-wrap gap-4 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-2xl border p-3 shadow-sm hover:shadow-md transition"
        >
          <option value="">All Categories</option>
          <option>Personal Growth</option>
          <option>Career</option>
          <option>Mindset</option>
          <option>Relationships</option>
          <option>Mistakes Learned</option>
        </select>

        <select
          value={toneFilter}
          onChange={(e) => setToneFilter(e.target.value)}
          className="rounded-2xl border p-3 shadow-sm hover:shadow-md transition"
        >
          <option value="">All Tones</option>
          <option>Motivational</option>
          <option>Sad</option>
          <option>Realization</option>
          <option>Gratitude</option>
        </select>
      </motion.div>

      {/* Favorites Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-purple-100 text-purple-800">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Title</th>
              <th className="px-6 py-3 text-left font-semibold">Category</th>
              <th className="px-6 py-3 text-left font-semibold">Emotional Tone</th>
              <th className="px-6 py-3 text-left font-semibold">Date Added</th>
              <th className="px-6 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFavorites.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No favorites found
                </td>
              </tr>
            ) : (
              filteredFavorites.map((lesson) => (
                <tr key={lesson.id} className="border-b hover:bg-purple-50 transition">
                  <td className="px-6 py-4">{lesson.title}</td>
                  <td className="px-6 py-4">{lesson.category}</td>
                  <td className="px-6 py-4">{lesson.emotionalTone}</td>
                  <td className="px-6 py-4">{lesson.createdAt}</td>
                  <td className="px-6 py-4 text-center flex justify-center gap-4">
                    <button className="text-red-500 hover:text-red-700 transition">
                      <Trash2 size={20} />
                    </button>
                    <button className="text-indigo-600 hover:text-indigo-800 transition">
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default MyFavorites;
