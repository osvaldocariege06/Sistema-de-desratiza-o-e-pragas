import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiDemands = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000, // 10 segundos
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
apiDemands.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiDemands.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Tratamento de erro 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Tentar refresh do token
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const response = await apiDemands.post("/auth/refresh", {
          refreshToken,
        });

        const { token } = response.data;

        // Salvar novo token
        await AsyncStorage.setItem("authToken", token);

        // Atualizar header e refazer a requisição
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiDemands(originalRequest);
      } catch (refreshError) {
        // Se falhar o refresh, fazer logout
        await AsyncStorage.multiRemove(["authToken", "refreshToken"]);
        // Redirecionar para login (você precisa implementar isso)
        return Promise.reject(refreshError);
      }
    }

    // Tratamento de erros de rede
    if (!error.response) {
      return Promise.reject({
        message: "Erro de conexão. Verifique sua internet.",
        status: "network_error",
      });
    }

    // Tratamento de erros específicos
    switch (error.response.status) {
      case 400:
        error.message = "Requisição inválida";
        break;
      case 403:
        error.message = "Acesso negado";
        break;
      case 404:
        error.message = "Recurso não encontrado";
        break;
      case 500:
        error.message = "Erro interno do servidor";
        break;
      default:
        error.message = "Ocorreu um erro inesperado";
    }

    return Promise.reject(error);
  }
);

// Tipos de erro personalizados
export interface ApiError {
  message: string;
  status: number | string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data?: any;
}

// Helper para verificar se é um erro da API
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function isApiError(error: any): error is ApiError {
  return (
    error &&
    typeof error.message === "string" &&
    (typeof error.status === "number" || typeof error.status === "string")
  );
}

// Helper para extrair mensagem de erro
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Ocorreu um erro inesperado";
}
