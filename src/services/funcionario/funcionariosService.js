import { axiosInstance } from "../../api/axiosInstance"


export const funcionariosService = {

  listar: async () => {
    const res = await axiosInstance.get('/funcionario');
    return res.data
  },

  crear: async (funcionarioData) => {
    const res = await axiosInstance.post('/funcionario/crearFuncionario',funcionarioData);
    return res.data
  },
  
}