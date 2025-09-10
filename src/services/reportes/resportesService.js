import { axiosInstance } from "@/api/axiosInstance";

export const reportesService = {

  crearReporte: async( reporteData ) => {
    const res = await axiosInstance.post('/Reporte/crear', reporteData)
    return res.data
  },

  exportarReporteExcel: async( reporteData ) => {
    const res = await axiosInstance.post('/Reporte/exportar', reporteData)
    return res.data
  }
}