import { useState, createContext, useEffect } from 'react'
import { useRouter } from 'next/router'

// Define the structure of user information for type safety.
export type UserInfo = {
    username: string
    id: string
}

// Create an AuthContext to manage authentication state across the application.
// This allows components to easily access authentication status and user information.
export const AuthContext = createContext<{
    authenticated: boolean
    setAuthenticated: (auth: boolean) => void
    user: UserInfo
    setUser: (user: UserInfo) => void
  }>({
    authenticated: false,
    setAuthenticated: () => {},
    user: { username: '', id: '' },
    setUser: () => {},
  })
  
// AuthContextProvider component manages authentication logic and provides context to its children.
const AuthContextProvider = ({ children }: {children: React.ReactNode}) => {

    // State to track if the user is authenticated.
    const [authenticated, setAuthenticated] = useState(false)
    // State to hold user information.
    const [user, setUser] = useState<UserInfo>({username: '', id: ''})

    const router = useRouter()

    // useEffect runs after the component mounts and checks for user information.
    useEffect(() => {
      // Retrieve user information from local storage.
      const userInfo = localStorage.getItem('user_info')
  
      // If no user info is found, redirect to login unless already on the signup page.
      if (!userInfo) {
        if (window.location.pathname != '/signup') {
          router.push('/login') // Redirect to login if user is not authenticated.
          return
        }
      } else {
        // Parse user info from local storage if it exists.
        const user: UserInfo = JSON.parse(userInfo)
        if (user) {
          // Update user state with the retrieved information.
          setUser({
            username: user.username,
            id: user.id,
          })
        }
        // Set authenticated to true if user info is found.
        setAuthenticated(true)
      }
    }, [authenticated]) // Dependency on authenticated ensures effect runs on changes.

  // Provide authentication state and methods to children components.
  return (
    <AuthContext.Provider
      value={{
        authenticated: authenticated,
        setAuthenticated: setAuthenticated,
        user: user,
        setUser: setUser,
      }}
    >
      {children} // Render children within the context provider.
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
