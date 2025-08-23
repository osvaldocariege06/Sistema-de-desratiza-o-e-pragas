import { useQuery } from "@tanstack/react-query";
import SecureStorage from "@/utils/secureStore";
import type { DemandProps } from "@/types/demands";
import { demandsApi } from "@/services/authApi.demands";

// Função de fetch
const queryFn = async (): Promise<DemandProps[]> => {
  const accessToken = await SecureStorage.get("accessToken");

  const response = await demandsApi.get("/PestWorkOrder/get-list", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response?.data?.data;
};

// Hook
export function useApiGetTechnical() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["demands"],
    queryFn: queryFn,
  });

  return {
    demands: data,
    isLoadingDemands: isLoading,
    errorDemands: error,
    refetchDemands: refetch,
  };
}
