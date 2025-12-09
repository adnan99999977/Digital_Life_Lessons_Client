import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sampleData = [
  {
    id: 1,
    title: "React Basics",
    reports: 3,
    reasons: [
      { user: "John Doe", reason: "Inappropriate Content" },
      { user: "Jane Smith", reason: "Spam" },
      { user: "Alice", reason: "Misleading Info" },
    ],
  },
  {
    id: 2,
    title: "Node.js Advanced",
    reports: 2,
    reasons: [
      { user: "Bob", reason: "Inaccurate Info" },
      { user: "Charlie", reason: "Offensive Language" },
    ],
  },
];

const ReportedLessons = () => {
  const [lessons, setLessons] = useState(sampleData);
  const [modalData, setModalData] = useState(null);

  const openModal = (lesson) => setModalData(lesson);
  const closeModal = () => setModalData(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      setLessons(lessons.filter((lesson) => lesson.id !== id));
    }
  };

  const handleIgnore = (id) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === id ? { ...lesson, reports: 0, reasons: [] } : lesson
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Reported / Flagged Lessons
      </h1>

      {/* Admin badge simulation */}
      <p className="text-center text-sm text-gray-500">
        Logged in as <span className="font-semibold text-indigo-600">Admin</span>
      </p>

      {lessons.length === 0 ? (
        <div className="text-center py-10 text-gray-500 font-medium">
          No reported lessons found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Lesson Title
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Reports
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Reasons
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {lessons.map((lesson) => (
                <motion.tr
                  key={lesson.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="px-6 py-4">{lesson.title}</td>
                  <td className="px-6 py-4 text-center font-semibold text-red-600">
                    {lesson.reports}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                      onClick={() => openModal(lesson)}
                      disabled={lesson.reports === 0}
                    >
                      {lesson.reports === 0 ? "No Reports" : "View Reasons"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                      onClick={() => handleIgnore(lesson.id)}
                      disabled={lesson.reports === 0}
                    >
                      Ignore
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      onClick={() => handleDelete(lesson.id)}
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalData && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl w-11/12 md:w-1/2 shadow-lg max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold mb-4">{modalData.title} - Reports</h2>
              {modalData.reasons.length === 0 ? (
                <p className="text-gray-500 font-medium">No reports for this lesson.</p>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                        Reporter
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                        Reason
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {modalData.reasons.map((r, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2">{r.user}</td>
                        <td className="px-4 py-2">{r.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                onClick={closeModal}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportedLessons;
