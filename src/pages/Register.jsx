import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { useForm } from "react-hook-form";

const Register = () => {
  const [imageURL, setImageURL] = useState();
  const { user } = useContext(AuthContext);
  const [fileName, setFileName] = useState("Choose a profile image");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { signInViaGoogle } = useContext(AuthContext);

  const handleGoogle = async () => {
    const user = await signInViaGoogle();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "DLLimages");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dd1sxbdgc/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      setImageURL(data.secure_url);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const handleRegister = (data) => {
    const registrationData = {
      ...data,
      userImage: imageURL,
      role: "user",
      plan: "Free",
      isPremium: false,
      favorites: [],
      lessonsCreated: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log(registrationData);
  };
  const password = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-3">
      <div className="card w-full max-w-sm shadow-xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Create an Account
        </h2>
        <p className="text-center mb-4 text-base-content/70">
          Join Digital Life Lessons today
        </p>

        {/* Google Signup */}
        <button
          onClick={handleGoogle}
          className="btn w-full bg-white border shadow-sm mb-4"
        >
          <FcGoogle size={22} /> Continue with Google
        </button>

        <div className="divider">OR</div>

        <form onSubmit={handleSubmit(handleRegister)}>
          {/* Name */}
          <label className="form-control w-full mb-3">
            <div className="label">
              <span className="label-text font-medium">Full Name</span>
            </div>
            <input
              {...register("userName", {
                required: "Full name is required",
                minLength: { value: 5, message: "Minimum 5 characters" },
                maxLength: { value: 15, message: "Minimum 15 characters" },
                pattern: {
                  value: /^[A-Za-z]+([ '-][A-Za-z]+)*$/,
                  message:
                    "Only letters, spaces, hyphens or apostrophes allowed",
                },
              })}
              type="text"
              placeholder="Your full name"
              className="border border-gray-300 p-2 rounded-md w-full"
            />
            {errors.userName && (
              <p className="text-red-400">{errors.userName.message}</p>
            )}
          </label>

          {/* Email */}
          <label className="form-control w-full mb-3">
            <div className="label">
              <span className="label-text font-medium">Email</span>
            </div>
            <input
              {...register("email", {
                required: "Email is required",
                maxLength: {
                  value: 40,
                  message: "Maximum 40 characters allowed",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                },
              })}
              type="email"
              placeholder="you@example.com"
              className="border border-gray-300 p-2 rounded-md w-full"
            />
            {errors.email && (
              <p className="text-red-400">{errors.email.message}</p>
            )}
          </label>

          {/* Profile Picture */}
          <div className="w-full mb-3">
            <label className="label">
              <span className="label-text font-medium">Profile Picture</span>
            </label>

            <input
              type="file"
              {...register("userImage")}
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

          {/* Password */}
         <div>
           <label className="form-control w-full mb-3 relative">
            <div className="relative">
              <span className="label-text text-gray-600 font-medium">Password</span>
            </div>

            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
                maxLength: { value: 30, message: "Maximum 30 characters" },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,30}$/,
                  message:
                    "Password must contain uppercase, lowercase, number and special character",
                },
              })}
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              className="border border-gray-300 p-2 rounded-md w-full pr-12"
            />
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}

            <div
              className="absolute right-3 top-[44px] -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </div>
          </label>
         </div>

          {/* Confirm Password */}
          <div>
            <label className="form-control w-full mb-3 relative">
            <div className="label">
              <span className="label-text font-medium">Confirm Password</span>
            </div>

            <input
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              className="border border-gray-300 p-2 rounded-md w-full pr-12"
            />
            {errors.confirmPassword && (
              <p className="text-red-400">{errors.confirmPassword.message}</p>
            )}

            <div
              className="absolute right-3 top-[44px] -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </div>
          </label>
          </div>

          {/* Register Button */}
          <button type="submit" className="btn btn-info w-full mt-2">
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-base-content/70">
          Already have an account?{" "}
          <Link to={"/log-in"} className="text-info font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
