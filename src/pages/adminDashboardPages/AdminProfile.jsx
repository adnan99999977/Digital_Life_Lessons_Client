import React from "react";

const AdminProfile = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Profile</h1>
      <div className="bg-white p-6 shadow rounded-lg space-y-4">
        <p><strong>Name:</strong> Admin</p>
        <p><strong>Email:</strong> admin@example.com</p>
        <p><strong>Profile Photo:</strong></p>
        <img
          src="/default-avatar.png"
          alt="Admin Avatar"
          className="w-32 h-32 rounded-full object-cover"
        />
        <button className="btn btn-blue mt-4">Update Profile</button>
      </div>
    </div>
  );
};

export default AdminProfile;
