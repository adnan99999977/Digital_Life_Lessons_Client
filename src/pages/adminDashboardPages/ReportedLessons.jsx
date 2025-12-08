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
  const [modalData, setModalData] = useState(null);

  const openModal = (lesson) => setModalData(lesson);
  const closeModal = () => setModalData(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      console.log("Deleted lesson id:", id);
      // implement delete logic here
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Reported / Flagged Lessons</h1>

      <div className=" bg-white shadow rounded-lg">
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
            {sampleData.map((lesson) => (
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
                  >
                    View Reasons
                  </button>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                    onClick={() => console.log("Ignored", lesson.id)}
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
              <ul className="space-y-2">
                {modalData.reasons.map((r, idx) => (
                  <li key={idx} className="border-b pb-2">
                    <span className="font-semibold">{r.user}:</span> {r.reason}
                  </li>
                ))}
              </ul>
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
