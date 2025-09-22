import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "@/services";
import { axiosInstance, setupInterceptors } from "@/api/axiosInstance";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  token: null,        // 👈 añadimos el token
  isLoading: true,
  login: () => {},
  logout: () => {},
  setToken: () => {}, // 👈 añadimos setter del token
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!(token && user);
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setupInterceptors(setToken, logout); // 👈 conectamos interceptores al contexto
    setIsLoading(false);
  }, []);

  const login = (token, userData) => {
    try {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      setToken(token);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error al guardar datos de autenticación", error);
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      user,
      token,
      isLoading,
      login,
      logout,
      setToken, // 👈 lo exponemos para que axios pueda actualizar el token
    }),
    [isAuthenticated, user, token, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
