import React, { useState } from "react";
import { motion } from "framer-motion";

const sampleUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "User", lessons: 3 },
  { id: 2, name: "Alice Smith", email: "alice@example.com", role: "Admin", lessons: 10 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", lessons: 5 },
];

const ManageUsers = () => {
  const [users, setUsers] = useState(sampleUsers);

  const toggleRole = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, role: user.role === "User" ? "Admin" : "User" }
          : user
      )
    );
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <motion.div
            key={user.id}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">
                Email: <span className="font-medium">{user.email}</span>
              </p>
              <p className="text-gray-500">
                Role:{" "}
                <span
                  className={`font-medium px-2 py-1 rounded ${
                    user.role === "Admin" ? "bg-yellow-400 text-white" : "bg-blue-400 text-white"
                  }`}
                >
                  {user.role}
                </span>
              </p>
              <p className="text-gray-500">
                Total Lessons: <span className="font-medium">{user.lessons}</span>
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                  user.role === "Admin" ? "bg-blue-500 hover:bg-blue-600" : "bg-yellow-500 hover:bg-yellow-600"
                }`}
                onClick={() => toggleRole(user.id)}
              >
                {user.role === "Admin" ? "Demote to User" : "Promote to Admin"}
              </button>

              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                onClick={() => deleteUser(user.id)}
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

export default ManageUsers;
