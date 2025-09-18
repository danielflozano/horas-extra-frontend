import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "@/services";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(() => {
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('userData');
    return !!(token && userData);
  });
  const [ user,setUser ] = useState(() => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  });

  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {

    setIsLoading(false);
  }, []);

  const login = (token, userData) => {
    if (!token || !userData) {
      console.error('Token o datos de usuario no proporcionados');
      return;      
    }

    try {

      localStorage.setItem('accessToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
    } catch (error) {

      console.error('Error al guardar datos de autenticación', error);
      setIsAuthenticated(false);
      setUser(null);    
    }
  };

  const logout = async() => {

    try {

      await authService.logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
      setIsAuthenticated(false);
      setUser(null);      
    } catch (error) {

      console.error(`Error al cerrar sesión ${error}`);
    }

  }

    const contextValue = useMemo(() => ({
      isAuthenticated,
      user,
      isLoading,
      login,
      logout      
    }), [isAuthenticated, user, isLoading]);

    return (
      <AuthContext.Provider value={ contextValue }>
        { children }
      </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);