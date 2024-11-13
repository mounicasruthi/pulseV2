// "use client";

// import { useState, useContext, useEffect } from 'react'
// import { API_URL } from '../constants' // Import the API URL constant for endpoint references
// import { useRouter } from 'next/navigation' // Hook for programmatic navigation
// import { AuthContext, UserInfo } from '../modules/auth_provider' // Import Auth context and UserInfo type

// const page = () => {

//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
    
//     // Access authenticated state from AuthContext
//     const { authenticated } = useContext(AuthContext)

//     const router = useRouter() // Initialize router for navigation

//     // Effect to redirect authenticated users to the home page if authenticated
//     useEffect(() => {
//         if (authenticated) {
//           router.push('/') 
//           return
//         }
//       }, [authenticated]) // Runs when the authenticated state changes

//     // Handler for form submission
//     const submitHandler = async (e: React.SyntheticEvent) => {    
//         e.preventDefault() 
        
//         try {
//             // Send a POST request to the login endpoint with email and password
//             const res = await fetch(`${API_URL}/login`, {
//                 method: 'POST',
//                 headers: {'Content-Type': 'application/json'},
//                 body: JSON.stringify({email, password}),
//             })
           
//             const data = await res.json() // Parse response JSON
//             if (res.ok) { 
//                 const user: UserInfo = {
//                     username: data.username, // Extract username from response
//                     id: data.id, 
//                 }

//                 // Store user info in local storage for session persistence
//                 localStorage.setItem('user_info', JSON.stringify(user))

//                 // Redirect to home page after successful login
//                 return router.push('/')
//             }
//         } catch (err) {
//             console.log(err)
//         }
//     }

//   // Render login form
//   return (
//     <div className='flex items-center justify-center min-w-full min-h-screen'>
//       <form className='flex flex-col md:w-1/5'>
//         <div className='text-3xl font-bold text-center'>
//           <span className='text-black'>welcome to Pulse!</span> 
//         </div>

//         <input
//           placeholder='email'
//           className='p-3 mt-8 rounded-md border-2 border-grey focus:outline-none focus:border-black'
//           value={email} // Bind email state to input
//           onChange={(e) => setEmail(e.target.value)} // Update state on input change
//         />
 
//         <input
//           type='password'
//           placeholder='password'
//           className='p-3 mt-4 rounded-md border-2 border-grey focus:outline-none focus:border-black'
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//         />
      
//         <button
//           className='p-3 mt-6 rounded-md bg-black font-bold text-white'
//           type='submit'
//           onClick={submitHandler} 
//         >Log in</button>
//       </form>
//     </div>
//   )
// }

// export default page

"use client";

import { useState, useContext, useEffect } from "react";
import { API_URL } from "../constants"; // Import the API URL constant for endpoint references
import { useRouter } from "next/navigation"; // Hook for programmatic navigation
import { AuthContext, UserInfo } from "../modules/auth_provider"; // Import Auth context and UserInfo type

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Access authenticated state from AuthContext
  const { authenticated } = useContext(AuthContext);

  const router = useRouter(); // Initialize router for navigation

  // Effect to redirect authenticated users to the home page if authenticated
  useEffect(() => {
    if (authenticated) {
      router.push("/");
      return;
    }
  }, [authenticated]); // Runs when the authenticated state changes

  // Handler for form submission
  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      // Send a POST request to the login endpoint with email and password
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json(); // Parse response JSON
      if (res.ok) {
        const user: UserInfo = {
          username: data.username, // Extract username from response
          id: data.id,
        };

        // Store user info in local storage for session persistence
        localStorage.setItem("user_info", JSON.stringify(user));

        // Redirect to home page after successful login
        return router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Render login form
  return (
    <div className="flex items-center justify-center min-w-full min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <form className="flex flex-col items-center bg-white rounded-xl p-10 shadow-xl w-full sm:w-3/4 md:w-1/3">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Welcome to Pulse!
        </h1>

        {/* Email Input */}
        <input
          placeholder="Email"
          className="p-4 w-full rounded-lg border-2 border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          value={email} // Bind email state to input
          onChange={(e) => setEmail(e.target.value)} // Update state on input change
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="p-4 w-full rounded-lg border-2 border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          value={password} // Bind password state to input
          onChange={(e) => setPassword(e.target.value)} // Update state on input change
        />

        {/* Submit Button */}
        <button
          className="p-4 w-full rounded-lg bg-[#dfa898] text-white font-bold hover:bg-indigo-700 focus:outline-none transition-all"
          type="submit"
          onClick={submitHandler}
        >
          Log In
        </button>

        {/* Error Message */}
        <p className="text-red-500 text-sm mt-4 text-center">
          {/* Display error messages here if needed */}
        </p>
        <p className="text-sm mt-4 text-center">
  Don't have an account?{" "}
  <span
    className="text-indigo-600 cursor-pointer"
    onClick={() => router.push("/signup")}
  >
    Sign Up
  </span>
</p>

      </form>
    </div>
  );
};

export default Page;
