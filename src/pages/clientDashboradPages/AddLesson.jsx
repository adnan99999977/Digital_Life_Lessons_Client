import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AddLesson = () => {
  const { userDB } = useContext(AuthContext);
  const isPremium = userDB?.isPremium;

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
          <form className="space-y-8">
            {/* Title */}
            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Lesson Title
              </label>
              <input
                type="text"
                placeholder="The hard truth I learned too late"
                className="w-full rounded-xl border border-gray-200 p-4 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Your Story
              </label>
              <textarea
                placeholder="Write honestly. This is where the magic happens..."
                className="w-full rounded-xl border border-gray-200 p-4 min-h-[180px] focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              />
            </div>

            {/* Selects */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">
                  Category
                </label>
                <select className="w-full rounded-xl border p-4">
                  <option>Personal Growth</option>
                  <option>Career</option>
                  <option>Relationships</option>
                  <option>Mindset</option>
                  <option>Mistakes Learned</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Emotional Tone
                </label>
                <select className="w-full rounded-xl border p-4">
                  <option>Motivational</option>
                  <option>Sad</option>
                  <option>Realization</option>
                  <option>Gratitude</option>
                </select>
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="block font-medium mb-2">
                Featured Image (Optional)
              </label>
              <input type="file" className="text-sm" />
            </div>

            {/* Visibility & Access */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">
                  Visibility
                </label>
                <select className="w-full rounded-xl border p-4">
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </div>

              <div className="relative">
                <label className="block font-medium mb-2 flex items-center gap-2">
                  Access Level
                  {!isPremium && <Lock size={16} className="text-red-500" />}
                </label>

                <select
                  disabled={!isPremium}
                  className={`w-full rounded-xl border p-4 ${
                    !isPremium &&
                    "bg-gray-100 cursor-not-allowed text-gray-400"
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
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg"
            >
              Publish Lesson 🚀
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddLesson;
