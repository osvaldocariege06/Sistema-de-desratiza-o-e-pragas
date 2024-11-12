import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Alert } from 'react-native';



interface AuthState {
  user: string
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  restoreToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: '',
  token: null,
  isAuthenticated: false,
  isAdmin: false,

  // Login - salva o token e atualiza o estado
  login: async (email: string, password: string) => {


    try {
      await AsyncStorage.setItem('token', email);
      router.replace('/(tabs)/demands')
      Alert.alert('Login realizado com sucesso!')
      console.log({ email, password })
    } catch (error) {
      Alert.alert('Login', 'Erro ao fazer login')

    }

  },

  // Logout - remove o token e fazer reset ao estado
  logout: async () => {
    await AsyncStorage.removeItem('token');
    set({ token: null, isAuthenticated: false });
  },

  // Verificar e restaurar o token do AsyncStorage
  restoreToken: async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      set({ token, isAuthenticated: true });
    } else {
      set({ token: null, isAuthenticated: false });
    }
  },
}));
