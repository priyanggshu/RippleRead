import { useState } from "react";
import { Link } from "react-router-dom";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { LuPenTool } from "react-icons/lu";
import Auth1 from "../assets/Auth1.svg";
import Auth2 from "../assets/Auth2.svg";
import Auth3 from "../assets/Auth3.svg";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left Section (Hidden on Small Screens) */}
      <div className="hidden md:flex flex-col justify-center items-center pb-[8rem] w-1/2 bg-[#F4F3F0] p-10 relative">
        <div className="brand flex items-center bg-gradient-to-r 
        from-yellow-600 via-yellow-300 to-yellow-600 text-transparent bg-clip-text gap-1">
          <LuPenTool className="text-yellow-600 scale-125" />
          <h1 className="text-4xl font-semibold font-serif rounded-xl">
            RippleRead
          </h1>
        </div>
        <p className="text-lg font-light text-black mt-4 text-center">
          Dive into the latest trends, AI-powered insights, and curated content.
        </p>
        {/* SVGs */}
        <img src={Auth3} className="absolute scale-150 top-12 left-16 w-36 h-36" />
        <img src={Auth2} className="absolute scale-150 bottom-48 right-24 w-36 h-36" />
        <img src={Auth1} className="absolute scale-150 bottom-8 left-20 w-36 h-[8rem]" />
      </div>

      {/* Right Section (Form) */}
      <div className="flex flex-col justify-center h-screen bg-[#F4F3F0] md:bg-[#D8D9D8] items-center w-full md:w-1/2 px-6 md:p-12">
        {/* Brand (Visible on Small Screens) */}
        <div className="md:hidden flex flex-col items-center text-center">
          <div className="brand flex items-center bg-gradient-to-r 
          from-yellow-600 via-yellow-300 to-yellow-600 text-transparent bg-clip-text gap-1">
            <LuPenTool className="text-yellow-600 scale-125" />
            <h1 className="text-5xl font-semibold font-serif rounded-xl">
              RippleRead
            </h1>
          </div>
          <p className="md:text-lg font-light text-black mt-5">
            Dive into the latest trends, AI-powered insights, and curated content.
          </p>
        </div>

        <form className="w-full max-w-md mt-16 md:mt-6 space-y-4 flex flex-col items-center">
            <h2 className="text-3xl font-semibold text-gray-900">
          Create an Account
        </h2>
          <input
            type="email"
            placeholder="Email"
            className="w-3/4 p-3 border bg-blue-50 border-gray-300 placeholder:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-200"
          />
          <input
            type="text"
            placeholder="Username"
            className="w-3/4 p-3 border bg-blue-50 border-gray-300 placeholder:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-200"
          />
          <div className="relative w-3/4 mx-auto">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border bg-blue-50 border-gray-300 placeholder:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              className="absolute right-3 top-4 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <GoEyeClosed className="w-5 h-5" /> : <GoEye className="w-5 h-5" />}
            </button>
          </div>
          <div className="relative w-3/4 mx-auto">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-3 border bg-blue-50 border-gray-300 placeholder:text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              className="absolute right-3 top-4 text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <GoEyeClosed className="w-5 h-5" /> : <GoEye className="w-5 h-5" />}
            </button>
          </div>
          <button
            type="submit"
            className="w-2/5 h-12 mx-auto bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-gray-800 font-light">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;