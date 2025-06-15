// src/context/AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios"; // Or your preferred HTTP client
import obtainToken, { getUserData } from "../http requests/token";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user);
  useEffect(() => {
    async function func() {
      const token = localStorage.getItem("token");
      if (token) {
        const userTemp = await getUserData(token);
        setUser({ isAuthenticated: true, token: token, user: userTemp.data });
      }

      setLoading(false);
    }

    func();
  }, []);

  const login = async (username, password) => {
    try {
      setLoading(true);
      const token = await obtainToken({ username, password });
      const user = await getUserData(token);
      localStorage.setItem("token", token);
      setUser({ isAuthenticated: true, token: token, user });
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setUser(null);
      localStorage.removeItem("token");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    console.log(user);
    return user && user.isAuthenticated;
  };

  const getAccessToken = () => {
    return localStorage.getItem("token");
  };

  const contextValue = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    getAccessToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
