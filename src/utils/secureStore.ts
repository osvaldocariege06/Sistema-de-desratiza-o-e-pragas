import * as SecureStore from "expo-secure-store";

type TKey =
  | "user"
  | "pushToken"
  | "searches"
  | "language"
  | "accessToken"
  | "firstAccess"
  | "refreshToken"
  | "phone-picker-data-list"
  | "hideOnScroll";

interface SecureStorageType {
  set: (key: TKey, value: any) => Promise<boolean>;
  get: (key: TKey) => Promise<any | null>;
  delete: (key: TKey) => Promise<boolean>;
}

const SecureStorage: SecureStorageType = {
  set: async (key, value) => {
    try {
      if (!value) {
        throw new Error(
          `Tentativa de salvar um valor inválido (${value}) para a chave "${key}"`
        );
      }

      const stringValue = JSON.stringify(value);
      await SecureStore.setItemAsync(key, stringValue);
      return true;
    } catch (error) {
      console.error(`[SecureStorage] Erro ao salvar "${key}":`, error);
      return false;
    }
  },

  get: async (key) => {
    try {
      const value = await SecureStore.getItemAsync(key);
      if (!value) return null;

      return JSON.parse(value);
    } catch (error) {
      console.error(`[SecureStorage] Erro ao recuperar "${key}":`, error);
      return null;
    }
  },

  delete: async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
      return true;
    } catch (error) {
      console.error(`[SecureStorage] Erro ao deletar "${key}":`, error);
      return false;
    }
  },
};

export default SecureStorage;
