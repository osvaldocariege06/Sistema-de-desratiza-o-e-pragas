import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import Toast from "react-native-toast-message";
import type { IUser } from "@/types/user";
import { authApi } from "@/services/authApi";

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthed: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  restoreToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthed: false,
  isAdmin: false,

  login: async (email: string, password: string) => {
    try {
      const response = await authApi.post("/ApplicationAuthetication/login", {
        username: email,
        email,
        password,
      });

      const { token, authenticatedUser } = response.data?.data ?? {};

      if (!token || !authenticatedUser) {
        throw new Error("Dados de autenticação inválidos");
      }

      await AsyncStorage.setItem("authToken", token);

      set({
        user: authenticatedUser,
        token,
        isAuthed: true,
        isAdmin: authenticatedUser.role === "admin", // ajuste conforme sua modelagem
      });

      console.log("authenticatedUser", response.data);

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Login realizado com sucesso",
        text2: "Seja bem-vindo!",
      });
    } catch (error) {
      set({
        user: null,
        token: null,
        isAuthed: false,
        isAdmin: false,
      });

      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Erro ao fazer login",
        text2: "E-mail ou senha inválidos.",
      });

      throw error;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("authToken");
    set({
      user: null,
      token: null,
      isAuthed: false,
      isAdmin: false,
    });
  },

  restoreToken: async () => {
    const savedToken = await AsyncStorage.getItem("authToken");
    if (savedToken) {
      set({ token: savedToken, isAuthed: true });
    } else {
      set({ token: null, isAuthed: false });
    }
  },
}));
