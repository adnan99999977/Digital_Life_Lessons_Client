import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import axiosApi from "../api/axiosInstansce";
import { Lock } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";

/* ================= API ================= */
const getLessonDetails = async (id) => {
  const res = await axiosApi.get(`/lessons/${id}`);
  return res.data;
};

/* ================= STATIC RELATED LESSONS ================= */
const relatedLessonsMock = [
  {
    _id: "1",
    title: "Personal Growth Tip 1",
    category: "Personal Growth",
    emotionalTone: "Motivational",
    userImage: "/default-lesson.png",
  },
  {
    _id: "2",
    title: "Career Advice 101",
    category: "Career",
    emotionalTone: "Motivational",
    userImage: "/default-lesson.png",
  },
  {
    _id: "3",
    title: "Relationship Wisdom",
    category: "Relationships",
    emotionalTone: "Realization",
    userImage: "/default-lesson.png",
  },
  {
    _id: "4",
    title: "Mindset Mastery",
    category: "Mindset",
    emotionalTone: "Motivational",
    userImage: "/default-lesson.png",
  },
  {
    _id: "5",
    title: "Lessons Learned",
    category: "Mistakes Learned",
    emotionalTone: "Gratitude",
    userImage: "/default-lesson.png",
  },
  {
    _id: "6",
    title: "Self Reflection",
    category: "Personal Growth",
    emotionalTone: "Sad",
    userImage: "/default-lesson.png",
  },
];

const PublicLessonsDetails = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  /* ================= FETCH USER ================= */
  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser) return;
      try {
        const res = await axiosApi.get("/users", {
          params: { email: currentUser.email },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, [currentUser]);

  /* ================= FETCH LESSON ================= */
  const {
    data: lesson,
    isLoading: lessonLoading,
    isError: lessonError,
  } = useQuery({
    queryKey: ["lesson", id],
    queryFn: () => getLessonDetails(id),
    enabled: !!id,
  });

  /* ================= LOADING / ERROR ================= */
  if (lessonLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">
        Loading lesson...
      </div>
    );
  }
  if (lessonError || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Lesson not found
      </div>
    );
  }

  /* ================= LOCK CHECK ================= */
  const isLocked = lesson.accessLevel === "Free" && !user.isPremium;

  /* ================= STATIC ENGAGEMENT ================= */
  const likesCount = lesson.likesCount || 1200;
  const favoritesCount = lesson.favoritesCount || 342;
  const viewsCount = lesson.viewsCount || Math.floor(Math.random() * 10000);

  /* ================= STATIC COMMENTS ================= */
  const commentsMock = [
    { id: 1, user: "Alice", text: "Great lesson! Learned a lot." },
    { id: 2, user: "Bob", text: "This is so motivational." },
    { id: 3, user: "Charlie", text: "Loved the insights here." },
  ];

  /* ================= INTERACTION HANDLERS ================= */
  const handleLike = () => alert("Like toggled (mock)");
  const handleFavorite = () => alert("Favorite toggled (mock)");
  const handleReport = () => alert("Reported (mock)");
  const handleShare = () => alert("Shared (mock)");

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {isLocked ? (
        /* ================= LOCKED VIEW ================= */
        <div className="relative rounded-2xl shadow-xl overflow-hidden">
          <img
            src={lesson.userImage || "/default-lesson.png"}
            alt={lesson.title}
            className="w-full h-72 object-cover blur-md brightness-75"
          />
          <div className=" p-10 blur-[4px] gap-3 pt-4 border-t">
            <img
              src={lesson.creatorPhotoURL || "/default-avatar.png"}
              alt={lesson.creatorName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <h1 className="text-3xl  brightness-75 font-extrabold text-gray-900">
              {lesson.title}
            </h1>
            <p className="text-gray-700  brightness-75 leading-relaxed">
              {lesson.description}
            </p>
          </div>

          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-6">
            <Lock size={40} className="mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              Lesson is locked because your are not a Premium user
            </h2>
            <p className="mb-6 text-sm text-gray-200">
              To read this full lesson, you need a premium account.
            </p>
            <Link
              to="/dashboard/pricing"
              className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition"
            >
              Upgrade to Premium
            </Link>
          </div>
        </div>
      ) : (
        /* ================= UNLOCKED VIEW ================= */
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <img
            src={lesson.userImage || "/default-lesson.png"}
            alt={lesson.title}
            className="w-full h-72 object-cover"
          />
          <div className="p-6 space-y-5">
            <h1 className="text-3xl font-extrabold text-gray-900">
              {lesson.title}
            </h1>
            <p className="text-gray-700 leading-relaxed">
              {lesson.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span>📌 {lesson.category}</span>
              <span>🎭 {lesson.emotionalTone}</span>
              <span>
                🗓 Created: {new Date(lesson.createdAt).toLocaleDateString()}
              </span>
              <span>🗓 Last Updated: {lesson.updatedAt || "N/A"}</span>
              <span>👁 Visibility: Public</span>
              <span>⏱ Estimated Reading: 5 min</span>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t">
              <img
                src={lesson.creatorPhotoURL || "/default-avatar.png"}
                alt={lesson.creatorName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{lesson.creatorName}</p>
                <p className="text-xs text-gray-500">{lesson.creatorEmail}</p>
                <p className="text-xs text-gray-400">Total Lessons: 12</p>
                <Link
                  to={`/author/${lesson.creatorId}`}
                  className="text-blue-500 text-xs hover:underline"
                >
                  View all lessons by this author
                </Link>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button onClick={handleLike}>❤️ {likesCount}</button>
              <button onClick={handleFavorite}>🔖 {favoritesCount}</button>
              <span>👀 {viewsCount}</span>
              <button onClick={handleReport} className="text-red-500 ml-auto">
                🚩 Report
              </button>
              <button onClick={handleShare} className="ml-2">
                🔗 Share
              </button>
            </div>

            <div className="pt-6 border-t space-y-3">
              <h2 className="font-semibold text-lg">Comments</h2>
              {commentsMock.map((c) => (
                <div key={c.id} className="bg-gray-100 p-2 rounded">
                  <p className="text-sm font-semibold">{c.user}</p>
                  <p className="text-gray-700 text-sm">{c.text}</p>
                </div>
              ))}
              <textarea
                placeholder="Write a comment..."
                className="w-full border p-2 rounded mt-2"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded mt-2">
                Post Comment
              </button>
            </div>

            <div className="pt-6 border-t">
              <h2 className="font-semibold text-lg mb-4">Related Lessons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedLessonsMock.map((l) => (
                  <Link
                    to={`/public-lessons-details/${l._id}`}
                    key={l._id}
                    className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
                  >
                    <img
                      src={l.userImage}
                      alt={l.title}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-3">
                      <p className="font-semibold">{l.title}</p>
                      <p className="text-xs text-gray-500">{l.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicLessonsDetails;
