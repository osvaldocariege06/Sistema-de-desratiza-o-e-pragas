import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';



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
    await AsyncStorage.setItem('token', email);


    if (email === 'admin@example.com' && password === 'securepassword') {
      return set({ token: email, isAuthenticated: true, isAdmin: true, user: email });
    }
    if (email === 'user@example.com' && password === 'securepassword') {
      return set({ token: email, isAuthenticated: true, user: email, isAdmin: false, });
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
