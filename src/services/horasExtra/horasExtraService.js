import { axiosInstance } from "../../api/axiosInstance"

export const horasExtraService = {
  crearExtras: async (extrasData) => {
    try {
      const res = await axiosInstance.post("/extras/crear", extrasData);
      return res.data;
    } catch (error) {
      console.error("Error creando horas extra:", error);
      // Puedes devolver el error para que el componente lo maneje
      throw error.response?.data || error.message;
    }
  },

  listarExtras: async () => {
    try {
      const res = await axiosInstance.get("/extras/listar");
      return res.data;
    } catch (error) {
      console.error("Error listando horas extra:", error);
      throw error.response?.data || error.message;
    }
  },

  eliminarExtras: async(id) => {
    try {
      const res = await axiosInstance.delete(`/extras/delete/${id}`);
      return res.data;
    } catch (error) {
      console.error('Error eliminando horas extra', error);
      throw error.response?.data || error.message;      
    }
  },

  actualizarExtras: async(id, data) => {
    try {
      const res = await axiosInstance.put(`/extras/update/${id}`, data);
      return res.data;
    } catch (error) {
      console.error('Error actualizando horas extra', error);
      throw error.response?.data || error.message;      
    }
  },

  listarExtrasPorFuncionario: async(identificacion) => {
    try {
      const res = await axiosInstance.get(`/extras/funcionario?identificacion=${identificacion}`);
      return res.data;
    } catch (error) {
      console.error(`Error obteniendo horas extra del funcionario con identificacion ${identificacion}`, error);
      throw error.response?.data || error.message;      
    }
  },

  listarExtrasPorFechas: async(fechaInicio, fechaFin) => {
    try {
      const res = await axiosInstance.get(`/extras/fechas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
      return res.data;
    } catch (error) {
      console.error(`Error obteniendo horas extra ${fechaInicio}, ${fechaFin}`, error);
      throw error.response?.data || error.message;      
    }
  },

  // exportarExcel  
};
