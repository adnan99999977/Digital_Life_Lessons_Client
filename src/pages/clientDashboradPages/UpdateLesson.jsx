import React, { useState } from "react";

const UpdateLesson = () => {
  // Static / initial data (mock)
  const [lessonData, setLessonData] = useState({
    title: "My First Life Lesson",
    description:
      "This is a detailed description of my first lesson about personal growth.",
    category: "Personal Growth",
    emotionalTone: "Motivational",
    visibility: "Public",
    accessLevel: "Free",
    image: null,
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setLessonData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Placeholder: Api call diye DB update korte hobe
    alert("Lesson Updated Successfully (static)");
    console.log(lessonData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold">Update Lesson</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Lesson Title</label>
          <input
            type="text"
            name="title"
            value={lessonData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={lessonData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded h-32"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            name="category"
            value={lessonData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Personal Growth</option>
            <option>Career</option>
            <option>Relationships</option>
            <option>Mindset</option>
            <option>Mistakes Learned</option>
          </select>
        </div>

        {/* Emotional Tone */}
        <div>
          <label className="block font-semibold mb-1">Emotional Tone</label>
          <select
            name="emotionalTone"
            value={lessonData.emotionalTone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Motivational</option>
            <option>Sad</option>
            <option>Realization</option>
            <option>Gratitude</option>
          </select>
        </div>

        {/* Visibility */}
        <div>
          <label className="block font-semibold mb-1">Visibility</label>
          <select
            name="visibility"
            value={lessonData.visibility}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>

        {/* Access Level */}
        <div>
          <label className="block font-semibold mb-1">Access Level</label>
          <select
            name="accessLevel"
            value={lessonData.accessLevel}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Free</option>
            <option>Premium</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-1">Upload Image (optional)</label>
          <input type="file" onChange={handleImageChange} />
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Update Lesson
        </button>
      </form>
    </div>
  );
};

export default UpdateLesson;
