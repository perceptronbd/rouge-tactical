import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => {
    const storedToken = sessionStorage.getItem("token");
    return storedToken || null; // No need to parse
  });

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", token);
  }, [user, token]);

  const login = (data) => {
    setUser(data.userData);
    setToken(data.token);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
