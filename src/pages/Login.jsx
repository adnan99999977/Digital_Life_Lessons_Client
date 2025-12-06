import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const {signInViaGoogle} = useContext(AuthContext)
  const [showPass, setShowPass] = useState(false);

  // google log in 
  const handleGoogle = ()=>{
      signInViaGoogle()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-3">
      <div className="card w-full max-w-sm shadow-xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome Back </h2>
        <p className="text-center mb-4 text-base-content/70">
          Login to Digital Life Lessons
        </p>

        {/* Google Login */}
        <button onClick={handleGoogle} className="btn w-full bg-white border shadow-sm mb-4">
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <div className="divider">OR</div>

        {/* Email */}
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text font-medium">Email</span>
          </div>
          <input
            type="email"
            placeholder="you@example.com"
            className="border border-gray-300 p-2 rounded-md w-full pr-12"
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

          {/* Eye Icon  */}
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

        {/* Login Button */}
        <button className="btn btn-info w-full mt-2">Login</button>

        <p className="mt-4 text-center text-sm text-base-content/70">
          Don't have an account?{" "}
          <Link  to={"/register"} className="text-info font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
