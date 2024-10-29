"use client";

import { useState, createContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define the structure of user information for type safety.
export type UserInfo = {
    username: string;
    id: string;
};

// Create an AuthContext to manage authentication state across the application.
export const AuthContext = createContext<{
    authenticated: boolean;
    setAuthenticated: (auth: boolean) => void;
    user: UserInfo;
    setUser: (user: UserInfo) => void;
}>({
    authenticated: false,
    setAuthenticated: () => {},
    user: { username: '', id: '' },
    setUser: () => {},
});

// AuthContextProvider component manages authentication logic and provides context to its children.
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    // State to track if the user is authenticated.
    const [authenticated, setAuthenticated] = useState(false);
    // State to hold user information.
    const [user, setUser] = useState<UserInfo>({ username: '', id: '' });
    const router = useRouter();

    // useEffect runs after the component mounts and checks for user information.
    useEffect(() => {
        const userInfo = localStorage.getItem('user_info');

        // If no user info is found, redirect to login unless already on the signup page.
        if (!userInfo) {
            if (window.location.pathname !== '/signup') {
                router.push('/login'); // Redirect to login if user is not authenticated.
            }
            return; // Early return if user info is not found.
        }

        // Parse user info from local storage.
        try {
            const parsedUser: UserInfo = JSON.parse(userInfo);
            setUser(parsedUser); // Update user state with the retrieved information.
            setAuthenticated(true); // Set authenticated to true if user info is found.
        } catch (error) {
            console.error("Failed to parse user info from localStorage", error);
            // Optionally handle the error, e.g., clear local storage or redirect to login.
            localStorage.removeItem('user_info');
            router.push('/login');
        }
    }, [router]); // Dependency on router ensures effect runs on mount.

    // Provide authentication state and methods to children components.
    return (
        <AuthContext.Provider
            value={{
                authenticated,
                setAuthenticated,
                user,
                setUser,
            }}
        >
            {children} {/* Render children within the context provider. */}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
