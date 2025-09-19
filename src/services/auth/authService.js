import { axiosInstance } from '../../api/axiosInstance';

export const authService = {
  login: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/login', userData);
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Error desconocido al iniciar sesión';
      throw new Error(errorMessage);      
    }
  },

  logout: async (refreshToken) => {
    try {
      const response = await axiosInstance.post('/auth/logout', refreshToken);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'Error desconocido al cerrar sesión';
      throw new Error(errorMessage);      
    }
  },
};
