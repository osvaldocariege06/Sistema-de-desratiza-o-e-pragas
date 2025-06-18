import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/lib/axios";
import { IUser } from "@/types/user";



interface AuthState {
  user: IUser;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  restoreToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,

  // Login - salva o token e atualiza o estado
  login: async (email: string, password: string) => {
    try {
      const response = await api.post("/ApplicationAuthetication/login", {
        username: email,
        password,
        postOfSaleId: 0,
      });
      const {
        token,
        authenticatedUser,
      }: { token: string; authenticatedUser: IUser } = response.data.data;

      // Salva o token no AsyncStorage
      await AsyncStorage.setItem("authToken", token);

      set({
        user: authenticatedUser,
        token,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  },

  // Logout - remove o token e fazer reset ao estado
  logout: async () => {
    await AsyncStorage.removeItem("authToken");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  // Verificar e restaurar o token do AsyncStorage
  restoreToken: async () => {
    const savedToken = await AsyncStorage.getItem("authToken");
    if (savedToken) {
      set({ token: savedToken, isAuthenticated: true });
    } else {
      set({ token: null, isAuthenticated: false });
    }
  },
}));
