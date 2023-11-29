import React, { useState, createContext, useEffect } from "react";
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const adminUser = {
        username: "Admin@gmail.com",
        role: "Admin"
    };

    const regularUser = {
        username: "Jonas13@gmail.com",
        role: "User" // Changed to 'User' (uppercase 'U')
    };

    const [user, setUser] = useState(() => {
        const persistedUser = localStorage.getItem("user");
        return persistedUser ? JSON.parse(persistedUser) : null;
    });

    const login = (username) => {
        if (username === "Admin@gmail.com") {
            setUser(adminUser);
            localStorage.setItem("user", JSON.stringify(adminUser));
        } else {
            setUser(regularUser);
            localStorage.setItem("user", JSON.stringify(regularUser));
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    const contextValue = {
        user,
        setUser,
        login,
        logout
    };

    // Adding logging to check user's role after login
    useEffect(() => {
        if (user) {
            console.log("Logged in user:", user.username);
            console.log("Role:", user.role);
        }
    }, [user]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
