import { createContext, useState, useEffect, useCallback } from "react";

import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);

  const updateJwtToken = useCallback((token) => {
    const decodedToken = jwtDecode(token);
    setIsLoggedIn(true);
    setIsInitialized(true);
    setName(decodedToken.name);
    setRole(decodedToken.role);
    localStorage.setItem("token", token);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setName(null);
    setRole(null);
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      updateJwtToken(token);
    }

    setIsInitialized(true);
  }, [updateJwtToken]);

  return (
    <UserContext.Provider
      value={{ updateJwtToken, role, name, isLoggedIn, isInitialized, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
