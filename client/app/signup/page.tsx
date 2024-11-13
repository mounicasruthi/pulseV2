"use client";

import React from "react";
import { useState, useContext, useEffect } from "react";
import { API_URL } from "../constants";
import { useRouter } from "next/navigation";
import { AuthContext, UserInfo } from "../modules/auth_provider";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { authenticated } = useContext(AuthContext);
  const router = useRouter();

  // Effect to redirect authenticated users to the home page
  useEffect(() => {
    if (authenticated) {
      router.push("/");
      return;
    }
  }, [authenticated]);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      // Send POST request to signup endpoint
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await res.json();
      if (res.ok) {
        const user: UserInfo = {
          username: data.username,
          id: data.id,
        };

        // Store user info in local storage
        localStorage.setItem("user_info", JSON.stringify(user));

        // Redirect to home page after successful signup
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-w-full min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <form
        className="flex flex-col items-center bg-white rounded-xl p-10 shadow-xl w-full sm:w-3/4 md:w-1/3"
        onSubmit={submitHandler}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Sign Up</h1>

        {/* Username Input */}
        <input
          placeholder="Username"
          className="p-4 w-full rounded-lg border-2 border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Email Input */}
        <input
          placeholder="Email"
          className="p-4 w-full rounded-lg border-2 border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="p-4 w-full rounded-lg border-2 border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit Button */}
        <button
          className="p-4 w-full rounded-lg bg-[#dfa898] text-white font-bold hover:bg-indigo-700 focus:outline-none transition-all"
          type="submit"
          onClick={submitHandler}
        >
          Sign Up
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Log In
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
