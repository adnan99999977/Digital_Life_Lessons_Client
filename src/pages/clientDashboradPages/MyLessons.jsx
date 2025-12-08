import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiSparkles,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const sampleLessons = [
  {
    id: 1,
    title: "Overcoming Fear",
    category: "Personal Growth",
    access: "Premium",
    status: "Published",
    createdAt: "2025-08-12",
  },
  {
    id: 2,
    title: "Lessons from Failure",
    category: "Mindset",
    access: "Public",
    status: "Pending Review",
    createdAt: "2025-08-05",
  },
  {
    id: 3,
    title: "Time Mastery 101",
    category: "Productivity",
    access: "Public",
    status: "Published",
    createdAt: "2025-07-28",
  },
];

const statTargets = {
  total: sampleLessons.length,
  public: sampleLessons.filter((s) => s.access === "Public").length,
  premium: sampleLessons.filter((s) => s.access === "Premium").length,
};
 

const AnimatedNumber = ({ value, duration = 800, className = "" }) => {
  const [num, setNum] = useState(0);
  useEffect(() => {
    let start = 0;
    const diff = value - start;
    if (diff === 0) return setNum(value);
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setNum(Math.floor(start + diff * progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <span className={className}>{num}</span>;
};

const badgeColor = (type) => {
  if (type === "Published") return "bg-green-100 text-green-700";
  if (type === "Pending Review") return "bg-yellow-100 text-yellow-800";
  return "bg-gray-100 text-gray-700";
};

const MyLessons = () => {
  const [lessons, setLessons] = useState(sampleLessons);
  const [activeRow, setActiveRow] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const handleDelete = (id) => {
    setDeleting(id);
    // simulate API delay
    setTimeout(() => {
      setLessons((prev) => prev.filter((l) => l.id !== id));
      setConfirmOpen(false);
      setDeleting(null);
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            My Lessons
          </h1>
          <p className="mt-1 text-gray-500 max-w-xl">
            Manage your life lessons — publish, update, or remove. Track
            performance and spotlight premium content.
          </p>
        </div>

        {/* Action CTA */}
        <div className="flex items-center gap-3">
         <Link to={'/dashboard/add-lesson'}>
          <button
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:scale-105 active:scale-95 transition transform"
            title="Create new lesson"
          >
            <HiSparkles className="w-5 h-5" />
            New Lesson
          </button></Link>
        </div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
      >
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <p className="text-sm text-gray-500">Total Lessons</p>
          <div className="mt-2 flex items-end gap-2">
            <AnimatedNumber value={statTargets.total} className="text-3xl font-bold text-indigo-600" />
            <span className="text-sm text-gray-400">items</span>
          </div>
          <p className="mt-3 text-xs text-gray-400">Quick overview of your content</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <p className="text-sm text-gray-500">Public Lessons</p>
          <div className="mt-2 flex items-end gap-2">
            <AnimatedNumber value={statTargets.public} className="text-3xl font-bold text-green-600" />
            <span className="text-sm text-gray-400">visible</span>
          </div>
          <p className="mt-3 text-xs text-gray-400">Accessible to all visitors</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <p className="text-sm text-gray-500">Premium Lessons</p>
          <div className="mt-2 flex items-end gap-2">
            <AnimatedNumber value={statTargets.premium} className="text-3xl font-bold text-purple-600" />
            <span className="text-sm text-gray-400">locked</span>
          </div>
          <p className="mt-3 text-xs text-gray-400">Require upgrade to view</p>
        </div>
      </motion.div>

      {/* Table / Cards */}
      <div className="bg-transparent">
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gradient-to-r from-gray-50 to-white border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Title</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Category</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">Access</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">Status</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">Created</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence initial={false}>
                {lessons.map((lesson, idx) => (
                  <motion.tr
                    key={lesson.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: idx * 0.04, type: "spring", stiffness: 200, damping: 22 }}
                    onMouseEnter={() => setActiveRow(lesson.id)}
                    onMouseLeave={() => setActiveRow(null)}
                    className={`border-b last:border-b-0 ${activeRow === lesson.id ? "bg-indigo-50/40" : "bg-white"}`}
                  >
                    <td className="px-6 py-4 align-middle">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">{lesson.title}</span>
                        <span className="text-xs text-gray-400">ID: {lesson.id}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 align-middle text-gray-600">{lesson.category}</td>

                    <td className="px-6 py-4 align-middle text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${lesson.access === "Premium" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                        {lesson.access}
                      </span>
                    </td>

                    <td className="px-6 py-4 align-middle text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeColor(lesson.status)}`}>
                        {lesson.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 align-middle text-center text-sm text-gray-500">
                      {lesson.createdAt}
                    </td>

                    <td className="px-6 py-4 align-middle text-center">
                      <div className="inline-flex items-center gap-2">
                        <button
                          title="View"
                          className="p-2 rounded-lg hover:bg-gray-100 transition"
                        >
                          <HiOutlineEye className="w-5 h-5 text-gray-600" />
                        </button>

                        <button
                          title="Edit"
                          className="p-2 rounded-lg hover:bg-indigo-50 transition"
                        >
                          <HiOutlinePencil className="w-5 h-5 text-indigo-600" />
                        </button>

                        <button
                          title="Delete"
                          onClick={() => { setConfirmOpen(true); setDeleting(lesson.id); }}
                          className="p-2 rounded-lg hover:bg-red-50 transition"
                        >
                          <HiOutlineTrash className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm modal (simple) */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setConfirmOpen(false)} />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-10 bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
            >
              <h3 className="text-lg font-semibold">Delete Lesson?</h3>
              <p className="mt-2 text-sm text-gray-500">This action will permanently remove the lesson. Are you sure?</p>

              <div className="mt-5 flex justify-end gap-3">
                <button onClick={() => setConfirmOpen(false)} className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200">
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleting)}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  {deleting === null ? "Delete" : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyLessons;
