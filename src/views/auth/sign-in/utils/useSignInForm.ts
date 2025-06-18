import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "./signInSchema";
import { useApiSignIn } from "../api/useApiSignIn";
import { router } from "expo-router";
import SecureStorage from "@/utils/secureStore";
import Toast from "react-native-toast-message";

export function useSignInForm() {

  const { signIn, isSignIn } = useApiSignIn();


  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log("onsubmit: ", data);

    try {
      const response = await signIn({
        email: data?.email,
        username: data?.username,
        password: data?.password
      })

      await SecureStorage.set("accessToken", response?.token);

      router.replace("/(tabs)/demands");
      Toast.show({ type: "success", position: "bottom", text1: "Login realizado com sucesso", text2: "Seja bem-vindo!" })
    } catch (error) {
      Toast.show({ type: "error", position: "bottom", text1: "Falha ao fazer login", text2: error as string, })
      console.log(error);

    }

  })


  return {
    watch,
    errors,
    onSubmit,
    setValue,
    isSignIn
  }
}