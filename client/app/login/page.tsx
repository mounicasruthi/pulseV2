"use client";

import { useState, useContext, useEffect } from 'react'
import { API_URL } from '../constants' // Import the API URL constant for endpoint references
import { useRouter } from 'next/navigation' // Hook for programmatic navigation
import { AuthContext, UserInfo } from '../modules/auth_provider' // Import Auth context and UserInfo type

const page = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    // Access authenticated state from AuthContext
    const { authenticated } = useContext(AuthContext)

    const router = useRouter() // Initialize router for navigation

    // Effect to redirect authenticated users to the home page if authenticated
    useEffect(() => {
        if (authenticated) {
          router.push('/') 
          return
        }
      }, [authenticated]) // Runs when the authenticated state changes

    // Handler for form submission
    const submitHandler = async (e: React.SyntheticEvent) => {    
        e.preventDefault() 
        
        try {
            // Send a POST request to the login endpoint with email and password
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            })
           
            const data = await res.json() // Parse response JSON
            if (res.ok) { 
                const user: UserInfo = {
                    username: data.username, // Extract username from response
                    id: data.id, 
                }

                // Store user info in local storage for session persistence
                localStorage.setItem('user_info', JSON.stringify(user))

                // Redirect to home page after successful login
                return router.push('/')
            }
        } catch (err) {
            console.log(err)
        }
    }

  // Render login form
  return (
    <div className='flex items-center justify-center min-w-full min-h-screen'>
      <form className='flex flex-col md:w-1/5'>
        <div className='text-3xl font-bold text-center'>
          <span className='text-blue'>welcome!</span> 
        </div>

        <input
          placeholder='email'
          className='p-3 mt-8 rounded-md border-2 border-grey focus:outline-none focus:border-blue'
          value={email} // Bind email state to input
          onChange={(e) => setEmail(e.target.value)} // Update state on input change
        />
 
        <input
          type='password'
          placeholder='password'
          className='p-3 mt-4 rounded-md border-2 border-grey focus:outline-none focus:border-blue'
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      
        <button
          className='p-3 mt-6 rounded-md bg-blue font-bold text-white'
          type='submit'
          onClick={submitHandler} 
        >Log in</button>
      </form>
    </div>
  )
}

export default page
