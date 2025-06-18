import SecureStorage from "@/utils/secureStore";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/authApi";
import { TSignInRequest, TSignInResponse } from "../types/sign.in.types";

const mutationFn = async ({ ...data }: TSignInRequest) => {
  const accessToken = await SecureStorage.get("accessToken");

  const response = await authApi.post<TSignInResponse>("/ApplicationAuthetication/login", { ...data }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.data?.data
}

export function useApiSignIn() {
  const { mutateAsync: signIn, isPending: isSignIn } = useMutation({
    mutationFn,
  });

  return {
    signIn,
    isSignIn,
  };
}
