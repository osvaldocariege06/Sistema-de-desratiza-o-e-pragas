import { useQuery } from "@tanstack/react-query";
import SecureStorage from "@/utils/secureStore";
import { DemandProps } from "@/types/demands";
import { demandsApi } from "@/services/authApi.demands";

// Função de fetch
const fetchAllDemands = async (): Promise<DemandProps[]> => {
  const accessToken = await SecureStorage.get("accessToken");

  const response = await demandsApi.get("/PestWorkOrder/get-list", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response?.data?.data;
};

// Hook
export function useApiGetAllDemands() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["demands"],
    queryFn: fetchAllDemands,
  });

  return {
    demands: data,
    isLoadingDemands: isLoading,
    errorDemands: error,
    refetchDemands: refetch,
  };
}
