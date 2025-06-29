// src/context/AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios"; // Or your preferred HTTP client
import obtainToken, { getUserData } from "../http requests/token";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function func() {
      const token = localStorage.getItem("token");
      if (token) {
        const userTemp = await getUserData(token);

        if (userTemp !== undefined) {
          setAuthData({
            isAuthenticated: true,
            token: token,
            user: userTemp.data,
          });
        }
      }

      setLoading(false);
    }

    func();
  }, []);

  const login = async (username, password) => {
    try {
      setLoading(true);
      const token = await obtainToken({ username, password });
      const user = await getUserData(token.data.token);
      console.log(user);
      localStorage.setItem("token", token.data.token);
      setAuthData({
        isAuthenticated: true,
        token: token.data.token,
        user: user.data,
      });
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setAuthData(null);
      localStorage.removeItem("token");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    console.log(authData);
    return authData && authData.isAuthenticated;
  };

  const getAccessToken = () => {
    return localStorage.getItem("token");
  };

  const contextValue = {
    authData,
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
