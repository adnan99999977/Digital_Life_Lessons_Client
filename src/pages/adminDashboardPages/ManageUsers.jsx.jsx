import React from "react";

const ManageUsers = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Total Lessons</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map users here */}
            <tr>
              <td className="px-4 py-2">John Doe</td>
              <td className="px-4 py-2">john@example.com</td>
              <td className="px-4 py-2">User</td>
              <td className="px-4 py-2">3</td>
              <td className="px-4 py-2">Edit / Delete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
