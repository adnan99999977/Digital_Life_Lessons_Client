import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import axiosApi from "../api/axiosInstansce";
import { Lock } from "lucide-react";
import { useState } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import LoadingPage from "../components/shared/LoadingPage";
import { Heart, Bookmark, Eye, Flag, Share2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

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
  const { user } = useCurrentUser();
  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };
  const [comment, setComment] = useState("");

  console.log(user);

  // get all comment
  const fetchComments = async () => {
    const res = await axiosApi.get(`/comments?lessonId=${id}`);
    return res.data;
  };
  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: fetchComments,
    enabled: !!id,
  });

  // comment handle
  const handleComments = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const data = {
      lessonId: id,
      userId: user._id,
      userName: user.userName,
      userImage: user.userImage,
      commentText: comment,
      createdAt: new Date(),
    };
    addCommentMutation.mutate(data);
  };

  // all mutations
  const queryClient = useQueryClient();
  const addCommentMutation = useMutation({
    mutationFn: (commentData) => axiosApi.post("/comments", commentData),
    onSuccess: () => {
      setComment("");
      queryClient.invalidateQueries(["comments", id]);
    },
  });
  const likeMutation = useMutation({
    mutationFn: (lessonId) => axiosApi.patch(`/lessons/${lessonId}/like`),
    onSuccess: () => {
      // refetch lesson to update likes count
      queryClient.invalidateQueries(["lesson", id]);
    },
    onError: (err) => {
      console.error("Failed to like lesson:", err);
      alert("Failed to like lesson");
    },
  });
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
      <div>
        <LoadingPage />
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
  const favoritesCount = lesson.favoritesCount || 342;
  const viewsCount = lesson.viewsCount || Math.floor(Math.random() * 10000);

  /* ================= INTERACTION HANDLERS ================= */
  // favorite item handle
  const handleFavorite = async () => {
    try {
      const data = {
        userId: user._id,
        userEmail: user.email,
        lessonId: id,
        lessonTitle: lesson.title,
        lessonCategory: lesson.category,
        lessonTone: lesson.emotionalTone,
        createdAt: new Date().toISOString(),
      };
      if (user.userName === lesson.creatorName) {
        return alert("its already your added lesson");
      }
      const res = await axiosApi.post("/favorites", data);
      if (res.status === 201) {
        alert("Added to favorites!");
      }
    } catch (err) {
      console.error("Failed to add favorite:", err);
      alert("Could not add favorite.");
    }
  };

  // handle report
  const handleReport = async () => {
    const { value: reason } = await Swal.fire({
      title: "Report this lesson",
      input: "select",
      inputOptions: {
        "Inappropriate Content": "Inappropriate Content",
        "Hate Speech or Harassment": "Hate Speech or Harassment",
        "Misleading or False Information": "Misleading or False Information",
        "Spam or Promotional Content": "Spam or Promotional Content",
        "Sensitive or Disturbing Content": "Sensitive or Disturbing Content",
        Other: "Other",
      },
      inputPlaceholder: "Select a reason",
      showCancelButton: true,
    });

    if (reason) {
      try {
        const reportData = {
          lessonId: id,
          reporterUserId: user._id,
          reportUserName: user.userName,
          reason,
          timestamp: new Date().toISOString(),
        };
        await axiosApi.post("/lessonsReports", reportData);
        Swal.fire({
          icon: "success",
          title: "Reported!",
          text: "Thank you for reporting. We will review it soon.",
        });
      } catch (err) {
        console.error("Failed to report lesson:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to report this lesson.",
        });
      }
    }
  };

  // handle share
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
            {/* lesson meta data */}
            <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500">
              <span>📌 {lesson.category}</span>
              <span>🎭 {lesson.emotionalTone}</span>
              <span>
                🗓 Created: {new Date(lesson.createdAt).toLocaleDateString()}
              </span>
              <span>🗓 Last Updated: {formatDateTime(lesson.updatedAt)}</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </span>
              <span> Visibility: Public</span>
              <span>⏱ Estimated Reading: 5 min</span>
            </div>
            {/* creator info  */}
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
            {/* inspiration key */}
            <div className="flex flex-wrap items-center gap-5 pt-4 text-slate-500">
              {/* Like */}
              {/* Like */}
              <button
                onClick={() => likeMutation.mutate(id)}
                className="group flex items-center gap-1 cursor-pointer"
              >
                <Heart
                  className="
      size-6
      transition-all duration-300
      group-hover:text-red-500
      group-hover:fill-red-500/30
      group-hover:scale-110
    "
                />
                <span className="text-sm">{lesson.likesCount}</span>
              </button>

              {/* Favorite */}
              <button
                onClick={handleFavorite}
                className="group flex items-center gap-1 cursor-pointer"
              >
                <Bookmark
                  className="
        size-5
        transition-all duration-300
        group-hover:text-yellow-500
        group-hover:fill-yellow-400/30
        group-hover:scale-110
      "
                />
                <span className="text-sm">{favoritesCount}</span>
              </button>

              {/* Views */}
              <div className="group flex items-center gap-1 cursor-pointer">
                <Eye
                  className="size-5
                     transition-all duration-300
                     group-hover:text-blue-500
                     group-hover:scale-105  "
                />
                <span className="text-sm">{viewsCount}</span>
              </div>

              {/* Report */}
              <button
                onClick={handleReport}
                className="ml-auto group flex items-center gap-1 cursor-pointer"
              >
                <Flag
                  className="
        size-5
        transition-all duration-300
        group-hover:text-red-600
        group-hover:scale-110
      "
                />
                <span className="text-sm">Report</span>
              </button>

              {/* Share */}
              <button className="group flex items-center gap-1 cursor-pointer">
                <Share2
                  className="
        size-5
        transition-all duration-300
        group-hover:text-indigo-600
        group-hover:scale-110
      "
                />
                <span className="text-sm">Share</span>
              </button>
            </div>
            {/* comments */}
            <div className="pt-6 border-t space-y-3">
              <h2 className="font-semibold text-lg">Comments</h2>
              {commentsLoading ? (
                <div>
                  <LoadingPage />
                </div>
              ) : (
                comments.map((c) => (
                  <div key={c._id} className="bg-gray-100 p-2 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <img
                        src={c.userImage}
                        className="w-8 h-8 rounded-full"
                        alt=""
                      />
                      <p className="text-sm font-semibold">{c.userName}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-700 text-sm">{c.commentText}</p>
                      <p className="text-gray-600 pr-3 text-[12px]">
                        {formatDateTime(c.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <form onSubmit={handleComments}>
                <textarea
                  placeholder="Write a comment..."
                  className="w-full border p-2 rounded mt-2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 rounded mt-2"
                >
                  Send
                </button>
              </form>
            </div>
            {/* related lesson */}
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
