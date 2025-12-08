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
    <div className="max-w-7xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">Manage Users</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <motion.div
            key={user.id}
            className="relative overflow-hidden rounded-3xl p-6 flex flex-col justify-between bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-xl border border-white/30 shadow-2xl hover:shadow-indigo-300/30 transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-600 text-sm">
                Email: <span className="font-medium text-gray-800">{user.email}</span>
              </p>
              <p className="text-gray-600 text-sm">
                Role:{" "}
                <span
                  className={`font-medium px-3 py-1 rounded-full text-sm ${
                    user.role === "Admin"
                      ? "bg-yellow-400 text-white shadow-md"
                      : "bg-blue-400 text-white shadow-md"
                  }`}
                >
                  {user.role}
                </span>
              </p>
              <p className="text-gray-600 text-sm">
                Total Lessons: <span className="font-medium text-gray-800">{user.lessons}</span>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className={`px-5 py-2 rounded-2xl font-medium text-white transition-all duration-300 ${
                  user.role === "Admin"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-md"
                    : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-md"
                }`}
                onClick={() => toggleRole(user.id)}
              >
                {user.role === "Admin" ? "Demote to User" : "Promote to Admin"}
              </button>

              <button
                className="px-5 py-2 rounded-2xl bg-red-500 text-white hover:bg-red-600 transition-all duration-300 shadow-md font-medium"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </div>

            {/* subtle neon glow overlay */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.05 }}
              transition={{ duration: 0.4 }}
              style={{
                background: "radial-gradient(circle at top left, rgba(99,102,241,0.1), transparent 70%)",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
