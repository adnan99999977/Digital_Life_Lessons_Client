import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useForm } from "react-hook-form";
import axiosApi from "../../api/axiosInstansce";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AddLesson = () => {
  const { user } = useContext(AuthContext);
  const { uid, displayName, email, photoURL } = user;
  const [imageURL, setImageURL] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("Choose a image");
  const isPremium = user?.isPremium;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  // ten stack

  const addLessonMutation = useMutation({
    mutationFn: async (lessonData) => {
      const res = await axiosApi.post("/lessons", lessonData);
      return res.data;
    },

    onSuccess: () => {
      // lesson list auto reload হবে
      queryClient.invalidateQueries(["lessons"]);
      queryClient.invalidateQueries(["myLessons"]);

      alert("Lesson added successfully ✅");
    },

    onError: (error) => {
      alert(error.message || "Failed to add lesson ❌");
    },
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "DLLimages");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dd1sxbdgc/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();
      setImageURL(data.secure_url);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAdd = async (data) => {
    if (!imageURL) {
      alert("Please upload an image");
      return;
    }

    const lessonData = {
      ...data,

      // image
      userImage: imageURL || "",

      // creator info
      creatorId: uid, // firebase uid
      creatorName: displayName,
      creatorEmail: email,
      creatorPhotoURL: photoURL,

      // engagement
      likes: [],
      likesCount: 0,
      favorites: [],
      viewsCount: 0,

      // moderation
      comments: [],
      reports: [],

      // timestamps
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addLessonMutation.mutate(lessonData);
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeUp}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex justify-center px-4 py-14"
    >
      <div className="w-full max-w-5xl">
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Create a Life Lesson
          </h1>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Turn your experiences into wisdom others can learn from.
          </p>
        </motion.div>

        {/* Glass Card */}
        <motion.div
          variants={fadeUp}
          className="backdrop-blur-xl bg-white/70 border border-white/30 shadow-2xl rounded-3xl p-8 md:p-10"
        >
          <form onSubmit={handleSubmit(handleAdd)} className="space-y-8">
            {/* Title */}
            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Lesson Titles <span className="text-bold text-red-800">*</span>
              </label>
              <input
                type="text"
                {...register("title", {
                  required: "Lesson title is required",
                })}
                placeholder="The hard truth I learned too late"
                className="w-full rounded-xl border border-gray-200 p-4 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Your Story <span className="text-bold text-red-800">*</span>
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Write honestly. This is where the magic happens..."
                className="w-full rounded-xl border border-gray-200 p-4 min-h-[180px] focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Selects*/}
            <div className="grid md:grid-cols-2 gap-6">
              {/* category */}
              <div>
                <label className="block font-medium mb-2">
                  Category
                  <span className="text-bold text-red-800">*</span>
                </label>
                <select
                  {...register("emotionalTone", {
                    required: "Emotional tone is required",
                  })}
                  className="w-full rounded-xl border p-4"
                >
                  <option value="">Select tone</option>
                  <option>Motivational</option>
                  <option>Sad</option>
                  <option>Realization</option>
                  <option>Gratitude</option>
                </select>
              </div>

              {/* emotional tone */}
              <div>
                <label className="block font-medium mb-2">
                  Emotional Tone{" "}
                  <span className="text-bold text-red-800">*</span>
                </label>
                <select
                  {...register("emotionalTone", { required: true })}
                  className="w-full rounded-xl border p-4"
                >
                  <option>Motivational</option>
                  <option>Sad</option>
                  <option>Realization</option>
                  <option>Gratitude</option>
                </select>
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="block font-medium mb-2">Featured Image  <span className="text-bold text-red-800">*</span></label>
              <input
                type="file"
                {...register("userImage", { required: true })}
                accept="image/*"
                className="hidden"
                id="profileImage"
                onChange={handleFileChange}
              />

              <div
                className="flex items-center gap-4 p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => document.getElementById("profileImage").click()}
              >
                <span className="text-gray-700 truncate">{fileName}</span>
              </div>
            </div>

            {/* Visibility & Access */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">Visibility
                   <span className="text-bold text-red-800">*</span>
                </label>
                <select
                  {...register("visibility", {
                    required: "Visibility is required",
                  })}
                  className="w-full rounded-xl border p-4"
                >
                  <option value="">Select visibility</option>
                  <option>Public</option>
                  <option>Private</option>
                </select>

                {errors.visibility && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.visibility.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block font-medium mb-2 flex items-center gap-2">
                  Access Level
                  {!isPremium && <Lock size={16} className="text-red-500" />}
                </label>

                <select
                  {...register("accessLevel")}
                  disabled={!isPremium}
                  className={`w-full rounded-xl border p-4 ${
                    !isPremium && "bg-gray-100 cursor-not-allowed text-gray-400"
                  }`}
                >
                  <option>Free</option>
                  <option>Premium</option>
                </select>

                {!isPremium && (
                  <p className="text-xs text-red-500 mt-2">
                    Premium users can create premium lessons ⭐
                  </p>
                )}
              </div>
            </div>

            {/* CTA */}
            <motion.button
              type="submit"
              disabled={addLessonMutation.isLoading || isUploading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg disabled:opacity-60"
            >
              {addLessonMutation.isLoading
                ? "Publishing..."
                : "Publish Lesson 🚀"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddLesson;
