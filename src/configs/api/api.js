import axios from "axios"
import { BASE_URL } from "../constant/baseUrl"

const axiosInstance = axios.create({
  baseURL: BASE_URL
})

export { axiosInstance }
