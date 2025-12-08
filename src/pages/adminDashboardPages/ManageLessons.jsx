import React from "react";

const ManageLessons = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Manage Lessons</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Creator</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Visibility</th>
              <th className="px-4 py-2">Flags</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">Lesson 1</td>
              <td className="px-4 py-2">John Doe</td>
              <td className="px-4 py-2">Motivation</td>
              <td className="px-4 py-2">Public</td>
              <td className="px-4 py-2">0</td>
              <td className="px-4 py-2">Edit / Delete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLessons;
