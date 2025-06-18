import axios from "axios";
import {
  requestInterceptor,
  responseInterceptor,
} from "@/utils/apiInterceptor.ts";
import { envs } from "@/constants/envs.const";

const BASE_URL = envs.DEMANDS_API_URL;

export const demandsApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

demandsApi.interceptors.request.use(requestInterceptor, (error) =>
  Promise.reject(error)
);

demandsApi.interceptors.response.use((response) => response, responseInterceptor);
