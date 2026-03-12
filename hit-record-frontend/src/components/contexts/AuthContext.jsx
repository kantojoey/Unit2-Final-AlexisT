import { createContext, useContext, useState, useEffect } from "react";

// Creates a context that can be accessed in other components
const AuthContext = createContext();

// Creates provider to make content accessible with props
export const AuthProvider = ({ children }) => {

    // Sets logged in user and stores in local storage
    const [authUser, setAuthUser] = useState(() => {
        const storedUser = localStorage.getItem("authUser");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Sets logged in status and stores in local storage
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const storedLogin = localStorage.getItem("isLoggedIn");
        return storedLogin ? JSON.parse(storedLogin) : false;
    });

    // Runs above functions on changes to logged in user/status
    useEffect(() => {
        localStorage.setItem("authUser", JSON.stringify(authUser));
    }, [authUser]);

    useEffect(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    // Object that will be accessible to other components
    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    };

    // Provides auth state to all components placed in the middle
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to clean up calls in code
export const useAuth = () => useContext(AuthContext);