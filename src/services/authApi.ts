import axios from "axios";
import {
  requestInterceptor,
  responseInterceptor,
} from "@/utils/apiInterceptor.ts";
import { envs } from "@/constants/envs.const";

const BASE_URL = envs.AUTH_API_URL;

export const authApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use(requestInterceptor, (error) =>
  Promise.reject(error)
);

authApi.interceptors.response.use((response) => response, responseInterceptor);
