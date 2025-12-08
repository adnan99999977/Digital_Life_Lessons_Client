import React from "react";

const ReportedLessons = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Reported / Flagged Lessons</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Lesson Title</th>
              <th className="px-4 py-2">Report Count</th>
              <th className="px-4 py-2">Reasons</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">Lesson 1</td>
              <td className="px-4 py-2">2</td>
              <td className="px-4 py-2">Inappropriate Content</td>
              <td className="px-4 py-2">Ignore / Delete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedLessons;
