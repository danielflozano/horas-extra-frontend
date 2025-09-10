import { axiosInstance } from "../../api/axiosInstance"

export const horasExtraService = {

  crearExtras: async(extrasData) => {
    const res = await axiosInstance.post('/extras/crear', extrasData);
    return res.data
  },

  listaExtras: async() => {
    const res = await axiosInstance.get('/extras/listar');
    return res.data
  },

}