import { createContext, useState, useEffect, useContext } from "react";
import obtainToken from "../http requests/token";
import { fetchUserData } from "../http requests/accounts";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function func() {
      const token = localStorage.getItem("token");
      if (token) {
        const userTemp = await fetchUserData(token);

        if (userTemp !== undefined) {
          setAuthData({
            isAuthenticated: true,
            token: token,
            user: userTemp.data,
          });
        } else {
          setAuthData(null);
        }
      }

      setLoading(false);
    }

    func();
  }, []);

  const login = async (userData, token) => {
    try {
      setLoading(true);
      localStorage.setItem("token", token);
      setAuthData({
        isAuthenticated: true,
        token: token,
        user: userData,
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
    if (authData && authData.isAuthenticated) {
      return true;
    }

    return false;
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
