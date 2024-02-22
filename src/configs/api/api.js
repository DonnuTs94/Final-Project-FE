import axios from "axios"
import { BASE_URL } from "../constant/baseUrl"

const axiosInstance = axios.create({
  baseURL: BASE_URL
})

axiosInstance.interceptors.request.use((req) => {
  const auth_token = localStorage.getItem("auth_token")

  if (auth_token) {
    req.headers.authorization = `Bearer ${auth_token}`
  }
  return req
})

axiosInstance.interceptors.response.use(
  (resSuccess) => {
    return resSuccess
  },
  (resError) => {
    if (resError.response.status === 401) {
      localStorage.removeItem("auth_token")
    }
    return Promise.reject(resError)
  }
)

export { axiosInstance }
