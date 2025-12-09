import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosApi from "../api/axiosInstansce";
import { useState } from "react";

const fetchLessonDetails = async (id) => {
  const res = await axiosApi.get(`/lessons/${id}`);
  return res.data;
};

export default function PrivateLessonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock user
  const user = { email: null, isPremium: false };

  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const { data: lesson, isLoading, isError } = useQuery({
    queryKey: ["lesson-details", id],
    queryFn: () => fetchLessonDetails(id),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="h-screen grid place-items-center text-lg font-medium">
        Loading lesson...
      </div>
    );

  if (isError || !lesson)
    return (
      <div className="h-screen grid place-items-center text-red-500">
        Failed to load lesson
      </div>
    );

  const isLocked =
    lesson.accessLevel === "Premium" && !user.isPremium;

  const handleLike = () => {
    if (!user?.email) {
      navigate("/login");
      return;
    }
    console.log("Liked");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">
      {/* ===== HERO ===== */}
      <section className="relative rounded-3xl overflow-hidden h-[420px]">
        <img
          src={lesson.userImage}
          className={`w-full h-full object-cover ${
            isLocked && "blur-md scale-105"
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-0 w-full p-10 text-white space-y-4">
          <span className="inline-block px-4 py-1 text-xs tracking-widest bg-white/20 rounded-full backdrop-blur">
            {lesson.category}
          </span>

          <h1 className="text-4xl font-bold leading-tight max-w-3xl">
            {lesson.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span>🎼 Tone: {lesson.tone}</span>
            <span>⏱ 5 min read</span>
            <span>👁 Public</span>
          </div>
        </div>
      </section>

      {/* ===== PREMIUM LOCK ===== */}
      {isLocked && (
        <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-[1px]">
          <div className="bg-white rounded-3xl p-12 text-center">
            <span className="text-6xl">👑</span>
            <h2 className="text-3xl font-bold mt-4">
              Premium Lesson
            </h2>
            <p className="text-gray-600 mt-3 max-w-md mx-auto">
              This lesson is part of our exclusive premium
              collection. Upgrade to unlock full access.
            </p>

            <Link
              to="/dashboard/pricing"
              className="inline-block mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:opacity-90 transition"
            >
              Upgrade Premium
            </Link>
          </div>
        </div>
      )}

      {/* ===== CONTENT ===== */}
      {!isLocked && (
        <>
          {/* DESCRIPTION */}
          <section className="bg-white rounded-3xl shadow-md p-10 max-w-4xl">
            <h2 className="text-2xl font-semibold mb-5">
              Lesson Story
            </h2>
            <p className="text-gray-700 leading-loose">
              {lesson.description}
            </p>
          </section>

          {/* AUTHOR */}
          <section className="bg-white shadow rounded-3xl p-8 flex items-center justify-between max-w-3xl">
            <div className="flex items-center gap-4">
              <img
                src={lesson.creatorPhotoURL}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-lg">
                  {lesson.creatorName}
                </p>
                <p className="text-sm text-gray-500">
                  Lesson Creator
                </p>
              </div>
            </div>

            <button className="px-6 py-2 rounded-xl border hover:bg-gray-100 transition">
              All lessons →
            </button>
          </section>

          {/* STATS */}
          <section className="grid sm:grid-cols-3 gap-6 max-w-4xl">
            <Stat
              icon="❤️"
              value={lesson.likesCount}
              label="Likes"
              gradient="from-pink-500 to-red-500"
            />
            <Stat
              icon="🔖"
              value={lesson.favoritesCount}
              label="Saved"
              gradient="from-yellow-500 to-orange-500"
            />
            <Stat
              icon="👀"
              value={lesson.viewsCount || 1200}
              label="Views"
              gradient="from-blue-500 to-indigo-500"
            />
          </section>

          {/* ACTIONS */}
          <section className="flex flex-wrap gap-4">
            <ActionBtn onClick={handleLike} text="Like ❤️" />
            <ActionBtn text="Save 🔖" />
            <ActionBtn
              text="Report 🚩"
              danger
              onClick={() => setShowReport(true)}
            />
            <ActionBtn text="Share 🔗" outline />
          </section>
        </>
      )}

      {/* ===== REPORT MODAL ===== */}
      {showReport && (
        <div className="fixed inset-0 bg-black/50 grid place-items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[420px] space-y-4">
            <h3 className="font-semibold text-lg">
              Report Lesson
            </h3>

            <select
              className="w-full border rounded-lg p-2"
              onChange={(e) => setReportReason(e.target.value)}
            >
              <option value="">Select reason</option>
              <option>Inappropriate Content</option>
              <option>Hate Speech</option>
              <option>Spam</option>
              <option>Misleading</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowReport(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== SMALL REUSABLE UI ===== */

function Stat({ icon, value, label, gradient }) {
  return (
    <div
      className={`rounded-2xl p-6 text-white bg-gradient-to-br ${gradient}`}
    >
      <p className="text-3xl">{icon}</p>
      <p className="text-2xl font-bold mt-2">
        {value}
      </p>
      <p className="text-sm opacity-90">{label}</p>
    </div>
  );
}

function ActionBtn({
  text,
  onClick,
  danger,
  outline,
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-medium transition
        ${
          danger
            ? "bg-red-500 text-white hover:bg-red-600"
            : outline
            ? "border hover:bg-gray-100"
            : "bg-black text-white hover:bg-gray-800"
        }`}
    >
      {text}
    </button>
  );
}
