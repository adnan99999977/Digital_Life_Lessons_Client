import React, { useContext, useEffect, useState } from "react";
import axiosApi from "../../api/axiosInstansce";
import { AuthContext } from "../../auth/AuthContext";
import LoadingPage from "../../components/shared/LoadingPage";



const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const {loading} = useContext(AuthContext)
  

  useEffect(() => {
    const getUsers = async () => {
      const users = await axiosApi.get("/users");
      setUsers(users.data)
    };
    getUsers()
  }, []);

  // Toggle user role
  const toggleRole = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, role: user.role === "User" ? "Admin" : "User" }
          : user
      )
    );
  };

  // Delete user
  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  if(loading){
    <div>
      <LoadingPage/>
    </div>
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
        Manage Users
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-gray-600 font-medium">
                Name
              </th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium">
                Email
              </th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium">
                Role
              </th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium">
                Total Lessons
              </th>
              <th className="text-center px-6 py-3 text-gray-600 font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white font-medium text-sm ${
                      user.role === "Admin"
                        ? "bg-yellow-500 shadow"
                        : "bg-blue-500 shadow"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">{user.lessons}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    className={`px-3 py-1 rounded-lg text-white font-medium text-sm transition-colors duration-300 ${
                      user.role === "Admin"
                        ? "bg-indigo-500 hover:bg-indigo-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() => toggleRole(user.id)}
                  >
                    {user.role === "Admin"
                      ? "Demote to User"
                      : "Promote to Admin"}
                  </button>

                  <button
                    className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium text-sm transition-colors duration-300"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
