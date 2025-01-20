import React, { createContext, useContext, useState, useEffect } from "react";

// Create the User Context
const UserContext = createContext();

// Custom hook to use the User Context
export const useUser = () => useContext(UserContext);

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    setUser(null); // Clear user data
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
