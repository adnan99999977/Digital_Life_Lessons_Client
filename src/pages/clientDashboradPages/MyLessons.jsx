import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiSparkles,
} from "react-icons/hi";
import { AuthContext } from "../../auth/AuthContext";

const sampleLessons = [
  {
    id: 1,
    title: "Overcoming Fear",
    category: "Personal Growth",
    access: "Premium",
    visibility: "Public",
    status: "Published",
    createdAt: "2025-08-12",
    reactions: 12,
    favorites: 5,
  },
  {
    id: 2,
    title: "Lessons from Failure",
    category: "Mindset",
    access: "Free",
    visibility: "Private",
    status: "Pending Review",
    createdAt: "2025-08-05",
    reactions: 8,
    favorites: 3,
  },
  {
    id: 3,
    title: "Time Mastery 101",
    category: "Productivity",
    access: "Free",
    visibility: "Public",
    status: "Published",
    createdAt: "2025-07-28",
    reactions: 20,
    favorites: 10,
  },
];

const badgeColor = (status) => {
  if (status === "Published") return "bg-green-100 text-green-800";
  if (status === "Pending Review") return "bg-yellow-100 text-yellow-800";
  return "bg-gray-100 text-gray-700";
};

const MyLessons = () => {
  const { currentUser } = useContext(AuthContext);
  const [lessons, setLessons] = useState(sampleLessons);
  const [activeRow, setActiveRow] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Toggle access
  const toggleAccess = (id) =>
    setLessons((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, access: l.access === "Free" ? "Premium" : "Free" }
          : l
      )
    );

  // Toggle visibility
  const toggleVisibility = (id) =>
    setLessons((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, visibility: l.visibility === "Public" ? "Private" : "Public" }
          : l
      )
    );

  // Delete lesson
  const handleDelete = (id) => {
    setDeleting(id);
    setTimeout(() => {
      setLessons((prev) => prev.filter((l) => l.id !== id));
      setConfirmOpen(false);
      setDeleting(null);
    }, 400);
  };

  // Open edit modal
  const handleEdit = (id) => setEditing(id);
  const closeEdit = () => setEditing(null);

  // Stats
  const stats = {
    total: lessons.length,
    public: lessons.filter((l) => l.visibility === "Public").length,
    premium: lessons.filter((l) => l.access === "Premium").length,
    reactions: lessons.reduce((acc, l) => acc + l.reactions, 0),
    favorites: lessons.reduce((acc, l) => acc + l.favorites, 0),
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-2">My Lessons</h1>
      <p className="text-gray-500 mb-6 text-sm sm:text-base">
        Manage lessons, track stats, and spotlight premium content.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-6">
        {[
          { title: "Total", value: stats.total, color: "text-indigo-600" },
          { title: "Public", value: stats.public, color: "text-green-600" },
          { title: "Premium", value: stats.premium, color: "text-purple-600" },
          { title: "Reactions", value: stats.reactions, color: "text-yellow-600" },
          { title: "Favorites", value: stats.favorites, color: "text-pink-600" },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl p-3 sm:p-4 shadow-md flex flex-col items-start justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 150 }}
          >
            <p className="text-xs sm:text-sm text-gray-500">{s.title}</p>
            <p className={`text-xl sm:text-2xl font-bold ${s.color}`}>{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Lessons Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
        <table className="min-w-full text-left table-auto">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-3 sm:px-4 py-2 text-xs sm:text-sm">Title</th>
              <th className="px-3 sm:px-4 py-2 text-xs sm:text-sm">Category</th>
              <th className="px-3 sm:px-4 py-2 text-xs sm:text-sm">Access</th>
              <th className="px-3 sm:px-4 py-2 text-xs sm:text-sm">Visibility</th>
              <th className="px-3 sm:px-4 py-2 text-xs sm:text-sm">Status</th>
              <th className="px-3 sm:px-4 py-2 text-xs sm:text-sm">Created</th>
              <th className="px-3 sm:px-4 py-2 text-xs sm:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {lessons.map((lesson) => (
                <motion.tr
                  key={lesson.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  whileHover={{ scale: 1.02, backgroundColor: "#f0f5ff" }}
                  className="border-b last:border-0 text-xs sm:text-sm"
                >
                  <td className="px-3 sm:px-4 py-2 font-semibold">{lesson.title}</td>
                  <td className="px-3 sm:px-4 py-2 text-gray-600">{lesson.category}</td>
                  <td className="px-3 sm:px-4 py-2">
                    <span
                      onClick={() => toggleAccess(lesson.id)}
                      className={`cursor-pointer px-2 py-1 rounded-full text-white font-semibold text-xs sm:text-sm ${
                        lesson.access === "Premium" ? "bg-purple-600" : "bg-blue-600"
                      }`}
                    >
                      {lesson.access}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-2">
                    <span
                      onClick={() => toggleVisibility(lesson.id)}
                      className={`cursor-pointer px-2 py-1 rounded-full font-semibold text-xs sm:text-sm ${
                        lesson.visibility === "Public"
                          ? "bg-green-600 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {lesson.visibility}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-2">
                    <span className={`px-2 py-1 rounded-full ${badgeColor(lesson.status)} text-xs sm:text-sm`}>
                      {lesson.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">{lesson.createdAt}</td>
                  <td className="px-3 sm:px-4 py-2 flex gap-2 text-xs sm:text-sm">
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <HiOutlineEye className="cursor-pointer text-gray-600" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <HiOutlinePencil
                        className="cursor-pointer text-indigo-600"
                        onClick={() => handleEdit(lesson.id)}
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <HiOutlineTrash
                        className="cursor-pointer text-red-600"
                        onClick={() => { setConfirmOpen(true); setDeleting(lesson.id); }}
                      />
                    </motion.div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/40" onClick={() => setConfirmOpen(false)} />
            <motion.div className="relative bg-white rounded-2xl p-4 sm:p-6 shadow-xl max-w-md w-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <h3 className="text-base sm:text-lg font-semibold">Delete Lesson?</h3>
              <p className="mt-2 text-gray-500 text-xs sm:text-sm">This action will permanently remove the lesson.</p>
              <div className="flex justify-end gap-2 mt-4">
                <button className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-100 rounded-md text-xs sm:text-sm" onClick={() => setConfirmOpen(false)}>Cancel</button>
                <button className="px-3 sm:px-4 py-1 sm:py-2 bg-red-600 text-white rounded-md text-xs sm:text-sm" onClick={() => handleDelete(deleting)}>Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {editing !== null && (
          <motion.div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/40" onClick={closeEdit} />
            <motion.div className="relative bg-white rounded-2xl p-4 sm:p-6 shadow-xl max-w-md w-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <h3 className="text-base sm:text-lg font-semibold">Edit Lesson (Static)</h3>
              <p className="mt-2 text-gray-500 text-xs sm:text-sm">Form pre-filled with lesson info (static).</p>
              <div className="flex justify-end gap-2 mt-4">
                <button className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-100 rounded-md text-xs sm:text-sm" onClick={closeEdit}>Close</button>
                <button className="px-3 sm:px-4 py-1 sm:py-2 bg-indigo-600 text-white rounded-md text-xs sm:text-sm">Save</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyLessons;
