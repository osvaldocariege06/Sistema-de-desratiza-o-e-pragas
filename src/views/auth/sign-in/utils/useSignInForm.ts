import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "./signInSchema";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";

export function useSignInForm() {
  // const { signIn, isSignIn } = useApiSignIn();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await login(data.username, data?.password);

      router.replace("/(tabs)/demands");
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Login realizado com sucesso",
        text2: "Seja bem-vindo!",
      });
    } catch (error) {
      console.error("Erro ao fazer login", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Falha ao fazer login",
        text2: error as string,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  return {
    watch,
    errors,
    onSubmit,
    setValue,
    isSignIn: loading,
  };
}
