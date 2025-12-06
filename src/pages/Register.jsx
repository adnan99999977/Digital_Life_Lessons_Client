import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
    const {signInViaGoogle} = useContext(AuthContext)
  

   const handleGoogle = ()=>{
      signInViaGoogle()
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-3">
      <div className="card w-full max-w-sm shadow-xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Create an Account ✨
        </h2>
        <p className="text-center mb-4 text-base-content/70">
          Join Digital Life Lessons today
        </p>

        {/* Google Signup */}
        <button onClick={handleGoogle} className="btn w-full bg-white border shadow-sm mb-4">
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <div className="divider">OR</div>

        {/* Name */}
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text font-medium">Full Name</span>
          </div>
          <input
            type="text"
            placeholder="Your full name"
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </label>

        {/* Email */}
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text font-medium">Email</span>
          </div>
          <input
            type="email"
            placeholder="you@example.com"
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </label>

        {/* Password */}
        <label className="form-control w-full mb-3 relative">
          <div className="label">
            <span className="label-text font-medium">Password</span>
          </div>

          <input
            type={showPass ? "text" : "password"}
            placeholder="••••••••"
            className="border border-gray-300 p-2 rounded-md w-full pr-12"
          />

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

        {/* Confirm Password */}
        <label className="form-control w-full mb-3 relative">
          <div className="label">
            <span className="label-text font-medium">Confirm Password</span>
          </div>

          <input
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••"
            className="border border-gray-300 p-2 rounded-md w-full pr-12"
          />

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

        {/* Register Button */}
        <button className="btn btn-info w-full mt-2">Register</button>

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
