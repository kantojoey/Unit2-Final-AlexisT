import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(() => {
        const storedUser = localStorage.getItem("authUser");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const storedLogin = localStorage.getItem("isLoggedIn");
        return storedLogin ? JSON.parse(storedLogin) : false;
    });

    useEffect(() => {
        localStorage.setItem("authUser", JSON.stringify(authUser));
    }, [authUser]);

    useEffect(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);


    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);