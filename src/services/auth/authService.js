import { axiosInstance } from '../../api/axiosInstance';

export const authService = {
  login: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/login', userData);
      return {
        ok: true,
        message: `Inicio de sesion exitoso`,
        user: response.data,
        accessToken: response.data.token,
      };
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        error.message ||
        'Error desconocido al iniciar sesión';
      return {
        ok: false,
        message: `Error iniciando sesión. ${errorMessage}`,
      };
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post('/auth/logout');
      return {
        ok: true,
        msg: response.data.msg || 'Sesión cerrada exitosamente',
      };
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        error.message ||
        'Error desconocido al cerrar sesión';
      return {
        ok: false,
        message: errorMessage,
      };
    }
  },
};
