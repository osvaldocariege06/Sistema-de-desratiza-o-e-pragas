import { destroyAll } from "./destroyAll";
import SecureStorage from "./secureStore";


export const requestInterceptor = async (config: any) => {
  const token = await SecureStorage.get("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const responseInterceptor = async (error: any) => {
  const { response } = error;

  if (!response) {
    console.error("Erro de conexão com o servidor.");
    return Promise.reject(error);
  }

  const { status } = response;

  if (status === 401 || status === 403) {
    await destroyAll();
  } else if (status === 500 || status === 503) {
    console.error("Erro no servidor. Tente novamente mais tarde.");
  }

  return Promise.reject(error);
};
