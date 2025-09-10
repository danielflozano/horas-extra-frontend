import { axiosInstance } from "../../api/axiosInstance";

export const loginService = async (userData) => {
  try {
    const response = await axiosInstance.post('/', userData)
    return {
      ok: true,
      user: response.data.user,
      accessToken: response.data.accessToken,
    }
    
  } catch (error) {
    return {
      ok: false,
      message: ''
    }
  }
}