import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoadingPage from "../../components/shared/LoadingPage";
import useDbData from "../../hooks/useDbData";

const ManageLessons = () => {
  const { lessons: dbLessons, reports, loading } = useDbData();

  const [lessons, setLessons] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterVisibility, setFilterVisibility] = useState("");
  const [filterFlagged, setFilterFlagged] = useState(false);
  const [sortOption, setSortOption] = useState("newest");

  // On DB lessons change, add dynamic flag count
  useEffect(() => {
    if (dbLessons) {
      const lessonsWithFlags = dbLessons.map((lesson) => {
        const lessonReports = reports.filter((r) => r.lessonId === lesson._id);
        return { ...lesson, flags: reports.length };
      });
      setLessons(lessonsWithFlags);
    }
  }, [dbLessons, reports]);

  // DELETE LESSON
  const deleteLesson = (id) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      setLessons(lessons.filter((lesson) => lesson._id !== id));
    }
  };

  // TOGGLE FEATURE
   const toggleFeatured = (id) => {
    setLessons(
      lessons.map((lesson) =>
        lesson._id === id ? { ...lesson, featured: !lesson.featured } : lesson
      )
    );
  };

  // MARK REVIEWED
  const markReviewed = (id) => {
    setLessons(
      lessons.map((lesson) =>
        lesson._id === id ? { ...lesson, reviewed: true } : lesson
      )
    );
  };

  // FILTER & SORT
  const filteredLessons = lessons
    .filter((lesson) => (filterCategory ? lesson.category === filterCategory : true))
    .filter((lesson) => (filterVisibility ? lesson.visibility === filterVisibility : true))
    .filter((lesson) => (filterFlagged ? lesson.flags > 0 : true))
    .sort((a, b) => {
      if (sortOption === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOption === "mostFlagged") return b.flags - a.flags;
      return 0;
    });

  // STATS
  const stats = {
    publicLessons: lessons.filter((l) => l.visibility === "Public").length,
    privateLessons: lessons.filter((l) => l.visibility === "Private").length,
    flaggedLessons: lessons.length,
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Manage Lessons</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Public Lessons" value={stats.publicLessons} color="bg-green-200" />
        <StatCard label="Private Lessons" value={stats.privateLessons} color="bg-blue-200" />
        <StatCard label="Flagged Lessons" value={stats.flaggedLessons} color="bg-red-200" />
      </div>

      {/* FILTER & SORT */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <select
          className="border rounded-xl p-2"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Mindset</option>
          <option>Mistakes Learned</option>
        </select>

        <select
          className="border rounded-xl p-2"
          value={filterVisibility}
          onChange={(e) => setFilterVisibility(e.target.value)}
        >
          <option value="">All Visibilities</option>
          <option>Public</option>
          <option>Private</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filterFlagged}
            onChange={() => setFilterFlagged(!filterFlagged)}
          />
          Flagged Only
        </label>

        <select
          className="border rounded-xl p-2 ml-auto"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="mostFlagged">Most Flagged</option>
        </select>
      </div>

      {/* LESSON GRID */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <motion.div
            key={lesson._id}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{lesson.title}</h2>
              <p>Creator: <span className="font-medium">{lesson.creatorName}</span></p>
              <p>Category: <span className="font-medium">{lesson.category}</span></p>
              <p>Visibility: <span className="font-medium">{lesson.visibility}</span></p>
              <p>Flags: <span className="font-medium">{lesson.flags}</span></p>
              <p>Created: <span className="font-medium">{new Date(lesson.createdAt).toLocaleDateString()}</span></p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                  lesson.featured ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
                }`}
                onClick={() => toggleFeatured(lesson._id)}
              >
                {lesson.featured ? "Unfeature" : "Feature"}
              </button>

              <button
                className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                  lesson.reviewed ? "bg-green-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
                }`}
                onClick={() => markReviewed(lesson._id)}
                disabled={lesson.reviewed}
              >
                {lesson.reviewed ? "Reviewed" : "Mark Reviewed"}
              </button>

              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                onClick={() => deleteLesson(lesson._id)}
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className={`p-4 rounded-xl shadow-md text-center font-medium ${color}`}>
    <p className="text-gray-800 text-lg">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default ManageLessons;
